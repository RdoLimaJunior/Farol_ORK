# Feature Specification: 007-Dashboard-Executivo

**Feature Branch**: `feature/007-dashboard-executivo`  
**Created**: 2026-03-15  
**Status**: Draft  
**Input**: Visualização consolidada de OKRs, saúde do portfólio e atalhos de criação.

## 🎯 Objetivo
Transformar a Home do Farol em um centro de comando executivo que responde à pergunta: "Como estamos indo hoje?". Deve ser visualmente impactante (Premium UI) e permitir ação imediata.

## 👤 User Stories

### US1 - Visão Geral do Portfólio (Gestor/Executivo)
**Como** um tomador de decisão,  
**Quero** ver um resumo da saúde de todos os OKRs (On Track, At Risk, Off Track),  
**Para** focar meu tempo onde há problemas.

### US2 - Listagem "Em Ação"
**Como** um colaborador ou gestor,  
**Quero** ver a lista dos OKRs vigentes com sua barra de progresso e status de confiança,  
**Para** acompanhar a evolução do trimestre.

### US3 - Criação Rápida
**Como** um usuário,  
**Quero** um botão visível de "Novo OKR" na home,  
**Para** registrar novas metas sem navegar por menus complexos.

## 🛠 Requisitos Funcionais

- **RF-001**: Renderizar 3 a 4 "Stats Cards" no topo com:
    - % Geral de Progresso da Empresa (média de todos os OKRs).
    - Contagem de OKRs "On Track" (Em Dia).
    - Contagem de OKRs "At Risk" (Em Atenção).
    - Contagem de OKRs "Off Track" (Críticos).
- **RF-002**: Listagem principal no formato de Cards ou Tabela Rica contendo:
    - Título do Objetivo.
    - Barra de Progresso visual (Mantine Ring ou Progress Bar).
    - Badge de Status (Verde/Amarelo/Vermelho).
    - Ícone ou Avatar do Responsável.
- **RF-003**: Botão Floating ou Header Action para "Novo Objetivo".
- **RF-004**: Integração com `useOkrCalculation` para obter dados enriquecidos com saúde baseada no tempo do ciclo.

## 🎨 Design & UX (Premium Aesthetics)
- **Cores**: Usar a paleta do Design System (Cyan/Dark).
- **Interações**: Efeito de hover nos cards, micro-animações de entrada (Motion).
- **Responsividade**: Grid que se ajusta de 3 colunas (Desktop) para 1 coluna (Mobile).

## 🧪 Critérios de Aceite
1. O dashboard deve carregar dados reais do Supabase.
2. Se não houver OKRs, deve exibir um "Empty State" motivador com botão de criação.
3. O status exibido (ex: "Atrasado") deve refletir o cálculo automático de tendência.
