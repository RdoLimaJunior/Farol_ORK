# Feature Specification: 002-Autenticacao-e-Usuarios

**Feature Branch**: `feature/002-autenticacao-usuarios`  
**Created**: 2026-03-15  
**Status**: Draft  
**Input**: Autenticação, Gestão de Usuários, RBAC e Multi-tenancy.
**Dependencies**: Supabase Auth, Spec 001 (Gestão OKR — campo `ownerId`, `tenantId`).

## Clarifications

### Session 2026-03-15
- Q: Método de Cadastro → A: **Email/Senha controlado pelo Admin**. Não há auto-cadastro público. Apenas um Admin pode criar contas para novos membros da organização.
- Q: Modelo de Organização → A: **Multi-tenant com convite**. O Admin cria a organização (tenant) e convida membros por email. Cada tenant é isolado com RLS no banco.
- Q: RBAC (Papéis) → A: **Simples (2 papéis)**. Admin (gerencia membros, configurações do tenant) e Membro (usa a plataforma). Sem papéis customizáveis nesta versão.
- Q: Perfil do Usuário → A: **Completo com hierarquia**. Nome, email, avatar, cargo, área/departamento e gestor direto. O campo "gestor direto" permite hierarquia organizacional e apoia filtros de OKR por área.
- Q: Recuperação de Senha → A: **Via email padrão Supabase**. Link de redefinição enviado ao email cadastrado.
- Q: Confirmação de Email → A: **Opcional com alerta**. O usuário acessa a plataforma imediatamente após criação da conta, mas um banner persistente alerta "Email não verificado" até a confirmação. Funcionalidades completas disponíveis mesmo sem verificação.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Login do Usuário (Priority: P0)
O usuário deve ser capaz de fazer login na plataforma com email e senha para acessar o painel protegido.
**Why this priority**: Gateway obrigatório — nenhuma funcionalidade é acessível sem autenticação.
**Independent Test**: Tentar acessar "/" sem sessão e ser redirecionado para "/login". Fazer login e ser direcionado ao Dashboard.
**Acceptance Scenarios**:
1. **Given** que o usuário não está autenticado, **When** acessa qualquer rota protegida, **Then** é redirecionado para `/login`.
2. **Given** a tela de login, **When** inserir email e senha válidos e clicar "Iniciar Sessão", **Then** é redirecionado ao Dashboard com seu nome exibido no header.
3. **Given** a tela de login, **When** inserir credenciais inválidas, **Then** uma notificação de erro é exibida ("Email ou senha incorretos") sem revelar qual campo está errado.
4. **Given** uma sessão ativa, **When** o usuário fecha o navegador e abre novamente, **Then** a sessão persiste (token armazenado) e não pede login novamente.

---

### User Story 2 — Logout (Priority: P0)
O usuário deve poder encerrar sua sessão de forma segura.
**Why this priority**: Requisito de segurança básico.
**Independent Test**: Clicar "Log out" e tentar acessar "/" — deve redirecionar para "/login".
**Acceptance Scenarios**:
1. **Given** o menu do usuário no header, **When** clica em "Log out", **Then** a sessão é encerrada, tokens removidos e redirecionado para `/login`.
2. **Given** o logout concluído, **When** o usuário clica "voltar" no navegador, **Then** NÃO retorna ao conteúdo protegido.

---

### User Story 3 — Criação de Conta pelo Admin (Priority: P1)
O Admin deve poder criar contas para novos membros de sua organização.
**Why this priority**: Sem usuários, não há quem use os OKRs. É o entry point de todo o sistema.
**Independent Test**: Admin cria um usuário via painel, e o novo membro consegue fazer login com as credenciais recebidas por email.
**Acceptance Scenarios**:
1. **Given** o painel de Admin (Configurações > Membros), **When** clica em "Convidar Membro", **Then** um modal solicita: Nome, Email, Cargo, Área e Papel (Admin/Membro).
2. **Given** o formulário preenchido validamente, **When** clica "Enviar Convite", **Then** o usuário é criado no Supabase Auth, o perfil na tabela `profiles` é populado com cargo/área e um email de boas-vindas com link de primeiro acesso é enviado.
3. **Given** um email de convite recebido, **When** o novo membro clica no link, **Then** é direcionado para uma tela de "Definir Senha" antes de acessar o painel.

---

### User Story 4 — Listagem e Gestão de Membros (Priority: P1)
O Admin deve poder visualizar, editar e desativar membros do seu tenant.
**Why this priority**: Governança de acesso é crítica em ambientes corporativos.
**Independent Test**: Admin visualiza lista de membros, edita o cargo de um e desativa outro — o desativado não consegue mais logar.
**Acceptance Scenarios**:
1. **Given** o painel de membros, **When** o Admin acessa, **Then** vê uma tabela com: Nome, Email, Cargo, Área, Papel (Admin/Membro), Status (Ativo/Inativo), Data de criação.
2. **Given** a tabela de membros, **When** Admin clica "Editar" em um membro, **Then** pode alterar: Nome, Cargo, Área, Gestor Direto e Papel.
3. **Given** a tabela de membros, **When** Admin clica "Desativar", **Then** o status muda para "Inativo" e o membro não consegue mais fazer login (sem deletar dados históricos de check-ins).

---

