# Research: Home vs Overview Restructuring

## Unknowns & Research Tasks

| Topic | Decision | Rationale |
|-------|----------|-----------|
| **Component Reusability** | Move overview-specific components to `src/presentation/components/overview/` | Keeps the `Summary` and `Charts` logic isolated from the landing page. |
| **Logic Sharing** | Use existing `useObjectives` and `useOkrCalculation` hooks in both pages | Both views need the same source of truth for OKR data. |
| **Routing Strategy** | `/` for Home, `/overview` for executive dashboard | Traditional SaaS pattern where `/` is the workbench and `/overview` is the dashboard. |

## Detailed Findings

### Decision: Component Folder Structure
We currently have `OverviewCharts.tsx`, `OverviewStats.tsx`, etc., in `src/presentation/components/overview/`. 
**Action**: Ensure `Home.tsx` uses `SmartPrompt` and `ContextWidgets` while `Overview.tsx` uses the components in the `overview/` subfolder.

### Decision: Navigation Active States
Mantine `NavLink` or custom Sidebar buttons in `AppLayout.tsx` should use `location.pathname` for active highlighting.
**Action**: Explicitly check for `/` (exact match) for the "Início" link.

### Decision: Smooth Transitions
Use `framer-motion` `AnimatePresence` or shared layout transitions to ensure the restructuring feels "premium" rather than just a page jump.
**Action**: Implement `<motion.div>` wrappers in both pages with consistent `initial`, `animate`, and `exit` props.
