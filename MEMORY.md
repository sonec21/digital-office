# Long-Term Memory — Polyclaw Trading System

## Core Purpose

Build a systematic trading edge platform for prediction markets (starting with Polymarket). Not copy-trading — reverse-engineering profitable strategies and executing them with discipline.

## Key Principles

1. **Edge Discovery > Execution Speed** — Find the why, not just the what
2. **Paper Trade First** — Validate before risking capital
3. **Risk Management is Non-Negotiable** — 5% drawdown hard stop
4. **Documentation > Memory** — Write down strategies, decisions, learnings

## Current Status (2026-02-10)

### Infrastructure: Stable
- Dashboard live at https://dashboard.chatobot.cloud/
- Systemd service auto-restarts, starts on boot
- SQLite with WAL, rate-limited snapshots
- Risk governor with daily drawdown tracking

### Strategies: Demo Only
- `demo_v1`: Random BUY signals for testing framework
- P0 backlog: arbitrage, TBT Divergence, reference wallet alpha
- P1 backlog: TBO, Late Entry, Counter-Trend AI
- P2 backlog: Market Making, Mention Markets, Obscure Sports

### Data Foundation
- ✅ Market ingestion (Gamma API)
- ✅ Reference wallet trade ingestion
- ❌ Orderbook analysis (L2 data)
- ❌ Candle/OHLCV generation
- ❌ NLP for Mention Markets

## Decisions Log

| Date | Decision | Context |
|------|----------|---------|
| 2026-02-10 | Use hash-based tab routing | Chart.js needs stable container |
| 2026-02-10 | 60s snapshot rate limit | Prevents DB spam, keeps charts smooth |
| 2026-02-10 | ProtectHome=false for systemd | /root/ access required for workspace |
| 2026-02-10 | Modal-based strategy docs | Keeps UI clean, detailed on demand |

## Open Questions

1. TBT Divergence spec — need exact indicator formula from thesis
2. TBO moving average parameters — proprietary, define baseline
3. Arbitrage execution — do we have CLOB API access for fills?
4. Orderbook data — pull real L2 or use proxy?

## Next Milestone

**P0 Completion:** Arbitrage scanner + TBT Divergence + reference wallet alpha extracted. Target: EOD 2026-02-14.

## Commands I Use

```bash
# Dashboard
systemctl status polyclaw-dashboard
npm run dashboard

# Data
npm run market:ingest
npm run wallet:profile

# Trading
npm run paper:run

# Debug
sqlite3 data/polyclaw.sqlite "SELECT * FROM positions;"
```

## Learning Log

- SQLite WAL mode: essential for concurrent reads during writes
- systemd hardening: ProtectHome=true blocks legitimate /root/ paths
- Chart.js: needs explicit .resize() when container becomes visible
- Caddy reverse proxy: dead simple with automated TLS

---

*Maintained by: AI assistant*
*Last update: 2026-02-10*
*Review cycle: Weekly during active development*
