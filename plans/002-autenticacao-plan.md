# Technical Plan: 002-Autenticacao-e-Usuarios

**Feature Branch**: `feature/002-autenticacao-usuarios`  
**Based on Spec**: `specs/002-autenticacao-e-usuarios.md`  
**Status**: Draft

## 1. Architecture Overview

### Camada de Autenticação
A autenticação é gerenciada inteiramente pelo **Supabase Auth** (GoTrue). O frontend se comunica via `@supabase/supabase-js` sem necessidade de API custom. O fluxo é:

```
Login Page → supabase.auth.signInWithPassword() → JWT → Sessão persistida no localStorage
                                                      ↓
                                              AuthContext (React Context)
                                                      ↓
                                         ProtectedRoute → AppLayout → Pages
```

### Estrutura de Pastas (Novos Arquivos)
```text
src/
├── application/
│   ├── context/
│   │   └── AuthContext.tsx          # Context global com user/session/profile
│   └── hooks/
│       └── useAuth.ts              # Hook: signIn, signUp, signOut, fetchProfile
├── presentation/
│   ├── components/
│   │   ├── ProtectedRoute.tsx      # Guard de rota (redirect se !authenticated)
│   │   ├── EmailVerificationBanner.tsx  # [NOVO] Banner "Verifique seu email"
│   │   └── InviteMemberModal.tsx   # [NOVO] Modal de convite do Admin
│   ├── pages/
│   │   ├── Login.tsx               # [ATUALIZADO] Login com auth real
│   │   ├── SetPassword.tsx         # [NOVO] Tela para novo membro definir senha
│   │   ├── ForgotPassword.tsx      # [NOVO] Tela de recuperação de senha
│   │   ├── ResetPassword.tsx       # [NOVO] Tela de redefinição (link do email)
│   │   ├── Profile.tsx             # [NOVO] Página "Meu Perfil"
│   │   └── MembersManagement.tsx   # [NOVO] Painel de membros (Admin only)
│   └── layouts/
│       └── AppLayout.tsx           # [ATUALIZADO] Exibir nome real + banner email
└── domain/
    └── models/
        └── types.ts                # [ATUALIZADO] Interfaces Profile, Tenant
```

## 2. Backend & Database (Supabase / PostgreSQL)

### Nova Tabela: `tenants`
```sql
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### Tabela Atualizada: `profiles`
Campos a ADICIONAR na tabela já existente:
```sql
ALTER TABLE profiles
  ADD COLUMN job_title TEXT,
  ADD COLUMN department TEXT,
  ADD COLUMN manager_id UUID REFERENCES profiles(id),
  ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN email_verified BOOLEAN NOT NULL DEFAULT false;

-- Simplificar roles: remover 'owner' e 'viewer', manter apenas admin/member
ALTER TABLE profiles DROP CONSTRAINT profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
  CHECK (role IN ('admin', 'member'));

-- Atualizar default
ALTER TABLE profiles ALTER COLUMN role SET DEFAULT 'member';

-- FK para tenants
ALTER TABLE profiles ADD CONSTRAINT profiles_tenant_fk 
  FOREIGN KEY (tenant_id) REFERENCES tenants(id);
```

### RLS Policies Adicionais
```sql
-- Admin pode ver todos os membros do seu tenant
CREATE POLICY "Admin can manage members" ON profiles
  FOR ALL USING (
    tenant_id IN (SELECT tenant_id FROM profiles WHERE id = auth.uid())
    AND EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Membros podem ver perfis do tenant (read-only)
CREATE POLICY "Members can view tenant profiles" ON profiles
  FOR SELECT USING (
    tenant_id IN (SELECT tenant_id FROM profiles WHERE id = auth.uid())
  );
```

### Trigger: Login Guard (usuário inativo)
```sql
-- Impedir login de usuários desativados
-- Implementado via RPC ou Edge Function que verifica is_active antes de retornar
-- dados da sessão. O frontend valida após signIn() se o profile.is_active = false
-- e executa signOut() automaticamente.
```

## 3. API & Data Flow

### Fluxo de Login
```
1. User submete email/senha
2. supabase.auth.signInWithPassword({ email, password })
3. Se sucesso → JWT retornado → sessão armazenada
4. AuthContext dispara fetchProfile(userId)
5. Se profile.is_active === false → supabase.auth.signOut() + msg erro
6. Se profile.email_verified === false → mostrar EmailVerificationBanner
7. Se tudo OK → redirect para Dashboard com dados no Context
```

### Fluxo de Convite (Admin)
```
1. Admin preenche modal InviteMemberModal (nome, email, cargo, área, role)
2. Frontend chama supabase.auth.admin.createUser() via Edge Function
   (pois a Anon Key não tem permissão de criar users)
3. Supabase cria auth.user → Trigger cria profile com dados extras
4. Supabase envia email de boas-vindas com link "magic link"
5. Novo membro clica no link → SetPassword.tsx → define senha → login
```

### Fluxo de Recuperação de Senha
```
1. User clica "Esqueceu sua senha?" → ForgotPassword.tsx
2. Informa email → supabase.auth.resetPasswordForEmail(email)
3. Supabase envia email com link de redefinição
4. User clica no link → ResetPassword.tsx
5. Define nova senha → supabase.auth.updateUser({ password })
6. Redirect para Login com toast de sucesso
```

## 4. Impacto no Código Existente

### O que já foi implementado (antes do SDD):
| Arquivo | Status | Ação Necessária |
|---------|--------|-----------------|
| `useAuth.ts` | ✅ Implementado | Adicionar: verificação `is_active`, lógica de convite |
| `AuthContext.tsx` | ✅ Implementado | Nenhuma mudança |
| `ProtectedRoute.tsx` | ✅ Implementado | Nenhuma mudança |
| `Login.tsx` | ✅ Implementado | Remover tab "Criar Conta" (admin-only), adicionar link "Esqueci senha" funcional |
| `AppLayout.tsx` | ✅ Implementado | Adicionar `EmailVerificationBanner`, mostrar cargo |
| `profiles` (banco) | ⚠️ Parcial | Adicionar campos: job_title, department, manager_id, is_active, email_verified |

### O que precisa ser criado:
| Arquivo | Prioridade |
|---------|-----------|
| `tenants` (tabela) | P1 |
| `002_auth_updates.sql` (migration) | P1 |
| `ForgotPassword.tsx` | P2 |
| `ResetPassword.tsx` | P2 |
| `Profile.tsx` | P2 |
| `MembersManagement.tsx` | P1 |
| `InviteMemberModal.tsx` | P1 |
| `EmailVerificationBanner.tsx` | P2 |
| Edge Function para criar users | P1 |

## 5. Libraries Necessárias
- Nenhuma nova dependência — tudo é resolvido com `@supabase/supabase-js`, `@mantine/core` e `react-router-dom` já instalados.
- **Supabase Edge Functions** (Deno, deploy via CLI) para operações admin que requerem `service_role_key`.

## 6. Próxima Etapa: Tasks Breakdown
A partir deste plano, gerar `tasks/002-autenticacao-tasks.md` com os passos incrementais e testáveis.
