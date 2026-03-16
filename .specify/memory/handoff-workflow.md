# Documentação de Fluxo Handoff (UX ↔ Dev)

Este documento estabelece o contrato de trabalho de "Handoff" (passagem de bastão) entre a área de UX Design (Figma) e a área de Engenharia (Antigravity/React) para a **Plataforma FAROL**.

## 1. Ferramenta de Handoff Oficial
A passagem de bastão não usará ferramentas de terceiros (como Zeplin ou Anima). O fluxo de handoff ocorrerá estritamente através do **Figma Dev Mode** acoplado à documentação **SDD (Spec-Driven Development)** do repositório.

## 2. O Contrato de Entrega (Definition of Ready para o Dev)
Uma feature UX só pode transitar para "Pronta para Desenvolvimento" quando o Figma apresentar:

1. **Estado Zero (Empty States):** Como a tela se comporta quando não há dados (especialmente útil para a persona *Camila - A Recém-Chegada*).
2. **Estados de Erro e Validação:** Campos incorretos devem ter seu comportamento de erro vermelho documentado.
3. **Estados de Carregamento (Loading):** Skeletons ou Spinners (respeitando o `NFR-008` de UX).
4. **Variáveis Conectadas:** O design deve usar as cores nativas do arquivo `figma-tokens.json` (Nenhum `#Hex` "solto" no front-end).

## 3. O Fluxo de Trabalho (Workflow SDD)
1. **[UX] Discovery:** O Designer preenche o `ux-discovery-template.md` (criado na memória) para validar o problema na perspectiva das 6 Personas.
2. **[UX] Design (Figma):** O Designer desenha usando o Mantine UI Kit e exporta links do Figma.
3. **[Handoff / SDD]:** O UX/PO insere o link para o *Frame* específico do Figma como referência oficial dentro do arquivo de Especificação do projeto (ex: `specs/001-gestao-okrs.md`).
4. **[DEV] Implementação:** O Antigravity/Dev lê a Especificação (Spec), abre o Link do Figma, usa o Design Token importado via JSON e programa as telas no React/Vite.
5. **[QA] Validação Cruzada:** A versão implementada localmente volta para a análise visual do UX antes do Merge para a ramificação Principal (Main) no Azure DevOps.

## 4. versionamento
O Handoff será sempre atrelado aos pull requests das sub-features do SDD. "Vibes coding" sem o design pré-validado ou sem as heurísticas passadas são bloqueados pela Constituição do Projeto FAROL.
