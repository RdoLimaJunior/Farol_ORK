# Farol OKR — Contexto para Claude Code

Este arquivo é lido automaticamente no início de cada conversa. Contém tudo que você precisa saber antes de tocar no código.

---

## O que é o projeto

**Farol OKR** é uma plataforma web de gestão estratégica por OKRs. Permite que times façam check-ins semanais, acompanhem Key Results, gerenciem iniciativas e ações, e visualizem saúde organizacional com indicadores de governança.

O sistema é multi-tenant (preparado para múltiplas organizações), tem autenticação via Supabase e roda hoje com dados mock locais para desenvolvimento.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 18 + TypeScript + Vite |
| UI | **Mantine v8** (componente principal — usar sempre que possível) |
| Ícones | **@tabler/icons-react** (padrão do projeto — não misturar com lucide) |
| Gráficos | Recharts + @mantine/charts |
| Animações | Framer Motion |
| Roteamento | React Router v6 |
| Backend/Auth | Supabase (ainda em migração — hoje usa mock local) |
| Datas | dayjs |
| Estilo | Mantine theme-first. Tailwind existe no projeto mas é secundário. |

---

## Arquitetura

O projeto segue **Clean Architecture** em camadas:

```
src/
├── domain/
│   ├── models/          # Types e interfaces (types.ts, okr.ts, governance.ts)
│   └── services/        # Lógica pura de negócio (okrMath.ts, governanceLogic.ts)
│
├── application/
│   ├── hooks/           # Hooks que orquestram domain + infrastructure
│   └── services/        # Serviços de aplicação (AiAssistantService, checkinService)
│
├── infrastructure/
│   ├── data/            # Mock storage e mock_db.json
│   └── supabase/        # Client Supabase (futuro backend)
│
└── presentation/
    ├── components/      # Componentes reutilizáveis
    ├── pages/           # Páginas e sub-componentes de página
    │   └── checkin/     # Componentes específicos do fluxo de check-in
    ├── layouts/         # AppLayout (shell com sidebar)
    └── theme/           # Tema Mantine customizado
```

**Regra importante:** lógica de negócio fica em `domain/services/`, nunca dentro de componentes ou páginas.

---

## Tema e Design System

- **Cor primária:** `farol-blue` (custom — escala de azul claro a escuro)
- **Fonte principal:** Inter (corpo) + Ubuntu (headings)
- **Cores semânticas customizadas:** `success`, `warning`, `error`
- **Paper e Card:** têm `withBorder` e `radius="lg"` por padrão via theme
- **Badge:** `variant="light"` e `radius="sm"` por padrão

### Gradientes disponíveis (theme.other.gradients)
`blueMain`, `blueDeep`, `techGreen`, `techPurple`, `formationWarm`, `formationDeep`, `managementNeutral`, `engineeringGray`

### Padrão de cores para status OKR
| Status | Cor Mantine |
|---|---|
| `on_track` | `teal` |
| `at_risk` | `orange` |
| `off_track` | `red` |
| Confiança alta | `violet` |
| Confiança baixa | `red` |

### Função utilitária de saúde (usada em RingProgress e badges)
```ts
const healthColor = (value: number) =>
  value >= 70 ? 'teal' : value >= 40 ? 'orange' : 'red';
```

---

## Dados e Modelos

### Fonte de dados atual
`src/infrastructure/data/mock_db.json` — contém:
- `profiles` — 8 usuários (user-lima, user-lidia, user-luciana, user-carlos, user-ana, user-roberto, user-juliana, user-marcos)
- `objectives` — 8 objetivos (O1–O8, níveis organizational e departmental)
- `krs` — 20 Key Results distribuídos pelos objetivos
- `fcas` — 3 registros FCA (Fato, Causa, Ação)
- `initiatives` — 7 projetos/iniciativas
- `actions` — 7 ações

### Campos calculados (não estáticos)
O hook `useOkrCalculation` calcula dinamicamente para cada objetivo:
- `progress` — via `calculateObjectiveProgress()` (média ponderada dos KRs pelo weight)
- `adhesionPercentage` — via `calculateAdhesion()` — **hoje é proxy**: % de KRs com `confidence` e `currentValue` preenchidos
- `climateStatus` — via `calculateClimate()` — **hoje é proxy**: derivado de KRs `off_track` ou `confidence === 'baixa'`. Retorna `'success'` | `'warning'` | `'error'`
- `maturityLevel` — via `calculateMaturity()` — retorna `'BRONZE'` | `'PRATA'` | `'OURO'`

### KR polarity
KRs podem ser `ascending` (maior é melhor) ou `descending` (menor é melhor — ex: churn, inadimplência). O `calculateKRProgress` trata isso corretamente.

