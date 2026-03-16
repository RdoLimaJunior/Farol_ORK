# Technical Plan: 007-IA-Assistant-Plan

## 🏗 Arquitetura

### 1. Camada de Serviço (IA)
- Criar `src/application/services/AiAssistantService.ts`.
- Métodos:
    - `refineObjectiveTitle(baseTitle: string): Promise<string>`
    - `generateDescription(title: string): Promise<string>`
    - `suggestMembers(title: string, availableMembers: Member[]): Promise<Member[]>`
- No modo Dev, usaremos lógica de `setTimeout` e bancos de dados de templates para simular a IA.

### 2. Componentes UI
- `AiActionIcon`: Um botão reutilizável com efeito de brilho para acionar a IA.
- `ObjectiveFormIA`: Evolução do `ObjectiveForm` para incluir os gatilhos de IA.
- `MemberSuggestionChips`: Chips interativos para adicionar membros sugeridos.

### 3. Integração de Estado
- Usar `useDisclosure` para gerenciar estados de "Thinking".
- Usar `framer-motion` para animações de borda (Glow) nos inputs ativos.

## 🚀 Implementação por Fases

### Fase 1: Base de IA (Mock Service)
- Implementar o serviço com lógica de refinamento semântico pré-definida.
- Ex: Se título contém "Vender", sugerir "Aumentar faturamento".

### Fase 2: Componentes de Assistência
- Criar o `AiActionIcon` com estilização premium.
- Injetar o ícone nos inputs do Mantine via `rightSection`.

### Fase 3: Refinamento de UX
- Adicionar o efeito de digitação (`typewriter effect`).
- Implementar a lógica de sugestão de pessoas baseada em palavras-chave no título (keywords scanning).
