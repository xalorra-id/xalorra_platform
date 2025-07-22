Test pipeline
PYTHONPATH=. pytest tests/

make test     # Jalankan semua test pytest
make run      # Jalankan main.py
make lint     # Jalankan ruff linting (optional)
make clean    # Bersihkan file __pycache__ dan *.pyc
 # memaksimalkan socket.io
 Next Suggestion
Jika ingin memaksimalkan fitur ini, kamu bisa lanjut ke:

Logging Real-time di Frontend Dashboard (tampilkan event dari Socket.IO di UI)

Penambahan Pipeline Visualizer (misalnya tabel progress / tree view)

Multiple Client Socket Support untuk monitor dari banyak user

Fallback ke log file jika Socket.IO tidak bisa diakses (mode offline)

hello_decorated sekarang sudah:

✅ Teregistrasi dengan @flow

✅ Menjalankan @task berurutan

✅ Mengirim status ke Socket.IO

✅ Menyimpan state ke .json

✅ Dijalankan via make run 💻