---

## Fluxo Principal — Check-in

Rota: `/ceremony/checkin` → `CheckinFlow.tsx`

O fluxo de check-in é a feature core do produto. Componentes envolvidos:

```
CheckinFlow.tsx                  ← página orquestradora
├── CeremonyDashboard.tsx        ← painel de saúde (7 cards de indicadores)
├── ObjectiveSection.tsx         ← seção por objetivo
│   └── KRCard.tsx               ← card individual de Key Result
├── ActionTable.tsx              ← tabela de ações
├── ProjectBoard.tsx             ← kanban de iniciativas
├── FCAMatrix.tsx                ← formulário FCA
└── EvidenceDrawer.tsx           ← upload de evidências
```

---

## CeremonyDashboard — Estado Atual

Implementado em `src/presentation/pages/checkin/CeremonyDashboard.tsx`.

**7 cards em 2 linhas:**

Linha 1 — 4 cards OKR (SimpleGrid 4 cols):
- **Objetivos** — total + RingProgress (progresso médio %)
- **Key Results** — total + RingProgress (% on track) + badges de confiança
- **Projetos** — total + RingProgress (progresso médio %)
- **Ações** — total + RingProgress (% concluídas)

Linha 2 — 3 cards de Governança (SimpleGrid 3 cols):
- **Índice de Adesão (IA)** — fundo `violet.0`
- **Índice de Clima (IC)** — RingProgress multi-seção (success/warning/error), fundo dinâmico
- **Maturidade OKR (AM)** — RingProgress multi-seção (OURO/PRATA/BRONZE), fundo `yellow.0`

Seguido de seção "KRs que precisam de atenção" com scroll.

**Padrão de card (consistente em todos os 4 cards principais):**
```
[Label + ícone ThemeIcon size="sm"]
[Total (rem(30), bold) + RingProgress size=62 thickness=6]
[Subtitle "total de X"]
[Badges de breakdown]
```

---

## Rotas da Aplicação

| Rota | Página | Descrição |
|---|---|---|
| `/` | Home | Dashboard principal com widgets |
| `/overview` | Overview | Visão geral dos OKRs |
| `/strategy` | OkrLevelPage | Objetivos estratégicos (organizational) |
| `/tactical` | OkrLevelPage | Key Results táticos (departmental) |
| `/execution` | ActionPlans | Planos de ação |
| `/checkins` | Checkins | Histórico de check-ins |
| `/ceremony` | CeremonyHub | Hub de cerimonias |
| `/ceremony/checkin` | CheckinFlow | Fluxo de check-in semanal |
| `/engagement` | Engagement | Engajamento e cultura |
| `/feedbacks` | Analytics | Feedbacks e analytics |
| `/reports` | Reports | Relatórios |

---

## Metodologia OKR (referência rápida)

O arquivo `METHODOLOGY_OKR.md` na raiz é a fonte de verdade completa. Pontos críticos:

- **KR é Outcome, nunca Output.** "Reduzir churn em 5%" é KR. "Fazer reunião de planejamento" não é.
- **FCA obrigatório** quando confidence < 8 (ou `baixa`). Fato → Causa (5 Porquês) → Ação SMART.
- **Score sweet spot:** 0.6–0.7. Score 1.0 = meta conservadora demais.
- **Alinhamento vertical:** KR departamental deve ter `parentObjectiveId` apontando para objetivo organizacional.
- **Maturidade:** BRONZE (adesão ≥ 80%) → PRATA (+ evidências + progresso ≥ 40%) → OURO (+ progresso ≥ 70% + clima verde).

---

## Limitações conhecidas / Débito técnico

| Item | Status | Obs |
|---|---|---|
| Backend Supabase | Em migração | Hoje tudo roda em mock local |
| Índice de Adesão real | Proxy | Falta campo `lastCheckInAt: DateTime` por KR |
| Índice de Clima real | Proxy | Falta campo `moodScore` por check-in e e-NPS trimestral |
| Timestamps de check-in | Ausente | Necessário para IA e métricas de cadência |
| Multi-tenancy | Preparado | `tenantId` existe nos dados, não está ativo |

---

## Convenções de código

- Componentes: `PascalCase`, arquivos `.tsx`
- Hooks: `camelCase` com prefixo `use`, arquivos `.ts`
- Serviços de domínio: funções puras exportadas, sem estado
- **Não criar helpers/abstrações para uso único** — repetir o padrão é preferível a prematura abstração
- **Não adicionar comentários óbvios** — só onde a lógica não é autoevidente
- Ícones: sempre de `@tabler/icons-react`, nunca misturar com `lucide-react`
- Cores de status: sempre usar a convenção da tabela acima (teal/orange/red)
