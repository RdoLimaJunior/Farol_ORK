# Implementation Plan: New Home Page and Dashboard Restructuring

**Branch**: `001-add-home-page` | **Date**: 2026-03-16 | **Spec**: [/specs/001-add-home-page/spec.md](file:///c:/Users/limaj/OneDrive/Documents/Projetos/SDD/Farol_ORK/specs/001-add-home-page/spec.md)
**Input**: Feature specification from `/specs/001-add-home-page/spec.md`

## Summary

This feature involves a strategic restructuring of the application's entry point. We will move the current high-density "Visão Geral" (Overview) dashboard to a dedicated route (`/overview`) and restore a task-oriented "Home" (Início) page at the root route (`/`). The Home page will feature the AI-driven search interface, contextual insights, and a personalized welcome experience, aligning with the platform's vision of being an "Estrategic Assistant".

## Technical Context

**Language/Version**: TypeScript 5.0+, React 18.2  
**Primary Dependencies**: @mantine/core, @mantine/hooks, @mantine/charts, framer-motion, @tabler/icons-react  
**Storage**: Supabase (PostgreSQL) - implicit for existing data fetching  
**Testing**: Vitest / React Testing Library (assumed standard for Vite)  
**Target Platform**: Web Browser (Chrome, Edge, Safari)
**Project Type**: web-application  
**Performance Goals**: Page load < 300ms, smooth Framer Motion transitions  
**Constraints**: Full Dark Mode support, consistency with "farol-blue" brand theme  
**Scale/Scope**: 2 main routes changes, sidebar navigation update, component relocation.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **SDD-First**: Following SpecKit workflow.
- [x] **IA Estratégica**: Home page centers on the SmartPrompt for AI-assisted operations.
- [x] **SaaS-Ready**: Using shared layouts and theme-aware components.
- [x] **Governança**: Navigation changes respect the role-based dashboard access.
- [x] **UX Discovery**: User provided clear visual requirements and nomenclature ("Visão Geral").

## Project Structure

```text
src/
├── application/
│   └── hooks/           # Business logic and data fetching
├── presentation/
│   ├── components/
│   │   ├── overview/    # Relocated Overview components
│   │   └── common/      # SmartPrompt, ContextWidgets
│   ├── layouts/
│   │   └── AppLayout.tsx # Updated Sidebar/Navigation
│   └── pages/
│       ├── Home.tsx     # New (Restored) root page
│       └── Overview.tsx # Current Dashboard renamed/relocated
```

**Structure Decision**: Using the existing Mantine + React pattern. We will promote `Overview` to its own page file and create a new `Home` page that composes operational widgets.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | | |
