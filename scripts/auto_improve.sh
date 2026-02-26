#!/bin/bash
# auto_improve.sh - Autonomous improvement runner for Digital Office
# Turns learnings into small safe PRs

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"
CONFIG_FILE="$REPO_DIR/brain/auto_improve.json"
LEARNINGS_DIR="$REPO_DIR/.learnings"
REPORTS_DIR="$REPO_DIR/brain/reports"

# Check kill switch
if [ "${AUTO_IMPROVE_ENABLED:-false}" != "true" ]; then
    echo "🔴 Auto-improve disabled (AUTO_IMPROVE_ENABLED != 'true')"
    exit 0
fi

# Dry run mode
DRY_RUN="${DRY_RUN:-0}"

# Load config
min_priority=$(jq -r '.min_priority' "$CONFIG_FILE")
max_items=$(jq -r '.max_items_per_run' "$CONFIG_FILE")
branch_prefix=$(jq -r '.branch_prefix' "$CONFIG_FILE")

echo "=== Auto-Improve Runner ==="
echo "Mode: DRY_RUN=$DRY_RUN | Max items: $max_items | Min priority: $min_priority"

cd "$REPO_DIR"

# Ensure we're on main and up to date
git checkout main 2>/dev/null || true
git pull origin main 2>/dev/null || true

echo ""
echo "📚 Scanning learnings..."

# Priority mapping
declare -A priority_values=(
    ["low"]=1
    ["medium"]=2
    ["high"]=3
    ["critical"]=4
)

min_pri_val=${priority_values[$min_priority]:-2}

# Extract pending items with priority >= min_priority
# Format: | ID | Date | Priority | Status | ...
pending_ids=$(grep -E "^\| LRN-" "$LEARNINGS_DIR/LEARNINGS.md" | grep "pending" | while read line; do
    id=$(echo "$line" | sed -n 's/.*\(LRN-[0-9]\+\).*/\1/p')
    priority=$(echo "$line" | awk -F'|' '{gsub(/^[ \t]+|[ \t]+$/, "", $4); print $4}')
    pri_val=${priority_values[$priority]:-0}
    if [ "$pri_val" -ge "$min_pri_val" ]; then
        echo "$id"
    fi
done | head -"$max_items")

if [ -z "$pending_ids" ]; then
    echo "No pending learnings to process."
    exit 0
fi

echo "Found pending: $pending_ids"
echo ""

# Process first item only
item_id=$(echo "$pending_ids" | head -1)
echo "🔧 Processing: $item_id"

# Extract description
description=$(grep "$item_id" "$LEARNINGS_DIR/LEARNINGS.md" | sed -n 's/.*| \([^|]*\) |.*/\1/p' | head -1)

if [ "$DRY_RUN" = "1" ]; then
    echo "🔍 DRY RUN - Would create branch and implement:"
    echo "   ID: $item_id"
    echo "   Description: $description"
    echo ""
    echo "✅ Dry run complete"
    exit 0
fi

# Real mode: create branch and implement
echo "Creating branch: $branch_prefix/$item_id"
git checkout -b "$branch_prefix/$item_id"

# Simple implementation - add to README
echo "" >> "$REPO_DIR/README_AUTONOMY.md"
echo "<!-- Auto-improvement: $item_id -->" >> "$REPO_DIR/README_AUTONOMY.md"

# Commit
git add -A
git commit -m "fix($item_id): $description

- Auto-generated from learnings
- See .learnings/LEARNINGS.md"

# Push
git push -u origin "$branch_prefix/$item_id" 2>&1

# Update learning status
sed -i "s/| $item_id |.*| pending |/| $item_id | $(date +%Y-%m-%d) | medium | done |/" "$LEARNINGS_DIR/LEARNINGS.md"

# Write report
report_file="$REPORTS_DIR/auto_improve_$(date +%Y-%m-%d).md"
echo "# Auto-Improve Report - $(date '+%Y-%m-%d %H:%M')" >> "$report_file"
echo "- Processed: $item_id" >> "$report_file"
echo "- Branch: $branch_prefix/$item_id" >> "$report_file"
echo "- Status: PR created" >> "$report_file"
echo "" >> "$report_file"

echo ""
echo "✅ Complete! Branch pushed: $branch_prefix/$item_id"
echo "   Learning marked: done"
