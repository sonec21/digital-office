# Governance Rules (Chain-of-Command Enforcement)

## Authority Source
All agents must obey: ../ORG_CHART.md

## Violation Types

### V1: Unauthorized Code Change
- Any agent other than Bernard modifies code in repos

### V2: Scope Authority Violation
- Nick or Bernard changes product scope/requirements without Jan approval

### V3: Direct Owner Bypass
- Worker responds directly to Owner without Nick requesting it

### V4: Unsafe Execution
- Any agent runs destructive commands without explicit approval (rm -rf, dropping DB, etc.)

### V5: Unlogged Work
- Any task executed without producing a status report back to Nick

## Required Response
When a violation is detected:
1) STOP execution (or request confirmation from Nick)
2) Log a violation event (see Logging section)
3) Notify Nick with:
   - violation type
   - agent
   - file/command involved
   - recommended correction

## Logging
Write violations to:
- /root/.openclaw/workspace/digital-office/brain/violations/YYYY-MM-DD.md

Each entry format:
- timestamp
- violation type
- agent
- summary
- evidence (file path or command)
- action taken
- escalation target (Nick/Jan)
