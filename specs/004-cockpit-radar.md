# Feature Specification: 004-Cockpit-Radar (Dashboard Executivo)

**Feature Branch**: `feature/004-cockpit-radar`
**Created**: 2026-03-15
**Status**: Draft
**Input**: Dashboard flow-based, Cmd+K Execution, e visões de Cockpit/Radar.
**UX Basis**: `navigation-architecture.md`

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Prompt Central do Timoneiro (Cockpit) (Priority: P1)
Ao fazer login, o usuário deve ser recebido por uma interface conversacional focada ("O que vamos fazer hoje?") em invés de um mar de gráficos confusos.
**Why this priority**: Elimina a paralisia de escolha induzida por ferramentas B2B, focando a atenção no input.
**Independent Test**: Entrar na tela inicial. Verificar que o elemento central é um Input de Texto "Spotlight" expansível acompanhado de 3 a 4 KRs atrasados ou tarefas *Push* como prioridade do dia.
**Acceptance Scenarios**:
1. **Given** um usuário logado às 08:00 AM, **When** ele cai na Home, **Then** o sistema exibe o grande input AI e os Widgets Contextuais dizem "Bom dia! Aqui estão os 3 check-ins para hoje."
2. **Given** que ele clique em "Fazer Check-in" no Widget, **Then** o Modal minimalista de atualização (sem sair da Home) é invocado.

---

### User Story 2 - Linha de Comando Visual via Spotlight (Priority: P1)
Em qualquer aba da plataforma, o usuário pode apertar `Cmd+K` ou `Ctrl+K` para abrir a barra de comando e **executar** tarefas através de sintaxe natural, ao invés de apenas buscar.
**Why this priority**: Corta o tempo de navegação a zero. Transforma o OKR no "terminal" da gestão.
**Independent Test**: Pressionar `Ctrl+K`, digitar `+ checkin vendas 70%`, teclar Enter e conferir se o KR "vendas" foi atualizado na base.
**Acceptance Scenarios**:
1. **Given** o atalho `Ctrl+K` acionado, **When** o usuário digita um comando mapeável (como `/criar meta`), **Then** a barra de busca reconhece a sintaxe `Regex` e expande o formulário inteligente embutido.
2. **Given** a meta "Aumentar NPS", **When** o usuário busca por "NPS", **Then** a busca retorna a Entidade (Actionable) com um botão rápido "Check-in" do lado direito do resultado.

---

### User Story 3 - Visão Radar / Grafo de Rede (Priority: P2)
O executivo (Ricardo) deve ter a opção de ver toda a arquitetura da empresa como um Mapa Mental (Network Graph) da Estratégia, onde todos os OKRs se ligam aos objetivos pai.
**Why this priority**: Mostra como a empresa atua de forma interconectada (sem silos). Ideal para apresentações de Diretoria.
**Independent Test**: Clicar na aba "Radar", observar se a biblioteca visual (ex: React Flow) monta os nodos ligando filhos aos pais.
**Acceptance Scenarios**:
1. **Given** a aba Radar no Desktop, **When** ela carrega, **Then** o usuário vê um Grafo não linear com *Pinch-to-zoom* em que as cores (Semáforos) representam a saúde dos polos.
2. **Given** a mesma aba Radar no Mobile, **When** carregada, **Then** a tela renderiza uma Árvore Vertical (List View encadeada) para resolver o limite tátil de UX.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-047**: Visão consolidada (Home/Cockpit) com Widgets Contextuais push.
- **FR-048**: Semáforo Geral/Radar (Renderizar Rede de KRs).
- **FR-050**: Implementação da Busca Semântica `Cmd+K` e *Command Palette Execution*.

### Key Entities (Domain Models in TypeScript)

```typescript
// ./src/domain/models/dashboard.ts

export type ContextWidgetType = 'greeting_checkin' | 'health_alert' | 'social_nudge';

export interface CommandPaletteAction {
  id: string;
  triggerSyntax: string;     // Ex: "+ checkin" ou "/nova_meta"
  entityTarget: 'objective' | 'key_result' | 'action_item';
  actionFunction: string;    // Referência ao hook a ser chamado
}

// O Widget é calculado ativamente pelo Back-End usando cron ou on-demand
export interface PushWidget {
  userId: string;
  widgetType: ContextWidgetType;
  title: string;             // Ex: "O KR de Vendas caiu 5%"
  actionLabel: string;       // Ex: "Analisar Porquê"
  actionPayload: any;        // Rota de linkagem
  validUntil: string;        // O card so aparece de tarde se não feito
}
```

## Success Criteria *(mandatory)*
- **SC-001**: O uso do `Cmd+K` para buscar uma meta ou acionar comando deve abrir o modal em `< 100ms`.
- **SC-002**: A renderização do Network Graph (Radar) deve suportar até `100 Nodos (OKRs)` fluidamente no ambiente navegador (FPS > 30).
