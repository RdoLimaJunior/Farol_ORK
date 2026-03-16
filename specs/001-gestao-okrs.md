# Feature Specification: 001-Gestao-OKRs

**Feature Branch**: `feature/001-gestao-okrs`  
**Created**: 2026-03-15  
**Status**: Draft  
**Input**: Cadastro de Objetivos, KRs e Cálculo Automático de Progresso.

## Clarifications

### Session 2026-03-15
- Q: Gatilhos de Status Automáticos → A: **Misto**. O sistema sugere um status baseado no cálculo linear de tempo vs. progresso, mas permite que o usuário sobrescreva manualmente justificando a alteração.
- Q: Cascata e Pesos → A: **Contributivo**. O progresso de um Objetivo Pai é a média ponderada de seus Key Results diretos somada ao progresso consolidado de seus Objetivos Filhos (cada filho conta como um item de peso 1 por padrão).
- Q: Frequência e Prazos de Check-in → A: **Configurável**. O dono do Objetivo define a cadência esperada (Semanal, Quinzenal ou Mensal). O sistema sinaliza "Stale" (Desatualizado) se o prazo configurado for ultrapassado sem novos check-ins.
- Q: Visibilidade e Privacidade → A: **Público por Default**. Todo Objetivo é visível para qualquer pessoa da empresa (SaaS Tenant), a menos que seja explicitamente marcado como "Confidencial" (visível apenas para o dono e gestores de nível superior).
- Q: Encerramento da Análise Crítica → A: **Vinculação Obrigatória**. Toda Análise Crítica (5 Porquês/Ishikawa) deve obrigatoriamente gerar/vincular pelo menos uma Ação (Iniciativa) corretiva para ser considerada concluída no sistema.


## User Scenarios & Testing *(mandatory)*

### User Story 1 - Cadastro de Objetivos (Priority: P1)
O gestor da área deve ser capaz de criar, editar e listar seus Objetivos corporativos e vinculá-los a um ciclo/prazo específico.
**Why this priority**: É a fundação do aplicativo. Nenhum OKR existe sem o "O".
**Independent Test**: Pode ser testado criando um objetivo com título, descrição e salvando-o no banco (Supabase) via interface (Mantine).
**Acceptance Scenarios**:
1. **Given** que o usuário está no Dashboard, **When** clica em "Novo Objetivo", **Then** um modal do Mantine se abre solicitando Título, Descrição e Prazo.
2. **Given** um formulário preenchido validamente, **When** clica em Salvar, **Then** o Objetivo é persistido no banco e listado na tela.

---

### User Story 1.5 - Alinhamento em Cascata (Priority: P1)
Ao criar um Objetivo Tático ou Operacional, o gestor deve poder selecionar qual "Objetivo Pai" (Estratégico) ele está suportando.
**Why this priority**: Elimina o trabalho em silos (Visão de "Todos remando para o mesmo lado").
**Independent Test**: Ligar o Objetivo A como "filho" do Objetivo Estratégico Global e constatar a renderização de uma "Árvore de OKRs" (Tree View).
**Acceptance Scenarios**:
1. **Given** a tela de criação/edição de Objetivo, **When** focado no campo "Alinhar ao Objetivo da Empresa", **Then** uma *Select Box* carrega os objetivos de nível superior da companhia.
2. **Given** um objetivo salvo com Alinhamento (Pai), **When** acessar o Mapa Estratégico, **Then** o sistema desenha a ramificação visual (Cascata).

---

### User Story 2 - Cadastro de Key Results (Priority: P1)
Dado um Objetivo listado, o usuário deve poder adicionar Key Results (KRs) quantitativos (Valor Inicial e Meta) a ele.
**Why this priority**: A mensurabilidade de um Objetivo depende de seus KRs.
**Independent Test**: Vincular um novo KR a um Objetivo existente e garantir que a relação ForeignKey no Supabase seja salva corretamente.
**Acceptance Scenarios**:
1. **Given** a página de detalhes do Objetivo, **When** clica em "Novo KR", **Then** é solicitado Título, Valor Inicial, Meta e Unidade (%, R$, qtd).

---

