# Implementation Plan: MVP Demo Data Seeding

This plan details the steps to populate the Farol project with 25 members and assign existing OKRs to them.

## Phase 1: Persona Definition & Member Creation

1. Create a JSON file `src/infrastructure/data/demo_members.json` with 25 personas.
2. Develop a seeding function in `src/infrastructure/data/seedingService.ts` that:
   - Inserts 25 profiles into the `profiles` table.
   - Cleans up existing demo data if necessary (optional).

## Phase 2: OKR Assignment

1. Fetch all created profiles.
2. Fetch all existing objectives and key results.
3. Randomly (but logically) assign `owner_id` of Objectives to Directors/Managers.
4. Assign `owner_id` of Key Results to Specialists/Analysts.

## Phase 3: Triggering the Seed

1. Add a temporary "Seed Demo Data" button in `Settings.tsx` (Visible only in dev or to admins).
2. Execute the seeding and verify results.

## Member List Preview (Sample)

| Name | Department | Role |
|------|------------|------|
| Cícero | Executivo | Diretor Geral |
| Patrick Silva | BI | Gerente de Operações |
| Ana Oliveira | RH | Gerente de Pessoas |
| Roberto Costa | Engenharia | Diretor de Obras |
| Juliana Lima | Financeiro | Coordenadora Financeira |
| ... | ... | ... |
