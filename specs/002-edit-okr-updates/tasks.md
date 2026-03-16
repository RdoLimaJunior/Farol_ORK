# Tasks: OKR Editing and Progress Updates

**Input**: Design documents from `/specs/002-edit-okr-updates/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Update Supabase local types (if needed) or mock data to include `dimension`, `relevance`, and `confidence` fields
- [ ] T002 Configure a new context or state store for OKR calculations

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T003 Create `src/domain/okr-calculator.ts` with pure functions for Dimension and Weighted Progress
- [ ] T004 Create unit tests for `okr-calculator.ts` in `src/domain/okr-calculator.test.ts`
- [ ] T005 [P] Define `CheckIn` and `KRUpdate` interfaces in `src/application/types/okr.ts`

**Checkpoint**: Core math is validated and types are ready.

---

## Phase 3: User Story 1 - Updating Key Result Progress (Priority: P1) 🎯 MVP

**Goal**: Enable users to perform check-ins from the UI.

**Independent Test**: Perform a check-in on a KR and see the progress bar update immediately.

### Implementation Checklist
- [ ] T006 [P] [US1] Create `src/presentation/components/okr/CheckInModal.tsx` using Mantine Modals
- [ ] T007 [US1] Integrate `CheckInModal` trigger in `src/presentation/pages/OkrDetails.tsx` (KR list row)
- [ ] T008 [US1] Implement `useCheckIn` hook in `src/application/hooks/useCheckIn.ts` to persist updates to state/API
- [ ] T009 [US1] Update `OkrCard` and progress bars to use the new `okr-calculator` logic

**Checkpoint**: Users can update progress and see the ripple effect on Objective totals.

---

## Phase 4: User Story 2 - Editing OKR Metadata (Priority: P2)

**Goal**: Allow structural adjustments to OKRs.

**Independent Test**: Edit a KR's relevance and see the Objective's total progress change accordingly.

### Implementation Checklist
- [ ] T010 [P] [US2] Create metadata edit form `src/presentation/components/okr/OkrEditForm.tsx` (Relevance, Dimension, Owner)
- [ ] T011 [US2] Add "Editar" button/action to KRs in `src/presentation/pages/OkrDetails.tsx`
- [ ] T012 [US2] Handle metadata persistence in the `useObjectives` or dedicated hook

---

## Phase 5: User Story 3 - Registering Check-in Events (Priority: P2)

**Goal**: Build the audit trail.

**Independent Test**: Verify that every check-in creates a new entry in the "Histórico" list.

### Implementation Checklist
- [ ] T013 [P] [US3] Create `src/presentation/components/okr/EventTimeline.tsx` to list check-in history
- [ ] T014 [US3] Add the `EventTimeline` component to the bottom of the `OkrDetails.tsx` page
- [ ] T015 [US3] Ensure the `check_ins` data is fetched and displayed correctly

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T016 Apply semantic colors to "Nível de Confiança" (Low=Red, Mid=Yellow, High=Green)
- [ ] T017 Ensure all modals support Dark Mode using `light-dark()`
- [ ] T018 Validate responsiveness for the Check-In form on mobile devices
