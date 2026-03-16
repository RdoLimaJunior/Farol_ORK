# Feature Specification: 009-Mapa-Estrategico

**Feature Branch**: `feature/009-mapa-estrategico`  
**Created**: 2026-03-15  
**Status**: Draft  
**Input**: Visualização em cascata e alinhamento de objetivos.

## 🎯 Objetivo
Prover uma visão clara de como os objetivos táticos e operacionais se alinham aos objetivos estratégicos da empresa, permitindo entender o "efeito cascata" e a saúde de cada ramificação da estratégia.

## 👤 User Stories

### US1 - Visualização em Árvore (Cascata)
**Como** um gestor,  
**Quero** ver os objetivos organizados por níveis (Pai -> Filho),  
**Para** entender como as metas menores contribuem para as metas globais.

### US2 - Alinhamento e Saúde
**Como** um executivo,  
**Quero** identificar rapidamente quais "galhos" da estratégia estão em risco,  
**Para** intervir nos times que estão com OKRs críticos.

## 🛠 Requisitos Funcionais

- **RF-001**: Renderizar uma visualização hierárquica (Tree View) de todos os OKRs.
- **RF-002**: Mostrar o progresso consolidado em cada nível.
- **RF-003**: Indicar visualmente o status (On Track, At Risk, Off Track) usando cores no Mapa.
- **RF-004**: Permitir expandir/recolher níveis para facilitar a navegação em grandes árvores.
- **RF-005**: Integração com `useObjectives` e `useKRs` para dados reais (ou mockados no modo dev).

## 🎨 Design & UX (Premium)
- **Layout**: Lista hierárquica organizada com indentação visual clara.
- **Indicadores**: Bordas laterais coloridas nos cards para indicar saúde.
- **Interatividade**: Transições suaves ao abrir/fechar ramos da árvore.

## 🧪 Critérios de Aceite
1. Se o objetivo A é pai de B, B deve aparecer indentado abaixo de A.
2. A barra lateral do card deve mudar de cor baseada no status real do objetivo.
3. O progresso deve ser exibido de forma proeminente em cada nodo da árvore.
