# 📦 CHANGELOG - Xalorra Internal API

Proyek ini adalah fondasi API internal Xalorra, sebuah sistem backend modular berbasis Python ASGI, tanpa framework eksternal (seperti FastAPI). Tujuan utama adalah membangun CLI, training orchestrator, WebSocket, dan lifecycle ML yang bisa dipanggil secara lokal maupun di server produksi.

---

## [v0.1.0] - 2025-07-20

### ✨ Fitur Baru
- CLI command `xalorra logs --tail` untuk stream log prediksi (`predictions.log`)
- CLI command `xalorra runserver` untuk menjalankan ASGI server internal (port 8001)
- CLI setup global via `setup.py` dan `pyproject.toml`
- Routing internal tanpa FastAPI (`routing.py`, `Request`, `Response`)
- Middleware internal terpasang (pipeline `apply_middlewares`)
- WebSocket `/ws/predict-stream` untuk broadcast isi log prediksi
- Client test WebSocket (`test_ws.py`) dengan prompt interaktif
- Modularisasi struktur proyek (xalorra/)

---

### ✅ Pencapaian
- CLI sudah bisa dijalankan dari mana saja (`xalorra`)
- Server sudah support ASGI request dan WebSocket sekaligus
- Tidak bergantung framework eksternal (Pure Python ASGI)
- Sistem log `logs/predictions.log` aktif otomatis setelah training
- Struktur project stabil dan siap dikembangkan lebih lanjut

---

### 🧱 Struktur CLI (aktif)
- `xalorra runserver` → Jalankan ASGI internal server
- `xalorra logs --tail` → Lihat prediksi secara realtime

---

### 🧠 Catatan Developer
- Server tidak menggunakan lifespan, karena lifecycle dikontrol manual
- Semua handler async, dengan pemrosesan sendiri per path
- Logging dikontrol dari stdout dan file
- Port default: 8001
- WebSocket hanya `/ws/predict-stream` (broadcast isi log training)

---

## 🔜 Roadmap Selanjutnya (v0.2.0)

- [ ] CLI `xalorra train` → Jalankan training model (XGBoost, internal orchestrator)
- [ ] CLI `xalorra routes` → Daftar seluruh endpoint internal
- [ ] Integrasi database SQLite/PostgreSQL untuk simpan metadata model/prediksi
- [ ] Integrasi `@task`, `@flow`, dan visualisasi pipeline
- [ ] Simulasi pipeline interaktif dari CLI + Web UI

---

> Dibuat oleh: **Randhika & GPT Collab**  
> Lokasi: `/opt/API_engine`  
> Lisensi: IP milik resmi Xalorra Project  
> Tanggal: 20 Juli 2025
