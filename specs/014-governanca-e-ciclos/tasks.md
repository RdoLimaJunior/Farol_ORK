# Tasks: Governança, Ciclos e Permissões

## Phase 1: Setup
- [ ] T001 Criar tabela `cycles` no banco de dados via Supabase (SQL)
- [ ] T002 Gerar tipos TypeScript para a entidade `Cycle` em `src/domain/models/governance.ts`

## Phase 2: Ciclos de OKR
- [ ] T003 [P] Criar componente `CyclesManagement.tsx` em `src/presentation/pages/`
- [ ] T004 Adicionar rota `/settings/cycles` no `App.tsx`
- [ ] T005 Implementar CRUD (Criar, Listar, Deletar) para Ciclos

## Phase 3: Níveis e Permissões (RBAC)
- [ ] T006 [P] Criar componente `PermissionsManagement.tsx` em `src/presentation/pages/`
- [ ] T007 Adicionar rota `/settings/permissions` no `App.tsx`
- [ ] T008 Implementar atualização de `role` na listagem de usuários

## Phase 4: Integração
- [ ] T009 [P] Atualizar `Settings.tsx` para linkar corretamente as novas páginas
- [ ] T010 Garantir que usuários sem nível 'admin' não consigam acessar estas rotas (HOC ProtectedRoute)

## Phase 5: Polimento
- [ ] T011 Adicionar Empty States para quando não houver ciclos cadastrados
- [ ] T012 Validar sobreposição de datas em ciclos
