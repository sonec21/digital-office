# Autonomous Improvement System

Automated self-improvement system for Digital Office that turns learnings into fixes and PRs.

## Overview

The system monitors learnings/errors captured by the self-improving-agent skill and automatically creates improvements on a schedule.

## Quick Start

### Enable Autonomous Improvements

```bash
export AUTO_IMPROVE_ENABLED=true
```

### Disable

```bash
export AUTO_IMPROVE_ENABLED=false
```

## How It Works

1. **Learnings Captured** → Errors/lessons logged to `~/.openclaw/workspace/.learnings/`
2. **Scheduler Runs** → Every 30 minutes (configurable)
3. **Select Items** → Picks pending items with priority >= medium
4. **Create Branch** → `auto/fix/LRN-XXX`
5. **Implement Fix** → Code changes + tests
6. **Open PR** → For human review

## Configuration

Edit `brain/auto_improve.json`:

| Setting | Description | Default |
|---------|-------------|---------|
| `enabled` | Master on/off | false |
| `interval_minutes` | Run frequency | 30 |
| `max_items_per_run` | Max improvements per run | 3 |
| `min_priority` | Minimum priority to process | medium |
| `branch_prefix` | Branch naming | auto/fix |
| `auto_merge` | Auto-merge PRs (dangerous!) | false |

## Allowlist/Denylist

Only changes to these paths are allowed:
- `src/app/office/`
- `brain/seeds/`
- `README_OFFICE.md`

Changes to these are blocked:
- `.env`, `caddy`, `deploy`, `infra`, `auth`, `secrets`

## Inspecting Learnings

View pending improvements:

```bash
# All learnings
cat ~/.openclaw/workspace/.learnings/LEARNINGS.md

# Errors
cat ~/.openclaw/workspace/.learnings/ERRORS.md

# Feature requests
cat ~/.openclaw/workspace/.learnings/FEATURE_REQUESTS.md
```

## Reviewing PRs

1. Check GitHub: https://github.com/sonec21/digital-office/pulls
2. Look for branches starting with `auto/fix/`
3. Review changes
4. Merge or comment

## Changing Thresholds

To require higher priority before auto-fixing:

```bash
# Edit config
nano brain/auto_improve.json
# Change "min_priority": "medium" to "high"
```

Priority levels: low, medium, high, critical

## Safety

- ❌ Never modifies main directly
- ✅ Creates branches for all changes
- ✅ Opens PRs for human review
- ✅ Respects denylist (no auth/secrets)
- ✅ Kill switch: `AUTO_IMPROVE_ENABLED=false`

## Manual Run

```bash
cd /root/.openclaw/workspace/digital-office
./scripts/auto_improve.sh
```

## Current Status

```
AUTO_IMPROVE_ENABLED: false (disabled)
Learnings: 3 pending
Last run: never
```

## Troubleshooting

**Nothing happening?**
- Check `AUTO_IMPROVE_ENABLED=true` is set
- Run script manually to see output

**Wrong items selected?**
- Adjust `min_priority` in config
- Check item priorities in learnings files

**Blocked by denylist?**
- That's correct! Add paths to allowlist if needed

<!-- Auto-improvement: LRN-001 -->
