#!/bin/bash
# auto_improve.sh - Autonomous improvement runner for Digital Office
# Runs on schedule to turn learnings into fixes + PRs

set -e

CONFIG_FILE="/root/.openclaw/workspace/digital-office/brain/auto_improve.json"
LEARNINGS_DIR="$HOME/.openclaw/workspace/.learnings"
REPO_DIR="/root/.openclaw/workspace/digital-office"

# Load config
enabled=$(jq -r '.enabled' "$CONFIG_FILE")
interval=$(jq -r '.interval_minutes' "$CONFIG_FILE")
max_items=$(jq -r '.max_items_per_run' "$CONFIG_FILE")
min_priority=$(jq -r '.min_priority' "$CONFIG_FILE")
branch_prefix=$(jq -r '.branch_prefix' "$CONFIG_FILE")
kill_switch=$(jq -r '.kill_switch_env' "$CONFIG_FILE")

# Check kill switch
if [ "${!kill_switch}" != "true" ]; then
    echo "🔴 Auto-improve disabled (AUTO_IMPROVE_ENABLED != 'true')"
    exit 0
fi

echo "=== Auto-Improve Runner ==="
echo "Interval: ${interval}min | Max items: ${max_items} | Min priority: ${min_priority}"

cd "$REPO_DIR"

# Ensure we're on main and up to date
git checkout main 2>/dev/null || true
git pull origin main 2>/dev/null || true

# Read learnings and find pending items
echo ""
echo "📚 Scanning learnings..."

# Extract pending items with priority >= min_priority
pending_items=$(grep -E "^\| LRN-.*\| pending" "$LEARNINGS_DIR/LEARNINGS.md" 2>/dev/null | head -"$max_items" || true)

if [ -z "$pending_items" ]; then
    echo "No pending learnings to process."
    exit 0
fi

echo "Found pending items:"
echo "$pending_items"
echo ""

# Process each item
echo "🔧 Processing improvements..."

# For demo, just show what would be done
item_count=$(echo "$pending_items" | grep -c "pending" || echo "0")
echo "Would process $item_count items"

# In real mode, this would:
# 1. Create branch auto/fix/<LRN-ID>
# 2. Make the code changes
# 3. Commit with reference to LRN-ID
# 4. Push and create PR

echo ""
echo "✅ Run complete"
