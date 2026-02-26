#!/bin/bash
# test_bff.sh - Smoke test for BFF routes
# Tests both /api/tasks (direct backend) and /bff/tasks (BFF proxy)

echo "=== BFF Smoke Test ==="
echo ""

echo "1. Testing /api/tasks (direct backend)..."
curl -i -s https://office.chatobot.cloud/api/tasks | head -5

echo ""
echo "2. Testing /bff/tasks (BFF proxy)..."
curl -i -s https://office.chatobot.cloud/bff/tasks | head -5

echo ""
echo "=== Test Complete ==="