### User Story 5 — Perfil do Usuário (Priority: P2)
O membro deve poder visualizar e editar seus próprios dados de perfil.
**Why this priority**: Autonomia do usuário em manter seus dados atualizados.
**Independent Test**: Usuário acessa "Meu Perfil", altera seu avatar e salva — o novo avatar aparece no header.
**Acceptance Scenarios**:
1. **Given** o menu do header, **When** clica em "Meu Perfil", **Then** vê seus dados: nome, email, cargo, área, gestor direto, avatar, nível de gamificação.
2. **Given** o perfil aberto, **When** edita campos (nome, avatar), **Then** as alterações são salvas e refletidas imediatamente no header.
3. **Given** um email não verificado, **When** acessar o perfil, **Then** exibe um banner "Verifique seu email" com botão de reenviar link.

---

### User Story 6 — Recuperação de Senha (Priority: P2)
O usuário deve poder redefinir sua senha caso a esqueça.
**Why this priority**: Funcionalidade de suporte essencial, mas não bloqueia o MVP.
**Independent Test**: Clicar "Esqueci senha", informar email, receber link e definir nova senha.
**Acceptance Scenarios**:
1. **Given** a tela de login, **When** clica em "Esqueceu sua senha?", **Then** abre um formulário solicitando o email.
2. **Given** o email informado, **When** clica em "Enviar link", **Then** Supabase Auth envia email de redefinição, independente do email existir ou não (para evitar enumeração).
3. **Given** o link de redefinição aberto, **When** define nova senha (mín. 6 caracteres), **Then** é redirecionado ao login com notificação de sucesso.

---

## Entidades (Domain Models)

### Profile (Perfil do Usuário)
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | UUID | Sim | PK, mesmo ID do `auth.users` |
| `tenantId` | UUID | Sim | FK → Tenant/Organização |
| `fullName` | string | Sim | Nome completo |
| `email` | string | Sim | Email único |
| `avatarUrl` | string | Não | URL do avatar (Supabase Storage) |
| `role` | enum | Sim | `admin` \| `member` |
| `jobTitle` | string | Não | Cargo (ex: "Gerente de Produto") |
| `department` | string | Não | Área/Departamento |
| `managerId` | UUID | Não | FK → Profile (Gestor Direto) |
| `isActive` | boolean | Sim | Status ativo/inativo (default: true) |
| `emailVerified` | boolean | Sim | Se o email foi confirmado |
| `xpPoints` | number | Sim | Pontuação de gamificação (default: 0) |
| `level` | number | Sim | Nível de gamificação (default: 1) |
| `createdAt` | timestamp | Sim | Auto |
| `updatedAt` | timestamp | Sim | Auto |

### Tenant (Organização)
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | UUID | Sim | PK |
| `name` | string | Sim | Nome da empresa |
| `slug` | string | Sim | Identificador único (ex: "acme-corp") |
| `logoUrl` | string | Não | Logo da empresa |
| `createdAt` | timestamp | Sim | Auto |

---

## Regras de Negócio

### RN-001: Isolamento de Dados (Multi-Tenancy)
- Toda query no banco DEVE filtrar pelo `tenantId` do usuário logado.
- RLS (Row Level Security) no Supabase garante essa regra na camada do banco.
- Um usuário NUNCA pode ver dados de outro tenant.

### RN-002: Papéis e Permissões
| Ação | Admin | Membro |
|------|-------|--------|
| Criar/editar/desativar membros | ✅ | ❌ |
| Editar próprio perfil | ✅ | ✅ |
| Criar OKRs | ✅ | ✅ |
| Ver OKRs não-confidenciais | ✅ | ✅ |
| Ver OKRs confidenciais | ✅ (todos) | Apenas os próprios |
| Configurações do tenant | ✅ | ❌ |

### RN-003: Fluxo de Convite
1. Admin preenche formulário com dados do novo membro
2. Sistema cria o `auth.user` no Supabase Auth com email
3. Trigger no banco cria o `profile` automaticamente com os dados extras
4. Supabase envia email de boas-vindas com link para definir senha
5. Novo membro define senha e acessa o sistema

### RN-004: Desativação vs Exclusão
- Admin pode **desativar** um membro (is_active = false), impedindo login.
- **Nunca** deletar o registro do usuário, pois ele tem dados históricos vinculados (check-ins, análises).
- Dados históricos permanecem associados ao perfil inativo.

### RN-005: Banner de Email Não Verificado
- Se `emailVerified = false`, exibir banner amarelo persistente no topo do app: "Seu email ainda não foi verificado. [Reenviar verificação]"
- O banner NÃO bloqueia o uso, apenas alerta.

---

## Impacto nas Features Existentes

### Spec 001 (Gestão OKR)
- O campo `ownerId` nos Objectives/KRs agora aponta para `profiles.id`
- Filtros de OKR por "Área" usam `profiles.department`
- Visualização de "OKRs do meu time" usa `profiles.managerId` para resolver a hierarquia
- Flag `isConfidential` agora respaldada pelas regras de RBAC (RN-002)

### Schema do Banco (migration 001)
- Tabela `profiles` precisa ser atualizada com novos campos: `job_title`, `department`, `manager_id`, `is_active`, `email_verified`
- Papel simplificado de 4 opções para 2: `admin` | `member`
- Nova tabela `tenants` necessária

---

## Success Criteria
1. ✅ Usuário não autenticado é bloqueado de acessar rotas protegidas
2. ✅ Login funcional com email/senha e persistência de sessão
3. ✅ Logout limpo com invalidação de tokens
4. ✅ Admin consegue criar membros que recebem email de boas-vindas
5. ✅ Perfil do usuário exibe nome, cargo, área e avatar no header
6. ✅ Multi-tenancy: dados isolados por organização
7. ✅ Recuperação de senha funcional via Supabase
8. ✅ Banner de email não verificado aparece quando aplicável
