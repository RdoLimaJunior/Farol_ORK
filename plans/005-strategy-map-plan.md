# Technical Plan: 005-Mapa-Estrategico

## 🏗 Arquitetura da Página

### 1. `StrategyPage` (`src/presentation/pages/Strategy.tsx`)
- Ponto de entrada que consome os hooks de dados.
- Renderiza o cabeçalho descritivo e o container principal.

### 2. `TreeHierarchyView` (`src/presentation/components/TreeHierarchyView.tsx`)
- Já existente, mas será revisado para garantir que a UI esteja "Premium".
- Usa recursividade para desenhar a árvore.

### 3. Integração de Dados
- Usar `useObjectives`, `useKRs` e `useOkrCalculation` para garantir que os dados na árvore tenham progresso e status atualizados.

## 🚀 Estratégia de Implementação
1. Revisar o design do `TreeHierarchyView` para torná-lo mais limpo e visualmente agradável (estilo Glassmorphism ou Cartões flutuantes).
2. Atualizar o `Strategy.tsx` para carregar as informações e passar para o Componente de Árvore.
3. Adicionar animações de entrada para cada item da árvore para dar sensação de profundidade.

## 🛠 Melhorias na UI
- Adicionar Tooltips explicativos.
- Garantir que a indentação funcione bem em telas menores.
