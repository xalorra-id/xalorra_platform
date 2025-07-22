🔥 Xalorra Internal API v0.3


## 📄 `docs.md` – Xalorra Internal API

---

# 📘 Xalorra Internal API – Dokumentasi Teknis

Versi: `v0.3`
Tanggal: `2025-07-20`
Status: ✅ Stable – Logging + Predict + Auth

---

## 🧱 Arsitektur

* ✅ Dibangun tanpa framework eksternal (pure ASGI)
* ✅ Modular: `routing`, `request`, `response`, `middleware`, `cli`
* ✅ Dukungan:

  * JWT Authentication
  * Dynamic routing (`/predict/{model}`)
  * Body parser `req.json()`
  * JSON response
  * Logging ke file

---

## 📂 Struktur Proyek

```
/opt/API_engine/
├── main.py
├── xalorra/
│   ├── cli.py
│   ├── request.py
│   ├── response.py
│   ├── routing.py
│   ├── middleware.py
│   ├── jwt_utils.py
│   └── utils/
│       ├── __init__.py
│       └── logger.py
├── logs/
│   └── predictions.log
└── .env
```

---

## 🔐 Autentikasi

### Header:

```http
Authorization: Bearer <token>
```

### Struktur payload:

```json
{
  "user_id": "jek",
  "role": "admin",
  "tenant": "tenant1"
}
```

### Generate token:

```python
from xalorra.jwt_utils import encode_token

print("Bearer", encode_token({
    "user_id": "jek",
    "role": "admin",
    "tenant": "tenant1"
}))
```

---

## 🧠 Routing

### GET `/`

Cek apakah API berjalan.

```bash
curl http://localhost:8001/
```

---

### GET `/whoami`

Validasi token dan mengembalikan `user_id`.

```bash
curl http://localhost:8001/whoami -H "Authorization: $AUTH_TOKEN"
```

---

### POST `/echo`

Balikkan isi body JSON.

```bash
curl -X POST http://localhost:8001/echo \
  -H "Content-Type: application/json" \
  -H "Authorization: $AUTH_TOKEN" \
  -d '{"hello": "xalorra"}'
```

---

### POST `/predict/{model}`

Prediksi dummy dari array angka (jumlahkan).

```bash
curl -X POST http://localhost:8001/predict/xgb-v2 \
  -H "Content-Type: application/json" \
  -H "Authorization: $AUTH_TOKEN" \
  -d '{"features": [1, 2, 3]}'
```

### Response:

```json
{
  "model": "xgb-v2",
  "input": [1, 2, 3],
  "prediction": 6
}
```

---

## ⏺ Logging Prediksi

Semua prediksi disimpan ke:

```
/opt/API_engine/logs/predictions.log
```

### Format log:

```
[2025-07-20T14:21:11.768594] model=xgb-v2 input=[1, 2, 3] prediction=6
```

---

## ⚙️ ENV

`.env`:

```env
SECRET_KEY=super-rahasia-xalorra
JWT_ALGORITHM=HS256
AUTH_TOKEN=Bearer eyJ...
```

---

## 🖥️ Menjalankan API

```bash
source venv/bin/activate
python main.py
```

---

## 🚀 Rencana Selanjutnya (v0.4+)

* 📡 WebSocket realtime notifikasi prediksi
* 🧪 Testing suite internal
* 📊 Dashboard frontend Next.js
* 🧠 Training orchestrator
* 🗃️ Penyimpanan DB (SQLite/Postgres)
* 🔁 CLI `xalorra train`, `xalorra routes`, `xalorra logs`

---

