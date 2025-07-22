# dashboard/socket_server.py
import socketio

sio = socketio.AsyncServer(async_mode='asgi')
app = socketio.ASGIApp(sio)

@sio.event
async def connect(sid, environ):
    print(f"⚡ Client connected: {sid}")

@sio.event
async def task_status(sid, data):
    print(f"📥 Received: {data}")
    await sio.emit("status_update", data)

@sio.event
async def disconnect(sid):
    print(f"❌ Client disconnected: {sid}")
