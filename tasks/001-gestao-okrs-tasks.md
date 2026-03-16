# Task Breakdown: 001-Gestao-OKRs

**Feature Branch**: `feature/001-gestao-okrs`
**Based on Plan**: `plans/001-gestao-okrs-plan.md`
**Status**: Ready for Implementation (Amended with SDD Clarifications)

Este documento quebra o plano técnico em passos de execução. Todas as tarefas devem focar na entrega de valor sem perder a arquitetura definida. Seguindo o Spec Kit, cada bloco é independente e testável.

## Phase 1: Setup & Data Foundation
- [x] T001 Instalar dependências adicionais: `npm install @supabase/supabase-js @mantine/form @mantine/dropzone @mantine/notifications @mantine/charts @mantine/carousel embla-carousel-react @mantine/spotlight @mantine/dates dayjs` 
- [x] T002 [P] Atualizar `src/domain/models/types.ts` com as novas interfaces (`Objective`, `KeyResult`, `KRUpdate`, `CriticalAnalysis`) incluindo campos `tenantId` e cadência.
- [x] T003 Criar `src/domain/services/okrMath.ts` com funções puras para cálculo de progresso ponderado e `suggestedStatus` baseado no tempo.
- [x] T004 Configurar `src/infrastructure/supabaseClient.ts` e exportar cliente inicializado.

## Phase 2: Foundational Shell & Tree Logic
- [x] T005 [P] Implementar o Layout Shell com Sidebar fixa e Navegação centralizada em `src/presentation/layouts/AppLayout.tsx`.
- [x] T006 Desenvolver o componente `src/presentation/components/TreeHierarchyView.tsx` para renderizar a relação pai-filho dos Objetivos.
- [x] T007 [P] Implementar o Command Palette (Spotlight) em `src/presentation/components/GlobalSearch.tsx` para busca rápida de objetivos.

## Phase 3: [US1] CRUD & Alinhamento (P1)
**Goal**: Permitir criação de Objetivos com alinhamento em cascata.
**Independent Test**: Criar um Objetivo, visualizar na lista e verificar FK do "Objetivo Pai" no Supabase.
- [x] T008 [US1] Criar modal `ObjectiveForm.tsx` com campos de Título, Ciclo, Cadência e Flag de Confidencialidade.
- [x] T009 [US1] Implementar seletor de "Objetivo Pai" no formulário filtrando objetivos de nível superior.
- [x] T010 [US1] Integrar criação do Objetivo com Supabase salvando o `tenantId` da sessão.

## Phase 4: [US2/3] Key Results & Progresso (P1)
**Goal**: Gestão de KRs e cálculo automático de progresso.
**Independent Test**: Adicionar 2 KRs a um Objetivo e verificar se o progresso do Objetivo reflete a média ponderada.
- [x] T011 [US2] Criar formulário `KeyResultForm.tsx` com campos de Unidade (%, R$, qtd), Valor Inicial, Meta e Peso.
- [x] T012 [US3] Implementar o hook `useOkrCalculation` que consome as funções do `okrMath.ts` para injetar progresso dinâmico nos componentes de UI.
- [x] T013 [US3] Desenvolver `OkrCard.tsx` com RingProgress e semáforo de status (incluindo badge "Stale").

## Phase 5: [US4/4.5] Check-ins & Auditoria (P1)
**Goal**: Rastreabilidade de atualizações e análise de confiança.
**Independent Test**: Realizar um check-in de KR e visualizar a mudança no histórico com comentário e emoji de confiança.
- [x] T014 [US4] Criar página `OkrDetailView.tsx` com feed histórico de `kr_updates`.
- [x] T015 [US4.5] Desenvolver modal `KrCheckInForm.tsx` com input numérico, seletor de emoji de confiança e campo obrigatório de comentário.
- [x] T016 [US4.5] Implementar lógica de "Manual Status Override" no formulário de check-in com campo de justificativa obrigatória.

## Phase 6: [US5] Governança & Análise Crítica (P1)
**Goal**: Obrigar análise estruturada de falhas e planos de ação.
**Independent Test**: Tentar finalizar um check-in de KR no vermelho e ser bloqueado/instruído a preencher o "5 Porquês".
- [x] T017 [US5] Desenvolver `CriticalAnalysisModal.tsx` com interface para 5 Porquês / Ishikawa.
- [x] T018 [US5] Implementar fluxo que obriga a criação/vinculação de uma "Ação Corretiva" (Iniciativa) para salvar a análise crítica. [SDD GAP FIX]

## Phase 7: [US6] Evidências & Gamificação (P2)
**Goal**: Tangibilizar o resultado e aumentar engajamento.
**Independent Test**: Anexar uma foto em um check-in e ver a imagem renderizada no feed como miniatura.
- [x] T019 [US6] Integrar `Mantine Dropzone` no check-in para upload de evidências visuais (fotos/prints).
- [x] T020 [US6] Criar `ProfileHeader.tsx` com Barra de XP e Nível do Usuário (Gamificação).

## Phase 8: Polish & Global State
- [ ] T021 Implementar Skeleton Loading em todas as páginas e Toasts de feedback (sucesso/erro).
- [ ] T022 Configurar `Zustand` ou `React Query` para cache de dados e sincronização em tempo real (Realtime Supabase).
