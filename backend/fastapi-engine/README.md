# 🤖 XalorraBot

XalorraBot adalah proyek hybrid Discord bot + backend ML yang bisa:
- Menjawab pertanyaan komunitas Xalorra
- Menjalankan training model ML (XGBoost, TensorFlow)
- Mendukung integrasi Supabase, Prisma, dan FastAPI

---

## 🚀 Fitur Utama
- Slash Command: `/train`, `/faq`, `/about`, dll.
- API endpoint FastAPI: `/train/xgboost`
- Akurasi model dikembalikan via JSON response
- Struktur modular & mudah dikembangkan
- Open-source siap kontribusi (CI/CD via GitLab)

---

## 🧪 Contoh Pemanggilan API

```bash
curl -X POST http://localhost:8000/train/xgboost \
  -H "Content-Type: application/json" \
  -d '{"filename": "sample.csv"}'
