#!/bin/bash

# ===================================
# Xalorra Light Backup Script
# ===================================
set -e

BACKUP_NAME="xalorra_backup_light_$(date +%Y%m%d_%H%M%S).tar.gz"
TARGET_DIR="/opt/xalorra_platform"
OUTPUT_PATH="/opt/$BACKUP_NAME"
IGNORE_FILE="$TARGET_DIR/.backupignore"

echo "📦 Membuat backup ringan Xalorra ke: $OUTPUT_PATH"
tar -czvf "$OUTPUT_PATH" --exclude-from="$IGNORE_FILE" -C "$TARGET_DIR" .

echo "✅ Backup selesai: $OUTPUT_PATH"
