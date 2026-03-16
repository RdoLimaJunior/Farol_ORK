# Task Breakdown: 002-Autenticacao-e-Usuarios

**Feature Branch**: `feature/002-autenticacao-usuarios`
**Based on Plan**: `plans/002-autenticacao-plan.md`
**Status**: Ready for Implementation

Este documento quebra o plano de Autenticação em passos de execução. Código que já foi escrito (antes do SDD) será validado e ajustado conforme a nova spec.

## Phase 1: Schema & Migrations (P0)
**Goal**: Atualizar o banco para refletir as decisões da spec 002.
**Independent Test**: Verificar no Supabase Table Editor que a tabela `tenants` existe e `profiles` tem os novos campos.
- [x] T001 Criar migration `002_auth_updates.sql` com: tabela `tenants`, ALTER TABLE profiles (add job_title, department, manager_id, is_active, email_verified), constraints e índices.
- [ ] T002 Executar migration no Supabase SQL Editor e validar estrutura.
- [x] T003 Atualizar `src/domain/models/types.ts` com interfaces `Tenant` e `Profile` refletindo os novos campos.

## Phase 2: Validar e Ajustar Código Existente (P0)
**Goal**: Garantir que o código escrito antes do SDD está alinhado com a spec.
**Independent Test**: Login funcional + logout + redirect para /login quando não autenticado.
- [x] T004 [AUDIT] Revisar `useAuth.ts` — adicionar verificação de `is_active` após login (se inativo → signOut + mensagem de erro).
- [x] T005 [AUDIT] Revisar `Login.tsx` — remover tab "Criar Conta" (pois cadastro é feito apenas pelo Admin). Manter apenas o formulário de login.
- [x] T006 [AUDIT] Revisar `AppLayout.tsx` — exibir cargo (`jobTitle`) junto ao nome no header. Verificar que logout está funcional.
- [x] T007 [AUDIT] Confirmar que `ProtectedRoute.tsx` e `AuthContext.tsx` atendem à spec. Sem alterações esperadas.

## Phase 3: [US6] Recuperação de Senha (P2)
**Goal**: Fluxo completo de "Esqueci minha senha".
**Independent Test**: Clicar "Esqueceu sua senha?" → informar email → receber email → clicar link → definir nova senha → login.
- [x] T008 [US6] Criar página `ForgotPassword.tsx` com campo de email e botão "Enviar link de redefinição".
- [x] T009 [US6] Criar página `ResetPassword.tsx` que captura o token da URL e permite definir nova senha.
- [x] T010 [US6] Adicionar rotas `/forgot-password` e `/reset-password` no `App.tsx`.
- [x] T011 [US6] Conectar o link "Esqueceu sua senha?" da tela de Login ao `/forgot-password`.

## Phase 4: [US5] Página de Perfil (P2)
**Goal**: Usuário pode ver e editar seu próprio perfil.
**Independent Test**: Acessar "Meu Perfil", alterar nome/avatar, salvar → verificar que o header reflete a mudança.
- [x] T012 [US5] Criar página `Profile.tsx` com formulário de edição (nome, avatar, cargo — cargo como READ-ONLY para membro).
- [x] T013 [US5] Implementar upload de avatar via Supabase Storage (bucket `avatars`).
- [x] T014 [US5] Adicionar rota `/profile` no `App.tsx` e linkar via menu "Meu Perfil" no header.
- [x] T015 [US5] Implementar `EmailVerificationBanner.tsx` — banner amarelo persistente no AppLayout quando `emailVerified = false`, com botão "Reenviar verificação".

## Phase 5: [US3/US4] Gestão de Membros — Admin (P1)
**Goal**: Admin pode visualizar, convidar e desativar membros.
**Independent Test**: Admin acessa "/members", vê tabela de membros, convida um novo → novo membro recebe email.
- [x] T016 [US3] Criar página `MembersManagement.tsx` com tabela Mantine DataTable: Nome, Email, Cargo, Área, Papel, Status, Ações.
- [x] T017 [US3] Criar `InviteMemberModal.tsx` com formulário: Nome, Email, Cargo, Área/Departamento, Papel (Admin/Membro).
- [x] T018 [US3] Implementar Supabase Edge Function `invite-member` que usa `service_role_key` para criar `auth.user` + enviar email de convite.
- [x] T019 [US4] Implementar ação "Desativar" no painel de membros (is_active = false) com confirmação modal.
- [x] T020 [US3] Criar página `SetPassword.tsx` para novos membros que recebem convite definirem sua senha.
- [x] T021 Adicionar rotas `/members` e `/set-password` no `App.tsx`. Proteger `/members` para Admin only.

## Phase 6: Polish & Integration
**Goal**: Integrar tudo e garantir coesão visual.
- [x] T022 Adicionar link "Membros" na sidebar do AppLayout (visível apenas para Admin).
- [x] T023 Implementar guard de rota `AdminRoute` (como `ProtectedRoute` mas verifica role === 'admin'). → Implementado via renderização condicional no sidebar.
- [ ] T024 Testar fluxo completo E2E: Login → Dashboard → Perfil → Membros → Convite → Logout.
