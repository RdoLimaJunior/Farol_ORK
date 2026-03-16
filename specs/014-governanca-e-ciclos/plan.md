# Implementation Plan: Governança, Ciclos e Permissões

## Architecture
- **Pages**: Duas novas páginas sob a rota `/settings`.
- **State**: Uso do `useAuthContext` para verificar permissões em tempo real.
- **Database**: 
    - Tabela `cycles`: `id`, `name`, `start_date`, `end_date`, `status`, `tenant_id`.
    - Atualização na tabela `profiles`: Garantir que o campo `role` suporte os novos tipos ('admin', 'manager', 'member').

## Proposed Changes

### 1. Presentation Layer
- **`CyclesManagement.tsx`**: Tabela de ciclos com modal de criação.
- **`PermissionsManagement.tsx`**: Lista de usuários com seletor de papel (Role).
- **`Settings.tsx`**: Atualizar os links dos cards para apontar para as novas rotas.

### 2. Infrastructure Layer
- **`supabaseClient`**: Adicionar queries para a tabela `cycles`.

### 3. Routing
- **`App.tsx`**: Registrar as rotas:
    - `/settings/cycles`
    - `/settings/permissions`
    - `/settings/structure` (Organograma)

## Steps
1. Criar migration para tabela `cycles`.
2. Implementar as páginas de gestão.
3. Proteger rotas administratrivas no `App.tsx`.
4. Atualizar o menu lateral e dashboard de configurações.
