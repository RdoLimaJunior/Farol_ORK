# Feature Specification: 002-Iniciativas-Acoes

**Feature Branch**: `feature/002-iniciativas-acoes`
**Created**: 2026-03-15
**Status**: Draft
**Input**: Cadastro de Iniciativas (Projetos Mestre) e Ações (Tarefas Filhas), com visualização de prazos e bloqueios (Semáforo).
**UX Basis**: `discovery-002-iniciativas.md`

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Criar Iniciativas atreladas a um KR (Priority: P1)
A gestora (**Ana - The Manager**) deve poder criar uma Iniciativa (um projeto macro) como resposta a um KR que ela percebe que "não vai se bater sozinho".
**Why this priority**: É a ponte entre a métrica fria (KR) e o trabalho real (Projeto).
**Independent Test**: Criar uma iniciativa via formulário e checar a ForeignKey que a ata à tabela de KRs.
**Acceptance Scenarios**:
1. **Given** a visão detalhada de um KR, **When** Ana clica em "Adicionar Iniciativa", **Then** um modal abre solicitando Nome, Responsável, Data de Início e Prazo Fim.
2. **Given** a tabela listando a Iniciativa recém-criada, **When** Ana olha para o design (UX), **Then** a linha inteira (Row) da tabela deve ser clicável (Affordance) e não apenas o texto do nome.

---

### User Story 2 - Cadastro Rápido de Ações em Lote (Priority: P1)
O operador (**Lucas - The Contributor**) deve poder fatiar sua Iniciativa em dezenas de tarefinhas (Ações) de forma sequencial, sem fricção, usando apenas a tecla Enter, evitando burocracia excessiva.
**Why this priority**: Evitar o atrito clássico de ferramentas lentas onde "cadastrar a tarefa demora mais que executá-la" (Redução de custo de interação).
**Independent Test**: Num componente de lista (Mantine), digitar o nome de uma ação, teclar Enter, e o banco (Supabase) salvar no fundo sem travar a interface.
**Acceptance Scenarios**:
1. **Given** a aba "Plano de Ação" de uma Iniciativa, **When** Lucas digita a tarefa no campo e aperta `Enter`, **Then** a Ação é salva com Status Padrão "A Fazer" e o input é limpo imediatamente, focado novamente para a próxima tarefa.
2. **Given** a salvaguarda de UX (Validação da Persona **Camila**), **When** abrir a tela de Ações vazia pela primeira vez, **Then** exibir um Empty State educativo de como quebrar Iniciativas em Ações.

---

### User Story 2.5 - Modo Foco e Conexão de Propósito (Priority: P1)
Sempre que um usuário focar/abrir os detalhes de uma Ação (Tarefa Tática), o sistema deve evidenciar visualmente a qual Meta (KR) ela pertence, criando a ponte motivacional entre o esforço e a estratégia.
**Why this priority**: Evita que o FAROL seja um "To-Do List" alienante, respondendo à premissa de que a "Execução é escrava da Estratégia".
**Independent Test**: Clicar numa Ação Trivial (ex: Trabalhar em planilhas) e receber o banner superior informando a Meta Atrelada (ex: Atingir 1 milhão).
**Acceptance Scenarios**:
1. **Given** o detalhe de uma Ação, **When** ele é montado na tela, **Then** o cabeçalho imediatamente exibe um *Badge Dinâmico*: *"Isso ajuda a atingir o KR de [Nome]"*.
2. **Given** o *Badge Dinâmico*, **When** o usuário clica nele, **Then** a interface desliza para o Modal ou Grafo exibindo o progresso atual do KR vinculado, provando a tese de Arquitetura em Fluxo.

---

### User Story 3 - Semáforo Visual de Prazos (Priority: P1)
O sistema deve verificar a Data Limite de cada Iniciativa e Ação nativamente todo dia, pintando o componente com o respectivo semáforo visual.
**Why this priority**: Satisfaz o Job Story da Gestora de "saber o que empacou com um bater de olhos" e atende o Requisito Base do Sistema (Identificação automática de ações atrasadas).
**Independent Test**: Mudar a data de hoje para uma data posterior ao prazo da Ação e checar se o componente altera de Neutro para Vermelho/Warning.
**Acceptance Scenarios**:
1. **Given** que o prazo final da Ação X expirou hoje, **When** o componente é renderizado, **Then** o Status muda para "Atrasado" e exibe um distintivo/badge de Atenção.
2. **Given** a validação UX de Acessibilidade (Daltonismo), **When** o Semáforo pintar de vermelho, **Then** ele DEVE vir acompanhado de um ícone diferente geometricamente (Ex: ⚠️) e não apenas depender da cor (Respeitando a "Voice" Corporativa).

---

