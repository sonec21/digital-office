#!/bin/bash
set -e

if [ -z "$1" ]; then
    echo "Usage: $0 <branch-name>"
    echo "Example: $0 fix/leads-e2e"
    exit 1
fi

BRANCH_NAME="$1"
REPO_DIR="/root/.openclaw/workspace/digital-office"

echo "=== Digital Office Preflight Check ==="
cd "$REPO_DIR"

# Run snapshot if available
if [ -f "scripts/snapshot_now.sh" ]; then
    echo "Running snapshot script..."
    bash scripts/snapshot_now.sh
else
    echo "Creating manual snapshot (no snapshot_now.sh found)..."
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    SNAPSHOT_FILE="brain/snapshots/snapshot_${TIMESTAMP}.tar.gz"
    mkdir -p brain/snapshots
    git archive -o "$SNAPSHOT_FILE" HEAD -- . ':!node_modules' ':!.next' 2>/dev/null || \
    tar -czf "$SNAPSHOT_FILE" --exclude='node_modules' --exclude='.next' --exclude='.git' .
    echo "Snapshot saved to: $SNAPSHOT_FILE"
fi

# Get current commit SHA
COMMIT_SHA=$(git rev-parse HEAD)
echo "Current commit: $COMMIT_SHA"

# Write rollback point
mkdir -p brain/reports
cat > brain/reports/rollback_point.md << EOF
# Rollback Point

**Created:** $(date -Iseconds)
**Commit:** $COMMIT_SHA
**Branch:** main

Use this commit to restore if changes go wrong.
Run: \`git reset --hard $COMMIT_SHA\`
EOF

echo "Rollback point written to: brain/reports/rollback_point.md"

# Create and checkout new branch
echo "Creating branch: $BRANCH_NAME"
git checkout -b "$BRANCH_NAME"

echo ""
echo "SAFE TO PROCEED"
echo "Branch: $BRANCH_NAME"
echo "Commit: $COMMIT_SHA"
