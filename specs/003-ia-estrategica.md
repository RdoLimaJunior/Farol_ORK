# Feature Specification: 003-IA-Estrategica

**Feature Branch**: `feature/003-ia-estrategica`
**Created**: 2026-03-15
**Status**: Draft
**Input**: Sugestão preditiva de redação de OKRs, alertas de formulação incorreta e tradução de métricas usando Inteligência Artificial (O "Timoneiro" do FAROL).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Validação Preditiva de OKR (Priority: P1)
Ao tentar criar um novo Objetivo ou KR, o colaborador deve receber feedback em tempo real da IA ("O Timoneiro") sobre a qualidade da redação, avisando se a meta é vaga, inatingível ou se não possui uma métrica clara.
**Why this priority**: Ajuda os iniciantes (Persona: **Camila**) a escreverem bons OKRs e poupa o Gestor de ficar corrigindo redação básica da equipe.
**Independent Test**: Num campo de input de título do KR, colar o texto "Melhorar as vendas". A IA deve retornar um alerta (Warning Modal) dizendo que falta clareza e sugerindo "Aumentar a receita recorrente em 20%".
**Acceptance Scenarios**:
1. **Given** o Modal de "Novo KR", **When** o usuário escreve uma frase qualitativa sem números (ex: "Deixar o cliente feliz"), **Then** a IA intercepta e sugere a troca para uma métrica (ex: "Aumentar o NPS para 80").
2. **Given** o feedback apontado, **When** o usuário clica em "Aceitar Sugestão", **Then** o texto do input é substituído magicamente.

---

### User Story 2 - Sugestão de Métricas para Iniciativas (Priority: P2)
Dado um Objetivo Macro cadastrado, a IA deve ser capaz de sugerir uma lista de Key Results ou Iniciativas padrão de mercado para aquela área (ex: "Se é Vendas, tente medir o CAC ou LTV").
**Why this priority**: Acelera a quebra de grandes objetivos em indicadores acionáveis, vencendo a "Síndrome da Tela Branca".
**Independent Test**: Na tela vazia de um Objetivo, clicar em "O que devo medir?", e receber 3 sugestões de KRs geradas via prompt.
**Acceptance Scenarios**:
1. **Given** a visão detalhada de um Objetivo sem KRs, **When** o usuário solicita ajuda do "Timoneiro", **Then** a IA lê o título do Objetivo e lista KRs recomendados baseados no setor/departamento do usuário.

---

### User Story 3 - Análise de Linguagem Humanizada / Mentor (Priority: P1)
Sempre que a IA apontar problemas de desempenho no Dashboard ou cobrar atualizações, ela deve fazê-lo usando linguagem sutil e construtiva, agindo como um "Mentor" e não como um "Fiscalizador".
**Why this priority**: Quebra a resistência natural à ferramenta (Persona: **Roberto - O Cético**).
**Independent Test**: Acionar o prompt de relatório de análise semanal e verificar se o tom de voz "Tone of Voice" do output JSON retorna frases encorajadoras em invés de termos como "Você falhou".
**Acceptance Scenarios**:
3. **Acceptance Scenarios**:
1. **Given** um KR vermelho (Off Track), **When** a IA gera o resumo executivo pro Roberto, **Then** ela inicia dizendo: *"Notei que a métrica X enfrentou desafios. Vamos avaliar juntos uma nova Iniciativa?"*.

---

### User Story 4 - Assistente de Criação ("Criar com o Timoneiro") (Priority: P1)
Em vez de preencher dezenas de campos manualmente, o usuário pode digitar apenas o que ele quer fazer em linguagem natural num único input de texto livre, e a IA gera todo o OKR.
**Why this priority**: Corta o tempo de onboarding de OKR de horas para segundos, gerando um "Fator Uau" imediato.
**Independent Test**: Num input, escrever "preciso de um curso pra alta gestão aprender a usar o Farol". O sistema deve auto-preencher Título, Descrição, e sugerir 3 KRs práticos (ex: "Alcançar 80% de presença da diretoria").
**Acceptance Scenarios**:
1. **Given** a aba de Criação, **When** o usuário escolhe "Criar com o Timoneiro" e insere seu objetivo em texto livre, **Then** a tela carrega um Esqueleto de OKR (Objetivo Pai + KRs) totalmente estruturado para aprovação.
2. **Given** os KRs sugeridos, **When** o usuário clica em "Gerar Ações", **Then** a IA já sugere o desdobramento tático (O que precisa ser feito passoa-a-passo).

