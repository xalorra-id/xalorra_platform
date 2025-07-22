#!/bin/bash

DATE=$(date +%F)
BACKUP_DIR="/opt/backup/full_server_$DATE"
mkdir -p $BACKUP_DIR

echo "📁 [$(date)] Backup /etc config..." >> /opt/logs/full_backup.log
rsync -a /etc/ $BACKUP_DIR/etc/

echo "📁 [$(date)] Backup /opt project..." >> /opt/logs/full_backup.log
rsync -a /opt/ $BACKUP_DIR/opt/ --exclude backup --exclude logs --exclude mailcow-dockerized

echo "📁 [$(date)] Backup mailcow-dockerized..." >> /opt/logs/full_backup.log
rsync -a /opt/mailcow-dockerized/ $BACKUP_DIR/mailcow-dockerized/

echo "📁 [$(date)] Backup superset..." >> /opt/logs/full_backup.log
rsync -a /opt/superset/ $BACKUP_DIR/superset/

echo "📁 [$(date)] Backup tensorflow..." >> /opt/logs/full_backup.log
rsync -a /opt/tensorflow/ $BACKUP_DIR/tensorflow/

echo "📁 [$(date)] Backup docker volumes..." >> /opt/logs/full_backup.log
docker volume ls -q | while read vol; do
  mkdir -p $BACKUP_DIR/docker_volumes/$vol
  docker run --rm -v $vol:/volume -v $BACKUP_DIR/docker_volumes/$vol:/backup alpine sh -c "cd /volume && tar cf /backup/$vol.tar ."
done

echo "🗜️ [$(date)] Compressing full backup..." >> /opt/logs/full_backup.log
tar -czf /opt/backup/full_server_$DATE.tar.gz -C /opt/backup full_server_$DATE

echo "🧹 [$(date)] Cleaning up raw files..." >> /opt/logs/full_backup.log
rm -rf $BACKUP_DIR

echo "✅ [$(date)] Full backup complete: /opt/backup/full_server_$DATE.tar.gz" >> /opt/logs/full_backup.log
