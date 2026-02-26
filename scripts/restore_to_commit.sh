#!/bin/bash
# restore_to_commit.sh - Restore digital-office to a specific commit
# Usage: ./scripts/restore_to_commit.sh <commit_hash>

set -e

COMMIT_HASH="$1"

if [ -z "$COMMIT_HASH" ]; then
  echo "Usage: $0 <commit_hash>"
  echo "Example: $0 28275d6"
  exit 1
fi

REPO_DIR="/root/.openclaw/workspace/digital-office"

echo "=== Restoring to commit: $COMMIT_HASH ==="

cd "$REPO_DIR"

# Fetch latest from remote
echo "Fetching latest from origin..."
git fetch --all

# Reset to specific commit
echo "Resetting to commit..."
git reset --hard "$COMMIT_HASH"

# Reinstall dependencies if pnpm-lock exists
if [ -f "pnpm-lock.yaml" ]; then
  echo "Reinstalling dependencies..."
  pnpm install
elif [ -f "package-lock.json" ]; then
  echo "Reinstalling dependencies..."
  npm install
fi

echo "=== Restore complete ==="
echo ""
echo "To restart services, run:"
echo "  cd $REPO_DIR"
echo "  pnpm start  # or npm run start"
echo ""
echo "If using pm2:"
echo "  pm2 restart digital-office"
