
# 🔧 Xalorra API Engine (Internal API)

Xalorra API Engine adalah core backend internal berbasis ASGI (tanpa framework eksternal seperti FastAPI) yang melayani prediksi model ML dan log streaming melalui WebSocket. Proyek ini dibangun sebagai fondasi internal yang ringan, modular, dan fleksibel untuk kebutuhan real-time ML orchestration.

---

## 🚀 Fitur Utama

- ✅ API prediksi model ML (via HTTP POST)
- ✅ WebSocket log streaming real-time
- ✅ CLI command: `xalorra runserver`, `xalorra logs`, dll
- ✅ Modular routing, middleware, dan request parsing
- ✅ Tanpa ketergantungan framework (murni ASGI)
- 📡 Support WebSocket handler untuk observasi prediksi
- 📄 Logging ke file `logs/predictions.log`

---

## 📁 Struktur Proyek

```

API\_engine/
├── xalorra/
│   ├── cli.py             # CLI utama (xalorra runserver/logs/...)
│   ├── server.py          # ASGI app (entrypoint uvicorn)
│   ├── routing.py         # Routing custom
│   ├── request.py         # Request wrapper
│   ├── response.py        # Response wrapper
│   ├── middleware.py      # Middleware support
│   ├── websocket.py       # WebSocket log stream handler
├── logs/
│   └── predictions.log    # File log prediksi
├── test\_ws.py             # Script client WebSocket
├── setup.py
├── pyproject.toml
├── README.md              

````

---

## 🛠️ Instalasi

1. Clone repo ini ke dalam server atau folder kerja kamu:
   ```bash
   git clone <repo-url> /opt/API_engine
   cd /opt/API_engine
````

2. Install environment:

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -e .
   ```

---

## ⚙️ CLI Xalorra

Setelah diinstall, kamu bisa menjalankan CLI dengan:

```bash
xalorra runserver       # Menjalankan API di port 8001
xalorra logs --tail     # Melihat log prediksi realtime
```

Jika belum bisa diakses, tambahkan `~/.local/bin` ke `$PATH`.

---

## 🌐 API Prediksi

Endpoint HTTP untuk melakukan prediksi:

```http
POST /predict/<model_name>
```

### Contoh:

```bash
curl -X POST http://localhost:8001/predict/xgb-v2 \
  -H "Content-Type: application/json" \
  -d '{"features": [9, 1]}'
```

Respon:

```json
{
  "model": "xgb-v2",
  "input": [9, 1],
  "prediction": 10
}
```

---

## 🔌 WebSocket Streaming

Koneksi WebSocket ke endpoint:

```
ws://localhost:8001/ws/predict-stream
```

### Contoh Script (test\_ws.py)

```python
import asyncio
import websockets

async def run():
    uri = "ws://localhost:8001/ws/predict-stream"
    async with websockets.connect(uri) as ws:
        print("✅ Connected to WebSocket")
        while True:
            msg = await ws.recv()
            print("[RECV]", msg)

asyncio.run(run())
```

---

## 🧪 Status Saat Ini

* ✅ API internal modular berjalan
* ✅ Bisa diakses tanpa FastAPI
* ✅ CLI dan WebSocket berfungsi baik
* ⏳ Belum terintegrasi database (sementara pakai `predictions.log`)
* 🔜 Akan dikembangkan: `@task`, `@flow`, AutoML orchestrator, dashboard

---

## 📜 License

Hak cipta kode API Engine ini dimiliki oleh **Xalorra Foundation**.
Lisensi khusus digunakan untuk internal proyek Xalorra dan afiliasinya.

Lisensi: **Proprietary – Internal Use Only**

---

## 👨‍💻 Kontribusi

Proyek ini belum dibuka untuk kontribusi publik. Namun kamu bisa fork, pelajari, atau adaptasi untuk riset internal. Silakan hubungi:
📬 **[contact@xalorra.com](mailto:contact@xalorra.com)**

---

## 🧠 Tentang Xalorra

Xalorra adalah platform AI terbuka untuk membangun alur kerja ML dan Generative AI dengan pendekatan komunitas dan open-source.

> **"Empowering Open AI Workflows for Everyone."**

