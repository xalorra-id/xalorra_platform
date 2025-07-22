# ✅ TODO - Xalorra Internal API (CLI & Core Tasks)

Dokumen ini berisi daftar tugas dan milestone untuk mengembangkan CLI internal `xalorra`, sistem orchestrator, dan integrasi database.

---

## 📌 Prioritas CLI Commands

### 1. `xalorra runserver`
- [x] Jalankan ASGI server di port 8001
- [x] Reload otomatis saat development (`reload=True`)
- [ ] Tambahkan opsi `--port`, `--reload` (opsional)
- [ ] Tambahkan banner dan versi saat startup

### 2. `xalorra train`
- [ ] Jalankan proses training model secara manual dari CLI
- [ ] Integrasi dengan `@task`, `@flow` dari orchestrator internal
- [ ] Simpan metadata hasil training ke DB
- [ ] Tampilkan hasil evaluasi di CLI (accuracy, loss, dll)
- [ ] Tambahkan opsi: `--dataset`, `--model`, `--output`, `--metric`

### 3. `xalorra routes`
- [x] Tampilkan semua route terdaftar dari `routing.py`
- [ ] Format tabel CLI agar rapi (pakai tabulate / custom print)
- [ ] Tambahkan opsi `--json` atau `--tree`

---

## 🔁 CLI Tambahan (Upcoming)

### 4. `xalorra predict`
- [ ] Kirim data input langsung dari CLI ke endpoint prediksi
- [ ] Parsing input JSON dari file atau stdin
- [ ] Tampilkan hasil prediksi + waktu respons

### 5. `xalorra pipelines`
- [ ] Tampilkan pipeline aktif dan statusnya
- [ ] Eksekusi flow manual: `xalorra pipelines run <name>`
- [ ] Monitoring pipeline via log atau WebSocket

---

## 🗃️ Integrasi Database

- [ ] Gunakan SQLite / PostgreSQL untuk metadata model
- [ ] Skema awal:
  - `models` (id, name, path, created_at)
  - `predictions` (id, model_id, input, result, timestamp)
  - `logs` (id, type, message, timestamp)
- [ ] ORM ringan / custom SQL
- [ ] CRUD via internal route (opsional)
- [ ] Backup otomatis log ke DB setiap interval (opsi daemon)

---

## 📊 Rencana Visualisasi (future)

- [ ] Jalur ke dashboard frontend (Next.js)
- [ ] Socket.IO integration (Web UI feedback realtime)
- [ ] Tampilkan hasil training dan prediksi sebagai chart

---

## 🧠 Catatan Tambahan

- Semua fitur CLI harus bisa dipanggil tanpa restart server
- Kompatibel dengan Uvicorn ASGI native
- Internal middleware tetap aktif saat training/prediksi
- CLI bisa dijalankan dari mana saja (`~/.local/bin/xalorra`)
- Format log tetap JSON-compatible untuk extensibility

---

## 🗓️ Target Milestone

| Fitur                   | Status  | Estimasi |
|------------------------|---------|----------|
| `xalorra runserver`    | ✅ Done  | ✅        |
| `xalorra train`        | 🔧 Work | 2-3 hari |
| `xalorra routes`       | 🟡 Draft | 1 hari   |
| DB Integrasi Metadata  | 🔲 Todo | 3 hari   |
| Orchestrator DSL       | 🔲 Todo | 5 hari   |

---

> Disusun oleh: **Xalorra Core Team**  
> Kontak: [contact@xalorra.com](mailto:contact@xalorra.com)
