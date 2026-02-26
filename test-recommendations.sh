#!/bin/bash
# Nick's Performance Recommendation Examples
# Shows 3 example system_note events with business insights

echo "=============================================="
echo "  NICK'S PERFORMANCE RECOMMENDATIONS"
echo "  (Example system_note events)"
echo "=============================================="
echo ""

# Example 1: Failed Run Detection
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 EXAMPLE 1: Failed Run Detection"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat << 'EOF'
{
  "title": "failed_run detected",
  "summary": "3 workflows failed in the last 7 days",
  "inputs": {
    "analysisPeriod": "7 days",
    "totalTraces": 47,
    "failedTraces": ["trace-001", "trace-023", "trace-041"]
  },
  "outputs": {
    "recommendation": "Review failed traces to identify root causes. Consider adding error handling or rollback procedures for production deployments.",
    "metrics": {
      "severity": "high",
      "affectedTraces": 3,
      "failureRate": "6.4%"
    },
    "anomalies": [
      {
        "type": "failed_run",
        "severity": "high",
        "message": "3 workflow(s) failed in the last 7 days",
        "traceIds": ["trace-001", "trace-023", "trace-041"],
        "recommendation": "Review failed traces to identify root causes"
      }
    ]
  },
  "metrics": {
    "durationMs": 1250
  },
  "debug": {
    "eventType": "system_note",
    "actor": "nick",
    "generatedAt": "2025-02-25T18:00:00Z"
  }
}
EOF
echo ""

# Example 2: Long Duration Detection
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 EXAMPLE 2: Long Duration Detection"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat << 'EOF'
{
  "title": "long_duration detected",
  "summary": "5 workflows exceeded 60s average duration",
  "inputs": {
    "analysisPeriod": "7 days",
    "thresholdMs": 60000,
    "longTraces": ["trace-012", "trace-034", "trace-056", "trace-078", "trace-090"]
  },
  "outputs": {
    "recommendation": "Investigate long-running workflows. Average overrun: 23.5s per workflow. Consider async processing for database migrations.",
    "metrics": {
      "severity": "medium",
      "affectedTraces": 5,
      "avgOverrunMs": 23500,
      "totalExtraTimeMs": 117500
    },
    "anomalies": [
      {
        "type": "long_duration",
        "severity": "medium",
        "message": "5 workflow(s) exceeded 60s average duration",
        "traceIds": ["trace-012", "trace-034", "trace-056", "trace-078", "trace-090"],
        "recommendation": "Consider async processing for database migrations"
      }
    ]
  },
  "metrics": {
    "durationMs": 890
  },
  "debug": {
    "eventType": "system_note",
    "actor": "nick",
    "generatedAt": "2025-02-25T18:00:00Z"
  }
}
EOF
echo ""

# Example 3: Repeated Escalations
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 EXAMPLE 3: Repeated Escalations"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat << 'EOF'
{
  "title": "repeated_escalation detected",
  "summary": "8 workflows escalated to Nick (manager) - high volume",
  "inputs": {
    "analysisPeriod": "7 days",
    "escalationThreshold": 3,
    "escalatedTraces": ["trace-005", "trace-011", "trace-022", "trace-033", "trace-044", "trace-055", "trace-066", "trace-077"]
  },
  "outputs": {
    "recommendation": "High escalation volume may indicate unclear routing or complex requests. Consider: (1) Improving assistant routing confidence thresholds, (2) Adding self-service options for common requests, (3) Creating decision trees for complex workflows.",
    "metrics": {
      "severity": "medium",
      "affectedTraces": 8,
      "escalationRate": "17%",
      "commonReasons": ["pricing_changes", "policy_exceptions", "complex_bugs"]
    },
    "anomalies": [
      {
        "type": "repeated_escalation",
        "severity": "medium",
        "message": "8 workflows escalated to Nick (manager)",
        "traceIds": ["trace-005", "trace-011", "trace-022", "trace-033", "trace-044", "trace-055", "trace-066", "trace-077"],
        "recommendation": "Improve routing or add self-service options"
      }
    ]
  },
  "metrics": {
    "durationMs": 1100
  },
  "debug": {
    "eventType": "system_note",
    "actor": "nick",
    "generatedAt": "2025-02-25T18:00:00Z"
  }
}
EOF
echo ""

echo "=============================================="
echo "  UI RENDERING"
echo "=============================================="
echo ""

echo "💼 Nick's Performance Review"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔴 High Priority: Failed Runs"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3 workflows failed in the last 7 days"
echo ""
echo "📝 Recommendation:"
echo "Review failed traces to identify root causes. Consider adding"
echo "error handling or rollback procedures for production deployments."
echo ""
echo "Affected: trace-001, trace-023, trace-041"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🟡 Medium Priority: Long Durations"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5 workflows exceeded 60s average duration"
echo ""
echo "📝 Recommendation:"
echo "Investigate long-running workflows. Average overrun: 23.5s"
echo "per workflow. Consider async processing for migrations."
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🟡 Medium Priority: Escalations"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "8 workflows escalated to Nick (17% escalation rate)"
echo ""
echo "📝 Recommendation:"
echo "High escalation volume may indicate unclear routing."
echo "Consider improving assistant routing or adding self-service."
echo ""

echo "=============================================="
echo "  EVENT CREATION API CALL"
echo "=============================================="
echo ""
echo 'POST /v1/traces/:traceId/events'
echo ""
echo '{'
echo '  "tenantId": "550e8400-..."'
echo '  "eventType": "system_note"'
echo '  "actorType": "nick"'
echo '  "actorKey": "nick"'
echo '  "message": "3 workflows failed in the last 7 days"'
echo '  "payload": { ... }'
echo '  "status": "completed"'
echo '}'
echo ""

