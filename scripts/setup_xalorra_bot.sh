#!/bin/bash

set -e

DEST_DIR="/opt/xalorra-discord"

echo "📁 Membuat direktori struktur bot di $DEST_DIR..."
mkdir -p "$DEST_DIR"/{handlers,utils}

echo "📄 Membuat file konfigurasi dan modul..."
touch "$DEST_DIR"/{main.py,config.py,intent_engine.py,mistral_engine.py}
touch "$DEST_DIR"/utils/signature.py
touch "$DEST_DIR"/handlers/{login.py,whitepaper.py,pricing.py,contribute.py,default.py}

echo "🧠 Mengisi file konfigurasi dan isi default..."

cat > "$DEST_DIR/config.py" <<EOF
# config.py

DISCORD_BOT_TOKEN = "YOUR_DISCORD_TOKEN"
GUILD_ID = YOUR_GUILD_ID  # e.g., 123456789012345678
EOF

cat > "$DEST_DIR/utils/signature.py" <<EOF
# utils/signature.py

def get_signature():
    return (
        "\\n— 🤖 **XalorraBot** Asisten AI Komunitas Xalorra"
        "\\n📧 contact@xalorra.com"
        "\\n🌐 https://foundation.xalorra.com"
        "\\n🧠 Powered by Mistral AI"
    )
EOF

cat > "$DEST_DIR/intent_engine.py" <<EOF
# intent_engine.py

def detect_intent(message: str) -> str:
    msg = message.lower()
    if any(keyword in msg for keyword in ["tidak bisa login", "gagal masuk"]):
        return "login"
    elif any(keyword in msg for keyword in ["whitepaper", "dokumen resmi"]):
        return "whitepaper"
    elif any(keyword in msg for keyword in ["harga", "biaya", "paket bisnis"]):
        return "pricing"
    elif any(keyword in msg for keyword in ["kontribusi", "ikut bantu", "developer"]):
        return "contribute"
    else:
        return "default"
EOF

cat > "$DEST_DIR/mistral_engine.py" <<EOF
# mistral_engine.py

async def call_mistral(prompt: str) -> str:
    # Placeholder untuk integrasi Mistral LLM nanti
    return "Maaf, saya belum bisa menjawab secara dinamis sekarang."
EOF

for intent in login whitepaper pricing contribute default; do
cat > "$DEST_DIR/handlers/$intent.py" <<EOF
# handlers/$intent.py
from utils.signature import get_signature

async def handle():
    return "Placeholder response untuk intent '$intent'." + get_signature()
EOF
done

# Revisi untuk isi real
cat > "$DEST_DIR/handlers/login.py" <<EOF
# handlers/login.py
from utils.signature import get_signature

async def handle():
    return "Coba klik lupa password ya di halaman login. Jika masih error, saya bisa bantu buatkan tiket." + get_signature()
EOF

cat > "$DEST_DIR/handlers/whitepaper.py" <<EOF
# handlers/whitepaper.py
from utils.signature import get_signature

async def handle():
    return "Kamu bisa akses whitepaper resmi kami di: https://foundation.xalorra.com/whitepaper" + get_signature()
EOF

cat > "$DEST_DIR/handlers/pricing.py" <<EOF
# handlers/pricing.py
from utils.signature import get_signature

async def handle():
    return "Informasi harga dan paket tersedia di: https://foundation.xalorra.com/pricing" + get_signature()
EOF

cat > "$DEST_DIR/handlers/contribute.py" <<EOF
# handlers/contribute.py
from utils.signature import get_signature

async def handle():
    return "Kamu bisa ikut kontribusi via GitLab kami: https://collab.xalorra.com" + get_signature()
EOF

cat > "$DEST_DIR/handlers/default.py" <<EOF
# handlers/default.py
from utils.signature import get_signature

async def handle():
    return "Saya belum yakin maksud kamu apa. Bisa ulangi dengan lebih spesifik?" + get_signature()
EOF

cat > "$DEST_DIR/main.py" <<EOF
# main.py
import discord
from discord.ext import commands
from config import DISCORD_BOT_TOKEN
from intent_engine import detect_intent
from handlers import login, whitepaper, pricing, contribute, default

intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f"✅ {bot.user} is connected and ready.")

@bot.event
async def on_message(message):
    if message.author.bot:
        return
    if bot.user.mentioned_in(message):
        intent = detect_intent(message.content)
        handler_map = {
            "login": login.handle,
            "whitepaper": whitepaper.handle,
            "pricing": pricing.handle,
            "contribute": contribute.handle,
            "default": default.handle
        }
        handler = handler_map.get(intent, default.handle)
        response = await handler()
        await message.channel.send(response)

bot.run(DISCORD_BOT_TOKEN)
EOF

echo "✅ Struktur bot berhasil dibuat di $DEST_DIR"
echo "🚀 Jalankan bot dengan:"
echo "  cd $DEST_DIR && python3 main.py"
