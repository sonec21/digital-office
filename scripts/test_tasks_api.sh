#!/bin/bash
# test_tasks_api.sh - Test tasks API endpoints

BASE_URL="https://office.chatobot.cloud"

echo "=== Tasks API Test ==="
echo ""

# Test GET
echo "1. GET /api/tasks"
response=$(curl -s "$BASE_URL/api/tasks")
echo "$response" | head -100
echo ""

# Test POST
echo "2. POST /api/tasks"
response=$(curl -s -X POST "$BASE_URL/api/tasks" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","description":"Testing API","assignee_agent":"nick"}')
echo "$response"
task_id=$(echo "$response" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
echo "Created task ID: $task_id"
echo ""

# Test PATCH
echo "3. PATCH /api/tasks/$task_id (move to done)"
response=$(curl -s -X PATCH "$BASE_URL/api/tasks/$task_id" \
  -H "Content-Type: application/json" \
  -d '{"status":"done"}')
echo "$response"
echo ""

# Verify update
echo "4. GET /api/tasks (verify update)"
response=$(curl -s "$BASE_URL/api/tasks")
echo "$response" | grep -o "Test Task" || echo "Task not found"
echo ""

echo "=== Tests Complete ==="
