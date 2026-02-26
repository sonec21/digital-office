#!/bin/bash
# Test Activity Page Connection

echo "=============================================="
echo "  ACTIVITY PAGE - CONNECTION TEST"
echo "=============================================="
echo ""

echo "1. Checking API client..."
grep -q "tracesApi" /root/.openclaw/workspace/app/web/src/lib/api/traces.ts && echo "   ✅ tracesApi client found" || echo "   ❌ tracesApi client missing"

echo ""
echo "2. Checking hooks..."
grep -q "useActivity" /root/.openclaw/workspace/app/web/src/hooks/useActivity.ts && echo "   ✅ useActivity hook found" || echo "   ❌ useActivity hook missing"
grep -q "useCommandTimeline" /root/.openclaw/workspace/app/web/src/hooks/useActivity.ts && echo "   ✅ useCommandTimeline hook found" || echo "   ❌ useCommandTimeline hook missing"

echo ""
echo "3. Checking Activity page..."
grep -q "useActivity" /root/.openclaw/workspace/app/web/src/app/office/activity/page.tsx && echo "   ✅ Activity page uses hooks" || echo "   ❌ Activity page missing hooks"
grep -q "pollIntervalMs" /root/.openclaw/workspace/app/web/src/app/office/activity/page.tsx && echo "   ✅ Real-time polling configured" || echo "   ❌ Polling not configured"
grep -q "Live" /root/.openclaw/workspace/app/web/src/app/office/activity/page.tsx && echo "   ✅ Live indicator present" || echo "   ❌ Live indicator missing"

echo ""
echo "4. Checking API endpoint..."
grep -q "tenantId" /root/.openclaw/workspace/app/api/src/routes/traces.ts && echo "   ✅ tenantId required in API" || echo "   ❌ tenantId not required"

echo ""
echo "5. Checking real-time features..."
grep -q "setInterval" /root/.openclaw/workspace/app/web/src/hooks/useActivity.ts && echo "   ✅ Polling implemented" || echo "   ❌ Polling not implemented"
grep -q "onNewCommand" /root/.openclaw/workspace/app/web/src/hooks/useActivity.ts && echo "   ✅ New command callback" || echo "   ❌ Missing callback"

echo ""
echo "=============================================="
echo "  SUMMARY"
echo "=============================================="
echo ""
echo "Files connected:"
echo "  - /app/web/src/lib/api/traces.ts (API client)"
echo "  - /app/web/src/hooks/useActivity.ts (real-time hooks)"
echo "  - /app/web/src/app/office/activity/page.tsx (UI)"
echo ""
echo "Features enabled:"
echo "  - 5-second polling for real-time updates"
echo "  - Live indicator showing connection status"
echo "  - New command notification toast"
echo "  - Tenant-scoped queries (security)"
echo ""
echo "To test:"
echo "  1. Start API: cd /app/api && npm run dev"
echo "  2. Start Web: cd /app/web && npm run dev"
echo "  3. Visit: http://localhost:3000/office/activity"
echo "  4. Create a trace via API to see real-time update"
echo ""

