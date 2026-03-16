# Quickstart: Design System Audit

## Correcting a Page
1. Import `PageHeader` from `src/presentation/components/common/PageHeader`.
2. Wrap the header section in the standardized `motion.div`.
3. Use the `farol-blue` theme color for icons and accents.
4. Replace all manual hex/gray strings with `light-dark()` or theme variables.

## Validation
- [ ] Header matches "Membros" pattern.
- [ ] Page uses `Container size="xl" py="xl"`.
- [ ] Dark Mode shows no hardcoded light grays.
- [ ] Animation is smooth and consistent.
