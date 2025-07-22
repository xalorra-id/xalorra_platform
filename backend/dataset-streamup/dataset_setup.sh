#!/bin/bash

echo "🚀 [Xalorra] Dataset Engine Setup Started"

# === Buat virtualenv jika belum ada ===
if [ ! -d "venv" ]; then
  echo "📦 Membuat virtual environment..."
  python3 -m venv venv
else
  echo "📦 Virtual environment sudah ada, lewati..."
fi

# === Aktifkan venv ===
source venv/bin/activate

# === Install requirements ===
echo "📦 Menginstall dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# === Buat .env jika belum ada ===
if [ ! -f ".env" ]; then
  echo "📝 Membuat file .env default..."
  cat <<EOF > .env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-key
EOF
else
  echo "📝 File .env sudah ada, lewati..."
fi

# === Buat folder uploads jika belum ada ===
if [ ! -d "/uploads" ]; then
  echo "📁 Membuat direktori /uploads"
  sudo mkdir -p /uploads
  sudo chmod 777 /uploads
else
  echo "📁 /uploads sudah ada, lewati..."
fi

# === Jalankan engine ===
echo "🚀 Menjalankan Dataset Management Engine..."
python main.py
