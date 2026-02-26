# Governance Rules (Chain-of-Command Enforcement)

## Production Safety (Hard Rules)

1. **Never develop on main** - All development must happen on feature branches
2. **Always run preflight_change before edits** - Run `scripts/preflight_change.sh <branch-name>` to create a snapshot and rollback point before any code changes
3. **Only merge when build + smoke tests pass** - Verify `pnpm build` succeeds and `curl -I http://127.0.0.1:3000/office` returns 200 before merging
4. **If prod breaks, run rollback_prod.sh** - Use `bash scripts/rollback_prod.sh` to restore to the last known-good state (prod-stable tag)

## Branching Workflow (Required)

All changes must follow this process:

1) **Create branch**: `git checkout -b feature/<short-name>`
2) **Implement**: Make your changes
3. **Test**: Run tests / sanity check routes
4) **Commit + push**: `git add . && git commit -m "feat: description" && git push -u origin feature/<short-name>`
5) **Open PR**: Create a pull request on GitHub
6) **Merge**: Only merge to `main` after PR approval

**Never commit directly to `main`.**

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
