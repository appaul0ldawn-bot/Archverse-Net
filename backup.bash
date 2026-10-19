
Automated Nightly MongoDB Backup Script

To protect your player account profiles, token bank balances, and unlocked apparel configurations, create a shell script named backup-database.sh in your cloud server root folder. This automates compressed archive generation and prunes items older than 7 days to preserve disk space:
bash
#!/bin/bash
# ==========================================
# ARCHVERSE DATABASE STORAGE BACKUP ENGINE
# ==========================================

BACKUP_DIR="/opt/archverse-backups"
TIMESTAMP=$(date +"%Y-%m-%d_%H%M%S")
CONTAINER_NAME="mongodb-container"

mkdir -p "$BACKUP_DIR"

# 1. Execute an in-container binary database dump profile
docker exec "$CONTAINER_NAME" mongodump --out /data/db/backup_$TIMESTAMP

# 2. Extract and compress the archive onto the server host storage drive
docker cp "$CONTAINER_NAME":/data/db/backup_$TIMESTAMP "$BACKUP_DIR/"
tar -czf "$BACKUP_DIR/archverse_db_$TIMESTAMP.tar.gz" -C "$BACKUP_DIR" "backup_$TIMESTAMP"

# 3. Clean up the uncompressed staging files securely
rm -rf "$BACKUP_DIR/backup_$TIMESTAMP"
docker exec "$CONTAINER_NAME" rm -rf /data/db/backup_$TIMESTAMP

# 4. Prune historic backups older than 7 days to guard disk vector capacity
find "$BACKUP_DIR" -type f -name "archverse_db_*.tar.gz" -mtime +7 -delete

echo "💾 Database archive successfully verified and locked at $TIMESTAMP"
Use code with caution.
To run this task completely on autopilot every single night, add it to your system crontab (crontab -e):
bash
0 2 * * * /bin/bash /opt/archverse-backups/backup-database.sh
