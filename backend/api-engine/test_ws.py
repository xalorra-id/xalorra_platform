# test_ws.py

import asyncio
import websockets
import json
import re
import os
from dotenv import load_dotenv

load_dotenv()

HOST = os.getenv("WS_HOST", "localhost")
PORT = os.getenv("WS_PORT", "8003")
URI_PATH = os.getenv("WS_PATH", "/ws/predict-stream")

async def run():
    uri = f"ws://{HOST}:{PORT}{URI_PATH}"
    print(f"🔌 Connecting to {uri} ...")
    
    async with websockets.connect(uri) as ws:
        print("✅ Connected to WebSocket")
        while True:
            model = input("🧠 Masukkan nama model (contoh: xgb-v2, atau kosong untuk keluar): ").strip()
            if not model:
                break

            data_input = input("📊 Masukkan input data (contoh: 4 2): ").strip()
            try:
                # Mendukung input seperti: 4 2, 4,2, atau 4, 2
                features = list(map(float, re.split(r"[,\s]+", data_input)))
            except Exception:
                print("⚠️ Format input tidak valid. Gunakan angka, dipisah spasi atau koma.")
                continue

            payload = {"model": model, "input": features}
            await ws.send(json.dumps(payload))
            print(f"📤 Dikirim: {payload}")

            try:
                response = await asyncio.wait_for(ws.recv(), timeout=5)
                print(f"📥 Diterima: {response}")
            except asyncio.TimeoutError:
                print("⏱️ Timeout menunggu respons dari server.")
            except websockets.exceptions.ConnectionClosed:
                print("❌ Koneksi terputus oleh server.")
                break

if __name__ == "__main__":
    asyncio.run(run())
