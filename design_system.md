# Farol OKR - Design System & Visual Strategy

Este documento é a **Verdade Absoluta** para os padrões visuais, comportamentos de interface e hierarquia de design da plataforma Farol OKR. Qualquer alteração futura deve respeitar rigorosamente estas definições para manter a consistência "Platinum Boardroom-Ready".

## 1. Estética Geral (Platinum Premium)
- **Tom**: Executivo, alta densidade de informação, limpo e profissional.
- **Cores por Nível Estratégico**:
    - **Objetivos (L1)**: Azul (Mantine `blue`)
    - **Key Results (L2)**: Verde Água (Mantine `teal`)
    - **Projetos (L3)**: Índigo (Mantine `indigo`)
    - **Ações/FCA**: Vermelho/Laranja (Mantine `red`/`orange`)

## 2. Hierarquia de Navegação "Smart Sticky"
O sistema utiliza uma pilha de cabeçalhos fixos que se organizam dinamicamente conforme a rolagem.

### Modo Normal (App Layout visível)
| Elemento | Altura (Stuck) | Top (Sticky) | Z-Index | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| **App Header** | 60px | 0px | 100 | Cabeçalho global do sistema. |
| **Objetivo (L1)**| 40px | 60px | 40 | Encolhe de 180px para 40px ao fixar. |
| **KR Card (L2)** | 110px | 100px | 35 | Mantém tamanho integral sempre. |
| **Projeto (L3)** | 70px | 210px | 30 | Mantém tamanho integral sempre. |
| **FCA Matrix** | 34px | 210px | 32 | Fixa-se no mesmo nível do projeto. |

### Modo Apresentação (Fullscreen)
| Elemento | Altura (Stuck) | Top (Sticky) | Z-Index | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| **App Header** | 0px | - | - | Oculto via CSS. |
| **Objetivo (L1)**| 40px | 0px | 40 | Encolhe de 180px para 40px ao fixar. |
| **KR Card (L2)** | 110px | 40px | 35 | Mantém tamanho integral sempre. |
| **Projeto (L3)** | 70px | 150px | 30 | Mantém tamanho integral sempre. |
| **FCA Matrix** | 34px | 150px | 32 | Fixa-se no mesmo nível do projeto. |

## 3. Comportamentos Específicos
- **Shrinking (Encolhimento)**: Apenas o **Objetivo de Negócio** encolhe ao fixar. Isso garante foco no conteúdo variável (KRs/Projetos) enquanto mantém o contexto estratégico no topo.
- **Scroll Detection**: Deve usar `document.addEventListener('scroll', handleScroll, true)` para capturar eventos de rolagem dentro de containers em modo fullscreen.
- **Thresholds de Ativação**:
    - Objetivo: 61px (Normal) / 50px (Apresentação).
    - KR: 111px (Normal) / 90px (Apresentação).
    - Projeto: 149px (Normal) / 130px (Apresentação).

## 4. Tipografia e Espaçamento
- **Fonte**: Ubuntu / Inter.
- **Padding nos Estados Fixos**:
    - Objetivo Stuck: `rem(4)` (Apresentação) / `rem(8)` (Normal).
    - KR/Projeto: Mantém padding original (`rem(25)` / `lg`) para garantir visibilidade dos dados.

---
*Assinado: Antigravity AI (Pair Programming com @LimaJunior)*
