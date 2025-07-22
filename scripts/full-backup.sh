#!/bin/bash

# Nama file dengan timestamp
BACKUP_NAME="xalorra-full-backup-$(date +%Y%m%d-%H%M).tar.gz"

# Folder tujuan backup
DEST="/opt/xalorra-backup"

# Folder yang ingin dibackup
TARGETS="/opt/xalorra /opt/xalorra-admin /opt/xalorra-studio /opt/xalorra-core /opt/xalorra-backend"

# Buat backup
tar -czf "$DEST/$BACKUP_NAME" $TARGETS

# Hapus backup yang lebih dari 7 hari
find "$DEST" -name "*.tar.gz" -type f -mtime +7 -delete
