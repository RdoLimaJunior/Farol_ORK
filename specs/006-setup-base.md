# Feature Specification: 006-Setup-Base (Governança, Ciclos e Organograma)

**Feature Branch**: `feature/006-setup-base`
**Created**: 2026-03-15
**Status**: Draft
**Input**: Necessidade fundacional do MVP de alocar metas no tempo (Ciclos) e no espaço corporativo (Áreas/Organograma).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Gestão de Ciclos e Anos Fiscais (Priority: P1)
O administrador do sistema deve ser capaz de criar Anos e Trimestres (Ciclos) para orientar o ritmo de OKRs da empresa. Nenhuma meta pode existir sem um ciclo.
**Why this priority**: Impede que o banco de dados seja populado com "metas soltas no tempo", base fundamental da metodologia OKR (Metas têm prazo de validade rígido).
**Independent Test**: Tentar criar um Objetivo sem ciclo ativo deve resultar em erro no formulário. Acessar Configurações > Ciclos e criar "2026-Q1" de 01/Jan a 31/Mar.
**Acceptance Scenarios**:
1. **Given** a tela de Configurações, **When** o Admin tenta criar um ciclo com data final menor que a inicial, **Then** o sistema bloqueia e emite um erro de validação (Error State amigável).
2. **Given** um ciclo ativo, **When** chega o último dia do ciclo, **Then** a plataforma exibe um aviso (Toast) sugerindo o fechamento e replanejamento para os gestores de meta.

---

### User Story 2 - Organograma e Áreas de Domínio (Priority: P1)
A empresa precisa refletir sua estrutura interconectada (Tribos, Squads ou Diretorias) no sistema para que os OKRs tenham "Responsáveis de Área" além de donos individuais.
**Why this priority**: Permite os relatórios e a visão de "Radar/Grafo" funcionarem, agrupando metas por equipe/diretoria (A visão da Persona **Ricardo**).
**Independent Test**: Cadastrar a Área PAI "Tecnologia" e a Área FILHA "Engenharia de Software".
**Acceptance Scenarios**:
1. **Given** o cadastro de Áreas, **When** o usuário define uma relação Pai-Filho, **Then** a UI exibe o organograma no formato hierárquico (Árvore).
2. **Given** um nó do organograma excluído acidentalmente, **When** ele possuía KRs atrelados a ele, **Then** o sistema adverte sobre o impacto ou transfere as metas para a Área Pai (Safety Check).

---

### User Story 3 - Role-Based Access Control Leve (RBAC) (Priority: P2)
O sistema precisa garantir que apenas líderes e admins possam fechar ciclos ou deletar Objetivos de negócio de alto nível, enquanto integrantes base podem apenas alterar os KRs e fazer Check-in.
**Why this priority**: Protege os dados estratégicos de sabotagem acidental, uma exigência crítica B2B.
**Acceptance Scenarios**:
1. **Given** a Persona **Lucas** (Contribuinte), **When** ele tenta deletar uma Área de Negócio, **Then** o botão não existe ou exibe "Acesso Negado".

## Requirements *(mandatory)*

### Functional Requirements
- **FR-051**: CRUD de Permissões de Usuário (RBAC).
- **FR-053**: CRUD de Ciclos (Gestão de status: Planejamento, Ativo, Fechado).
- **FR-054**: CRUD de Áreas (Organograma com suporte Pai-Filho).

### Key Entities (Domain Models in TypeScript)

```typescript
// ./src/domain/models/governance.ts

export type CycleStatus = 'planning' | 'active' | 'closed';

export interface Cycle {
  id: string;
  name: string;        // Ex: "2026 - Q1"
  startDate: string;   // ISO Date
  endDate: string;     // ISO Date
  status: CycleStatus;
}

export interface Department {
  id: string;
  name: string;              // Ex: "Produto & Engenharia"
  parentDepartmentId?: string; // Permite construir a árvore
  directorId: string;        // O cabeça da área
}

export type Role = 'admin' | 'manager' | 'contributor';

export interface UserContext {
  userId: string;
  role: Role;
  departmentId: string;
}
```

## Success Criteria *(mandatory)*
- **SC-001**: O sistema não deve permitir que Ciclos Ativos tenham sobreposição de datas (Overlap) acidental.
- **SC-002**: A deleção de uma Área (Department) que contiver filhos ou OKRs associados deve usar soft-delete para preservar os dados históricos do Timoneiro.