### User Story 3 - Cálculo Automático de Progresso (Priority: P1)
O sistema deve calcular o progresso individual de cada KR e, consequentemente, a média ponderada para o progresso total do Objetivo.
**Why this priority**: É o valor real entregue pela plataforma (automação).
**Independent Test**: Atualizar o "currentValue" de um KR via Interface e verificar se o componente "Progress Ring" do Mantine do Objetivo pai reflete o novo %.
**Acceptance Scenarios**:
1. **Given** um KR de meta 100 e atual 50, **When** o sistema renderiza, **Then** o progresso do KR deve indicar 50%.
2. **Given** um Objetivo com 2 KRs (ambos com peso igual), onde um está em 100% e o outro em 0%, **Then** o progresso exibido do Objetivo deve ser 50%.

---

### User Story 4 - Rastreabilidade de Atualizações de KR (Priority: P1)
Sempre que o valor atual de um KR for alterado, o sistema deve registrar um histórico (KRUpdate) informando **quem** alterou, a **data** e um **comentário/análise** obrigatória.
**Why this priority**: Garante o diferencial competitivo contra o MEREO (accountability real e auditoria de monitoramento de KRs).
**Independent Test**: Atualizar um KR e verificar na listagem de histórico se o usuário logado e o comentário estão atrelados ao novo valor.
**Acceptance Scenarios**:
1. **Given** a página de detalhes de um KR, **When** o usuário atualiza o valor via modal, **Then** ele é obrigado a preencher um comentário curto de justificativa.
2. **Given** a atualização do KR, **When** o histórico é carregado, **Then** a mudança (`previousValue` para `newValue`) com autor e data fica registrada num feed/tabela abaixo do KR.

---

### User Story 4.5 - Análise de Confiança (Priority: P1)
Além de preencher o valor numérico do OKR durante o Check-in, o colaborador deve preencher seu "Sentimento de Confiança" atual sobre alcançar a meta até o final do trimestre (Alto, Médio, Baixo).
**Why this priority**: Antecipa os riscos qualitativos antes que o número real se torne um problema irreparável.
**Independent Test**: Salvar um Check-in de KR numérico (progresso 50%) com uma Confiança "Baixa (Vermelha)", e notar o Dashboard do time alertando o Gestor.
**Acceptance Scenarios**:
1. **Given** o Modal de Check-in, **When** o usuário digitar o novo valor da meta, **Then** ele deve clicar em um de 3 rostos/emojis (Verde=Confiante, Amarelo=Atenção, Vermelho=Preocupado) atrelando essa flag ao banco.

---

### User Story 5 - Análise Crítica Mensal (Priority: P1)
Sempre que um KR apresentar variação negativa ou status "At Risk"/"Off Track", o sistema deve fornecer suporte metodológico para o responsável registrar uma "Análise Crítica", escolhendo entre ferramentas como **5 Porquês** ou **Diagrama de Ishikawa**.
**Why this priority**: Exigência de governança e resolução de problemas estruturais, não apenas a medição fria do número.
**Independent Test**: Preencher um formulário de "5 Porquês" vinculado a um KRUpdate e garantir que os 5 níveis de texto sejam salvos em formato estruturado (JSON no banco).
**Acceptance Scenarios**:
1. **Given** um KRUpdate que mude o status do KR para Vermelho/Amarelo, **When** salvo, **Then** o sistema sugere/obriga a abertura de um Modal de Análise Crítica.
2. **Given** a escolha da ferramenta "5 Porquês", **When** o usuário preenche, **Then** o sistema permite que, a partir do último "Porquê", ele crie diretamente uma Ação de correção vinculada àquele KR.

---

### User Story 6 - Evidências Multimídia e Testemunhais (Priority: P2)
Durante o check-in de um KR (ou Iniciativa), o usuário pode anexar fotos, vídeos curtos ou coletar depoimentos (testemunhais) da equipe provando a execução da tarefa (Ex: uma foto da capacitação realizada).
**Why this priority**: Tangibiliza o resultado do OKR, aumenta o engajamento visual na plataforma e consolida a memória organizacional.
**Independent Test**: Submeter uma atualização (KRUpdate) anexando uma foto e um array de textos (depoimentos) e garantir que a interface exibe um "Card de Celebração" ou Evidência no histórico do Objetivo.
**Acceptance Scenarios**:
1. **Given** o modal de check-in / KRUpdate, **When** o usuário expande "Adicionar Evidências", **Then** surge um uploader de arquivos e campos de texto para depoimentos.
2. **Given** um KR com arquivo anexado salvo, **When** listar o histórico e o Dashboard Executivo, **Then** o sistema exibe a foto e os quotes como prova física do alcance do OKR.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: CRUD Objetivos.
- **FR-002**: CRUD KRs (vinculados ao Objetivo via `objectiveId`).
- **FR-003**: Registrar base (startValue), meta (targetValue) e atual (currentValue).
- **FR-004**: Calcular progresso e variação/tendência do Objetivo automaticamente agregando os valores de progresso dos respectivos KRs diretos e dos Objetivos Filhos (Cascata).
- **FR-004.1**: Sugerir status (on_track, at_risk, off_track) comparando progresso linear com tempo decorrido no ciclo; permitir sobrescrita via justificativa.
- **FR-005 / FR-011**: Registrar histórico de monitoramento mensal (KRUpdate) armazenando o valor planejado, realizado, autor e data.
- **FR-012 / FR-013**: Registro de Análise Crítica (5 Porquês / Ishikawa) atrelada às métricas.

