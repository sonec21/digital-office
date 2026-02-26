#!/bin/bash
set -e

echo "=== Digital Office Rollback ==="
cd /root/.openclaw/workspace/digital-office

echo "Fetching latest tags..."
git fetch --all --tags

echo "Checking out main..."
git checkout main

echo "Resetting to prod-stable..."
git reset --hard prod-stable

if [ ! -d "node_modules" ]; then
    echo "node_modules missing, running pnpm install..."
    pnpm install
fi

echo "Cleaning build cache..."
rm -rf .next

echo "Building production..."
pnpm build

echo "Starting server on port 3000..."
pkill -f "next-server" 2>/dev/null || true

cd /root/.openclaw/workspace/digital-office
PORT=3000 nohup pnpm start > logs/rollback.log 2>&1 &
sleep 3

echo "Verifying..."
if curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/office | grep -q "200"; then
    echo "✅ Rollback successful - /office returns 200"
    exit 0
else
    echo "❌ Rollback failed - /office not responding"
    exit 1
fi
