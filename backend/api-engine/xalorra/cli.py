import uvicorn
import argparse
import os
import time
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configurable via .env
LOG_PATH = os.getenv("LOG_PATH", "/opt/API_engine/logs/predictions.log")
SERVER_PORT = int(os.getenv("PORT", "8001"))

def tail_log():
    print("📡 Streaming predictions.log (press Ctrl+C to exit)...")
    with open(LOG_PATH, "r") as f:
        f.seek(0, os.SEEK_END)  # Mulai dari akhir file
        while True:
            line = f.readline()
            if not line:
                time.sleep(0.5)
                continue
            print("[LOG]", line.strip())

def run():
    print(f"🚀 Starting server on port {SERVER_PORT}")
    uvicorn.run("xalorra.server:app", host="0.0.0.0", port=SERVER_PORT, reload=True)

def main():
    parser = argparse.ArgumentParser(prog="xalorra")
    subparsers = parser.add_subparsers(dest="command")

    # logs
    logs_parser = subparsers.add_parser("logs", help="Lihat log prediksi")
    logs_parser.add_argument("--tail", action="store_true", help="Tampilkan log realtime")

    # runserver
    subparsers.add_parser("runserver", help="Jalankan API server")

    args = parser.parse_args()

    if args.command == "logs":
        if args.tail:
            tail_log()
        else:
            print("📄 Log file:", LOG_PATH)
            try:
                with open(LOG_PATH) as f:
                    print(f.read())
            except FileNotFoundError:
                print("❌ Log file tidak ditemukan:", LOG_PATH)

    elif args.command == "runserver":
        run()

    else:
        parser.print_help()

if __name__ == "__main__":
    main()
