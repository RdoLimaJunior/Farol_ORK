# Research: Design System Standardization

## Identity Pattern (Reference: MembersManagement)

The goal is to extract a common `PageHeader` component that encapsulates:
1. **Icon**: ThemeIcon (variant: light, color: farol-blue, size: xl).
2. **Title**: order 1, weight 900, size rem(32), with a colored `span` for the primary noun.
3. **Subtext**: dimmed, weight 500, size lg/sm.
4. **Animation**: `framer-motion` (opacity 0 -> 1, y -20 -> 0).

## Detected Deviations in Overview.tsx
- Missing `ThemeIcon`.
- Animation uses `x` instead of `y`.
- Title font size is `rem(34)` instead of `rem(32)`.
- Subtext size is `sm` instead of `lg`.
- Missing colored span in Title.

## Detected Deviations in Home.tsx
- [ ] Need to check `WelcomeHeader` in `Home.tsx`.

## Decision: Shared Component
Create `src/presentation/components/common/PageHeader.tsx` with:
- `title: string | ReactNode`
- `description: string`
- `icon: IconComponent`
- `color?: string` (default: farol-blue)
- `rightSection?: ReactNode` (for buttons like "Convidar")
