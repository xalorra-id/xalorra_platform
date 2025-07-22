#!/bin/bash

# Waktu saat ini (format: YYYYMMDD)
DATE=$(date +%Y%m%d)

# Nama folder sumber
SOURCE="/opt/xalorra-supastarter-2"

# Folder tujuan backup
DEST="/opt/xalorra-backup"

# Nama file backup
BACKUP_NAME="xalorra-supastarter-2-$DATE.zip"

# Eksekusi backup
zip -r "$DEST/$BACKUP_NAME" "$SOURCE"

# (Opsional) Hapus backup lebih dari 7 hari
find "$DEST" -name "xalorra-supastarter-2-*.zip" -type f -mtime +7 -exec rm {} \;
