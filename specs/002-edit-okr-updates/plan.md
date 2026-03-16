# Implementation Plan: OKR Editing and Progress Updates

**Branch**: `002-edit-okr-updates` | **Date**: 2026-03-16 | **Spec**: [/specs/002-edit-okr-updates/spec.md](file:///c:/Users/limaj/OneDrive/Documents/Projetos/SDD/Farol_ORK/specs/002-edit-okr-updates/spec.md)
**Input**: Feature specification from `/specs/002-edit-okr-updates/spec.md`

## Summary

This feature implements the core dynamic behavior for OKR management. We will transition from a static display to an interactive system where Key Results can be updated with "Valor Atual", "Nível de Confiança", and "Eventos" (commments). We will also introduce the logic for "Dimensão" (Polaridade) and weighted "Relevância", ensuring that the progress of Objectives correctly reflects the combined performance of their child KRs as defined in the provided spreadsheet model.

## Technical Context

**Language/Version**: TypeScript 5.0+, React 18.2  
**Primary Dependencies**: @mantine/core, @mantine/hooks, @mantine/modals, lucide-react (or tabler icons)  
**Storage**: Supabase (PostgreSQL) - New table for `check_ins/events` and schema updates for `key_results`.  
**Testing**: Vitest for progress calculation logic (Polarity/Weights).  
**Target Platform**: Web Browser  
**Project Type**: web-application  
**Performance Goals**: Instant progress recalculation in UI, audit trail persistence.  
**Constraints**: Audit history must be immutable, progress math must support "Lower is better" (Dimension).

## Constitution Check

- [x] **SDD-First**: Following SpecKit workflow.
- [x] **IA Estratégica**: Progress updates provide the data foundation for future AI recommendations.
- [x] **Governança**: Every change is tracked as an "Event" to ensure auditability.
- [x] **Experiência Premium**: Modal-based check-ins with immediate visual feedback on charts.

## Project Structure

```text
src/
├── application/
│   ├── hooks/
│   │   ├── useCheckIn.ts       # Service to handle KR updates
│   │   └── useOkrLogic.ts      # Core math for progress/polarity
├── domain/                     # Logic for progress calculation
│   └── okr-calculator.ts
├── presentation/
│   ├── components/
│   │   ├── okr/
│   │   │   ├── CheckInModal.tsx # Update form
│   │   │   └── PolarityBadge.tsx# Visual indicator of Dimension
│   └── pages/
│       └── OkrDetails.tsx       # Integration point for updates
```

**Structure Decision**: Logic for progress calculation will be extracted to a pure domain service `okr-calculator.ts` to facilitate testing. UI updates will be handled via Mantine Modals.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Domain Logic Separation | Complex math for polarity/weighted progress | Inline logic is harder to test and maintain across multiple views. |
