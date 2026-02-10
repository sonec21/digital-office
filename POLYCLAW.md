# Polyclaw — Trading Edge System

**Mission:** Identify and exploit unique trading edges across prediction markets (starting with Polymarket), using reference wallet analysis, technical indicators, and market structure arbitrage.

**Core Philosophy:**
- Don't just copy-trade profitable wallets — reverse-engineer *how* and *why* they win
- Systematic edge detection > gut feeling
- Paper trade first, validate, then scale
- Risk management is non-negotiable (5% daily drawdown hard stop)

---

## Strategy Roadmap (Priority Order)

### P0 — Immediate Edge (This Sprint)

#### 1. Arbitrage Scanner
**Edge:** Risk-free when yes_price + no_price < 1.0
**Implementation:**
- Query orderbook for all `clob_tradeable=1` markets
- If `best_bid_yes + best_bid_no < 1.0 - fees`, execute both sides
- Log to `arbitrage_opportunities` table
- Auto-execute in paper mode first

#### 2. Reference Wallet Alpha Extraction
**Edge:** Learn from proven winners
**Implementation:**
- Analyze `wallet_trades` for the configured `REFERENCE_WALLET`
- Calculate: entry timing (minutes relative to market close), position sizing vs conviction, market selection patterns, average hold time, win rate by category
- Output: "alpha signals" table that paper strategies can subscribe to

#### 3. TBT Divergence (15m)
**Edge:** Price/indicator divergence = mean reversion
**Implementation:**
- Pull 15m CLOB candles for top 50 markets
- Calculate custom "TBT" indicator (prompt defines this as proprietary)
- Signal when price makes lower low but TBT makes higher low (bullish divergence)
- Contrarian position sizing (smaller size, tight stops)

---

### P1 — Trend & Momentum (Next Sprint)

#### 4. TBO Strategy (4h)
**Edge:** Moving average trend following
**Implementation:**
- 4h timeframe
- Advanced MA cross (exact spec in prompt — proprietary)
- Trend-confirmation entries only

#### 5. Late Entry (Crypto 15m, last 3-4 min)
**Edge:** Time pressure creates emotional mispricing
**Implementation:**
- Filter to `category LIKE '%crypto%'` AND `end_ts` within 5 minutes
- Analyze last 3-4 min orderflow momentum
- Quick in/out, size proportional to confidence

#### 6. Counter-Trend AI
**Edge:** Fade crowded AI consensus
**Implementation:**
- Detect when orderbook shows "AI-like" patterns (even spread, repetitive sizes)
- Take contrarian position when AI congestion is high
- Requires: orderbook depth + volume analysis

---

### P2 — Complex / Scale (Later)

#### 7. Market Making
**Edge:** Spread capture
**Requirements:**
- CLOB API access (live, not read-only)
- Webhook infrastructure
- Real inventory management
- **Not for paper mode** — needs real capital

#### 8. Mention Markets / NLP
**Edge:** Public figure prediction via behavior analysis
**Implementation:**
- Agent-based monitoring of political/public figures
- Topic clustering, sentiment analysis
- Predict binary event outcomes (debates, announcements, etc.)

#### 9. Obscure Sports/eSports
**Edge:** Information asymmetry in low-volume markets
**Implementation:**
- Filter: `volume_24h < $10,000` AND `category IN ('sports', 'esports', 'gaming')`
- Look for line movement vs public sentiment divergence
- Small size, high frequency

---

## Risk Framework (Hard Rules)

1. **Daily Drawdown:** -5% of start-of-day equity = hard stop
2. **Max Positions:** 5 open positions (configurable)
3. **Per-Trade Risk:** Max 5% of bankroll
4. **Correlation:** No more than 2 positions in same event category
5. **Exit Discipline:** All strategies must define exit rules before entry

---

## Data Architecture

### Tables
- `markets` — Gamma API, filtered to tradeable subset
- `wallet_trades` — Reference wallet activity (Data API)
- `paper_trades` — Simulated fills with strategy attribution
- `positions` — Live position cache (net shares, avg price, cost)
- `daily_pnl` — End-of-day equity snapshot
- `equity_snapshots` — Intra-day chart data (60s rate limit)
- `arbitrage_opportunities` — P0 scanner output
- `alpha_signals` — Reference wallet pattern output

### Key External Data
- **Gamma API:** Market metadata, resolution
- **CLOB API:** Orderbooks, trades, candles (L2 required for market making)
- **Data API:** Wallet activity (REST only, slower)

---

## Implementation Checklist

Strategy files live in `src/strategies/`:
```
src/
  strategies/
    arbitrage.ts           # P0
    referenceAlpha.ts      # P0  
    tbtDivergence.ts       # P0
    tbo.ts                 # P1
    lateEntry.ts           # P1
    counterTrendAI.ts      # P1
    marketMaking.ts        # P2
    mentionMarkets.ts      # P2
    obscureSports.ts       # P2
```

Each exports:
```typescript
export const meta = { name: 'strategy_name', timeframe: '15m', category: 'technical' };
export function generateSignals(ctx: StrategyContext): Signal[];
export function calculatePositionSize(signal: Signal, risk: RiskState): number;
```

---

## Automation Requirements

Per initial prompt:
- [ ] **9 AM Market Update** — Daily cron, ingest fresh markets, recalc indicators
- [ ] **Continuous Price Action** — Background agent analyzing CLOB data
- [ ] **Security Audit** — Monthly review of keys, access logs

---

## Performance Reporting

Dashboard tracks:
- P&L by strategy, by day, by category
- Win rate (closed positions
- Sharpe ratio (rolling 30d)
- Max drawdown (absolute and %-based)
- Alpha vs simple buy-and-hold

---

*Last updated: 2026-02-10*
*Next review: After P0 strategies implemented*
