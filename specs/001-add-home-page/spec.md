# Feature Specification: New Home Page and Dashboard Restructuring

**Feature Branch**: `001-add-home-page`  
**Created**: 2026-03-16  
**Status**: Draft  
**Input**: User description: "crie uma nova pagina inicial, (mantenha a Visão Geral atual) mas adicione uma home, nela quero a tela de início de volta que estava antes"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Accessing the Search-First Home Page (Priority: P1)

As an Admin, when I first log in or click "Início", I want to see a clean "Home" page that centers on the search interaction and contextual insights, so I can quickly find information or start a new task.

**Why this priority**: Focuses the product on its core value proposition of AI-assisted OKR management and quick access.

**Independent Test**: Can be tested by navigating to the root path `/` and verifying that the "Rocket" welcome, SmartPrompt, and ContextWidgets are displayed.

**Acceptance Scenarios**:

1. **Given** I am logged into FAROL, **When** I access the root URL `/`, **Then** I see the "Olá, Admin" message with the Rocket icon.
2. **Given** I am on the Home page, **When** I look at the content, **Then** I see the SmartPrompt (search bar) and the "Insights de Contexto" section.

---

### User Story 2 - Accessing the Executive Overview (Priority: P2)

As an Executive or Admin, I want to access the "Visão Geral" (Overview) dashboard from the sidebar, so I can see the consolidated KPIs, charts, and activity feed.

**Why this priority**: Essential for the stakeholder to monitor health and performance, which was previously on the home page.

**Independent Test**: Can be tested by clicking "Visão Geral" in the sidebar and seeing the charts and stats cards.

**Acceptance Scenarios**:

1. **Given** I am in the application, **When** I click on "Visão Geral" in the sidebar, **Then** I am navigated to `/overview`.
2. **Given** I am on `/overview`, **When** I view the page, **Then** I see the Summary Cards (Objectives, KRs, Actions, Progress) and the Charts (Donut and Bar).

---

### User Story 3 - Distinct Navigation for Home and Overview (Priority: P2)

As a user, I want clear separation between the task-oriented Home and the result-oriented Overview in the navigation menu.

**Why this priority**: Ensures a clean Information Architecture and avoids confusion.

**Independent Test**: Verify Sidebar has both "Início" and "Visão Geral" as separate links.

**Acceptance Scenarios**:

1. **Given** the Sidebar is visible, **When** I check the "GESTÃO ESTRATÉGICA" group, **Then** I see "Início" as the first link and "Visão Geral" as a separate link.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST have a new dedicated page for "Home" (Início) at route `/`.
- **FR-002**: System MUST restore the previous Dashboard content (Welcome, SmartPrompt, ContextWidgets) to the Home page.
- **FR-003**: System MUST move the current "Visão Geral" content to a new route `/overview`.
- **FR-004**: System MUST update the Sidebar to include both "Início" (Home icon) and "Visão Geral" (separate icon/label).
- **FR-005**: The Home page MUST be the default landing page after login.

### Key Entities *(include if feature involves data)*

- **Navigation**: Represents the application's structure and menu hierarchy.
- **Dashboard View**: Represents the different data visualizations (Overview vs. Operational Home).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can reach the Search bar on the Home page in 1 click from any other page.
- **SC-002**: Navigating between Home and Overview takes less than 300ms.
- **SC-003**: 100% of the previous Dashboard components are functional on the new Home page.
