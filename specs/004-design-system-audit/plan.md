# Implementation Plan: Design System Audit & UI Consistency

**Branch**: `004-design-system-audit` | **Date**: 2026-03-16 | **Spec**: [/specs/004-design-system-audit/spec.md](file:///c:/Users/limaj/OneDrive/Documents/Projetos/SDD/Farol_ORK/specs/004-design-system-audit/spec.md)
**Input**: Feature specification from `/specs/004-design-system-audit/spec.md`

## Summary

This feature is a comprehensive audit and correction of the application's user interface. The primary goal is to enforce the established Design System across all pages, focusing on the standardized header component (Icon with light background + Title + Subtext + Motion), consistent use of theme-aware tokens (`light-dark`), and synchronized animations. "Visão Geral" will be the first page to be corrected to serve as a reference.

## Technical Context

**Language/Version**: TypeScript 5.0+, React 18.2  
**Primary Dependencies**: @mantine/core, @mantine/hooks, framer-motion, @tabler/icons-react  
**Storage**: N/A (UI only)  
**Testing**: Visual inspection and cross-browser dark mode check.  
**Target Platform**: Web Browser  
**Project Type**: web-application  
**Performance Goals**: Maintaining high frame rates for animations.  
**Constraints**: Zero usage of non-tokenized colors for layout.

## Constitution Check

- [x] **SDD-First**: Following SpecKit workflow.
- [x] **Core Principles**: "Design System is NON-NEGOTIABLE" principle is the driver.
- [x] **Premium UI**: Enforcing high-fidelity standards.

## Project Structure

```text
src/
├── presentation/
│   ├── components/
│   │   └── common/
│   │       └── PageHeader.tsx # To be created/standardized
│   └── pages/
│       ├── Home.tsx
│       ├── Overview.tsx
│       ├── MembersManagement.tsx
│       └── ...
```

**Structure Decision**: We will create a shared `PageHeader` component to centralize the identity patterns and prevent future regressions.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Centralized Header Component | To ensure 100% consistency across 10+ pages | Ad-hoc headers are prone to drift and harder to maintain. |
