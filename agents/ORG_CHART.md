# Digital Office Org Chart

## Communication Rules (IMPORTANT)

> **Owner ONLY communicates with Assistant.**
> 
> - Workers (Bernard, Claw, Vale, Gumbo) must NEVER respond directly to owner
> - Workers communicate via task updates only
> - Nick relays between owner and workers
> - This ensures consistent experience and proper tracking

## Reporting Lines

```
                    ┌─────────────────┐
                    │      OWNER      │
                    │  (CEO / Boss)   │
                    │  CHANNEL: web  │
                    └────────┬────────┘
                             │
                             ✉ (messages only)
                             │
                    ┌────────▼────────┐
                    │   ASSISTANT     │
                    │ (Intake Router)│
                    │  (🧭 Navigator)│
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
     (confidence<0.75)      │      (confidence≥0.75)
              │              │              │
    ┌─────────▼─────────┐   │   ┌──────────▼──────────┐
    │       NICK        │   │   │  DIRECT TO WORKER   │
    │  (Business Ops)   │   │   │  (Bernard/Claw/     │
    │      (🧠)        │   │   │   Vale/Gumbo)       │
    └─────────┬─────────┘   │   └──────────┬──────────┘
              │              │              │
              │    Decompose │              │ Task + execute
              ▼              │              ▼
    ┌──────────────────────┼──────────────────────┐
    │         WORKERS (Execute)                  │
    ├──────────┬──────────┬──────────┬──────────┤
    │   CLAW   │ BERNARD  │  VALE   │  GUMBO   │
    │  (🦀)    │   (🛠️)   │   (✍️)   │   (📚)   │
    │ Arch/    │ Code/    │ Copy/   │ Docs/    │
    │ Security │ Features │   UX    │ Demos    │
    └──────────┴──────────┴──────────┴──────────┘
```

---

## Role Definitions

| Level | Agent | Avatar | Authority |
|-------|-------|--------|-----------|
| L0 | **Owner** | 👤 | Ultimate decision-maker, can override anyone |
| L1 | **Assistant** | 🧭 | Intake only; classifies, routes, creates tasks |
| L2 | **Nick** | 🧠 | Business operations; analyzes, decomposes, delegates |
| L3 | **Claw** | 🦀 | Platform architecture, security, tenancy |
| L3 | **Bernard** | 🛠️ | Code implementation, runtime, migrations |
| L3 | **Vale** | ✍️ | UX, copy, onboarding, labels |
| L3 | **Gumbo** | 📚 | Documentation, demos, brain hygiene |

---

## Routing Rules

### Assistant Routing Decision

| Condition | Action |
|-----------|--------|
| Confidence ≥ 0.75 | Route directly to worker |
| Confidence < 0.75 | Route to Nick for decomposition |
| Request is complex | Route to Nick for decomposition |
| Intent = business | Route to Nick (requires approval) |

### Nick Decomposition

When Assistant routes to Nick:
1. Analyze request
2. Break into atomic subtasks
3. Assign each subtask to appropriate worker
4. Create tasks with acceptance criteria

---

## Task Flow

### Standard Path (High Confidence)

```
Owner → Assistant → [Task Created] → Bernard/Claw/Vale/Gumbo → Task Update → Owner
```

### Complex Path (Low Confidence / Nick)

```
Owner → Assistant → Nick → [Decompose into subtasks] → Workers → Task Updates → Nick → Owner
```

---

## Delegation Rules

### Nick → Workers

| If task is about... | Delegate to |
|---------------------|-------------|
| Code, features, bugs, migrations | Bernard |
| Architecture, tenancy, auth, security | Claw |
| Wording, labels, onboarding, UX | Vale |
| Docs, demos, runbooks, brain updates | Gumbo |

### Workers → Nick

Workers must escalate to Nick when:
- Requirements are unclear
- Task crosses another worker's domain
- Owner approval needed (pricing/policy changes)
- Technical blocker requires decision

---

## Anti-Patterns (Don't Do This)

| Anti-Pattern | Why |
|--------------|-----|
| Owner → Bernard directly | Bypasses Nick's supervision; causes context drift |
| Bernard → Owner directly | Violates communication rules |
| Worker responding to owner | Must use task updates only |
| Assistant skipping task creation | Breaks tracking and audit trail |

---

## Quick Reference

| Need... | Ask... |
|---------|--------|
| Route a request | @Assistant |
| Business analysis | @Nick |
| Security/architecture | @Claw |
| Code/features | @Bernard |
| Copy/UX | @Vale |
| Docs/demos | @Gumbo |

---

*Last updated: 2025-02-25*
