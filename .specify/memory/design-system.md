# Design System Tokens - Plataforma FAROL (Mantine UI)

Estas fundações visuais derivam do "Manual de Identidade Visual – Grupo Portfolio" e governam o pacote visual base do Frontend usando **Mantine UI**.

## 1. Cores da Marca (Brand Colors)
**Identidade: Sub-marca Portfolio Tech**
O FAROL não herda apenas o azul estrito institucional, mas adota a identidade *Tech*, que introduz tons vibrantes e modernos de apoio, essenciais para uma interface SaaS PWA e Gamificação.

- **Primary / Brand Core:** `#00567B` (Azul corporativo: base de sobriedade do Grupo).
- **Variações Secundárias (Azul):**
  - **Blue 900:** `#00394D`
  - **Blue 500:** `#1B88A7` (Hover principal)
- **Tons de Apoio Vibrantes (Portfolio Tech):**
  - **Tech Green (Success/On-Track):** (A definir código exato, ex: `#00B578`) - Usado nos Progress Rings de OKRs batidos.
  - **Tech Orange (Warning/Gamification):** (A definir código exato, ex: `#F57C00`) - Usado em Badges PIN+, Alertas e Streaks.
- **Color Scheme:** `Light` mode forçado por padrão.
 
 ## 2. Gradientes Estratégicos (Strategic Gradients)
 
 Estes gradientes são utilizados para backgrounds de cards, indicadores de tendência e diferenciação de áreas funcionais:
 
 | Nome | Valor | Aplicação Sugerida |
 | :--- | :--- | :--- |
 | **Blue Main** | `linear-gradient(180deg, #1DA5DE 0%, #00567B 100%)` | Header, Brand Backgrounds |
 | **Blue Deep** | `linear-gradient(180deg, #1B88A7 0%, #00394D 100%)` | Sub-seções, Hover states intensos |
 | **Tech Green** | `linear-gradient(180deg, #1BDBAD 0%, #3192D0 100%)` | OKRs no Prazo, Sucesso Tech |
 | **Tech Purple** | `linear-gradient(180deg, #392749 0%, #3192D0 100%)` | Áreas de Inteligência / AI |
 | **Formation Warm** | `linear-gradient(180deg, #ECC625 0%, #D66D31 100%)` | Alertas, Progressão de Aprendizado |
 | **Formation Deep** | `linear-gradient(180deg, #6C2A0D 0%, #D66D31 100%)` | Em Risco (Nível Crítico) |
 | **Management Neutral** | `linear-gradient(180deg, #C4B388 0%, #A47E56 100%)` | Áreas Administrativas / Neutras |
 | **Engineering Gray** | `linear-gradient(180deg, #E3E3E2 0%, #585857 100%)` | Estados Desativados / Infraestrutura |
 
 ## 3. Tipografia (Typography)
- **Fonte Padrão (Títulos):** `Ubuntu` (Família única para consistência em interfaces digitais B2B).
- **Fonte Secundária (Dados & UI):** `Inter` (Extremamente legível para números, siglas de OKRs, gráficos e tabelas. Vibe moderna e profissional).
- **Pesos Utilizados na Hierarquia:** Light, Regular, Medium, Bold.
- **Hierarquia Visual:**
  - **Títulos (H1-H6):** Ubuntu.
  - **Body, Dados, Tabelas, Gráficos:** Inter.
- **Fallback Stack Mantine:** `'Ubuntu', 'Inter', system-ui, -apple-system, sans-serif`

## 3. Arredondamento e Sensação (Border Radius)
- **Default Radius:** `md` (`8px`) - Sensação moderna de software corporativo (SaaS), firme mas não ríspida (`xs`).

## 4. Profundidade (Shadows & Elevation)
- **Shadow Style:** `Soft Shadows` (Sutil). Design majoritariamente flat, projetando sombras leves apenas para modais, popovers e validação de hierarquia no eixo Z (ex: Card Flutuando).
  - Padrões Mantine atrelados: `sm: '0 1px 3px rgba(0,0,0,0.08)'`, `md: '0 4px 12px rgba(0,0,0,0.12)'`.

## 4. Gamificação (Gamification)

O FAROL utiliza elementos de jogos para incentivar o engajamento com OKRs:

- **XP & Níveis:** Cards com gradientes (ex: `formationWarm`) para exibir progresso do usuário.
- **Streaks:** `RingProgress` para dias consecutivos de atualização.
- **Medalhas:** Ícones (`IconMedal`, `IconTrophy`) para conquistas trimestrais.
- **Achievements:** Carousel de conquistas desbloqueáveis.

## 5. Playground & Governança (Dev Hub)

A página de Design System serve como um playground interativo:
- **Spotlight (Ctrl+K):** Acesso rápido a comandos e navegação.
- **Sidebar de Docs:** Navegação contextual por categorias de componentes.
- **Hooks Showcase:** Demonstração de `useClipboard`, `useOs`, `useIdle`, etc.

## 6. Esquema de Cores (Color Scheme)

- **Suporte Nativo a Dark Mode:** A plataforma é desenhada para ser *Dark-First* ou alternável via `SegmentedControl`.
- **Contraste:** Uso de `dark.8` para backgrounds e `dark.0` para textos em modo escuro.

## 7. Visualização de Dados Avançada (Data Viz)

Além de Linhas e Colunas, o sistema suporta:
- **Radar Charts:** Para alinhamento estratégico entre diferentes dimensões.
- **Area Charts:** Para visualização de tendência acumulada em degraus (`stepBefore`).

## 8. Layout (App Shell macro)
- **Navegação:** `Sidebar Esquerda` (Fixo). Adere ao padrão de módulos gerenciais múltiplos e visualização densa de dados como OKRs corporativos.

## 6. Hand-off Técnico (Mantine Theme Generator)
As variáveis acima guiam a criação do provedor central do ecossistema: `MantineProvider theme={theme}`.

```typescript
// src/ui/theme.ts (Base Blueprint)
import { createTheme, MantineColorsTuple } from '@mantine/core';

// Paleta baseada no Grupo Portfolio
const brandPortfolio: MantineColorsTuple = [
  '#ebf6fc',
  '#d6ecfa',
  '#a8dbf5',
  '#79c9f0',
  '#53baed',
  '#3ab0eb',
  '#2aabeb',
  '#1d96d2',
  '#1085bd',
  '#00567B' // Core Brand (Index 9)
];

// Tons Vibrantes (Portfolio Tech)
const techGreen: MantineColorsTuple = ['#e6fcf2', '#d3f9e7', '#a8f2d0', '#7aebba', '#53e5a6', '#3ce198', '#2ddf90', '#1fc67f', '#14b070', '#009a5f'];
const techOrange: MantineColorsTuple = ['#fff0e4', '#ffe0cc', '#ffc09b', '#ff9e64', '#ff8134', '#ff6d14', '#ff6100', '#e45000', '#cb4600', '#b13a00'];

export const theme = createTheme({
  primaryColor: 'portfolioBrand',
  colors: {
    portfolioBrand: brandPortfolio,
    techGreen,
    techOrange
  },
  primaryShade: 9, // Referindo ao #00567B
  fontFamily: '"Ubuntu", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  headings: {
    fontFamily: '"Ubuntu", system-ui, sans-serif',
    fontWeight: '700', // Bold para hierarquia
  },
  defaultRadius: 'md',
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.08)',
    md: '0 4px 12px rgba(0,0,0,0.12)',
  },
});
```
