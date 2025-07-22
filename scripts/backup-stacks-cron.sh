#!/bin/bash

# Direktori tujuan backup
backup_dir="/opt/xalorra-backup"
timestamp=$(date +%Y%m%d-%H%M)

echo "🔄 [$(date)] Memulai backup ke $backup_dir"

# Pastikan direktori backup ada
mkdir -p $backup_dir

# Backup masing-masing stack
tar -czf $backup_dir/xalorra-studio-2.14.5-$timestamp.tar.gz /opt/xalorra-studio-2.14.5
tar -czf $backup_dir/xalorra-admin-$timestamp.tar.gz /opt/xalorra-admin
tar -czf $backup_dir/xalorra-backend-$timestamp.tar.gz /opt/xalorra-backend
tar -czf $backup_dir/xalorra-models-$timestamp.tar.gz /opt/xalorra-models
tar -czf $backup_dir/airflow-$timestamp.tar.gz /opt/airflow
tar -czf $backup_dir/minio-data-$timestamp.tar.gz /opt/minio-data
tar -czf $backup_dir/mailcow-backup-$timestamp.tar.gz /opt/mailcow-backup

# Backup direktori tambahan
for dir in xalorra-core xalorra-middleware xalorra-automl xalorra-datasets; do
  if [ -d /opt/$dir ]; then
    tar -czf $backup_dir/${dir}-$timestamp.tar.gz /opt/$dir
  fi
done

echo "✅ [$(date)] Backup selesai."
