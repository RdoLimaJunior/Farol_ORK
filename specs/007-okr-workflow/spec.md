# Feature Specification: OKR Workflow & Calculations

**Feature Branch**: `007-okr-workflow`  
**Created**: 2026-03-16  
**Status**: Draft  
**Priority**: P1

## Overview

Esta feature implementa a inteligência de cálculo e o fluxo de atualização de OKRs. O sistema deixará de ter valores estáticos para calcular automaticamente o progresso dos Key Results (KRs) com base em polaridade e o progresso dos Objetivos com base no peso de cada KR. Além disso, introduz o modal de Check-in para registro de evoluções e comentários.

## User Scenarios & Testing

### User Story 1 - Registro de Evolução (P1)
Como Responsável por um KR, eu quero realizar um check-in informando o valor atual e um comentário, para que o time saiba como a meta está evoluindo.

**Test**: Abrir o modal de Check-in de um KR, atualizar o valor de 0 para 50 e salvar.
**Acceptance Criteria**:
1. O valor atual do KR deve ser atualizado no banco.
2. Um novo registro deve ser criado na tabela `kr_updates`.
3. O progresso do KR e do Objetivo pai deve ser recalculado e refletido na interface.

### User Story 2 - Cálculo por Polaridade (P2)
Como Gestor, eu quero definir se um KR é de redução (ex: Turnover) ou aumento (ex: Vendas), para que o progresso seja calculado corretamente.

**Test**: Configurar um KR com polaridade "Descendente" (Meta de reduzir de 10% para 2%). Se o valor atual mudar de 10% para 6%, o progresso deve ser 50%.
**Acceptance Criteria**:
1. O progresso deve respeitar a lógica de polaridade.

## Requirements

### Functional Requirements
- **FR-01: Polaridade de KR**: Adicionar campo `polarity` ('ascending' | 'descending') na tabela `key_results`.
- **FR-02: Cálculo Automático de KR**: Calcular progresso baseado em `start_value`, `target_value`, `current_value` e `polarity`.
- **FR-03: Cálculo Ponderado de Objetivo**: O progresso do Objetivo deve ser a média ponderada do progresso de seus KRs (usando o campo `weight`).
- **FR-04: Modal de Check-in**: Interface para atualizar valor atual, nível de confiança e comentário.
- **FR-05: Histórico de Atualizações**: Exibir as últimas atualizações de check-in na tela de detalhes do OKR.

### Non-Functional Requirements
- **RNF-01: Precisão**: Cálculos matemáticos devem ser feitos com precisão decimal (Numeric no banco).
- **RNF-02: UI Consistente**: O modal de Check-in deve seguir o padrão de design do sistema (Mantine).

## Success Criteria
- **SC-01**: Atualização de progresso refletida em tempo real (ou via recarregamento de estado) após check-in.
- **SC-02**: Cálculo correto para OKRs com múltiplos KRs de pesos diferentes.
