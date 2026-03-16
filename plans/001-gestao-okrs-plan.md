# Technical Plan: 001-Gestao-OKRs

**Feature Branch**: `feature/001-gestao-okrs`
**Based on Spec**: `specs/001-gestao-okrs.md`
**Status**: Draft

## 1. Architecture Overview

### Frontend (React + Vite + Mantine)
A interface será construída seguindo uma mescla de **Feature-Sliced Design** simplificado com **Domain-Driven Design (DDD)**. 
A lógica de negócio (cálculos de OKR, tipos) ficará completamente agnóstica de UI no diretório `src/domain`.

**Estrutura de Pastas Alvo:**
```text
src/
├── domain/                  # Lógica pura (TypeScript Models, Math)
│   ├── models/types.ts      # (Objective, KeyResult já definidos)
│   └── services/okrMath.ts  # Funções puras: calculateProgress()
├── infrastructure/          # Integração externa
│   └── supabaseClient.ts    # Configuração e inicialização do DB
├── application/             # Hooks de estado (React Query ou Zustand)
│   └── useOkrs.ts           # Fetching e Mutating do Supabase
├── ui/                      # Camada Visual (Mantine)
│   ├── components/          # Botões, Cards, ProgressRings isolados
│   ├── features/            # Componentes complexos (ex: OkrList, KrForm)
│   └── pages/               # Páginas roteadas (Dashboard, OkrDetails)
└── App.tsx                  # Ponto de entrada
```

### Backend & Database (Supabase / PostgreSQL)

**Tabela: `objectives`**
- `id`: uuid (PK, default `uuid_generate_v4()`)
- `tenant_id`: uuid (not null) // Separação SaaS
- `title`: text (not null)
- `description`: text (nullable)
- `owner_id`: uuid (FK -> auth.users)
- `status`: text (default 'draft') // 'on_track', 'at_risk', 'off_track', 'stale'
- `check_in_cadence`: text (default 'monthly') // 'weekly', 'biweekly', 'monthly'
- `is_confidential`: boolean (default false)
- `created_at`: timestamptz (default now())
- `updated_at`: timestamptz

**Tabela: `key_results`**
- `id`: uuid (PK)
- `tenant_id`: uuid (not null)
- `objective_id`: uuid (FK -> objectives.id, ON DELETE CASCADE)
- `title`: text (not null)
- `unit`: text (not null) // 'percentage', 'currency', 'number'
- `start_value`: numeric (not null, default 0)
- `target_value`: numeric (not null)
- `current_value`: numeric (not null, default 0)
- `weight`: numeric (not null, default 1)
- `status`: text (default 'draft')

**Tabela: `kr_updates` (Auditoria e Check-in)**
- `id`: uuid (PK, default `uuid_generate_v4()`)
- `tenant_id`: uuid (not null)
- `key_result_id`: uuid (FK -> key_results.id, ON DELETE CASCADE)
- `owner_id`: uuid (FK -> auth.users)
- `previous_value`: numeric (not null)
- `new_value`: numeric (not null)
- `manual_status_override`: text (nullable)
- `status_override_justification`: text (nullable)
- `comment`: text (not null)
- `evidence_urls`: text[] (nullable) // URLs do Supabase Storage
- `testimonials`: text[] (nullable) // Depoimentos vinculados
- `update_date`: timestamptz (default now())

**Tabela: `critical_analyses` [CLARIFIED]**
- `id`: uuid (PK)
- `tenant_id`: uuid (not null)
- `kr_update_id`: uuid (FK -> kr_updates.id)
- `tool_type`: text // 'five_whys', 'ishikawa'
- `analysis_data`: jsonb
- `action_ids`: uuid[] // IDs de Ações/Iniciativas vinculadas
- `author_id`: uuid (FK)
- `created_at`: timestamptz

**Infraestrutura Extra: Supabase Storage**
- Bucket: `okr-evidences` (Público, para upload rápido das fotos e vídeos enviados via Mantine Dropzone).

*Nota sobre `progress`:* O campo "progress" não será salvo no banco de dados para evitar inconsistências. Ele será derivado/calculado *on-the-fly* no Frontend usando as funções matemáticas puras na pasta `domain/`.

## 2. API & Data Flow
Como estamos usando o Cliente do Supabase diretamente no Frontend (Backend-as-a-Service):
1. O usuário submete um form na `ui/features/KrUpdateForm` para registrar um check-in.
2. A camada `application/useOkrs` dispara uma Transaction RPC ou duas chamadas: (a) `INSERT` na tabela `kr_updates` e (b) `UPDATE` no `current_value` da tabela `key_results`.
3. O Supabase atualiza.
4. O Frontend faz um re-fetch (ou recebe via realtime subscription) a listagem bruta.
5. Os dados em JSON são passados para `domain/services/okrMath.ts` para aplicar a tipagem TS, injetar a propriedade dinâmica `progress` e calcular o `suggestedStatus` baseado no tempo decorrido.
6. A propriedade `progress` enriquecida e o status sugerido são então repassados para a UI.

## 3. Libraries Necessárias
- `@mantine/core`, `@mantine/hooks`, `@tabler/icons-react` (UI e Ícones).
- `@supabase/supabase-js` (Database).
- `react-router-dom` (Navegação).
- Opcional sugerido (mas recomendado): `@tanstack/react-query` para gerenciar os estados de loading e cache das consultas ao Supabase.

## 4. Próxima Etapa: Tasks Breakdown
A partir deste plano, iremos gerar as `tasks/001-setup-and-crud.md` para iniciar as instalações e a codificação de fato.
