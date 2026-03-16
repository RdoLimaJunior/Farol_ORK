# Research: OKR Progress Logic & Auditing

## Unknowns & Research Tasks

| Topic | Decision | Rationale |
|-------|----------|-----------|
| **Progress Formula** | Use Polarity logic: `(Actual - Baseline) / (Target - Baseline)` vs mirrored for "Lower is Better" | Standard OKR math used in professional platforms. |
| **Audit Trail** | Use a dedicated `check_ins` table in Supabase | Keeping history separate from the current state is essential for trend analysis. |
| **Weighted Average** | Objective % = Sum(KR % * Relevance) / Sum(Relevance) | Supports the spreadsheet model's relevance field. |

## Detailed Findings

### Decision: Polarity (Dimension) Logic
Implementation in `okr-calculator.ts`:
- **Greater is Better**: Progress = `Math.max(0, Math.min(100, (current - baseline) / (target - baseline) * 100))`
- **Smaller is Better**: Progress = `Math.max(0, Math.min(100, (baseline - current) / (baseline - target) * 100))`

### Decision: State Synchronization
When a KR is updated via `CheckInModal`:
1. Optimistic UI update for the KR row.
2. Re-trigger Objective progress calculation.
3. Save record to `check_ins` with user context.

### Decision: Confidence Levels
Scale of 1-5 or descriptive (On Track, At Risk, Critical).
**Action**: Use the descriptive scale (Low/Mid/High) as per user request to start, but map to semantic colors (green, yellow, red).
