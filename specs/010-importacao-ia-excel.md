# Feature Specification: 010-Importacao-IA-Excel

**Feature Branch**: `feature/010-import-excel-ia`  
**Created**: 2026-03-15  
**Status**: Draft  
**Input**: Importação de objetivos via planilha Excel com auxílio de IA.

## 🎯 Objetivo
Permitir que usuários importem grandes volumes de objetivos e resultados-chave de planilhas Excel existentes, usando IA para mapear cabeçalhos, categorizar dados e sugerir alinhamentos estratégicos.

## 👤 User Stories

### US1 - Upload de Planilha
**Como** um gestor de transformação,  
**Quero** fazer upload de um arquivo `.xlsx` ou `.csv`,  
**Para** carregar meus OKRs de uma vez só sem preencher formulários manuais.

### US2 - Mapeamento Inteligente (IA)
**Como** um usuário,  
**Quero** que a IA identifique qual coluna é o "Título", qual é o "Prazo" e qual é o "Dono",  
**Para** reduzir o esforço de mapeamento manual.

## 🛠 Requisitos Funcionais

- **RF-001**: Componente de Dropzone para upload de arquivos Excel.
- **RF-002**: Processamento do arquivo via `xlsx` (SheetJS) no frontend.
- **RF-003**: Interface de "Preview" antes da importação final.
- **RF-004**: Integração com a API de IA (mockada inicialmente no modo dev) para sugerir mapeamento de colunas.
- **RF-005**: Botão de "Lançar Objetivos" que realiza o batch insert no Supabase.

## 🎨 Design & UX (Premium)
- **Modal de Importação**: Fluxo em passos (1. Upload, 2. Mapeamento, 3. Revisão).
- **Feedback**: Barra de progresso real durante o processamento.
- **IA Glow**: Usar efeitos de gradiente (Glow) para indicar onde a IA está atuando.

## 🧪 Critérios de Aceite
1. O usuário deve conseguir arrastar um arquivo e ver os dados em uma tabela de preview.
2. A IA deve sugerir automaticamente o mapeamento das colunas "Título" e "Descrição".
3. A importação só deve ocorrer após a confirmação do usuário na etapa de Revisão.
