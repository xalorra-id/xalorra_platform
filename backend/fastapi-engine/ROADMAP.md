Sistem AI hybrid yang menggabungkan Bot Discord, backend FastAPI untuk training ML, dan integrasi Supabase serta Django multi-tenant (schema-based).
Roadmap ini menjadi panduan pengembangan asisten AI modular berbasis Python + TypeScript.

✅ v0.1.0 - Setup Fondasi (10 Juli 2025)
 Endpoint FastAPI /api/train/xgboost aktif

 Logika training dengan XGBoost + input file CSV

 Struktur proyek modular: apps/api, apps/bot, uploads/, apps/datasets/

 Push pertama ke GitLab internal (collab.xalorra.com)

 Pengujian cURL sukses end-to-end

✅ v0.2.0 - Backend Multi-Tenant Isolated (11 Juli 2025)
 Instalasi django-tenants sukses

 Model Client, Domain, dan middleware domain dinamis

 Migrasi schema tenant tenant1 dan tenant2 berhasil

 Endpoint GET /workspaces/ menampilkan data spesifik per tenant

 Validasi isolasi schema: tenant2 tidak bisa baca data tenant1

 Endpoint diuji via curl dengan Host header

🚧 v0.2.2 - Dataset per Tenant
 Tambah model Dataset per tenant (core/models.py)

 Endpoint /datasets/ untuk upload dan list file CSV per schema

 Validasi tenant dari domain (Host header) tetap aktif

🚧 v0.2.3 - Training per Tenant
 Endpoint training /train/xgboost dipisah per schema (misalnya: tenant1 → hasilnya tidak bocor)

 Return akurasi dan simpan ke DB per tenant

 Tambahkan parameter user/org jika tersedia dari bot

🚧 v0.2.4 - Bot Discord + Metadata Logging
 Implementasi command slash /train di bot Discord

 Bot kirim request ke API dan membalas hasil akurasi

 Tambahkan model TrainingLog di Supabase:

id, user_id, workspace_id, model, accuracy, filename, created_at

 Bot mencatat user Discord → user DB → organisasi (jika ada)

🧪 v0.3.0 - Prediksi & Sistem Feedback
 Endpoint baru /predict untuk file CSV

 Bot Discord bisa mengirim file CSV dan mendapat prediksi

 Simpan semua upload ke /uploads/ dan metadata ke DB

 Buat tabel feedback: question, language, timestamp

 Bot perintah /feedback → fallback ketika tidak ada jawaban cocok

🌐 v0.4.0 - UI Web Dasar
 Struktur apps/web menggunakan Next.js + Tailwind (✅ sudah dimulai)

 Halaman upload file dan training UI (fetch ke FastAPI)

 Menampilkan hasil training dan history per tenant

⚙️ v0.5.0 - CI/CD & Deployment
 Setup GitLab CI/CD: lint, test, deploy (web + api + bot)

 Buat docker-compose.yml untuk local development

 Rencana auto-deploy ke Kubernetes (RKE2) dengan Namespace per tenant (jika perlu)

🧠 v0.6.0 - Integrasi LLM + RAG Hybrid
 Tambahkan fallback ke GPT/Mistral jika pertanyaan tidak cocok (RAG)

 Gunakan knowledge base modular: FAQ → fallback ke LLM

 Lacak pertanyaan tidak terjawab untuk meningkatkan knowledge base

📅 Visi Jangka Panjang (Q4 2025 – 2026)
Sistem organisasi (multi-org): setiap user dan workspace terisolasi

UI visual pipeline training ML (drag-and-drop di web)

Kombinasi Tabular ML dan LLM dalam satu interface

Sistem plugin untuk pelatihan model & bot modular

Kontributor onboarding system + Hacktoberfest siap

🧑‍💻 Cara Berkontribusi
Fork atau clone repositori, cek issues/, mulai dari apps/api/routers atau apps/bot/handlers

Gabung komunitas: Discord | GitLab

