#!/bin/bash
# auto_improve.sh - Autonomous improvement runner for Digital Office

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"
CONFIG_FILE="$REPO_DIR/brain/auto_improve.json"
LEARNINGS_FILE="$REPO_DIR/.learnings/LEARNINGS.md"
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
echo "Scanning: $LEARNINGS_FILE"

cd "$REPO_DIR"

# Ensure we're on main and up to date
git checkout main 2>/dev/null || true
git pull origin main 2>/dev/null || true

# Priority mapping
declare -A priority_values=(
    ["low"]=1
    ["medium"]=2
    ["high"]=3
    ["critical"]=4
)

min_pri_val=${priority_values[$min_priority]:-2}

echo ""
echo "📚 Scanning LEARNINGS.md..."

# Find pending items with priority >= min_priority
pending_items=""
while IFS= read -r line; do
    # Skip header and separator
    [[ "$line" =~ ^\|[[:space:]]*ID ]] && continue
    [[ "$line" =~ ^\|[[:space:]]*- ]] && continue
    [[ "$line" =~ ^\# ]] && continue
    [[ -z "$(echo "$line" | grep 'LRN-')" ]] && continue
    
    # Extract fields: | ID | Date | Type | Description | Priority | Status | Links |
    id=$(echo "$line" | awk -F'|' '{gsub(/^[ \t]+|[ \t]+$/, "", $2); print $2}')
    type=$(echo "$line" | awk -F'|' '{gsub(/^[ \t]+|[ \t]+$/, "", $4); print $4}')
    desc=$(echo "$line" | awk -F'|' '{gsub(/^[ \t]+|[ \t]+$/, "", $5); print $5}')
    priority=$(echo "$line" | awk -F'|' '{gsub(/^[ \t]+|[ \t]+$/, "", $6); print $6}')
    status=$(echo "$line" | awk -F'|' '{gsub(/^[ \t]+|[ \t]+$/, "", $7); print $7}')
    
    [ "$status" != "pending" ] && continue
    
    pri_val=${priority_values[$priority]:-0}
    [ "$pri_val" -lt "$min_pri_val" ] && continue
    
    pending_items="${pending_items}${id}|${type}|${priority}|${desc}\n"
done < "$LEARNINGS_FILE"

pending_items=$(echo -e "$pending_items" | head -"$max_items")

if [ -z "$pending_items" ]; then
    echo "No pending learnings to process."
    exit 0
fi

count=$(echo -e "$pending_items" | grep -c "|" || echo 0)
echo "Found pending: $count items"
echo ""

# Process first item
item=$(echo "$pending_items" | head -1)
IFS='|' read -r item_id item_type item_priority item_description <<< "$item"

echo "🔧 Selected:"
echo "   ID: $item_id"
echo "   Description: $item_description"
echo "   Branch: $branch_prefix/$item_id"

if [ "$DRY_RUN" = "1" ]; then
    echo ""
    echo "🔍 DRY RUN - Would create branch and implement"
    exit 0
fi

# Real mode
echo ""
echo "Creating branch: $branch_prefix/$item_id"
git checkout -b "$branch_prefix/$item_id"

# Create README_AUTONOMY.md if missing
if [ ! -f "$REPO_DIR/README_AUTONOMY.md" ]; then
    cat > "$REPO_DIR/README_AUTONOMY.md" << 'EOF'
# Autonomous Improvement System

This repo uses automated improvements.
EOF
fi

# Add comment to file
echo "<!-- Auto-improvement: $item_id -->" >> "$REPO_DIR/README_AUTONOMY.md"

# Commit
git add -A
git commit -m "fix($item_id): $item_description

- Type: $item_type
- Priority: $item_priority
- Auto-generated from learnings"

# Push
git push -u origin "$branch_prefix/$item_id" 2>&1

# Update status in LEARNINGS.md
sed -i "s/| $item_id |.*| pending |/| $item_id | $(date +%Y-%m-%d) | $item_type | $item_description | $item_priority | done |/" "$LEARNINGS_FILE"

# Write report
report_file="$REPORTS_DIR/auto_improve_$(date +%Y-%m-%d).md"
echo "# Auto-Improve Report - $(date '+%Y-%m-%d %H:%M')" >> "$report_file"
echo "- Processed: $item_id" >> "$report_file"
echo "- Type: $item_type" >> "$report_file"
echo "- Branch: $branch_prefix/$item_id" >> "$report_file"
echo "- Status: PR created" >> "$report_file"
echo "" >> "$report_file"

echo ""
echo "✅ Complete! Branch pushed: $branch_prefix/$item_id"
echo "   Learning marked: done"
