# Feature Specification: 008-Mock-Auth-Dev

**Feature Branch**: `feature/008-mock-auth-dev`  
**Created**: 2026-03-15  
**Status**: Draft  
**Input**: Alternativa local de autenticação para desenvolvimento rápido.

## 🎯 Objetivo
Permitir que desenvolvedores trabalhem na aplicação Farol sem conexão ativa com o Supabase ou quando as tabelas do banco ainda não forem migradas, usando um usuário "Admin" mockado.

## 👤 User Story
**Como** um desenvolvedor do Farol,  
**Quero** ativar um modo "Mock Auth" via variável de ambiente,  
**Para** que eu possa testar dashboards e fluxos de OKR instantaneamente com um usuário administrador pré-configurado.

## 🔄 Fluxo de Login Mockado (Manual)
1. App inicia na tela de Login.
2. `useAuth` detecta flag, mas mantém `isAuthenticated: false`.
3. Usuário digita `admin` / `admin`.
4. `signIn` valida localmente as strings.
5. `setAuthState` recebe o usuário dev e redireciona.

## 🛠 Requisitos Funcionais

- [x] RF-001: Detectar variável de ambiente `VITE_USE_MOCK_AUTH=true`.
- [x] RF-002: Impedir o bypass automático. O sistema deve parar na tela de Login mesmo em modo Mock.
- [x] RF-003: Validar credenciais locais: Email `admin` e Senha `admin`.
- [x] RF-004: O perfil mockado deve ter as seguintes propriedades: Admin Local, role: admin.

## 🧪 Critérios de Aceite
1. Se `VITE_USE_MOCK_AUTH` for `true`, ao abrir a aplicação, o usuário já deve cair no Dashboard (simulando uma sessão persistente).
2. O header deve exibir o nome "Admin Local".
3. O link "Membros" deve estar visível (já que o role é admin).
