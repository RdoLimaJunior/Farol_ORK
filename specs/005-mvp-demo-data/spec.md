# Feature Specification: MVP Demo Data Seeding

**Feature Branch**: `005-mvp-demo-data`  
**Created**: 2026-03-16  
**Status**: Draft  
**Input**: User description: "criar 25 membros... baseados no discovery... atribuir OKRs existentes... povoar o sistema o máximo possível."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Populating the Team (Priority: P1)

As an Administrator, I want to have a team of 25 diverse members (Directors, Managers, Coordinators, and Specialists) pre-registered in the system, so that I can demonstrate the platform's multi-user capabilities and organizational hierarchy.

**Why this priority**: Essential for visual impact and functionality during MVP demonstrations.

**Independent Test**: Go to "Gestão de Membros" and verify that 25 distinct profiles are listed with their respective departments and job titles.

**Acceptance Scenarios**:

1. **Given** the database seeding is complete, **When** I check the profiles table, **Then** there must be exactly 25 members (excluding the main admin).
2. **Given** the member list, **When** I view their details, **Then** departments like "Engenharia", "Vendas", "RH", and "Financeiro" must be represented.

---

### User Story 2 - Distributed OKR Ownership (Priority: P1)

As an Administrator, I want the existing OKRs (Organizational, Tactical, and Individual) to be assigned to specific owners from the newly created 25 members, so that accountability is clearly visualized in the dashboards.

**Why this priority**: Validates the "Owner" association logic and populates the "Meus OKRs" view for different personas.

**Independent Test**: Navigate to the Tactical OKR view and verify that different members are listed as "Donos" (Owners) for different objectives.

**Acceptance Scenarios**:

1. **Given** the OKR list, **When** I inspect specific items, **Then** at least 15 of the new members must be assigned as owners of at least one Objective or Key Result.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST be seeded with 25 profiles based on IDIBRA personas.
- **FR-002**: Each seeded profile MUST include: `full_name`, `email` (mocked), `job_title`, `department`, and `role`.
- **FR-003**: Existing `objectives` and `key_results` MUST be updated to assign `owner_id` to these new members.
- **FR-004**: Data seeding MUST be reproducible (via SQL script or migration).
- **FR-005**: Avatars for these members SHOULD be generated/represented via initials using the standard UI pattern.

### Key Entities *(include if feature involves data)*

- **Profile**: Updated with IDIBRA-specific titles and departments.
- **Objective/Key Result**: Updated with `owner_id` references.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 25 valid member profiles active in the "Membros" page.
- **SC-002**: 100% of the current 11 Objectives have a valid `owner_id` from the new team.
- **SC-003**: 100% of existing Key Results are assigned to owners.
