# Compêndio Farol OKR
## Referencial Teórico, Governança e Base de Estudos

> **Versão 4.0 — Wiki Interna**
> Este documento é a Fonte Única da Verdade (*Single Source of Truth*) do sistema Farol OKR.
> Serve como núcleo cognitivo para a IA do projeto, referência para desenvolvedores, guia de governança para gestores e base de estudos para qualquer pessoa que queira aprender OKR com profundidade.

---

## Sumário

1. [Raízes Históricas e Evolução](#1-raízes-históricas-e-evolução)
2. [Arquitetura do Sistema Farol](#2-arquitetura-do-sistema-farol)
3. [O Pátio Humano — CFR e Cultura](#3-o-pátio-humano--cfr-e-cultura)
4. [Ritos e Cadências](#4-ritos-e-cadências)
5. [A Lógica da Verdade — FCA e Pontuação](#5-a-lógica-da-verdade--fca-e-pontuação)
6. [Gamificação e Maturidade](#6-gamificação-e-maturidade)
7. [OKR vs Outros Frameworks](#7-okr-vs-outros-frameworks)
8. [OKR por Área e Setor](#8-okr-por-área-e-setor)
9. [Anti-Patterns — O Guia de Sobrevivência](#9-anti-patterns--o-guia-de-sobrevivência)
10. [Dicionário de Conceitos para a IA](#10-dicionário-de-conceitos-para-a-ia)
11. [Glossário Técnico](#11-glossário-técnico)
12. [Área de Estudos](#12-área-de-estudos)
13. [Referências Bibliográficas](#13-referências-bibliográficas)

---

## 1. Raízes Históricas e Evolução

A metodologia Farol OKR não nasceu do vazio. É a síntese de mais de 70 anos de ciência da gestão e execução estratégica.

### 1.1 MBO — Management by Objectives (Drucker, 1954)

Peter Drucker, no livro *The Practice of Management* (1954), introduziu o conceito de **Gestão por Objetivos** como resposta ao modelo de gestão por controle taylorista. Sua tese central:

> *"O que não é medido, não é gerenciado."*

**Princípios do MBO:**
- Alinhamento top-down entre empresa e equipe
- Definição participativa de metas
- Revisão periódica de resultados
- Foco em resultados, não em atividades

**Limitações identificadas:**
- Processo anual rígido — sem agilidade para mudanças de ciclo
- Tendência a metas "seguras" e conservadoras
- Foco excessivo em avaliação de performance individual (bônus/punição)
- Sem mecanismo de *stretch goals* ou ambição transformacional

---

### 1.2 iMBO — Intel OKRs (Andy Grove, 1971–1983)

Andrew Grove, então COO da Intel, leu Drucker e fez uma pergunta simples:

> *"Onde quero chegar? (Objective) — Como saberei que cheguei? (Key Results)"*

Grove apresentou seu sistema no livro *High Output Management* (1983), que até hoje é considerado o manual de operações mais influente do Vale do Silício.

**Inovações do iMBO sobre o MBO clássico:**
- **Cadência trimestral** em vez de anual
- **Transparência radical** — metas visíveis para toda a empresa
- **Score de confiança** como mecanismo preditivo (não punitivo)
- **Stretch goals** — metas deliberadamente difíceis (60–70% de atingimento já é considerado sucesso)
- **Desacoplamento de remuneração** — OKR não é ferramenta de avaliação de desempenho

**A regra de Grove para KRs:**
> *"Um Key Result bem escrito provoca desconforto. Se você tem certeza que vai atingi-lo, não é ambicioso o suficiente."*

---

### 1.3 OKR Moderno — Google e John Doerr (1999–presente)

Em 1999, John Doerr — então sócio da Kleiner Perkins, mentor de Larry Page e Sergey Brin — levou o sistema de Grove para o Google. No livro *Measure What Matters* (2018), Doerr documentou o sistema que escalou o Google de 40 para 135.000 funcionários mantendo alinhamento estratégico.

**Os 4 Superpoderes dos OKRs (Doerr):**

| Superpoder | Descrição |
|---|---|
| **Foco** | Força a escolha das poucas coisas que realmente importam |
| **Alinhamento** | Conecta verticalmente empresa → time → indivíduo |
| **Rastreamento** | Check-ins regulares criam responsabilidade distribuída |
| **Superação** | Stretch goals desbloqueiam potencial latente |

**Características do modelo Google:**
- 3 a 5 Objetivos por ciclo (máximo absoluto)
- 3 a 5 Key Results por Objetivo
- Score de 0.0 a 1.0 — sweet spot em 0.6–0.7
- CFR (*Conversations, Feedback, Recognition*) como motor humano
- OKRs públicos e auditáveis por qualquer funcionário

---

### 1.4 Expansão Acadêmica e Institucional (2010–presente)

Com a disseminação global do modelo Google, a academia e o setor público passaram a estudar e adaptar OKRs:

**Contribuições relevantes:**

| Fonte | Contribuição |
|---|---|
| **UFRJ Poli (2023)** | Análise das falácias de Mintzberg aplicadas ao planejamento estratégico; separação entre *Estratégia Pretendida* (plano) e *Estratégia Realizada* (ação) |
| **ANVISA (2023)** | Integração OKR + BSC para gestão pública; papel do *OKR Champion*; gestão da Sustentação (BAU) |
| **Sebrae** | Adaptação para MPEs: OKR simplificado com ciclos de 90 dias e vocabulário acessível |
| **Gupy** | Aplicação de OKR em RH Tech: PDI integrado a KRs de cultura e performance |
| **ClickUp** | Ferramentas de automação de check-in e gamificação nativa |
| **Felipe Castro (Lean OKRs)** | Framework simplificado; crítica ao *OKR Washing* — empresas que adotam o nome mas não mudam o comportamento |
| **Christina Wodtke** | *Radical Focus* (2016): modelo narrativo de OKR com foco em times pequenos e startups |

---

### 1.5 A Linha do Tempo

```
1954 ─── MBO (Drucker) ─── Management by Objectives
   │
1971 ─── iMBO (Grove/Intel) ─── Adaptação Ágil + Stretch Goals
   │
1983 ─── High Output Management (livro) ─── Sistematização
   │
1999 ─── Google adota OKR ─── Escala global + CFR
   │
2010 ─── Wave de startups (LinkedIn, Twitter, Uber, Airbnb)
   │
2016 ─── Radical Focus (Wodtke) ─── Narrativa + Times pequenos
   │
2018 ─── Measure What Matters (Doerr) ─── Mainstream global
   │
2020 ─── OKR para setor público e PMEs
   │
2023 ─── Farol OKR ─── Síntese: Sebrae + ANVISA + UFRJ + Tech
```

---

## 2. Arquitetura do Sistema Farol

### 2.1 Execução em Duas Velocidades (2SE)

O Farol opera com **dois ritmos simultâneos**, evitando o conflito clássico entre planejamento estratégico de longo prazo e execução tática ágil:

```
┌─────────────────────────────────────────────────────────┐
│  VELOCIDADE 1: ESTRATÉGICA (longa duração — 1 a 4 anos) │
│  Ferramenta: BSC + PGA + OKR Organizacional             │
│  Ritmo: Revisão anual                                   │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  VELOCIDADE 2: TÁTICA (agilidade — 90 dias)             │
│  Ferramenta: OKR Tático + Check-ins semanais            │
│  Ritmo: Sprint trimestral com revisão semanal           │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Hierarquia de Conceitos (Ontologia)

| Conceito | Tipo | Definição | Exemplo |
|---|---|---|---|
| **Objetivo (O)** | Qualitativo | Direção. Inspirador, ambicioso, sem número. | *"Tornar-se o melhor lugar para morar digitalmente no Brasil"* |
| **Key Result (KR)** | Quantitativo | **Outcome**. Mede o que mudou, não o que foi feito. | *"Atingir 1M de usuários ativos"* |
| **Entrega (Initiative)** | Output | Projeto ou ação necessária para mover o KR. | *"Lançar campanha de Growth Hacking"* |
| **Ação (Action)** | Operacional | Tarefa concreta com data e responsável. | *"Criar criativos para tráfego pago até 05/02"* |
| **Sustentação (BAU)** | Rotina | Atividade recorrente que mantém o negócio rodando. Monitorada, não é OKR. | *"Suporte N1 ao cliente"* |

> **Regra de ouro:** Se um KR pode ser concluído com uma única ação ("Fazer X"), ele é uma entrega, não um KR. KR é resultado de comportamento, não de execução.

### 2.3 Alinhamento Vertical (Cascata vs Contribuição)

O Farol adota o modelo **Contributivo**, não o modelo Cascata:

- **Cascata (top-down puro):** A diretoria define tudo e "empurra" para baixo. Times executam sem voz. Fragiliza engajamento.
- **Contributivo (50/50):** A diretoria define direção (O). Times propõem seus próprios KRs que **contribuem** para aquela direção. Cria ownership.

```
Nível Organizacional:  O1 ─ "Liderança de mercado em moradia digital"
                          │
Nível Departamental:   O6 ─ "Automatizar marketing para escalar aquisição"
                          │
                       KR: "Implementar 10 fluxos de automação ativos"
                          │
                       Initiative: "Onboarding RD Station"
```

---

## 3. O Pátio Humano — CFR e Cultura

### 3.1 CFR: Conversations, Feedback, Recognition

Introduzido por John Doerr em *Measure What Matters*, o CFR é o **motor humano** que mantém os OKRs vivos entre os ciclos formais:

| Pilar | Descrição | Frequência |
|---|---|---|
| **Conversations** | 1:1 estruturado entre gestor e liderado. Foco em bloqueios, aprendizados e evolução. | Semanal |
| **Feedback** | Troca contínua e bidirecional — não apenas top-down. Específico, acionável, imediato. | Contínuo |
| **Recognition** | Reconhecimento público de esforço e resultado. Celebra progresso, não só conclusão. | Contínuo |

> *"OKR sem CFR é planejamento sem execução humana. Os números não mudam comportamentos. As conversas mudam."* — John Doerr

### 3.2 OKR de Corpo e Alma

Baseado no referencial do Sebrae e da ANVISA, o sistema Farol introduz o monitoramento explícito da **saúde humana do time**:

- **e-NPS trimestral:** *"Em uma escala de 0 a 10, com que probabilidade você recomendaria esta empresa como lugar para trabalhar?"* — Net Promoter Score aplicado internamente.
- **Índice de Clima (IC):** Média ponderada dos sentimentos declarados nos check-ins (verde/amarelo/vermelho) e o e-NPS coletado trimestralmente.
- **Semáforo de Clima:** Representação visual. Verde = time saudável. Amarelo = atenção. Vermelho = intervenção urgente.

### 3.3 Cultura de Segurança Psicológica

Referenciado em Amy Edmondson (*The Fearless Organization*, 2018) e aplicado ao contexto OKR:

- **OKR não é ferramenta de vigilância.** Usado errado, cria ansiedade e maquiagem de dados.
- **Stretch goals exigem confiança.** Se o time acredita que não atingir = punição, ele nunca vai se comprometer com metas desafiadoras.
- **Regra do Farol:** Confiança ≤ 7 obriga FCA, não punição. O registro do desvio **é** o aprendizado.

---

## 4. Ritos e Cadências

A cadência é o que diferencia OKR de planejamento estratégico tradicional que morre na gaveta.

### 4.1 Calendário do Ciclo Trimestral

```
Semana -2  ─── Retrospectiva do ciclo anterior
Semana -1  ─── Kick-off de planejamento (50% top-down / 50% bottom-up)
Semana 1   ─── Início do ciclo. OKRs publicados.
Semanas 2-11 ── Check-ins semanais (15 min por KR)
Semana 12  ─── Review / Check-out (avaliação de atingimento)
Semana 12  ─── Retrospectiva ("Como trabalhamos?" — não "Quanto atingimos?")
```

### 4.2 Detalhamento dos Ritos

#### Kick-off (Trimestral — 2h)
- **Objetivo:** Alinhar direção estratégica e negociar KRs táticos.
- **Participantes:** Diretoria + líderes de time.
- **Entregável:** OKRs do ciclo publicados e visíveis a todos.
- **Formato 50/50:** 50% do tempo para apresentação da estratégia (top-down). 50% para proposição de KRs pelos times (bottom-up).

#### Check-in (Semanal — 15 min)
- **Objetivo:** Monitorar saúde, atualizar confiança e remover bloqueios.
- **Estrutura:**
  1. Atualizar `currentValue` de cada KR
  2. Declarar `confidence` (1-10 ou alta/média/baixa)
  3. Se confiança < 8: preencher FCA
  4. Declarar `climateStatus` (sentimento do time)
- **Anti-pattern:** Check-in virar reunião de status longa. 15 minutos, assíncrono se possível.

#### Review / Check-out (Trimestral — 1h)
- **Objetivo:** Avaliar atingimento. Gerar aprendizado histórico.
- **Score OKR:** Calcular entre 0.0 e 1.0 para cada KR.
  - `0.0 – 0.3` = Não iniciado / falha significativa
  - `0.4 – 0.6` = Progresso mas não atingido
  - `0.7 – 1.0` = Sweet spot (metas desafiadoras bem atingidas)
  - `1.0` = Suspeito — meta pode ter sido conservadora demais
- **Entregável:** Documento de lições aprendidas por Objetivo.

#### Retrospectiva (Trimestral — 45 min)
- **Objetivo:** Olhar para o **Como**, não para o número.
- **Perguntas-guia:**
  - O que funcionou no nosso processo de trabalho?
  - O que atrasou nossa execução?
  - O que vamos mudar no próximo ciclo?
- **Não é:** Reunião para discutir por que o KR não foi atingido (isso é a Review).

### 4.3 "Sextou da Estratégia" — Comunicação Contínua

Conceito do Sebrae adaptado pelo Farol: a estratégia deve ser comunicada de forma **leve, periódica e democrática**. Não pode depender de apresentações formais trimestrais para que o time entenda onde a empresa quer chegar. Sugestões:

- Newsletter interna quinzenal com atualizações de OKR
- Dashboard de OKRs sempre visível em TV ou ferramenta acessível
- Compartilhamento de "vitórias da semana" no canal de comunicação do time

---

## 5. A Lógica da Verdade — FCA e Pontuação

### 5.1 O Algoritmo FCA (Fato, Causa e Ação)

Obrigatório sempre que o **Score de Confiança** for menor que 8 (em escala 1–10).

| Etapa | Pergunta | Exemplo |
|---|---|---|
| **Fato** | Qual é o desvio objetivo e mensurável? | *"Atingimos 10% vs 30% esperado para o período."* |
| **Causa** | Por que isso aconteceu? (use os 5 Porquês) | *"Atraso no jurídico → contratos sazonais → falta de SLA definido → processo não documentado → não há owner do processo."* |
| **Ação** | O que vamos fazer? (SMART: Específico, Mensurável, Atingível, Relevante, Temporal) | *"Reunião de alinhamento com Gestor Jurídico até 12/03 para definir SLA de análise contratual."* |

**A metodologia dos 5 Porquês** (Toyota Production System, Taiichi Ohno): perguntar "por quê?" cinco vezes consecutivas para chegar à causa-raiz, não apenas ao sintoma superficial.

### 5.2 As 3 Esferas de Análise

Conforme a Metodologia Farol (baseada no referencial ANVISA/Sebrae):

```
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│    ADESÃO       │   │  PERFORMANCE    │   │   RESULTADO     │
│                 │   │                 │   │                 │
│ Disciplina nos  │ → │ % de conclusão  │ → │ Impacto real    │
│ ritos e         │   │ dos OKRs.       │   │ nos indicadores │
│ preenchimento.  │   │ Gamificação     │   │ financeiros e   │
│ Gamificação     │   │ em Selos.       │   │ de mercado.     │
│ em Selos.       │   │                 │   │                 │
└─────────────────┘   └─────────────────┘   └─────────────────┘
```

### 5.3 Fórmulas de Governança (Cálculos Dinâmicos)

O Farol calcula métricas de saúde tática em tempo real. Abaixo as fórmulas canônicas — **a implementação atual usa proxies simplificadas** enquanto o modelo de dados não possui timestamps de check-in.

#### Índice de Adesão (IA)

$$I_A = \frac{\text{Check-ins realizados no período}}{\text{KRs ativos} \times \text{Cadência esperada}} \times 100$$

- **Interpretação:** Penaliza o atraso na ritualística. IA ≥ 80% = Bronze mínimo.
- **Implementação atual (proxy):** Percentual de KRs com campo `confidence` preenchido e `currentValue` atualizado.
- **Implementação futura:** Requer campo `lastCheckInAt: DateTime` por KR.

#### Índice de Clima (IC)

$$I_C = \frac{(e\text{-}NPS_{trimestral} \times 0.6) + (\overline{Sentimento_{check-ins}} \times 0.4)}{1}$$

- **Representação visual:** Semáforo (Verde / Amarelo / Vermelho).
- **Implementação atual (proxy):** Derivado do status dos KRs (`off_track` ou confiança `baixa` degradam o clima).
- **Implementação futura:** Requer campo `moodScore: 1-5` por check-in e pesquisa trimestral de e-NPS.

#### Algoritmo de Maturidade (AM)

| Nível | Critérios |
|---|---|
| 🥉 **Bronze** | IA ≥ 80% **E** 100% dos KRs com confiança atualizada |
| 🥈 **Prata** | Bronze **+** 100% das Ações Críticas com Evidência anexada **+** progresso médio ≥ 40% |
| 🥇 **Ouro** | Prata **+** progresso médio ≥ 70% **E** IC positivo (clima verde) |

### 5.4 Confidence Score (CS)

O Confidence Score é um indicador **preditivo**, diferente do progresso acumulado (que é retrospectivo):

| Score | Interpretação | Ação Requerida |
|---|---|---|
| 9–10 | Alta confiança — no caminho certo | Nenhuma |
| 7–8 | Confiança moderada — atenção requerida | Monitoramento próximo |
| 5–6 | Risco de não atingimento | FCA obrigatório |
| 1–4 | Crítico — intervenção urgente | FCA + escalação |

> *"O Confidence Score é o que te diz que o prédio vai pegar fogo antes de ele pegar. O progresso acumulado te diz que já está pegando."*

---

## 6. Gamificação e Maturidade

### 6.1 Sistema de Medalhas (Certificação por Unidade)

O Farol certifica unidades organizacionais, não indivíduos:

| Medalha | Critérios | Benefícios |
|---|---|---|
| 🥉 **Bronze** | IA ≥ 80% + todos os KRs com confiança atualizada | Visibilidade no dashboard organizacional |
| 🥈 **Prata** | Bronze + evidências anexadas + progresso ≥ 40% | Destaque no "Sextou da Estratégia" |
| 🥇 **Ouro** | Prata + progresso ≥ 70% + clima verde | Reconhecimento em all-hands + case interno |

### 6.2 Sistema de XP e Níveis (Individual)

Cada ação no sistema gera XP para o usuário:

| Ação | XP |
|---|---|
| Check-in semanal realizado no prazo | +50 XP |
| FCA preenchido com evidência | +100 XP |
| KR atingido (score ≥ 0.7) | +200 XP |
| Objetivo concluído | +500 XP |
| Check-in com confiança atualizada e mood declarado | +30 XP |

### 6.3 Referencial Teórico da Gamificação

Baseado em **Octalysis Framework** (Yu-kai Chou, *Actionable Gamification*, 2015), que identifica 8 drives humanos para motivação:

1. **Significado épico:** O OKR conecta o trabalho diário à visão da empresa
2. **Progresso e realização:** Barra de progresso, selos, XP
3. **Empoderamento criativo:** Times propõem seus próprios KRs
4. **Propriedade e posse:** "Este é o *meu* KR"
5. **Influência social:** Dashboard público, reconhecimento entre pares
6. **Escassez:** Ciclos com prazo definido criam urgência saudável

---

## 7. OKR vs Outros Frameworks

### 7.1 Comparativo Geral

| Dimensão | OKR | KPI | BSC | MBO | Scrum/Agile |
|---|---|---|---|---|---|
| **Foco** | Direção + Resultado | Monitoramento | Perspectivas equilibradas | Objetivos individuais | Entrega iterativa |
| **Horizonte** | 90 dias (tático) | Contínuo | Anual | Anual | 2 semanas (sprint) |
| **Direção** | Bottom-up + Top-down (50/50) | Top-down | Top-down | Top-down | Equipe auto-organizada |
| **Metas** | Desafiadoras (stretch) | Conservadoras (atingíveis) | Balanceadas | Atingíveis | Velocidade do time |
| **Revisão** | Semanal (check-in) | Mensal/Trimestral | Semestral | Anual | Diária (standup) |
| **Vínculo com remuneração** | Não recomendado | Frequentemente sim | Às vezes | Frequentemente sim | Não |
| **Melhor para** | Crescimento, inovação | Estabilidade operacional | Estratégia de longo prazo | Avaliação de desempenho | Desenvolvimento de software |

### 7.2 OKR + BSC: A Integração do Farol

O Farol adota a integração OKR + BSC recomendada pela ANVISA para organizações mais maduras:

```
BSC (Anual)              OKR (Trimestral)
─────────────────────    ────────────────────────────────
Perspectiva Financeira → O: "Escalar eficiência financeira"
                         KR: "Reduzir OPEX em 20%"

Perspectiva Cliente    → O: "Ser referência em experiência"
                         KR: "Atingir CSAT de 90%"

Perspectiva Processos  → O: "Digitalizar operação"
                         KR: "100% dos onboardings digitais"

Perspectiva Pessoas    → O: "Melhor lugar para talentos"
                         KR: "e-NPS ≥ 75"
```

### 7.3 Quando NÃO usar OKR

OKR não é a ferramenta certa para tudo:

- **Operação pura (BAU):** Atividades de sustentação não devem virar OKR. Use KPIs de monitoramento.
- **Times em crise imediata:** OKR exige estabilidade mínima. Em modo de incêndio, use *war room* com Kanban.
- **Organizações sem patrocínio da liderança:** OKR morre sem o *champion* no topo.
- **Metas de compliance regulatório:** Metas obrigatórias por lei não são OKRs. São obrigações.

---

## 8. OKR por Área e Setor

### 8.1 Marketing & Growth

| Objetivo | Key Results |
|---|---|
| *Dominar canais digitais de aquisição* | Reduzir CPL (Custo por Lead) em 30% · Aumentar taxa de conversão orgânica para 5% · Atingir 50K seguidores engajados |
| *Construir autoridade de marca* | Publicar 12 estudos de caso · NPS de conteúdo ≥ 70 · 3 menções em veículos tier-1 |

**KRs comuns:**
- Taxa de conversão (%), Custo por Aquisição (CAC), Taxa de churn, NPS, MQLs, SQLs, ARR

### 8.2 Engenharia & Produto

| Objetivo | Key Results |
|---|---|
| *Aumentar confiabilidade da plataforma* | Uptime ≥ 99.9% · MTTR (tempo de recuperação) < 30min · Zero incidentes P0 |
| *Acelerar entrega de valor* | Cycle time < 3 dias · Deploy frequency ≥ 5x/semana · Cobertura de testes ≥ 80% |

**KRs comuns:**
- Lead time, cycle time, DORA metrics, taxa de bugs, NPS do produto, DAU/MAU

### 8.3 Recursos Humanos & Cultura

| Objetivo | Key Results |
|---|---|
| *Ser o melhor lugar para talentos* | e-NPS ≥ 75 · Turnover voluntário < 10% · eNPS de onboarding ≥ 80 |
| *Desenvolver liderança interna* | 100% dos líderes com PDI ativo · 3 promoções internas por ciclo · Score de 360° ≥ 8 |

**KRs comuns:**
- Turnover, time-to-hire, e-NPS, taxa de promoção interna, absenteísmo, engagement score

### 8.4 Financeiro & Operações

| Objetivo | Key Results |
|---|---|
| *Escalar margem sem aumentar custo* | EBITDA ≥ 25% · OPEX reduzido em 15% · Inadimplência < 3% |
| *Diversificar fontes de receita* | Nova linha de produto com R$2M em MRR · 30% da receita de novos segmentos |

**KRs comuns:**
- MRR, ARR, CAC, LTV, churn rate, EBITDA, burn rate, runway

### 8.5 Customer Success & Suporte

| Objetivo | Key Results |
|---|---|
| *Zero esforço para o cliente resolver problemas* | SLA Tier 1 ≤ 1h · CSAT ≥ 90% · Taxa de resolução no primeiro contato ≥ 85% |
| *Transformar clientes em promotores* | NPS ≥ 75 · Taxa de upsell ≥ 20% · 50 casos de sucesso documentados |

---

## 9. Anti-Patterns — O Guia de Sobrevivência

### 9.1 Os 7 Pecados Capitais do OKR

| # | Anti-Pattern | Sintoma | Solução |
|---|---|---|---|
| 1 | **OKR Washing** | Renomear metas antigas para "OKRs" sem mudar mentalidade | Recomeço com facilitação externa; treino em KR writing |
| 2 | **KR como Tarefa** | KR: *"Fazer reunião de planejamento"* | KR deve ser resultado: *"Reduzir tempo de ciclo em 30%"* |
| 3 | **Tático Anual** | OKR tático com horizonte de 12 meses | OKR tático ≤ 90 dias. Mais longo = estratégico |
| 4 | **Isolamento da Alta Gestão** | Líderes não preenchem OKR próprio | C-level deve ter OKRs públicos e visíveis |
| 5 | **Maquiagem de Dados** | Scores sempre 1.0, confiança sempre alta | Desacoplar OKR de bônus; criar cultura de FCA |
| 6 | **Ignorar o BAU** | Times sobrecarregados com OKR + rotina sem visibilidade | Mapear e monitorar atividades de sustentação separadamente |
| 7 | **Paralisia por análise** | Ciclo inteiro discutindo como escrever KRs | Good enough → ciclo começa → aprende-se no próximo |

### 9.2 As Falácias de Mintzberg (Aplicadas ao OKR)

Henry Mintzberg, em *The Rise and Fall of Strategic Planning* (1994), identificou as grandes falácias do planejamento formal. Aplicadas ao contexto OKR:

- **Falácia da Predeterminação:** A estratégia não pode ser totalmente planejada. O OKR deve ser adaptativo — não um contrato imutável.
- **Falácia do Desacoplamento:** Planejamento separado de execução não funciona. O OKR tem valor quando quem planeja também executa.
- **Falácia da Formalização:** Mais processo não significa mais estratégia. Check-ins de 15 min são mais valiosos que relatórios de 50 páginas.

### 9.3 Diagnóstico Rápido de Saúde OKR

Responda sim/não. Mais de 3 "não" = ciclo em risco:

- [ ] Os OKRs do time estão públicos e visíveis para toda a organização?
- [ ] O CEO / Diretoria tem OKRs próprios publicados?
- [ ] Os KRs são **outcomes** (resultados), não **outputs** (tarefas)?
- [ ] O time faz check-in sem precisar de cobrança?
- [ ] Existe pelo menos 1 FCA ativo quando confiança < 8?
- [ ] OKR está **desacoplado** de avaliação de desempenho e bônus?
- [ ] O time consegue dizer em 30 segundos quais são seus OKRs do ciclo?

---

## 10. Dicionário de Conceitos para a IA

Para processamento de dados, assistência do Copilot e lógica de cálculo:

| Conceito | Tipo de Dado | Valores | Uso no Sistema |
|---|---|---|---|
| `status` | enum | `on_track`, `at_risk`, `off_track` | Calculado por `suggestStatus()` baseado em desvio de progresso esperado |
| `confidence` | enum | `alta`, `media`, `baixa` | Declarado pelo responsável no check-in. Proxy do CS (1-10) |
| `progress` | number (0-100) | % | Calculado por `calculateKRProgress()` com base em `startValue`, `currentValue`, `targetValue` |
| `polarity` | enum | `ascending`, `descending` | Define direção do KR. Ex: churn = descending (menor é melhor) |
| `adhesionPercentage` | number (0-100) | % | Calculado por `calculateAdhesion()` — hoje é proxy de KRs com dados preenchidos |
| `climateStatus` | enum | `success`, `warning`, `error` | Calculado por `calculateClimate()` — hoje é proxy de KRs em risco |
| `maturityLevel` | enum | `BRONZE`, `PRATA`, `OURO` | Calculado por `calculateMaturity()` — algoritmo AM §5.3 |
| `weight` | number | 1-n | Peso do KR no cálculo do progresso do Objetivo pai |
| `level` | enum | `organizational`, `departmental`, `individual` | Nível hierárquico do Objetivo |

**Alinhamento Vertical (regra de negócio):** Um KR de nível departamental deve ter `parentObjectiveId` apontando para um Objetivo organizacional. Sem essa ligação, o KR está "órfão" e não contribui para a estratégia.

**Bi-direcionalidade (50/50):** O sistema deve facilitar a proposição de KRs pelas equipes para a diretoria. Fluxo: time propõe → líder valida → publicado.

**Evidence-Based:** Todo check-in crítico (confiança < 8) deve ter evidência anexada (`evidenceUrls` ou `documents`) para garantir rastreabilidade histórica.

---

## 11. Glossário Técnico

| Termo | Definição |
|---|---|
| **BAU** | *Business as Usual* — atividades de rotina/sustentação. Monitoradas com KPIs, não OKRs. |
| **BSC** | *Balanced Scorecard* — framework de gestão estratégica em 4 perspectivas (Kaplan & Norton, 1992). |
| **CFR** | *Conversations, Feedback, Recognition* — motor humano do OKR (Doerr, 2018). |
| **Confidence Score** | Indicador preditivo (1-10) de confiança do responsável sobre o atingimento do KR. |
| **DORA Metrics** | 4 métricas de DevOps: Deployment Frequency, Lead Time, MTTR, Change Failure Rate. |
| **e-NPS** | *Employee Net Promoter Score* — medida de satisfação e engajamento interno. |
| **FCA** | *Fato, Causa, Ação* — protocolo obrigatório de diagnóstico quando confiança < 8. |
| **iMBO** | *Intel Management by Objectives* — evolução de Grove sobre o MBO de Drucker. |
| **KPI** | *Key Performance Indicator* — indicador de desempenho operacional/de monitoramento. Diferente de KR: KPI mede saúde; KR mede progresso em direção a um resultado. |
| **KR** | *Key Result* — resultado-chave, quantitativo e mensurável, que define o sucesso de um Objetivo. |
| **MBO** | *Management by Objectives* — Drucker (1954). Precursor do OKR. |
| **MTTR** | *Mean Time to Recovery* — tempo médio de recuperação após incidente. |
| **Objective** | Objetivo qualitativo, inspirador e com prazo. Define a direção, não o como. |
| **OKR** | *Objectives and Key Results* — framework de gestão estratégica e execução tática. |
| **OKR Champion** | Papel responsável por garantir a adoção, qualidade e ritualística do OKR na organização. |
| **OKR Washing** | Anti-pattern: adoção do vocabulário OKR sem mudança real de mentalidade ou processo. |
| **Outcome** | Resultado de negócio — o que mudou. KR é sempre um Outcome. |
| **Output** | Entrega — o que foi feito. Initiatives e Actions são Outputs. |
| **Polarity** | Direção de progresso de um KR: ascending (crescente) ou descending (decrescente). |
| **Retrospectiva** | Rito trimestral focado no *como* o time trabalhou, não no *quanto* atingiu. |
| **Score OKR** | Pontuação de 0.0 a 1.0. Sweet spot: 0.6–0.7 (meta desafiadora bem executada). |
| **Stretch Goal** | Meta deliberadamente ambiciosa. Atingir 70% já é considerado sucesso. |
| **Vertical Alignment** | Alinhamento hierárquico: KR departamental contribui para Objetivo organizacional. |

---

## 12. Área de Estudos

### 12.1 Trilha de Leitura

#### Nível 1 — Fundamentos (ponto de entrada)

| Livro | Autor | Por que ler |
|---|---|---|
| *Measure What Matters* | John Doerr (2018) | O livro definitivo sobre OKR. Cases reais do Google, Intel, Bono (U2) e Gates Foundation. Obrigatório. |
| *Radical Focus* | Christina Wodtke (2016) | Narrativa ficcional que ensina OKR para times pequenos. Muito mais fácil de absorver do que guias técnicos. |
| *Introdução ao OKR* | Felipe Castro (2016 — gratuito online) | Guia prático em português, adaptado para a realidade de empresas brasileiras. |

#### Nível 2 — Aprofundamento

| Livro | Autor | Por que ler |
|---|---|---|
| *High Output Management* | Andy Grove (1983) | A origem intelectual do OKR. Manual de operações que formou toda uma geração de líderes do Vale do Silício. |
| *The Practice of Management* | Peter Drucker (1954) | A raiz filosófica do MBO e, portanto, do OKR. Obrigatório para quem quer entender o *porquê*. |
| *Objectives and Key Results* | Paul Niven & Ben Lamorte (2016) | Guia técnico e corporativo. Mais denso, ideal para implementações em grandes organizações. |

#### Nível 3 — Contexto Estratégico e Crítico

| Livro | Autor | Por que ler |
|---|---|---|
| *The Rise and Fall of Strategic Planning* | Henry Mintzberg (1994) | Crítica fundamental ao planejamento formal. Essencial para não cair nas falácias que fazem OKR fracassar. |
| *Good to Great* | Jim Collins (2001) | Conceito do "Ouriço" — fazer poucas coisas excepcionalmente bem. Complementa a filosofia de foco do OKR. |
| *The Balanced Scorecard* | Kaplan & Norton (1996) | Base do BSC que o Farol integra ao OKR estratégico. |
| *The Fearless Organization* | Amy Edmondson (2018) | Por que segurança psicológica é pré-requisito para stretch goals funcionarem. |
| *Actionable Gamification* | Yu-kai Chou (2015) | Base teórica do sistema de medalhas e XP do Farol. |

### 12.2 Artigos e Referências Acadêmicas

- **Doerr, J. (1999).** *OKRs at Google.* Kleiner Perkins internal presentation. Disponível em: whatmatters.com
- **Kaplan, R.S. & Norton, D.P. (1992).** *The Balanced Scorecard: Measures That Drive Performance.* Harvard Business Review, Jan–Feb 1992.
- **Edmondson, A. (1999).** *Psychological Safety and Learning Behavior in Work Teams.* Administrative Science Quarterly, 44(2), 350–383.
- **ANVISA (2023).** *Caderno de Boas Práticas em Gestão por Resultados.* Brasília: ANVISA.
- **Sebrae (2022).** *OKR para Pequenas e Médias Empresas: Guia Prático.* Brasília: Sebrae.
- **Castro, F. (2019).** *OKRs From Mission to Metrics.* Lean Performance. Disponível em: felipecastro.com

### 12.3 Cursos e Certificações

| Curso | Plataforma | Nível |
|---|---|---|
| OKR Practitioner Certificate | What Matters (Doerr's org) | Intermediário |
| OKR Master Certification | Perdoo Academy | Avançado |
| OKR: Using Objectives & Key Results | LinkedIn Learning | Iniciante |
| Gestão Estratégica com OKR | Sebrae EAD | Iniciante (PT-BR) |
| Fundamentals of OKR | Coursera (SHRM) | Iniciante |

### 12.4 Comunidades e Recursos Online

| Recurso | URL / Referência | O que encontrar |
|---|---|---|
| **What Matters** | whatmatters.com | Site oficial de John Doerr. Cases, templates, vídeos. |
| **Lean OKRs** | felipecastro.com | Felipe Castro (BR). Guias práticos em PT-BR. |
| **r/OKR** | reddit.com/r/OKR | Comunidade global. Perguntas práticas, debates. |
| **OKR Framework** | okrframework.org | Templates e exemplos por setor. |
| **Perdoo Blog** | perdoo.com/blog | Artigos aprofundados sobre implementação. |

### 12.5 Ferramentas de Mercado

| Ferramenta | Destaque | Melhor para |
|---|---|---|
| **Farol OKR** | Sistema próprio com governança integrada | Organizações que precisam de customização |
| **Perdoo** | Alinhamento visual e roadmap de OKRs | Médias empresas |
| **Weekdone** | Check-ins simplificados e relatórios | Times pequenos |
| **ClickUp Goals** | Integrado ao gerenciamento de tarefas | Times técnicos |
| **Lattice** | OKR + Performance Review + e-NPS integrados | RH e People Ops |
| **Betterworks** | Enterprise. CFR nativo. | Grandes corporações |
| **Notion + template OKR** | Gratuito e flexível | Startups early-stage |

---

## 13. Referências Bibliográficas

> Formatação: ABNT NBR 6023:2018

---

CASTRO, Felipe. **Lean OKRs: a guide to writing great OKRs**. Lean Performance, 2016. Disponível em: https://felipecastro.com. Acesso em: 2024.

CHOU, Yu-kai. **Actionable Gamification: Beyond Points, Badges, and Leaderboards**. Octalysis Media, 2015.

COLLINS, Jim. **Good to Great: Why Some Companies Make the Leap... and Others Don't**. New York: HarperBusiness, 2001.

DOERR, John. **Measure What Matters: How Google, Bono, and the Gates Foundation Rock the World with OKRs**. New York: Portfolio/Penguin, 2018.

DRUCKER, Peter F. **The Practice of Management**. New York: Harper & Row, 1954.

EDMONDSON, Amy C. **The Fearless Organization: Creating Psychological Safety in the Workplace for Learning, Innovation, and Growth**. Hoboken: Wiley, 2018.

EDMONDSON, Amy C. Psychological safety and learning behavior in work teams. **Administrative Science Quarterly**, v. 44, n. 2, p. 350-383, 1999.

GROVE, Andrew S. **High Output Management**. New York: Vintage Books, 1983. (Reimpresso em 2015 com prefácio de Ben Horowitz.)

KAPLAN, Robert S.; NORTON, David P. The balanced scorecard: measures that drive performance. **Harvard Business Review**, Boston, v. 70, n. 1, p. 71-79, jan./fev. 1992.

KAPLAN, Robert S.; NORTON, David P. **The Balanced Scorecard: Translating Strategy into Action**. Boston: Harvard Business Review Press, 1996.

MINTZBERG, Henry. **The Rise and Fall of Strategic Planning: Reconceiving Roles for Planning, Plans, Planners**. New York: Free Press, 1994.

NIVEN, Paul R.; LAMORTE, Ben. **Objectives and Key Results: Driving Focus, Alignment, and Engagement with OKRs**. Hoboken: Wiley, 2016.

OHNO, Taiichi. **Toyota Production System: Beyond Large-Scale Production**. New York: Productivity Press, 1988.

PORTER, Michael E. **Competitive Strategy: Techniques for Analyzing Industries and Competitors**. New York: Free Press, 1980.

AGÊNCIA NACIONAL DE VIGILÂNCIA SANITÁRIA (ANVISA). **Caderno de Boas Práticas em Gestão por Resultados com OKR**. Brasília: ANVISA, 2023.

SERVIÇO BRASILEIRO DE APOIO ÀS MICRO E PEQUENAS EMPRESAS (SEBRAE). **OKR para PMEs: Guia Prático de Implementação**. Brasília: Sebrae, 2022.

UNIVERSIDADE FEDERAL DO RIO DE JANEIRO — ESCOLA POLITÉCNICA (UFRJ POLI). **Gestão Estratégica e OKR: Análise Crítica e Aplicações**. Rio de Janeiro: UFRJ, 2023.

WODTKE, Christina. **Radical Focus: Achieving Your Most Important Goals with Objectives and Key Results**. Cucina Media, 2016.

---

*Documento Normativo — Versão 4.0*
*Compilado para o Farol OKR Project*
*Última atualização: 2026-04-14*
*Referências: Sebrae · Gupy · ClickUp · UFRJ Poli · ANVISA · Doerr · Grove · Drucker · Mintzberg · Kaplan & Norton*
