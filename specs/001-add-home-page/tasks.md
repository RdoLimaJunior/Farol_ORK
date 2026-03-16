# Tasks: New Home Page and Dashboard Restructuring

**Input**: Design documents from `/specs/001-add-home-page/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Verify environment and dependencies in `package.json`
- [ ] T002 Update `src/presentation/components/overview/` with any missing utilities from research

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [ ] T003 [P] Create the new `Overview` page shell at `src/presentation/pages/Overview.tsx` (using current `Dashboard.tsx` content as base)
- [ ] T004 [P] Create the new `Home` page shell at `src/presentation/pages/Home.tsx`
- [ ] T005 Update routing in `src/App.tsx` to include the new `/overview` path and map `/` to `Home`

**Checkpoint**: Routes are active and page shells are accessible, though content might be placeholders.

---

## Phase 3: User Story 1 - Accessing the Search-First Home Page (Priority: P1) 🎯 MVP

**Goal**: Restore the operational, AI-centric landing page.

**Independent Test**: Navigate to `/` and verify `SmartPrompt` and `ContextWidgets` are present and functional.

### Implementation for User Story 1

- [ ] T006 [P] [US1] Implement "Rocket Welcome" section in `src/presentation/pages/Home.tsx`
- [ ] T007 [US1] Integrate `SmartPrompt` component into `src/presentation/pages/Home.tsx`
- [ ] T008 [US1] Integrate `ContextWidgets` component into `src/presentation/pages/Home.tsx`
- [ ] T009 [US1] Ensure `framer-motion` entry animations match the premium feel on Home page

**Checkpoint**: Home page is functional as the primary entry point for user actions.

---

## Phase 4: User Story 2 - Accessing the Executive Overview (Priority: P2)

**Goal**: Provide a dedicated space for high-level charts and stats.

**Independent Test**: Navigate to `/overview` and verify all dashboard charts (Donut, Bar) and summary cards are visible.

### Implementation for User Story 2

- [ ] T010 [P] [US2] Move executive dashboard layout logic from old dashboard to `src/presentation/pages/Overview.tsx`
- [ ] T011 [US2] Ensure `OverviewStats`, `OverviewCharts`, and `OverviewBottom` are correctly imported and rendered in `src/presentation/pages/Overview.tsx`
- [ ] T012 [US2] Verify data fetching hooks (`useObjectives`, `useKRs`) work correctly in the new `Overview` page context

**Checkpoint**: Executive overview is fully functional at its new dedicated URL.

---

## Phase 5: User Story 3 - Distinct Navigation for Home and Overview (Priority: P2)

**Goal**: Clear separation in the sidebar for better Information Architecture.

**Independent Test**: Verify Sidebar has "Início" pointing to `/` and "Visão Geral" pointing to `/overview`.

### Implementation for User Story 3

- [ ] T013 [US3] Update `navGroups` in `src/presentation/layouts/AppLayout.tsx` to include "Início" (US1) and "Visão Geral" (US2)
- [ ] T014 [US3] Adjust icons and active state logic for the new navigation items in `src/presentation/layouts/AppLayout.tsx`
- [ ] T015 [US3] Ensure the "Início" link uses an exact match for the `/` route to avoid false-active states

**Checkpoint**: Platform navigation is intuitive and correctly routes users to operational or executive views.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T016 Verify theme-awareness (Dark/Light mode) across both new pages
- [ ] T017 Clean up unused components or legacy "Dashboard" leftovers
- [ ] T018 Run final responsiveness check on both Home and Overview pages

---

## Dependencies & Execution Order

- **Phase 1-2**: Mandatory setup.
- **US1 (Home)**: Priority P1 - should be completed first to restore the primary workbench.
- **US2 (Overview)**: Can be implemented in parallel with US1 as it uses different components.
- **US3 (Nav)**: Depends on US1 and US2 being accessible.

## Implementation Strategy

1. **MVP**: Restore the Home page (`/`) as it's the primary interface again.
2. **Expansion**: Ensure the premium Overview is not lost and is accessible via `/overview`.
3. **Connectivity**: Link them up in the Sidebar.
