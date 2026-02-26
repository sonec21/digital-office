#!/bin/bash
# ui_smoke.sh - Smoke test for Digital Office UI
# Uses curl to verify each route returns 200

REPO_DIR="/root/.openclaw/workspace/digital-office"
REPORT_DIR="$REPO_DIR/brain/reports"
TODAY=$(date +%Y-%m-%d)
OUTPUT_DIR="$REPORT_DIR/ui_smoke_$TODAY"
BASE_URL="https://office.chatobot.cloud"

# Routes to test
ROUTES=(
    "/office"
    "/office/leads"
    "/office/pipeline"
    "/office/projects"
    "/office/tasks"
    "/office/automations"
    "/office/calendar"
    "/office/team"
    "/office/activity"
    "/office/conversations"
    "/office/training"
    "/office/reports"
)

echo "=== Digital Office UI Smoke Test ==="
echo "Date: $TODAY"
echo "Base URL: $BASE_URL"
echo ""

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Track results
SUCCESS=0
FAILED=0

# Create markdown report header
cat > "$OUTPUT_DIR.md" << EOF
# UI Smoke Test Report

**Date:** $TODAY  
**Base URL:** $BASE_URL  
**Total Routes:** ${#ROUTES[@]}  

## Results

| Route | Status | HTTP Code |
|-------|--------|-----------|
EOF

# Test each route
for route in "${ROUTES[@]}"; do
    url="${BASE_URL}${route}"
    
    echo -n "Testing $route ... "
    
    # Get HTTP status
    http_code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$http_code" = "200" ]; then
        echo "✓ (200)"
        echo "| $route | ✅ OK | $http_code |" >> "$OUTPUT_DIR.md"
        ((SUCCESS++))
    else
        echo "✗ ($http_code)"
        echo "| $route | ❌ Failed | $http_code |" >> "$OUTPUT_DIR.md"
        ((FAILED++))
    fi
done

# Update summary in report
echo "" >> "$OUTPUT_DIR.md"
echo "**Success:** $SUCCESS  " >> "$OUTPUT_DIR.md"
echo "**Failed:** $FAILED" >> "$OUTPUT_DIR.md"

echo ""
echo "=== Summary ==="
echo "Success: $SUCCESS/${#ROUTES[@]}"
echo "Failed: $FAILED"
echo ""
echo "Report: $OUTPUT_DIR.md"
