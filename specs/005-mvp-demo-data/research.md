# Research: MVP Data Seeding & Personas

## Personas Discovery (IDIBRA Context)

Based on the construction/real estate context (IDIBRA) and previous interactions, we will populate 25 members across different hierarchy levels.

### Roles & Departments

1. **Strategic (Directors)**
   - Cícero (CEO/Managing Director) - *Mentioned in user prompt*
   - Diretor Comercial
   - Diretor Financeiro (CFO)
   - Diretor de Operações (COO)

2. **Tactical (Managers/Coordinators)**
   - Patrick Silva (Gerente de BI/Operacional) - *Existing placeholder*
   - Gerente de RH
   - Gerente de Engenharia
   - Coordenador de Projetos
   - Gerente de Vendas
   - Gerente de Marketing

3. **Operational (Specialists/Analysts)**
   - Analista de RH
   - Engenheiro de Campo (Garden Praia Project)
   - Analista Financeiro
   - Especialista em Marketing Digital
   - Analista de Suprimentos
   - Coordinador de Obra

## Existing OKRs Analysis

Currently, we have placeholders (OE1-OE4, OT3, etc.).
- **OE1**: Transformar cada projeto em uma obra prima... (Owner: Cícero)
- **OE4**: Elevar performance operacional e reduzir rotatividade... (Owner: Gerente de RH)
- **OT3**: Alcançar um orçamento e projeto executivos... (Owner: Cícero)

## Database Seeding Strategy

Since we are in a development environment with Supabase, we can create a script to insert these profiles into the `profiles` table.

### Profile Structure
- `id`: UUID (Mocked)
- `tenant_id`: `00000000-0000-0000-0000-000000000000`
- `full_name`: string
- `email`: `name.lowercase@idibra.com.br`
- `role`: `member` (or `admin` for directors)
- `job_title`: string
- `department`: string
- `is_active`: true
- `xp_points`: random range (50-2000)
- `level`: calculated from XP

### Assignment Plan
- Distribute the 11 objectives across the 10 managers/directors.
- Distribute Key Results across specialists.
