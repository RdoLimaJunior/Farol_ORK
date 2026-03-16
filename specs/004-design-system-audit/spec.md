# Feature Specification: Design System Audit & UI Consistency

**Feature Branch**: `004-design-system-audit`  
**Created**: 2026-03-16  
**Status**: Draft  
**Input**: User description: "revisar todas as telas criadas... Visão Geral não está seguindo o padrão... Design System é INEGOCIÁVEL... seguir padrão Membros (Ícone, cor de fundo, microanimação)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Standardizing Page Headers (Priority: P1)

As a User, when I navigate between pages (Home, Visão Geral, Members, Settings), I want to see a consistent header pattern including a specific `ThemeIcon` with a light background and a primary-colored icon, clear hierarchical titles, and entrance animations, so the platform feels unified and premium.

**Why this priority**: Corrects the visually inconsistent "Visão Geral" and enforces the core Design System.

**Independent Test**: Navigate to "Visão Geral" and verify the header matches the pattern used in "Membros" (Icone + Cor de Fundo + Transição).

**Acceptance Scenarios**:

1. **Given** any page in the platform, **When** I look at the header, **Then** it must contain a `ThemeIcon` with `variant="light"` and `color="farol-blue"`.
2. **Given** the "Visão Geral" page, **When** it loads, **Then** it must use a `motion.div` with the standard entrance animation (y-axis or x-axis as per DS).

---

### User Story 2 - Dark Mode Audit (Priority: P1)

As a User on Dark Mode, I want all components, borders, and backgrounds to use `light-dark()` instead of hardcoded grays, so the interface remains premium and readable in all lighting conditions.

**Why this priority**: Essential for the "premium" requirement and previously requested improvements.

**Independent Test**: Toggle Dark Mode and verify "Visão Geral" charts and containers adapt correctly without "strange" white/gray borders.

**Acceptance Scenarios**:

1. **Given** Dark Mode is active, **When** I view Overview cards, **Then** backgrounds must be `dark.7/8` and borders `dark.4` (using `light-dark`).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Page headers MUST follow the "Membros" pattern: `Group` > `ThemeIcon` (light/colored) > `Stack` (Title/Subtext).
- **FR-002**: All main page containers MUST have consistent padding and width (`xl`).
- **FR-003**: All entrance animations MUST use consistent `framer-motion` parameters.
- **FR-004**: System MUST NOT use hardcoded colors (`gray.0`, `#fff`) for backgrounds or borders; MUST use `light-dark()`.
- **FR-005**: All interaction shadows MUST follow the defined elevation scales in `theme.ts`.

### Key Entities *(include if feature involves data)*

- **Design Tokens**: Standardized colors, icons, and spacing units.
- **Header Component**: A standard layout for page identity.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of pages (Home, Overview, Members, OKR Details, Settings) have identical header layouts.
- **SC-002**: 0 instances of hardcoded non-theme colors found in `.tsx` files for layout elements.
- **SC-003**: 100% of page transitions feel fluid with no stutter in animations.
