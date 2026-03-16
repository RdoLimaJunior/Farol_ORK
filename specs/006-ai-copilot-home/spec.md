# Feature Specification: IA Copilot Home

**Feature Branch**: `006-ai-copilot-home`  
**Created**: 2026-03-16  
**Status**: Draft  
**Priority**: P1

## Overview

O IA Copilot Home transforma a tela inicial em um cockpit proativo e sensível ao contexto. Em vez de uma interface passiva, o sistema antecipa as necessidades do gestor através de sugestões dinâmicas (Action Chips) e uma saudação personalizada, reduzindo a carga cognitiva e acelerando a gestão de OKRs.

**Princípio**: Interface Proativa (Context-Aware).
**UX**: Heurística de Flexibilidade e Eficiência.

## User Scenarios & Testing

### User Story 1 - Proactive Management (Priority: P1)
Como Gestor, eu quero ver sugestões de ações rápidas ao abrir o sistema, para que eu possa focar imediatamente nos OKRs que precisam de atenção sem ter que navegar por vários menus.

**Test**: Abrir a Home e verificar se 3-4 chips de ação são exibidos abaixo do input de busca/comando.
**Acceptance Criteria**:
1. A saudação deve incluir o nome do usuário e mudar conforme o horário (Bom dia / Boa tarde / Boa noite).
2. Devem ser exibidos pelo menos 3 Action Chips com categorias diferentes (Criação, Monitoramento, Comandos).

### User Story 2 - Swift Command Execution (Priority: P1)
Como Gestor, eu quero clicar em uma sugestão e ter o comando preenchido e executado instantaneamente, para ganhar tempo na minha rotina de gestão.

**Test**: Clicar no chip "Quais KRs estão em risco hoje?" e verificar se o chat inicia a busca automaticamente.
**Acceptance Criteria**:
1. O clique no chip deve preencher o input do SmartPrompt.
2. O sistema deve iniciar o processamento da resposta imediatamente após o clique.

## Requirements

### Functional Requirements
- **FR-01**: Saudação Dinâmica baseada no horário e `fullName` do perfil logado.
- **FR-02**: Área de Sugestões de Contexto (Action Chips) com renderização de 3 a 4 chips.
- **FR-03**: Os chips devem ser categorizados:
    - *Criação*: "Criar OKR para [Time]..."
    - *Monitoramento*: "Resumo de progresso..."
    - *Comandos*: "Quais KRs em risco?"
- **FR-04**: Input Inteligente: Clique no chip aciona o auto-preenchimento e envio do comando para o motor de IA/Chat.
- **FR-05**: Lógica de Randomização Ponderada para alternar sugestões baseadas no estado atual do sistema (ex: priorizar risco se houver OKRs atrasados).

### Non-Functional Requirements
- **RNF-01**: Acessibilidade: Todos os chips devem possuir `aria-labels` descritivos.
- **RNF-02**: Performance: Utilizar Skeleton screens durante o carregamento inicial das sugestões.
- **RNF-03**: Responsividade: O grid de chips deve se ajustar para 1 ou 2 colunas em dispositivos móveis.

## Success Criteria

- **SC-01**: Redução no tempo médio para iniciar um check-in ou comando comum em 40%.
- **SC-02**: 100% de conformidade com o Design System (PageHeader + Tokens Farol).
- **SC-03**: Carregamento da área de Copilot (incluindo sugestões) em menos de 800ms.
