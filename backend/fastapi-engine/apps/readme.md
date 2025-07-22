source venv/bin/activate
python manage.py runserver 0.0.0.0:8888
curl -H "Host: tenant1.103.164.54.246.nip.io" http://localhost:8888/workspaces/
# → Muncul 1 data: "Xalorra Test"
curl -H "Host: tenant2.103.164.54.246.nip.io" http://localhost:8888/workspaces/
# → Kosong []
# prefensi model apps/core/models
uploads/datasets/public/namafile.csv      # kalau tenant schema = public
uploads/datasets/client_a/namafile.csv    # kalau tenant schema = client_a
sudo systemctl restart xalorra-api.service