#!/bin/bash
# test_summary.sh - Test the summary API

echo "=== Testing /api/office/summary ==="
response=$(curl -s http://localhost:3000/api/office/summary)

echo "$response" | jq -r '.kpis'

echo ""
echo "=== KPI Check ==="
echo "New Leads Today: $(echo '$response' | jq -r '.kpis.new_leads_today')"
echo "Pipeline Value: $(echo '$response' | jq -r '.kpis.pipeline_value_open')"
echo "Revenue 30d: $(echo '$response' | jq -r '.kpis.revenue_won_30d')"
echo "Projects Active: $(echo '$response' | jq -r '.kpis.projects_in_progress')"
echo "Tasks Done Today: $(echo '$response' | jq -r '.kpis.tasks_done_today')"

echo ""
echo "=== Inbox Check ==="
echo "Approvals: $(echo '$response' | jq -r '.inbox.approvals | length')"
echo "Stalled: $(echo '$response' | jq -r '.inbox.stalled | length')"
echo "Errors: $(echo '$response' | jq -r '.inbox.errors | length')"

echo ""
echo "=== Activity Check ==="
echo "Activity items: $(echo '$response' | jq -r '.activity | length')"

echo ""
echo "=== Test Complete ==="
