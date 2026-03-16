# Task Breakdown: 001-Setup-and-CRUD

**Feature Branch**: `feature/001-gestao-okrs`
**Based on Plan**: `plans/001-gestao-okrs-plan.md`
**Status**: Ready for Implementation (Amended with SDD Analysis)

Este documento quebra o plano técnico em passos de execução. Todas as tarefas devem focar na entrega de valor sem perder a arquitetura definida. Seguindo o Spec Kit, cada bloco é independente.

## Phase 1: Foundation (React + Vite + Mantine)
- [ ] **Task 1.1**: Inicializar o projeto na pasta `Farol_ORK` com Vite, React e TypeScript (`npx create-vite . --template react-ts`).
- [ ] **Task 1.2**: Instalar as bibliotecas base:
  ```bash
  npm install @mantine/core @mantine/hooks @mantine/form @mantine/dropzone @tabler/icons-react @supabase/supabase-js react-router-dom i18next react-i18next @mantine/charts @mantine/notifications @mantine/carousel embla-carousel-react @mantine/spotlight @mantine/dates dayjs
  ```
- [ ] **Task 1.3**: Configurar o Provider do Mantine no `App.tsx` (incluindo ModalsProvider, Notifications e NavigationProgress).
- [ ] **Task 1.4**: Criar a estrutura de pastas (`src/domain`, `src/infrastructure`, `src/application`, `src/ui`).
- [ ] **Task 1.5**: Transcrever as interfaces `Objective`, `KeyResult` e `KRUpdate` para `src/domain/models/types.ts`, garantindo que todas herdem `tenantId`.
- [ ] **Task 1.6**: Criar o arquivo `src/domain/services/okrMath.ts` com lógica de cálculo de progresso ponderado (Objetivo) e semáforos de status.

## Phase 2: Backend Connection (Supabase)
- [ ] **Task 2.1**: Criar o arquivo `src/infrastructure/supabaseClient.ts` inicializando o cliente com envs.
- [ ] **Task 2.2**: Executar script SQL no Supabase para gerar as tabelas `objectives`, `key_results` e `kr_updates` incluindo a coluna `tenant_id` e políticas de RLS (Row Level Security) básicas por `tenant_id`.

## Phase 3: UI - Framework & Navigation
- [ ] **Task 3.1**: Implementar o Layout Shell com Sidebar fixa e Navegação entre Dashboard, Estratégia e Design System.
- [ ] **Task 3.2**: Implementar o Command Palette (Spotlight) para busca rápida de Objetivos.
- [ ] **Task 3.3**: Criar componente `TreeHierarchyView` para visualização em cascata (Objetivos Pais e Filhos). [SDD GAP FIX]

## Phase 4: Core OKR Dashboard
- [ ] **Task 4.1**: Desenvolver o Componente `ui/components/OkrCard.tsx` com RingProgress e Badge de Confiança.
- [ ] **Task 4.2**: Desenvolver `ui/pages/Dashboard.tsx` com filtros de Tenant e Ciclo.
- [ ] **Task 4.3**: Implementar Skeleton Loading e Empty States amigáveis (incluindo botão de CTA para criar 1º Objetivo).

## Phase 5: Mutations & Check-ins
- [ ] **Task 5.1**: Modal CRUD de Objetivos e KRs com validação de campos obrigatórios.
- [ ] **Task 5.2**: Feature `ui/features/KrUpdateForm.tsx` com uploader visual (Dropzone) e campo de Análise qualitativa (Comentário).
- [ ] **Task 5.3**: Criar Feature `CriticalAnalysisModal` (5 Porquês / Ishikawa) disparada quando um KR cai para o status "Off Track". [SDD GAP FIX]

## Phase 6: Gamification Foundation
- [ ] **Task 6.1**: Implementar o componente de Profile Header com XP progress e Medal Carousel (Achievements).
- [ ] **Task 6.2**: Lógica de cálculo de Streak no frontend e exibição de badges de engajamento no Dashboard.
