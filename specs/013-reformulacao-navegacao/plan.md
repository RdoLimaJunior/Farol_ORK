# Implementation Plan: Reformulação da Navegação (Menu Lateral)

## Tech Stack
- **Framework**: React 18.2
- **UI Components**: @mantine/core
- **Icons**: @tabler/icons-react
- **Routing**: react-router-dom

## Architecture
- **Layout**: `AppLayout.tsx` utiliza `AppShell` do Mantine.
- **Navigation Logic**: Baseada em um array `navGroups` que mapeia labels, icons e paths.
- **Routing**: Centralizada no `App.tsx`.

## Proposed Changes

### 1. Presentation Layer (`src/presentation/layouts/AppLayout.tsx`)
- Atualizar a constante `navGroups` para refletir a nova hierarquia de quatro pilares.
- Adicionar novos ícones do `@tabler/icons-react` para melhor representação visual.
- Renomear itens de menu conforme a especificação.

### 2. Routing (`src/App.tsx`)
- Adicionar rotas para `/checkins`, `/feedbacks`, `/reports` e `/execution-overview`.
- Mapear `/execution` para o componente `ActionPlans`.
- Mapear `/feedbacks` para o componente `Analytics`.
- Mapear `/reports` para o componente `Reports`.
- Mapear `/checkins` para o componente `Checkins`.

## File Structure Changes
- Nenhuma criação de componente novo é necessária neste estágio, apenas atualização de layouts e rotas existentes.

## Validation Strategy
- **Manual Test**: Verificar o clique em cada item do menu e se a rota/página correspondente é carregada.
- **Visual Check**: Verificar o agrupamento e labels no menu lateral.