### User Story 3.5 - Desdobramento de Análise Crítica em Ação (Priority: P1)
Sempre que um gestor preencher um "5 Porquês" ou "Ishikawa" de um KR (Módulo 001), ele deve conseguir criar uma Ação de correção diretamente a partir dessa análise, vinculando-a ao plano.
**Why this priority**: Evita que a análise crítica seja apenas "burocracia de papel" e garante execução corretiva.
**Independent Test**: Criar uma Ação passando a ForeignKey `criticalAnalysisId` e constatar que ela aparece no painel de ações com a Tag "Ação Corretiva".
**Acceptance Scenarios**:
1. **Given** o formulário concluído de um diagrama de Ishikawa, **When** o usuário clica em "Gerar Ação a partir desta Causa", **Then** o sistema pré-preenche um cadastro de Ação com o texto da causa raiz.
2. **Given** a tabela listando essa Ação, **When** visualizada, **Then** ela deve ter um indicador visual ou Breadcrumb informando que ela nasceu de uma Análise Crítica (FR-014 / Regras de Negócio).

---

### User Story 4 - Justificativa de Re-Prazo Humanizada (Priority: P2)
Sempre que um prazo atrasado for editado para o futuro (adiado), o funcionário precisa justificar o motivo sem se sentir num tribunal de inquisição.
**Why this priority**: Tira o peso punitivo da ferramenta, ajudando a quebrar a barreira do **Roberto - O Cético**.
**Independent Test**: Modificar o `endDate` de uma Ação que está 'Atrasada' e validar se o front-end trava exigindo o campo de motivo amigável.
**Acceptance Scenarios**:
1. **Given** uma Ação atrasada, **When** o usuário tenta editar a data de término para a próxima semana, **Then** um Modal se abre com o título leve: *"Acontece nas melhores equipes! Qual foi o bloqueio que tivemos?"*
2. **Given** o texto de bloqueio inserido, **When** salvo, **Then** a data é adiada e o texto é postado no "Histórico da Tarefa" para transparência do time.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-016**: CRUD Iniciativas (Vinculado a um KR com data_inicio e data_fim).
- **FR-017**: Sistema Automático de Semáforo (On Track/Sem problema, Atenção, Crítico) para Iniciativas e Ações.
- **FR-018**: Registro de Replanejamento de Datas (Tabela anexa consolidando histórico de atrasos).
- **FR-019**: CRUD Ações (Vinculadas a uma Iniciativa ou a uma Análise Crítica, definindo prazo e responsável).
- **FR-020**: Detecção e alteração diária / em tempo real do Semáforo (Identificação automática de ações atrasadas).

### Key Entities (Domain Models in TypeScript)

```typescript
// ./src/domain/models/actionPlan.ts

export type InitiativeStatus = 'not_started' | 'in_progress' | 'completed' | 'canceled';
export type TrafficLight = 'on_track' | 'at_risk' | 'delayed'; // O Semáforo

export interface Initiative {
  id: string;
  keyResultId: string;       // Foreign Key (Vem do módulo 001)
  ownerId: string;           // Quem gerencia a iniciativa (ex: Ana)
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: InitiativeStatus;
  trafficLight: TrafficLight; // Calculado. Se (now > endDate && status != completed), delayed.
  createdAt: string;
  updatedAt: string;
}

export interface ActionItem {
  id: string;
  initiativeId?: string;     // FK (Vem de Initiative) - Opcional se vier da Análise
  criticalAnalysisId?: string; // FK -> Nasceu de um 5 Porquês/Ishikawa
  ownerId: string;           // Quem executa a tarefa (ex: Lucas)
  title: string;
  isCompleted: boolean;      // Checkbox simples e rápido
  startDate?: string;
  endDate?: string;          // Usado pro Semáforo no nível da Ação (se tiver)
  trafficLight: TrafficLight;
  createdAt: string;
  updatedAt: string;
}

export interface ReschedulingLog {
  id: string;
  actionItemId?: string;     // Polimórfico - Ou adia a ação
  initiativeId?: string;     // Polimórfico - Ou adia a iniciativa
  userId: string;
  previousEndDate: string;
  newEndDate: string;
  humanizedReason: string;   // A justificativa sem tom punitivo
  createdAt: string;
}
```

## Success Criteria *(mandatory)*
- **SC-001**: O formulário de criação de Ações em lote deve suportar 5 adições consecutivas via `Enter` pelo teclado em menos de 10 segundos de operação fluida pelo usuário, comprovando alta responsividade (UX NFR-003).
- **SC-002**: Cores de semáforo (Tech Green, Tech Orange, Red) mapeadas corretamente a partir do `figma-tokens.json` recém desenhado, amparadas por contrastantes iconográficos (NFR-011).
