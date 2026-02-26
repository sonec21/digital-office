# Autonomous Improvement System

Automated self-improvement for Digital Office that turns learnings into PRs.

## Quick Start

### Enable
```bash
export AUTO_IMPROVE_ENABLED=true
```

### Disable
```bash
export AUTO_IMPROVE_ENABLED=false
```

## How It Works

1. **Log Learnings** → Add entries to `.learnings/LEARNINGS.md`
2. **Scheduler Runs** → Every 30 minutes (or manual)
3. **Selects Items** → Picks highest priority pending items
4. **Creates Branch** → `auto/improve/LRN-XXX`
5. **Opens PR** → For human review

## Adding Learnings

Edit `.learnings/LEARNINGS.md`:

```markdown
| ID | Date | Priority | Status | Area | Description | Suggested Fix | Links |
|----|------|----------|--------|------|-------------|--------------|-------|
| LRN-003 | 2026-02-26 | high | pending | UI | Fix button color | Use bg-blue-600 | - |
```

Priority levels: low, medium, high, critical

## Selecting Items

The runner selects items based on:
- Status: must be `pending`
- Priority: must be >= `min_priority` (default: medium)
- Max: 1 per run (configurable)

## Reviewing PRs

1. Visit: https://github.com/sonec21/digital-office/pulls
2. Look for branches: `auto/improve/*`
3. Review changes
4. Merge or comment

## Configuration

Edit `brain/auto_improve.json`:

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | true | Master on/off |
| `interval_minutes` | 30 | Run frequency |
| `max_items_per_run` | 1 | Items per run |
| `min_priority` | medium | Minimum priority |
| `branch_prefix` | auto/improve | Branch naming |

## Safety

- ✅ Never commits directly to main
- ✅ Creates branches for all changes
- ✅ Opens PRs for human review
- ✅ Respects denylist (no infra/auth)
- ✅ Kill switch: `AUTO_IMPROVE_ENABLED=false`

## Allowlist/Denylist

Only changes to these paths allowed:
- `src/app/office/`
- `brain/`
- `README_OFFICE.md`
- `.learnings/`

Blocked:
- `.env`, `caddy`, `infra`, `deploy`, `systemd`, `auth`, `secrets`

## Manual Run

```bash
cd /root/.openclaw/workspace/digital-office
AUTO_IMPROVE_ENABLED=true ./scripts/auto_improve.sh
```

## Dry Run

```bash
DRY_RUN=1 AUTO_IMPROVE_ENABLED=true ./scripts/auto_improve.sh
```

## Cron Setup

To run every 30 minutes:

```bash
# Add to crontab
*/30 * * * * cd /root/.openclaw/workspace/digital-office && AUTO_IMPROVE_ENABLED=true ./scripts/auto_improve.sh >> /var/log/auto_improve.log 2>&1
```

## Current Status

```
AUTO_IMPROVE_ENABLED: false (kill switch)
Learnings: 1 done, 1 pending
Last run: auto/improve/LRN-001
```
