# Xalorra Dataset Management Engine

Modul internal untuk mengelola dataset CSV secara modular dan aman, dibangun di atas Xalorra Internal API tanpa framework eksternal.

## ✨ Fitur
- Upload, list, view, dan delete dataset
- File disimpan di `/uploads/`
- Metadata disimpan di Supabase OSS
- Proteksi JWT internal (tanpa FastAPI)
- Logging ke `logs/datasets.log`

## 🔧 Struktur Direktori
- `routes/` - Routing endpoint dataset
- `middlewares/` - Middleware JWT Auth
- `utils/` - Utilitas penyimpanan dan logging
- `db/` - Koneksi Supabase OSS
- `core/` - Sistem routing dan response internal

## 🔐 ENV
Buat file `.env` dan isi:
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-key
