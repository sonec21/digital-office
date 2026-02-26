#!/bin/bash
# snapshot_now.sh - Create a snapshot commit with timestamp
# Usage: ./scripts/snapshot_now.sh [note]

set -e

NOTE="${1:-auto-snapshot}"
TIMESTAMP=$(date +%Y-%m-%d_%H%M%S)
COMMIT_MSG="snapshot: $TIMESTAMP $NOTE"

REPO_DIR="/root/.openclaw/workspace/digital-office"

echo "=== Creating snapshot: $COMMIT_MSG ==="

cd "$REPO_DIR"

# Stage all changes
echo "Staging changes..."
git add -A

# Check if there are changes to commit
if git diff --staged --quiet; then
  echo "No changes to snapshot."
  exit 0
fi

# Commit with timestamp
echo "Committing..."
git commit -m "$COMMIT_MSG"

# Push to origin main
echo "Pushing to origin main..."
git push origin main

echo "=== Snapshot complete ==="
echo "Commit: $(git log -1 --oneline)"
