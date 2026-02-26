# TASK: Governance Violation Logger

## Summary
Implement a logger function so violations detected by Claw appear in the Activity timeline UI.

---

## Context
- When Claw detects violations (V1-V5), they should appear in Activity
- Use existing trace/event schema
- Violations must be visible within 1 page refresh

---

## Requirements

### 1. Add violation event type to API
In `/app/api/src/routes/traces.ts`:
- Add `governance.violation` to eventType enum
- Add fields: severity (warn|block), evidence, escalated_to

### 2. Create logger function
In `/app/web/src/lib/api/traces.ts`:
- Add `logGovernanceViolation()` function
- Input: { agent, violation_type, summary, evidence, escalated_to }

### 3. Update Activity page
In `/app/web/src/app/office/activity/page.tsx`:
- Filter/display governance violations distinctly
- Show severity badge (warn/block)

---

## Acceptance Criteria

| Criterion | Test |
|-----------|------|
| Violation event type exists | API accepts governance.violation events |
| Logger function works | `logGovernanceViolation()` returns success |
| UI displays violations | Violations appear in Activity timeline |
| Visible on refresh | Violations show within 1 page refresh |

---

## Implementation Notes

### Event Schema
```typescript
{
  eventType: 'governance.violation',
  actorType: 'claw',
  payload: {
    title: 'V1: Unauthorized Code Change',
    summary: 'Agent Gumbo edited file in /app/src',
    severity: 'warn',
    evidence: '/app/src/main.ts',
    escalated_to: 'Nick'
  }
}
```

### API Endpoint
```
POST /v1/traces/:id/events
```

---

## Delegation

**Assigned to:** Bernard  
**Supervisor:** Nick  
**Priority:** high  
**Deadline:** Implement today
