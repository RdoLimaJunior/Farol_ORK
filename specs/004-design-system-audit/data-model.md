# Data Model & UI Mapping: Design Audit

## UI Components to be Standardized

| Component | Responsibility | Status |
|-----------|----------------|--------|
| `PageHeader` | Unified identity for all pages (Icon + Title + Subtext). | NEW |
| `StatsCard` | Standardized metrics container (used in OverviewStats). | Review |
| `DarkAwarePaper` | Wrapper or pattern for `Paper`/`Card` components using `light-dark()`. | Refactor |

## Page Audit List

1. **Home**: Review `WelcomeHeader` vs `PageHeader`.
2. **Overview**: Full refactor of header and container padding.
3. **OKR Details**: Standardize header and cards.
4. **Members**: Refactor to use new `PageHeader`.
5. **Settings**: Standardize header.
