# Plataforma FAROL Constitution

## Visão do Produto
Criar a plataforma FAROL, um sistema completo de gestão estratégica via OKRs que centraliza a inteligência estratégica e a governança operacional.

## Core Principles

### I. SDD-First (NON-NEGOTIABLE)
O desenvolvimento deve seguir estritamente o framework Spec Kit (Specify -> Plan -> Tasks -> Implement). Improvisos e "vibe coding" são proibidos para garantir a previsibilidade e qualidade da IA.

### II. IA Estratégica Assistida
A IA não apenas gera dados, mas avalia e recomenda melhorias em OKRs, garantindo que a estratégia seja acionável e mensurável.

### III. Saas-Ready Architecture
Desde o dia 1, o código deve ser estruturado de forma modular e desacoplada, visando uma futura transição para um modelo multi-tenant (comercial).

### IV. Governança e Auditabilidade
Transparência total em mudanças de OKRs, com histórico estruturado, RBAC (Role Based Access Control) e trilhas de auditoria para garantir a confiabilidade dos dados.

### V. Orientação a Resultados (Foco em Key Results)
Todo esforço técnico deve ser validado contra o impacto na confiabilidade e adesão ao processo de OKRs da empresa.

## Escopo do MVP

### IN (Dentro do Escopo)
- Gestão de Objetivos, KRs e Monitoramentos.
- Iniciativas e Ações vinculadas à estratégia.
- Dashboard Executivo básico.
- IA Nível 1 (Criação e Avaliação básica).
- Gamificação e Social Feed iniciais.
- Centro de Custo básico.
- Integração leve com Azure DevOps e Excel/CSV.
- API REST fundamental.

### OUT (Fora do Escopo)
- Aplicativo Mobile nativo.
- Suporte Multiempresa nativo.
- IA Nível 2/3 (Simulações preditivas avançadas).
- Integração profunda com ERP/CRM.
- Autenticação SSO (Azure AD).

## Restrições e Workflow

- **Prazo:** Máximo de 1 mês para entrega do MVP funcional.
- **Base Técnica:** Azure DevOps como repositório e ferramenta de gestão de ciclo de vida.
- **Padrão de Qualidade UX:** Toda nova feature deve ter um documento preenchido com base no `ux-discovery-template.md` (englobando Jornada, Heurísticas de Nielsen e Matriz de Riscos) ANTES da elaboração da Especificação SDD.
- **Qualidade Código:** Validação humana obrigatória ao final de cada fase do Specify.

## Governança
Esta Constituição é o documento supremo do projeto. Alterações no escopo ou princípios exigem atualização deste arquivo e re-planejamento das tarefas impactadas.

**Version**: 1.0.0 | **Ratified**: 2026-03-15 | **Last Amended**: 2026-03-15

