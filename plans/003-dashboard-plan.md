# Technical Plan: 003-Dashboard-Executivo

## 🏗 Arquitetura de Componentes

### 1. `DashboardPage` (Container)
- Responsável por orquestrar os hooks `useObjectives`, `useKRs` (se existir) e `useOkrCalculation`.
- Layout em `Grid` do Mantine.

### 2. `StatCards` (Presentational)
- Componente para os indicadores de topo (KPIs de Saúde do Portfólio).
- Props: `total`, `onTrack`, `atRisk`, `offTrack`.

### 3. `ObjectiveCard` (Presentational)
- Exibição de um único OKR.
- Elementos: `ProgressRing` (Mantine), `Badge` de status, Título, Dono.
- Ação: Clique para abrir detalhes (futuro).

### 4. `CreateObjectiveModal` (UI Logic)
- Reutilizar ou criar formulário baseado no `useObjectives.createObjective`.

## 🔄 Fluxo de Dados
1. `Dashboard` chama `fetchObjectives` e `fetchKRs` (via Supabase).
2. Passa os dados brutos para o logic wrapper `useOkrCalculation`.
3. Consome `enrichedObjectives` para renderizar a lista.
4. Calcula contadores de status agregados para os `StatCards`.

## 🛠 Bibliotecas e Ferramentas
- **Mantine Core**: Grid, Paper, RingProgress, Badge, Skeleton (para loading).
- **Framer Motion**: Animações de entrada dos cards.
- **Tabler Icons**: Ícones para os status e ações.

## 🚀 Estratégia de Implementação
1. Criar componente `OkrStats` para o topo.
2. Criar componente `ObjectiveGrid` para a listagem.
3. Integrar os hooks de dados no `Dashboard.tsx`.
4. Adicionar o modal de criação rápida.
