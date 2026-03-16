# Technical Plan: IA Copilot Home Implementation

**Feature**: `006-ai-copilot-home`

## Architecture Overview

A implementação focará no redesenho da seção superior da `Home.tsx`, introduzindo o novo `ActiveDashboardHero` que servirá de container para a inteligência proativa.

### Components Structure
- **Container**: `ActiveDashboardHero.tsx`
    - `GreetingHeader.tsx`: Lógica de tempo (JS `Date`) + Perfil do usuário.
    - `ActionChipArea.tsx`: Grid de componentes `ActionChip`.
    - `ActionChip.tsx`: Botão estilizado com ícone, label e estados visuais (Design System).

### Data Flow & Logic
- **Hook `useManagerContext`**: 
    - Buscará o status resumido de OKRs (atrasados, em risco, concluídos).
    - Gerará uma lista ponderada de sugestões.
    - Exportará a função `executeSuggestedAction(text)`.

## Implementation Steps

### Phase 1: Core Components & Styling
1. Criar `src/presentation/components/Home/ActionChip.tsx` com estilos do Design System.
2. Criar `src/presentation/components/Home/ActiveDashboardHero.tsx` para substituir o topo da Home.
3. Atualizar `Home.tsx` para integrar o novo Hero.

### Phase 2: Intelligence & Context
1. Desenvolver o hook `useManagerContext` (ou estender o `useObjectives`).
2. Implementar função de saudação dinâmica:
   - `05:00 - 11:59`: "Bom dia"
   - `12:00 - 17:59`: "Boa tarde"
   - `18:00 - 04:59`: "Boa noite"
3. Implementar lógica de filtragem de chips baseada em dados (Ex: Se houver 0 OKRs, mostrar apenas chip de criação).

### Phase 3: Integration & Interaction
1. Vincular o clique do `ActionChip` ao input do `SmartPrompt.tsx`.
2. Adicionar animações de entrada (`framer-motion`) individuais para cada chip.
3. Implementar Skeletons para a área de chips.

## Technical Considerations
- **Categorização**: Utilizar ícones distintos para cada tipo de chip (Ex: `IconPlus` para criação, `IconAlertTriangle` para risco).
- **Extensibilidade**: A lista de chips deve vir de uma configuração central para facilitar atualizações futuras de prompt.