---

### User Story 5 - Avaliação de Saúde do Portfólio (Health Assessment) (Priority: P1)
O gestor sênior (**Ricardo - O Visionário**) deve poder pedir à IA para avaliar a "saúde geral" do seu portfólio de OKRs no trimestre, cruzando o percentual de progresso atual com o Nível de Confiança reportado pelos donos.
**Why this priority**: Tira a responsabilidade do Gestor de ler 50 indicadores, entregando os "Top 3 Riscos e Top 3 Oportunidades" já digeridos.
**Independent Test**: Na tela de Dashboard Executivo, apertar um botão "Resumir Saúde". A resposta JSON da IA deve indicar quais KRs precisam de atenção urgente com base nas atualizações recentes.
**Acceptance Scenarios**:
1. **Given** um painel com 15 OKRs (5 vermelhos, 10 verdes), **When** Ricardo clica em "Avaliar Saúde com Timoneiro", **Then** a Inteligência compila um parágrafo que resume as áreas de risco sem que ele precise abrir KR por KR.

---

### User Story 6 - Análise Crítica Guiada (Priority: P1)
Sempre que um KR entra em status Crítico ou está estagnado por X dias, o Timoneiro não apenas alerta, mas inicia ativamente a Análise Crítica (Ishikawa ou 5 Porquês) através de um chat rápido, preenchendo o formulário burocrático no fundo.
**Why this priority**: Formulários de Diagnóstico costumam matar a vontade do usuário de refletir sobre os erros. A entrevista guiada via *Push* resolve isso.
**Independent Test**: Num KR com status Vermelho (Off Track), ao acessar o Card do KR, encontrar um balão do Timoneiro: "Notei que [Métrica] não sobe. Foi Fator A ou B?". A resposta do usuário preenche instantaneamente o JSON de "Análise Crítica".
**Acceptance Scenarios**:
1. **Given** um KR estagnado, **When** o dono da meta acessa a plataforma, **Then** o Timoneiro envia um *push/card* de contexto interrogando sobre duas possíveis causas óbvias.
2. **Given** o input do usuário pelo Chatbox, **When** enviado, **Then** o sistema traduz esse parágrafo nos "5 Porquês" necessários para auditoria (FR-012) sem abrir modais.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-022**: IA deve ser capaz de gerar rascunhos de OKRs a partir de prompts simples (Criar com Timoneiro).
- **FR-023**: IA deve avaliar OKRs criados manualmente pelo usuário (Score de Qualidade).
- **FR-024**: IA deve sugerir métricas de apoio.
- **FR-025**: IA apontar falhas de formulação (texto sem meta numérica, etc).
- **FR-026**: IA deve formular "Executive Summaries" (Avaliação de Saúde do Portfólio) cruzando progresso, confiança e atraso de iniciativas.
- **FR-027**: IA atuar ativamente interrogando usuários de KRs atrasados e autopreencher entidades de Análise Crítica (Ishikawa/5 Porquês).

### Key Entities (Domain Models in TypeScript)

Como a lógica do Timoneiro (IA) geralmente não é armazenada ativamente como entidade relacional isolada, os modelos abaixo refletem as Requisições e Logs de Prompts para auditoria e rate-limit.

```typescript
// ./src/domain/models/aiCopilot.ts

export type AIFeatureContext = 'okr_drafting' | 'metric_suggestion' | 'quality_score' | 'executive_summary' | 'magic_creation' | 'health_assessment' | 'root_cause_analysis';

export interface PromptLog {
  id: string;
  userId: string;
  context: AIFeatureContext;
  originalText: string;      // O que o usuário escreveu (Ex: "Curso para alta gestão")
  aiSuggestion: any;         // JSONB com a estrutura do OKR/KR gerada ou a resposta textual
  wasAccepted: boolean;      // Métrica de sucesso: A sugestão/estrutura foi salva no banco real?
  createdAt: string;
}

export interface OKRQualityScore {
  titleText: string;
  score: number;             // 0 a 100
  issues: string[];          // Ex: ["Falta métrica", "Muito genérico"]
  improvements: string[];    // Textos reescritos sugeridos
}
```

## Success Criteria *(mandatory)*
- **SC-001**: O serviço de Qualidade de OKR (`qualityScore`) deve responder em menos de `1500ms` usando chamadas otimizadas à LLM para não travar a experiência no Front-End.
- **SC-002**: A taxa de aceitação das sugestões da IA (`wasAccepted === true`) deve ser mensurada para calibração contínua dos prompts internos.
