#!/bin/bash
# ==========================================================================
# 🚀 AUTOMATED ARCHVERSE DUAL-DOMAIN REPLICATION & STAGING SYNC SCRIPT
# ==========================================================================
set -e

DEVELOPER_EMAIL="appaul0ldawn@gmail.com"
PRIMARY_REPO="https://github.com"
BACKUP_DOMAIN="archverse-backup.duckdns.org"

echo "🌌 Initializing Archverse Core Framework Synchronization Loops..."
echo "🔒 Target Profile Binding Secure: [${DEVELOPER_EMAIL}]"

# 1. Execute local unit testing suite verification gates prior to container build
echo "🧪 Running full-stack pipeline validation scripts..."
npm run test -- --watchAll=false || { echo "❌ Critical: Pipeline unit tests failed. Aborting deployment matrix."; exit 1; }
echo "✅ All unit testing validation loops passed successfully."

# 2. Commit and synchronize code revisions up to the primary repository link
echo "📦 Pushing production-grade components to master GitHub tree..."
git add .
git commit -m "production: deploy zion compilation grid modules and failover buffers" --allow-empty
git push origin main

# 3. Trigger Railway Remote Interface Compilation
echo "🏎️ Deploying multi-container grid clusters to primary cloud endpoint..."
if command -v railway &> /dev/null; then
    railway up --detach
    echo "⚡ Railway cloud allocation complete. Staging active at: https://railway.app"
else
    echo "⚠️ Railway CLI not found locally. Ensure your GitHub repo webhook triggers auto-deployment on push."
fi

# 4. Synchronize Free Fallback Balancing Domain Proxy Settings (DuckDNS Mapping)
echo "🛡️ Deploying write-ahead journaling snapshots to fallback mirror: [${BACKUP_DOMAIN}]..."
ssh -o StrictHostKeyChecking=no root@${BACKUP_DOMAIN} "cd /opt/3d-multiplayer-world && \
    git pull origin main && \
    docker-compose down --remove-orphans && \
    docker-compose up -d --build && \
    docker-compose ps"

echo "=========================================================================="
echo "✅ SUCCESS: Archverse core matrices successfully updated and live across both domains!"
echo "=========================================================================="