### Key Entities (Domain Models in TypeScript)

Seguindo o princípio **Domain-Driven Design (Lite)** orientado no briefing, as interfaces de dados devem ser desacopladas da UI. Isso garante *Type Safety* nas regras de negócio de cálculo.

```typescript
// ./src/domain/models/types.ts

export type Status = 'on_track' | 'at_risk' | 'off_track' | 'draft' | 'closed';
export type KRUnit = 'percentage' | 'currency' | 'number' | 'boolean';

export interface Objective {
  id: string;                // UUID v4 (Supabase)
  tenantId: string;          // FK -> Companies/Tenants (SaaS-Ready Architecture)
  parentObjectiveId?: string;// FK (Opcional) -> Permite a árvore Cascata
  title: string;
  description?: string;
  cycleId?: string;          // Referência ao Ciclo/Trimestre
  ownerId: string;           // Usuário responsável
  checkInCadence: 'weekly' | 'biweekly' | 'monthly'; // Configuração de alerta [CLARIFIED]
  isConfidential: boolean;   // Flag de privacidade [CLARIFIED]
  progress: number;          // Calculado automaticamente no front ou persistido para cache
  status: Status | 'stale';  // Inclui estado de desatualização
  createdAt: string;         // ISO Date
  updatedAt: string;         // ISO Date
}

export interface KeyResult {
  id: string;                // UUID v4
  tenantId: string;          // FK -> Companies/Tenants
  objectiveId: string;       // Foreign Key -> Objective
  title: string;
  description?: string;
  ownerId: string;
  unit: KRUnit;              // Porcentagem, Moeda, Numérico, etc.
  startValue: number;        // Valor Base
  targetValue: number;       // A Meta
  currentValue: number;      // Atualização mais recente
  weight: number;            // Peso (Default: 1). Para a média ponderada do Objetivo.
  progress: number;          // Calculado (Opcional se for persistido)
  status: Status;            // Semáforo do KR
  createdAt: string;
  updatedAt: string;
}

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface KRUpdate {
  id: string;                // UUID v4
  keyResultId: string;       // Foreign Key -> KeyResult
  ownerId: string;           // Quem fez o check-in (Auditoria)
  previousValue: number;     // Valor antes da mudança
  newValue: number;          // O valor que foi reportado
  confidenceLevel: ConfidenceLevel; // Sentimento subjetivo do colaborador
  manualStatusOverride?: Status;    // Status definido pelo usuário caso discorde do sugerido
  statusOverrideJustification?: string; // Obrigatório se manualStatusOverride for preenchido
  comment: string;           // Relatório da mudança (Obrigatório)
  evidenceUrls?: string[];   // Lista de URLs apontando para fotos/vídeos (Storage)
  testimonials?: string[];   // Lista de frases curtas relatando o impacto/quotes de participantes
  updateDate: string;        // ISO Date
}

export interface CriticalAnalysis {
  id: string;
  krUpdateId: string;        // FK -> O check-in que disparou o problema
  toolType: 'five_whys' | 'ishikawa';
  analysisData: any;         // JSONB com os porquês estruturados ou as espinhas do peixe
  actionIds: string[];      // Lista de IDs de Ações corretivas geradas [CLARIFIED]
  authorId: string;
  createdAt: string;
}
```

## Success Criteria *(mandatory)*

### Measurable Outcomes
- **SC-001**: O desenvolvedor Frontend consegue importar `Objective` e `KeyResult` e mockar o estado com tipagem rígida antes de ter o banco Supabase configurado.
- **SC-002**: As barras de progresso do Mantine UI consomem diretamente a propriedade `progress` (number) do model e atualizam a visualização de forma fluida (<200ms).
