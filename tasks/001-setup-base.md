# Task Breakdown: 001-Setup-Base

Este documento detalha os comandos e passos técnicos para transformar o **Plan** na base real de código da Plataforma FAROL.

---

## 🛠️ Comando de Inicialização (Bootstrap)

**Passo 1: Criar o Projeto React + TypeScript**
// turbo
```powershell
npx create-vite@latest ./ --template react-ts
```

**Passo 2: Instalar Dependências de UI (Mantine)**
// turbo
```powershell
npm install @mantine/core @mantine/hooks @mantine/notifications @emotion/react @tabler/icons-react
```

**Passo 3: Instalar Dependências de Infraestrutura e Rotas**
// turbo
```powershell
npm install @supabase/supabase-js react-router-dom lucide-react
```

**Passo 4: Setup de Estilização (Tailwind + PostCSS)** - *Opcional para utilitários rápidos*
// turbo
```powershell
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 📂 Estrutura de Pastas (Arquitetura DDD-Lite)

Devemos organizar o `src/` para suportar o crescimento modular:

1.  `src/domain/models`: Interfaces TypeScript extraídas das Specs (Ex: `Objective`, `KeyResult`).
2.  `src/infrastructure/supabase`: Arquivos de conexão e queries brutas do Supabase.
3.  `src/presentation/theme`: Definição do `MantineTheme` com nossos Design Tokens.
4.  `src/presentation/components`: Componentes atômicos (Button, Input, Card).
5.  `src/presentation/pages`: As telas da nossa Navegação Flow-based (Cockpit, Radar, Estratégia).

---

## ⚙️ Configurações Iniciais de Código

### Task 1.1: Aplicar Design Tokens no Mantine
- Criar o arquivo `src/presentation/theme/index.ts`.
- Injetar o Azul FAROL (#00567B) e a fonte Ubuntu conforme o `design-system.md`.

### Task 1.2: Configurar Roteador Base
- Implementar o `BrowserRouter` no `App.tsx`.
- Criar as rotas correspondentes ao nosso Sitemap (Home, Estratégia, Execução).

### Task 1.3: Conectar Supabase
- Criar o arquivo `.env` com as chaves (a serem fornecidas pelo usuário).
- Instanciar o `supabaseClient` em `src/infrastructure/supabase/client.ts`.

---

## ✅ Definição de Concluido (DoD)
- [ ] O comando `npm run dev` abre a tela "Vite + React" sem erros.
- [ ] O MantineProvider está envolvendo a aplicação.
- [ ] As pastas de Domain e Presentation estão criadas.
- [ ] O repositório está pronto para a **Mão na Massa** da Feature 001 (OKRs).
