# Technical Plan: OKR Workflow & Calculations

**Feature**: `007-okr-workflow`

## Architecture Overview

A lógica de cálculo será centralizada em uma camada de serviço para garantir consistência entre o frontend e futuras automações.

### Schema Changes
1. Adicionar coluna `polarity` na tabela `key_results` via migração Supabase.
   - `polarity` TEXT CHECK (polarity IN ('ascending', 'descending')) DEFAULT 'ascending'.

### Services & Hooks
- **`src/application/services/okrMath.ts`**: Funções puras para cálculo de progresso.
- **`src/application/services/checkinService.ts`**: Lógica de persistência do check-in e atualização em cascata (cascata de progresso no Objetivo).

## Implementation Steps

### Phase 1: Database & Basic Logic
1. Criar e aplicar migração SQL para adicionar `polarity`.
2. Criar `okrMath.ts` com funções `calculateKrProgress` e `calculateObjectiveProgress`.

### Phase 2: Check-in UI
1. Desenvolver `src/presentation/components/CheckInModal.tsx`.
2. Integrar o modal nos botões de ação do `OkrCard` e `OkrDetails`.

### Phase 3: Integration
1. Implementar `performCheckIn` no serviço, que:
   - Salva o update.
   - Recalcula o progresso do KR.
   - Recalcula o progresso do Objetivo.
2. Atualizar a UI para exibir o nível de confiança e o histórico de atualizações (Activity Feed).

## Technical Considerations
- **Cálculo Descendente**: `(start - current) / (start - target)`.
- **Cálculo Ascendente**: `(current - start) / (target - start)`.
- **Pesos**: Se um Objetivo tem 2 KRs e um tem peso 2 e o outro peso 1, o primeiro vale 66% do total.
