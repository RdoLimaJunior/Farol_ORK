# Feature Specification: Governança, Ciclos e Permissões (RBAC)

**Feature Branch**: `014-governanca-e-ciclos`  
**Created**: 2026-03-16  
**Status**: Draft  
**Priority**: P1

## Overview

Este módulo consolida a governança da plataforma FAROL, permitindo a gestão temporal (Ciclos de OKR) e a segurança de acesso (Permissões/RBAC). É fundamental para garantir que a estratégia tenha prazos definidos e que dados sensíveis sejam protegidos de acordo com o papel do usuário.

## Requisitos

### 1. Ciclos de OKR (Gestão Temporal)
- **CRUD de Ciclos**: Criação de trimestres (Ex: Q1 2026, Q2 2026).
- **Datas**: Definição de data de início e término.
- **Status**: Status do ciclo (Planejamento, Ativo, Concluído).
- **Filtro Global**: A plataforma deve permitir filtrar OKRs pelo ciclo selecionado.

### 2. Níveis e Permissões (RBAC)
- **Papéis (Roles)**: 
    - **Admin**: Acesso total (Configurações, Gestão de Membros, Deletar Objetivos).
    - **Gestor**: Pode criar e editar OKRs do seu time, mas não altera configurações de sistema.
    - **Membro**: Pode realizar check-ins e editar seus próprios KRs.
- **Visualização**: Definir o que é visível para cada papel no menu lateral e botões de ação.

## User Scenarios

### User Story 1 - Planejamento de Ciclo
Como Admin, quero criar o ciclo "Q1 2026" para que os gestores possam começar a cadastrar metas para o próximo trimestre.

### User Story 2 - Controle de Acesso
Como Admin, quero mudar o papel de um usuário de "Membro" para "Gestor", para que ele possa gerenciar os OKRs do seu departamento.

## Functional Requirements
- **FR-01**: Página de Gestão de Ciclos em `/settings/cycles`.
- **FR-02**: Página de Gestão de Permissões em `/settings/permissions`.
- **FR-03**: Persistência de Ciclos no banco de dados (Tabela `cycles`).
- **FR-04**: Middleware/Lógica de UI para esconder botões restritos baseados no `profile.role`.

## Technical Plan
- **Database**: Adicionar tabela `cycles` se não existir.
- **Components**: Criar `src/presentation/pages/CyclesManagement.tsx` e `src/presentation/pages/PermissionsManagement.tsx`.
- **Breadcrumbs**: Implementar navegação clara dentro de Configurações.
