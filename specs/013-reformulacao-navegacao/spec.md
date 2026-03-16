# Feature Specification: Reformulação da Navegação (Menu Lateral)

**Feature Branch**: `013-reformulacao-navegacao`  
**Created**: 2026-03-16  
**Status**: Draft  
**Priority**: P1

## Overview

Esta iniciativa visa reformular a arquitetura de informação do menu lateral do Farol_OKR, que atualmente carece de hierarquia clara e usabilidade. A nova estrutura organiza as funcionalidades em quatro pilares principais, facilitando o acesso rápido às ferramentas de operação diária, gestão estratégica, monitoramento de desempenho e configurações do sistema.

## Estrutura Desejada

### 1. GRUPO: OPERAÇÃO
*Foco na rotina diária e insights rápidos do usuário.*
- **Timoneiro**: Central de comando e insights (antigo Início).
- **Visão Geral**: Dashboards e painel de decisão.
- **Meus OKRs**: Resultados específicos do usuário logado.
- **Planos de Ação**: Gestão de tarefas e projetos (antiga Execução).

### 2. GRUPO: GESTÃO ESTRATÉGICA (Diretrizes)
*Visão macro e desdobramento das metas corporativas.*
- **Estratégico**: Metas anuais e visão de longo prazo.
- **Tático**: Metas de departamentos e times.
- **Operacional**: Visão geral da execução.

### 3. GRUPO: MONITORAMENTO & CULTURA (Dados & Rituais)
*Acompanhamento de progresso e rituais de gestão.*
- **Check-ins**: Atualização de progresso dos KRs.
- **Visão Geral**: Saúde dos OKRs e KPIs.
- **Feedbacks**: Espaço de conversas e análise (CFR).
- **Cultura**: Missão, Visão, Valores e Princípios.

### 4. GRUPO: SISTEMA
*Configurações administrativas.*
- **Configurações**: Ciclos, usuários e permissões.

## User Scenarios & Testing

### User Story 1 - Acesso Rápido à Operação (Priority: P1)
Como usuário, quero que as ferramentas que uso diariamente (meus OKRs e planos de ação) estejam no topo, para que eu possa executar meu trabalho sem navegar por menus complexos.

**Test**: Verificar se "Início", "Visão Geral", "Meus OKRs" e "Planos de Ação" estão no primeiro grupo do menu.

### User Story 2 - Visão Estratégica Clara (Priority: P1)
Como gestor, quero distinguir claramente entre metas do meu time e a visão geral da empresa, para entender como minha operação contribui para o todo.

**Test**: Navegar entre as abas "Estratégico", "Tático" e "Operacional" no grupo de Gestão Estratégica.

### User Story 3 - Monitoramento e Ritualística (Priority: P2)
Como usuário, quero um espaço dedicado para rituais como Check-ins e Feedbacks, para que a cultura de OKR seja incorporada naturalmente no fluxo de trabalho.

**Test**: Acessar "Check-ins" e "Feedbacks" no grupo de Monitoramento & Cultura.

## Requirements

### Functional Requirements
- **FR-01**: Reorganizar `navGroups` no `AppLayout.tsx`.
- **FR-02**: Atualizar ícones para refletir a nova semântica dos itens.
- **FR-03**: Renomear itens de menu conforme solicitado (ex: "Execução" -> "Planos de Ação", "Início" -> "Timoneiro").
- **FR-04**: Consolidar gestão de usuários, permissões e ciclos dentro da página de Configurações.
- **FR-05**: Remover acesso direto a "Membros" do menu lateral principal.

### Non-Functional Requirements
- **RNF-01**: Hierarquia visual clara usando divisores e títulos de grupo em caixa alta.
- **RNF-02**: Microinterações ao passar o mouse (hover) e feedback visual de item ativo.
- **RNF-03**: Performance: A mudança não deve introduzir novos re-renders desnecessários no layout principal.
