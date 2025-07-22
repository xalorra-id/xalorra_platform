#!/bin/bash
# File: /opt/scripts/xalorra-harden.sh
# Deskripsi: Hardening dasar sistem & setup audit

echo "🔐 Mulai hardening dasar..."

# 1. Nonaktifkan core dump
echo '* hard core 0' >> /etc/security/limits.conf
systemctl mask systemd-coredump

# 2. Pasang auditd
apt update && apt install -y auditd
auditctl -w /tmp
