#!/bin/bash
# Workflow Trace Event Payload Test Script
# Demonstrates standardized event format

echo "=============================================="
echo "  WORKFLOW TRACE - STANDARDIZED PAYLOADS"
echo "=============================================="
echo ""

# Example tenant ID (would be real in production)
TENANT_ID="550e8400-e29b-41d4-a716-446655440000"

echo "Creating test trace..."
echo ""

# Example 1: Initial routing event
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 EXAMPLE 1: Routing Decision"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat << 'EOF'
{
  "title": "Request received and routed",
  "summary": "Assistant received request 'Fix the login bug' and routed to bernard",
  "inputs": {
    "requestTitle": "Fix the login bug",
    "source": "owner_message",
    "domain": "tech"
  },
  "outputs": {
    "routedTo": "bernard",
    "routingConfidence": 0.95
  },
  "links": {},
  "metrics": {},
  "debug": {
    "tenantId": "550e8400-e29b-41d4-a716-446655440000",
    "timestamp": "2025-02-25T18:00:00Z"
  }
}
EOF
echo ""

# Example 2: Task created event
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 EXAMPLE 2: Task Created"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat << 'EOF'
{
  "title": "Task created",
  "summary": "Bernard created a new task to fix login 500 error",
  "inputs": {
    "taskType": "bug_fix",
    "title": "Fix login 500 error",
    "description": "The login form returns 500 on submit",
    "priority": "high"
  },
  "outputs": {
    "taskId": "task-abc123",
    "assignedTo": "bernard"
  },
  "links": {
    "taskId": "task-abc123"
  },
  "metrics": {
    "creationTimeMs": 45
  },
  "debug": {}
}
EOF
echo ""

# Example 3: Task started event
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 EXAMPLE 3: Task Started"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat << 'EOF'
{
  "title": "Task execution started",
  "summary": "Bernard started investigating the login 500 error",
  "inputs": {
    "taskId": "task-abc123",
    "action": "investigate"
  },
  "outputs": {},
  "links": {
    "taskId": "task-abc123"
  },
  "metrics": {},
  "debug": {
    "reproduction": "POST /api/auth/login returns 500"
  }
}
EOF
echo ""

# Example 4: Run started event
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 EXAMPLE 4: Agent Run Started"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat << 'EOF'
{
  "title": "Agent run started",
  "summary": "Bernard started running database migration to check users table",
  "inputs": {
    "runType": "migration",
    "command": "npx prisma migrate dev",
    "env": "development"
  },
  "outputs": {},
  "links": {
    "taskId": "task-abc123",
    "runId": "run-xyz789"
  },
  "metrics": {},
  "debug": {
    "prismaVersion": "5.10.0"
  }
}
EOF
echo ""

# Example 5: Task completed event
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 EXAMPLE 5: Task Completed"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat << 'EOF'
{
  "title": "Task completed successfully",
  "summary": "Bernard fixed the login bug - missing await in auth handler",
  "inputs": {
    "taskId": "task-abc123",
    "rootCause": "missing await in async handler"
  },
  "outputs": {
    "filesChanged": [
      "packages/auth/src/handlers/login.ts"
    ],
    "linesAdded": 1,
    "linesRemoved": 0
  },
  "links": {
    "taskId": "task-abc123",
    "runId": "run-xyz789",
    "commitId": "abc123def456"
  },
  "metrics": {
    "durationMs": 125000,
    "tokensUsed": 4500,
    "apiCalls": 12
  },
  "debug": {
    "testResult": "passed",
    "lintResult": "passed"
  }
}
EOF
echo ""

echo "=============================================="
echo "  UI RENDERING EXAMPLE"
echo "=============================================="
echo ""
echo "🧭 Request received and routed          [running]"
echo "   Assistant received request 'Fix the login bug'..."
echo "   📥 Inputs: requestTitle, source, domain"
echo "   📤 Outputs: routedTo → bernard"
echo ""
echo "🛠️  Task created                         [completed]"
echo "   Bernard created a new task to fix login 500 error"
echo "   🔗 Links: 📋 task-abc123"
echo "   📊 Metrics: ⏱️ 45ms"
echo ""
echo "🛠️  Task execution started               [running]"
echo "   Bernard started investigating the login 500 error"
echo "   🔗 Links: 📋 task-abc123"
echo ""
echo "🛠️  Agent run started                    [running]"
echo "   Bernard started running database migration"
echo "   🔗 Links: 📋 task-abc123, ⚡ run-xyz789"
echo ""
echo "✅ Task completed successfully           [completed]"
echo "   Bernard fixed the login bug - missing await"
echo "   📥 Inputs: taskId, rootCause"
echo "   📤 Outputs: filesChanged, linesAdded/Removed"
echo "   🔗 Links: 📋 task-abc123, ⚡ run-xyz789"
echo "   📊 Metrics: ⏱️ 125000ms | 🔢 4500 tokens | 📡 12 API calls"
echo ""
echo "=============================================="
