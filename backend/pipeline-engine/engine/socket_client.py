# engine/socket_client.py

import socketio

class SocketNotifier:
    def __init__(self, server_url="http://localhost:5000"):
        self.sio = socketio.Client()
        try:
            self.sio.connect(server_url)
            print("🔌 Connected to Socket.IO server")
        except Exception as e:
            print(f"⚠️ Failed to connect to Socket.IO server: {e}")

    def emit(self, event, data):
        try:
            self.sio.emit(event, data)
        except Exception as e:
            print(f"⚠️ Emit failed: {e}")
