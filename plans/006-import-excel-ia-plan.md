# Technical Plan: 006-Import-Excel-IA

## 🏗 Arquitetura

### 1. Bibliotecas
- `xlsx`: Para leitura de arquivos excel/csv no browser.
- `@mantine/dropzone`: Interface de upload.

### 2. Fluxo de Dados
- **Client-Side Parsing**: O arquivo é lido no frontend.
- **IA Mapping Service**: Uma função que recebe os headers das colunas e os primeiros dados para sugerir o mapeamento.
    - No modo Dev, usaremos um mapeamento heurístico inteligente simulado.
- **Batch Create Hook**: Extender `useObjectives` para suportar criação em massa.

### 3. Componentes
- `ImportModal`: O container principal do fluxo.
- `ColumnMappingStep`: UI para o usuário confirmar o que a IA sugeriu.
- `ImportPreviewTable`: Tabela com os dados prontos para importação.

## 🚀 Implementação por Fases

### Fase 1: Padronização de Layouts
Antes da funcionalidade, vou padronizar o Dashboard, Strategy e Settings para usar o modelo de cabeçalho "Members" (Microanimação + ThemeIcon Cyan).

### Fase 2: Estrutura de Importação
- Implementar o componente de Dropzone.
- Lógica de extração de dados com SheetJS.

### Fase 3: Camada de IA
- Implementar a lógica de sugestão de colunas.
- UI com efeitos de "IA Thinking".
