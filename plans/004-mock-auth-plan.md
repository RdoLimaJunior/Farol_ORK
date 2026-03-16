# Technical Plan: 004-Mock-Auth-Dev

## 🏗 Estratégia de Implementação

### 1. Variável de Ambiente
- Adicionar ao `.env`: `VITE_USE_MOCK_AUTH=true`.

### 2. Alterações no `useAuth.ts`
- Criar uma constante `MOCK_USER` e `MOCK_PROFILE`.
- No `useEffect` inicial, verificar se `import.meta.env.VITE_USE_MOCK_AUTH === 'true'`.
- Se sim, carregar o estado mockado e retornar.
- Modificar `signIn` e `signOut` para tratar o modo mock (apenas alterar o state local).

### 3. Impacto nos Hooks de Dados (`useObjectives`, `useKRs`)
- Por enquanto, os hooks de dados continuarão tentando bater no Supabase. 
- *Opcional*: Se o usuário quiser dados mockados também, podemos estender este plano para o `useObjectives` no futuro. Para este momento, focaremos no bypass de login.

## 🔄 Fluxo de Login Mockado
1. App inicia.
2. `useAuth` detecta flag.
3. `setAuthState` recebe o usuário dev.
4. `isAuthenticated` vira `true`.
5. `ProtectedRoute` libera o acesso ao Dashboard.
