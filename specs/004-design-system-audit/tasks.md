# Tasks: Design System Audit & UI Consistency

**Input**: Design documents from `/specs/004-design-system-audit/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 [P] Create the standardized `PageHeader` component in `src/presentation/components/common/PageHeader.tsx`
- [ ] T002 Identify all pages currently missing Design System compliance via global search for `Container` usage

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T003 Ensure `farol-blue` color family is correctly defined in `src/presentation/theme/index.ts` for all shades
- [ ] T004 Define a standard `motion` entrance preset in a utility file or within `PageHeader`

---

## Phase 3: User Story 1 - Standardizing Page Headers (Priority: P1) 🎯 MVP

**Goal**: Apply the premium header pattern to "Visão Geral" and "Membros".

**Independent Test**: Navigate between "Visão Geral" and "Membros" and verify the headers are identical in structure and animation.

### Implementation Checklist
- [ ] T005 [P] [US1] Refactor `src/presentation/pages/Overview.tsx` to use the new `PageHeader`
- [ ] T006 [P] [US1] Refactor `src/presentation/pages/MembersManagement.tsx` to use the new `PageHeader`
- [ ] T007 [US1] Update `src/presentation/pages/Home.tsx` (`WelcomeHeader`) to align with the `PageHeader` padding and alignment
- [ ] T008 [US1] Apply `PageHeader` to `src/presentation/pages/Settings.tsx`
- [ ] T009 [US1] Apply `PageHeader` to `src/presentation/pages/OkrLevelPage.tsx` (Estratégico, Tático, Individual)

**Checkpoint**: Core page identity is now 100% consistent across the platform.

---

## Phase 4: User Story 2 - Dark Mode Audit (Priority: P1)

**Goal**: Remove all hardcoded non-tokenized colors.

**Independent Test**: Toggle night mode and verify no "white flashes" or inconsistent borders appear in the Overview charts or tables.

### Implementation Checklist
- [ ] T010 [P] [US2] Audit and replace hex colors in `src/presentation/components/overview/OverviewStats.tsx` with `light-dark()`
- [ ] T011 [P] [US2] Audit and replace hex colors in `src/presentation/components/overview/OverviewCharts.tsx`
- [ ] T012 [P] [US2] Review `src/presentation/components/OkrCard.tsx` for theme compliance
- [ ] T013 [US2] Fix any remaining hardcoded backgrounds in `src/presentation/pages/Execution.tsx` and `src/presentation/pages/Engagement.tsx`

---

## Phase 5: Polish & Cross-Cutting Concerns

- [ ] T014 Run a final pass on all `Container` components to ensure `size="xl"` and `py="xl"` consistency
- [ ] T015 Verify that all icons in headers have the same `size={24}` and `stroke={2}` (or equivalent DS standard)
- [ ] T016 Check all `Button` components for consistent `radius="md"` and `shadow` as per DS
