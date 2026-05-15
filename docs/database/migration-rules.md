# Migration Rules

## Rules

- Every schema change must be captured in a migration
- Migrations should be reversible when practical
- Keep migration files small and focused
- Document any breaking change
- Do not hand-edit production state outside the migration path
- Introduce RLS with the schema that depends on it
- Prefer incremental database-first changes before UI work

## Naming guidance

- Use clear, chronological migration names
- Prefer descriptive verbs over vague version labels
