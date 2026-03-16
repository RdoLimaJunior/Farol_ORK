# Quickstart: OKR Progress & Edits

## Setup
1. Switch to branch `002-edit-okr-updates`.
2. Sync Supabase migrations (if provided) or apply schema changes to `key_results`.

## Testing the Logic
- Unit tests for the calculator: `npm test src/domain/okr-calculator.test.ts`
- Verify "Smaller is Better" logic with negative progress prevention.

## Implementation Workflow
- Go to `OkrDetails.tsx`.
- Click on any Key Result's progress bar to trigger the `CheckInModal`.
- Verify the Audit Event appears in the bottom list after saving.
