# Arquitetura de Informação e Navegação Híbrida (Sitemap) - FAROL

Como definido em nosso **Design System** (`design-system.md`), a Plataforma FAROL adotará uma estrutura base de **Sidebar Esquerda Fixa** (menu lateral B2B robusto), *porém* impulsionada interamente por uma **Navegação Flow-Based e Search-First**.

Abaixo está o Mapeamento da Arquitetura (Sitemap) unindo a fundação B2B necessária para acomodar todas as funcionalidades do FAROL com a fricção zero focada em fluxos acionáveis.

---

## 🧭 Menu Lateral (Sidebar dos 5 Pilares)

### 1. Início (Dashboard Cockpit Assistido)
**Foco:** O Painel de Entrada Centralizado e Conversacional.
*   **Prompt Híbrido (Home Center):** O usuário vê uma tela ultra limpa (estilo Google/Copilot) perguntando: *"Olá! O que vamos fazer hoje?"* com um input gigante.
*   **Widgets de Contexto (Push Inteligente):** Abaixo do prompt, a IA exibe *Cards* responsivos baseados na hora do dia.
    *   *Manhã:* "Bom dia! Aqui estão os 3 check-ins que você precisa fazer hoje."
    *   *Tarde/Resgate:* "O KR de Vendas caiu 5%. Quer analisar o porquê?"
*   **Visão Corporativa (Eagle Eye):** Na periferia da tela ou alternando abas, os gestores (como **Ricardo**) acessam os gráficos modulares e a Saúde preditiva dos OKRs processada pela IA.

### 2. Estratégia & OKRs (Core Module)
**Foco:** Onde a gestão gerencia as metas visuais e estruturais.
*   **Explorar Estratégia (Grafo / Radar):** Visão top-down não linear.
    *   *Desktop:* Mapa Interativo Radar/Grafo (Rede). Ideal para apresentações executivas.
    *   *Mobile:* Árvore Infinita Vertical (Estilo *Mindnode*), expandido para baixo orgânicamente.
*   **Meus OKRs:** Lista tabular com filtros por status e ciclo (visão tática clássica da **Ana**).
*   **Análises Críticas:** O repositório inteligente das root-causes (Ishikawa ou 5 Porquês) para KRs atrasados.

### 3. Execução (Iniciativas e Ações)
**Foco:** Onde o trabalho real diário (Projetos) não para. Tem integração simbiótica com a Estratégia.
*   **Modo Foco:** Ao clicar em uma Ação, um Badge gigante avisa o usuário: *"Isso ajuda a atingir o KR de [Nome da Meta]"*. Dando propósito imediato ao trabalho braçal.
*   **Portfólio de Iniciativas:** Lista ou Kanban gerencial com Semáforos e Prazos.
*   **Meu Foco (Plano de Ação):** Interface estilo "Stories / To-Do App" contínua para gerenciamento de backlog.

### 4. Engajamento & Cultura (Hub CFR e Gamificação)
**Foco:** Reter atenção e quebrar silos.
*   **Hub Atômico CFR (Drawers Contextuais):** O chat e o feedback não vivem apenas aqui: eles abrem como painéis deslizantes em *qualquer lugar* da plataforma. Esta aba serve como repositório de menções.
*   **Feed Social:** A Linha do tempo de conquistas, subidas de nível e high-fives corporativos.
*   **Clube PIN+ (Ranking/Badges):** A tela da vaidade do **Marcelo**; visualização de Moedas e Conquistas atreladas à performance.

### 5. Configurações e Governança
**Foco:** Parametrizações do sistema.
*   **Ciclos e Unidades:** Cadastro de trimestres, anos fiscais e organograma corporativo.
*   **Gestão de Acesso (RBAC):** Quem vê o quê na empresa.
*   **Logs de Auditoria:** Rastreabilidade estrita do sistema.

---

## 🛟 Header Superior (A Barra de Comando Spotlight)

O Header estático flutua no topo de todas as páginas. O atalho universal `Cmd+K` transforma o FAROL de um "Site de Consulta" em uma **Linha de Comando Visual**.

1. **Busca Global e Linha de Execução (Spotlight AI):** Acionado por `Ctrl+K`. O usuário não apenas *navega* (digitando "Como está Vendas?"), ele **Executa**.
   *   *Ação Rápida:* Digitar `+ checkin vendas 70%` no topo da tela, de qualquer lugar. O sistema reconhece a entidade, atualiza o KR no banco de dados, e emite um recado de sucesso. Sem abrir nenhum modal invasivos.
2. **Central de Alertas & Notificações:** Avisos de reuniões, menções, e semáforos críticos na barra.
3. **🤖 O Timoneiro (Assistente IA Flutuante):** Um Action Button permanente no Header.
   *   *Ao clicar*, abre o Command Palette lateral.
   *   **Ações Rápidas em qualquer aba:** "Assistente Mágico de Criação", "O que medir?", "Resumo de Saúde Semanal".
4. **Avatar (Perfil):** Configurações pessoais, Tema (Light) e LogOut.

---

## 📝 Pontos de Atenção (UX Checks de Sobrevivência)

*   **Lei de Hick Respeitada:** Apesar de toda a densidade das features de OKR e IA, os menus continuam limitados a rigorosos **5 Grupos Principais**.
*   **Empty States de Onboarding:** Como a **Camila** (Recém-chegada) não conhece a interface, o primeiro clique em "Estratégia" ou "Execução" carregará uma tela humanizada ilustrando o que fazer.
*   **Experiência "De Relance" (Glanceability):** A plataforma alimentará widgets de dashboard compactos permitindo que o Progresso das metas perfile o usuário na tela central, em vez do usuário precisar "cavar" os dados dentro da Sidebar.

---

## ⚡ Tabela Resumo do Salto de Qualidade (O Paradigma FAROL)

| Fluxo de Usuário | Antes (Padrão de Mercado B2B) | No FAROL (Nossa Estrutura Final) |
| :--- | :--- | :--- |
| **Atualizar Meta** | Menu > OKRs > Buscar Meta > Editar > Salvar. | **`Cmd+K` > "vendas 70" > Enter.** |
| **Ver Alinhamento**| Relatórios > Organograma > PDF de Estratégia Estatíco. | **Estratégia > Radar (Zoom-out/In Livre).** |
| **Feedback (CFR)** | Aba Fixa de RH > Buscar Colega > Escrever texto. | **Qualquer tela > Drawer lateral > Enviar PIN+.** |
| **Análise de Erro** | Formulário chato obrigatório para metas atrasadas. | **Push da IA**: *"KR caiu? Foi fator A ou B?"* (Auto-preenche a Análise). |

> **Veredito do Produto:** A IA não é apenas um "Chat do Lado". Ela é uma verdadeira *camada operacional* invisível que erradica cliques redundantes, assumindo o controle da máquina para o operário brilhar.
