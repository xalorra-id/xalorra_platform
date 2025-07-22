sudo systemctl restart xalorra-api     # restart kalau ada perubahan
sudo systemctl restart xalorra-api.service
sudo journalctl -u xalorra-api -e      # lihat log terakhir
# log
# sudo journalctl -u xalorra-api.service -f
source /opt/xalorra-discord/venv/bin/activate
