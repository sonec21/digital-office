#!/bin/bash
# test_auto_improve_parse.sh - Test the learnings parser

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"
LEARNINGS_FILE="$REPO_DIR/.learnings/LEARNINGS.md"

echo "=== Testing Auto-Improve Parser ==="

# Backup current file
cp "$LEARNINGS_FILE" "${LEARNINGS_FILE}.bak"

# Add a known test entry
TEST_ID="LRN-TEST-$(date +%s)"
echo "| $TEST_ID | 2026-02-26 | chore | Test parser detection | medium | pending | - |" >> "$LEARNINGS_FILE"

echo "Added test entry: $TEST_ID"

# Run parser in dry-run mode
echo ""
echo "Running parser..."
OUTPUT=$(cd "$REPO_DIR" && DRY_RUN=1 AUTO_IMPROVE_ENABLED=true ./scripts/auto_improve.sh 2>&1)

# Check if our test ID was detected
if echo "$OUTPUT" | grep -q "$TEST_ID"; then
    echo "✅ PASS: Test entry detected correctly"
    EXIT_CODE=0
else
    echo "❌ FAIL: Test entry NOT detected"
    echo "Output was:"
    echo "$OUTPUT"
    EXIT_CODE=1
fi

# Restore backup
mv "${LEARNINGS_FILE}.bak" "$LEARNINGS_FILE"

exit $EXIT_CODE
