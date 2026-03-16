# Feature Specification: OKR Editing and Progress Updates

**Feature Branch**: `002-edit-okr-updates`  
**Created**: 2026-03-16  
**Status**: Draft  
**Input**: User description: "Permitir edicao de OKRs, atualizacao de status, valor atual, nivel de confianca e registro de eventos baseado no modelo de planilha fornecido"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Updating Key Result Progress (Priority: P1)

As a KR Owner, I want to update the "Valor Atual" and "Nível de Confiança" of my Key Result, so that the system can automatically recalculate the progress of the Objective and the executive dashboard reflects the current state of the business.

**Why this priority**: Core functionality for keeping the platform data fresh and meaningful.

**Independent Test**: Can be tested by selecting a KR, changing its "Valor Atual", and verifying that the progress percentage updates correctly in the UI.

**Acceptance Scenarios**:

1. **Given** a KR with a Meta of 100 and Valor Atual of 20, **When** I update the Valor Atual to 50, **Then** the progress displays as 50%.
2. **Given** a KR update, **When** I select a "Nível de Confiança" (e.g., Alto, Médio, Baixo), **Then** this status is persistent and visible to other users.

---

### User Story 2 - Editing OKR Metadata (Priority: P2)

As an Admin or Manager, I want to edit the structural details of an OKR (Dimension, Relevance/Weight, Owner, etc.), so I can correct errors or adjust the strategy without creating a new objective.

**Why this priority**: Essential for maintaining data integrity and adapting to changes during the cycle.

**Independent Test**: Edit the "% de Relevância" of a KR and verify the weighted average of the parent Objective changes accordingly.

**Acceptance Scenarios**:

1. **Given** an existing OKR, **When** I click "Editar", **Then** I can modify fields like "Dimensão" (Quanto maior melhor/Quanto menor melhor), "Owner", and "Unidade".

---

### User Story 3 - Registering Check-in Events (Priority: P2)

As a user, when I update a value, I want to add a short comment or "evento" explaining the change, so that others can understand the context behind the numbers.

**Why this priority**: Provides the "Why" behind the "What", facilitating transparency and alignment.

**Independent Test**: Add an update with a comment and verify it appears in the "Atividade Recente" or "Histórico" section of the OKR.

**Acceptance Scenarios**:

1. **Given** a KR update form, **When** I input a value and a comment, **Then** both are saved as a single event in the history.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow editing of KR properties: Key Result Name, Owner, Unit, Baseline, Target (Meta), Relevance (%), and Dimension (Polarity).
- **FR-002**: System MUST support "Dimension" logic:
    - *Quanto maior melhor*: Progress = (Actual - Baseline) / (Target - Baseline)
    - *Quanto menor melhor*: Progress = (Baseline - Actual) / (Baseline - Target)
- **FR-003**: System MUST allow users to update the "Valor Atual" of a KR.
- **FR-004**: System MUST allow users to set a "Nível de Confiança" (e.g., scale 1-5 or descriptive: Low/Mid/High).
- **FR-005**: System MUST record every update as an "Event" with: Timestamp, User, New Value, and optional Comment.
- **FR-006**: System MUST automatically update Objective progress based on the weighted average of child KRs' progress.

### Key Entities *(include if feature involves data)*

- **Key Result (KR)**: Enhanced with Polarity (Dimension), Relevance (Weight), and Confidence level.
- **Check-in/Event**: A record of a point-in-time update to a KR.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete a KR check-in (update value and confidence) in under 15 seconds.
- **SC-002**: All progress calculations (Dimension-aware) are accurate to 2 decimal places.
- **SC-003**: 100% of updates are audit-trailed in the database.
