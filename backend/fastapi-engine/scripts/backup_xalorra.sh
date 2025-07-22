#!/bin/bash

# === CONFIGURABLE ===
SRC_DIR="/opt/xalorra-discord"
BACKUP_DIR="/opt/xalorra-core-backup"
TIMESTAMP=$(date +%Y%m%d_%H%M)

# === FOLDER SETUP ===
mkdir -p "$BACKUP_DIR/heavy"
mkdir -p "$BACKUP_DIR/light"

# === HEAVY BACKUP ===
echo "📦 Membuat heavy backup..."
sudo tar -czvf "$BACKUP_DIR/heavy/xalorra-core-heavy-$TIMESTAMP.tar.gz" "$SRC_DIR"

# === LIGHT BACKUP ===
echo "📦 Membuat light backup (exclude cache, venv, logs)..."
sudo tar -czvf "$BACKUP_DIR/light/xalorra-core-light-$TIMESTAMP.tar.gz" \
  --exclude='*/__pycache__' \
  --exclude='*/venv' \
  --exclude='*/.venv' \
  --exclude='*/node_modules' \
  --exclude='*.log' \
  --exclude='*.tar.gz' \
  "$SRC_DIR"

# === DONE ===
echo "✅ Backup selesai!"
ls -lh "$BACKUP_DIR"/{light,heavy}/xalorra-core-*-$TIMESTAMP.tar.gz
