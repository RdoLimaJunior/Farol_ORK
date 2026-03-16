# Requirements Checklist: MVP Demo Data Seeding

- [x] **FR-001**: System MUST be seeded with 25 profiles based on IDIBRA personas.
- [x] **FR-002**: Each seeded profile MUST include: `full_name`, `email`, `job_title`, `department`, and `role`.
- [x] **FR-003**: Existing `objectives` and `key_results` MUST be updated to assign `owner_id` to these new members.
- [x] **FR-004**: Data seeding MUST be reproducible (Triggered via Settings).
- [x] **FR-005**: Avatars are handled by initials in UI.

## Specific Criteria

- [x] Profiles created in `profiles` table.
- [x] Proper association with existing OKRs.
- [x] Visual feedback in Settings page after execution.
