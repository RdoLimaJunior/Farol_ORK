# 📑 Documento de Discovery de UX

**Projeto:** Plataforma FAROL
**Data:** 15/03/2026
**Responsável:** Lima Júnior (e Antigravity AI)
**Status:** Em rascunho

---

## 1. Resumo Executivo (Executive Summary)
O trabalho em OKRs não acontece no vácuo; ele acontece no dia a dia. Atualmente, os gerentes têm dificuldade em conectar o que o time faz (Iniciativas e Ações) com os resultados-chave (KRs) que a empresa espera. O Módulo de Iniciativas e Ações tem como objetivo tangibilizar os OKRs num ambiente voltado para a **gestão de entregas reais**, garantindo foco no que importa e identificando atrasos no prazo. 
*Referência: Lean UX - Focando na adoção da plataforma por gerentes de nível tático/operacional.*

---

## 2. Entendimento do Problema e Negócio
### 2.1. Objetivos de Negócio (Business Goals)
- [ ] Objetivo 1: Garantir que 100% dos KRs possuam pelo menos 1 Iniciativa atrelada (Visibilidade).
- [ ] Objetivo 2: Reduzir em 50% o tempo para reportar atrasos ("semáforo") em planos de ação.

### 2.2. Benchmarking & Referências Globais
*Baseado no Benchmark de Práticas de Mercado e Softwares de Alto Desempenho:*
- **Businessmap / Asana:**
  - **Pontos Fortes:** Eles conectam as "Iniciativas" no nível mais alto ao fluxo real de trabalho na base.
  - **Referência:** Quadros Kanban ou listas de projetos, onde a conclusão arrasta a barra de progresso.

---

## 3. Pesquisa e Empatia (User Research)
### 3.1. Personas e Job Stories
*Referência: About Face (Alan Cooper).*
- **Quem é o usuário?** Gestores Táticos e Colaboradores Operacionais.
- **Job Story:** "Quando **eu estiver olhando o KR atrasado**, eu quero **acessar as Iniciativas dele com um clique**, para que **eu veja qual tarefa empacou sem precisar perguntar no WhatsApp**."

### 3.2. Mapeamento da Jornada
**Ponto de Fricção:** O momento de cadastrar dezenas de tarefinhas.
**Solução na Jornada:** Facilitar a criação em lote (cadastro contínuo de Ações via Enter), exigindo pouca informação no primeiro clique (apenas Nome, Responsável e Prazo).
*Referência: Don’t Make Me Think (Steve Krug).*

---

## 4. Requisitos e Especificações Técnicas

### 4.1. Especificações Funcionais (Functional Specs)
*Baseado na Spec Master FAROL FR-016 a FR-020.*
1. **[Cadastro de Iniciativa/Ação]:** O sistema deve permitir que uma Ação seja atrelada a uma Iniciativa, que por sua vez responde a um KR.
   - *Heurística Relacionada:* Compatibilidade do Sistema com o Mundo Real (Nielsen #2).
2. **[Sinalização Visual (Semáforo)]:** O sistema deve pintar automaticamente a Ação de Vermelho se o prazo for ultrapassado.
   - *Heurística Relacionada:* Visibilidade do Status do Sistema (Nielsen #1).

### 4.2. Especificações Não-Funcionais (Qualidade e Acessibilidade)
- **Acessibilidade:** Linhas da tabela de Ações devem ter `Focus` bem delineado (A11y NFR-013).
- **Tratamento de Exceções:** Ao mudar o prazo de uma ação atrasada (re-prazo), exigir uma justificativa via Modal ("Error Dogs/Humanizado").

---

## 5. Arquitetura de Informação e Fluxo
*Referência: The Design of Everyday Things (Don Norman).*
- **Signifiers:** Para o 'Semáforo', usarícones duplos para daltônicos (ex: ✅ Verde com "check", ⚠️ Amarelo com "alerta").
- **Affordances:** O Row/Cartão da Iniciativa inteiro deve ser clicável, não apenas o pequeno texto do nome.

---

## 6. Hipóteses e Validação (Matriz de Riscos)
| Hipótese | Nível de Incerteza | Impacto |
| :--- | :--- | :--- |
| "Usuários preferem visualizar as ações em Kanban" | Médio | Alto |
| "Ações sem prazo travam a metologia da plataforma" | Baixo | Crítico |

**Próximo Passo Proposto (Framework de Discovery):**
Pelo anexo B desse documento, como a Incerteza de visualizar em Lista vs Kanban é Média, podemos aplicar uma **Opportunity Solution Tree (OST)** leve ou desenvolver as interfaces e testá-las rápido (Lean UX) com os gerentes.

---

## 7. Referências de Literatura Utilizadas
1. **NORMAN, Don.** *The Design of Everyday Things*.
2. **NIELSEN, Jakob.** *10 Usability Heuristics for User Interface Design*.
3. **KRUG, Steve.** *Don’t Make Me Think*.
