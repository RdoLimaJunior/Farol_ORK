# Personas Essenciais do App de OKRs FAROL (MVP)

Estas personas (estruturadas como Proto Personas) guiam as decisões de arquitetura de dados (SDD) e UX (Front-end Mantine) desde a estratégia até a operação.

## 1. Ricardo, o Diretor Estratégico ("The Visionary")
- **Nome Fictício e Foto:** Ricardo (Avatar: Homem de terno, 45 anos, avaliando gráficos no tablet).
- **Perfil (Demográfico):** 45 anos, CEO ou Head de Departamento, Pós-graduado (MBA).
- **Comportamento:** Extremamente ocupado e analítico. Toma decisões rápidas baseadas em dados visuais para se preparar para reuniões com clientes importantes e líderes de mercado.
- **Objetivos/Necessidades:** Ter uma "visão de olhos de águia" (Eagle Eye) dos resultados da empresa. Ele quer ver os dashboards executivos para acompanhar sua empresa fluidamente, entender se o macro está em 20% ou 80% em menos de 10 segundos, e ir focado para grandes reuniões.
- **Dores/Frustrações:** Planilhas de Excel confusas, falta de clareza sobre o alinhamento dos times e chegar não preparado a uma reunião por falta de informação instantânea.
- **Hipótese de Valor (Produto):** Dashboards interativos e Progress Rings (Mantine) que traduzem a saúde das metas instantaneamente e ofereçam views de relatórios executivos. No backend (SDD), requer o cálculo automático de média ponderada macro e status de "Saúde" (On Track, At Risk).

## 2. Ana, a Gerente Focada ("The Manager")
- **Nome Fictício e Foto:** Ana (Avatar: Mulher dinâmica, 35 anos, ambiente ágil).
- **Perfil (Demográfico):** 35 anos, Gerente de Produto ou Coordenadora de Área, Híbrido/Remoto, Especialista.
- **Comportamento:** Organizada, comunicativa, acompanha de perto as entregas do time. Usa Jira, Trello, Slack/Teams o dia todo.
- **Objetivos/Necessidades:** Garantir que o time dela esteja entregando os Key Results no prazo. Remover impedimentos o mais rápido possível.
- **Dores/Frustrações:** Ter que perseguir as pessoas via Slack/Teams para saber o status dos KRs (microgerenciamento forçado). Dificuldade em rastrear atualizações.
- **Hipótese de Valor (Produto):** Listagens filtráveis e Timeline de atividades no front (Mantine). No SDD, necessita de rastreabilidade nativa (Tabela `KRUpdate`, campos `last_updated_at` e `owner_id`).

## 3. Lucas, o Colaborador ("The Contributor")
- **Nome Fictício e Foto:** Lucas (Avatar: Jovem de fone de ouvido, 28 anos, home office).
- **Perfil (Demográfico):** 28 anos, Desenvolvedor, Designer ou Analista, Trabalho Remoto, Graduado.
- **Comportamento:** Focado em execução técnica, adora ferramentas ágeis e detesta burocracia corporativa. Usa VS Code, Figma, Notion.
- **Objetivos/Necessidades:** Atualizar o progresso do seu KR de forma muito rápida e entender imediatamente como seu esforço diário move o ponteiro da empresa.
- **Dores/Frustrações:** Ferramentas corporativas lentas, burocráticas e "feias" que parecem apenas mais um "trabalho extra" de preenchimento.
- **Hipótese de Valor (Produto):** Modais simples no celular (PWA) e barras de Slider intuitivas (Mantine) para check-in de 5 segundos. Persistência ociosa/rápida no banco (Supabase).

## 4. Marcelo, o Multiplicador Engajado ("The Champion")
- **Nome Fictício e Foto:** Marcelo (Avatar: Homem sorridente, 30 anos, usando um crachá cheio de pins).
- **Perfil (Demográfico):** 30 anos, Analista Pleno/Sênior, Formador de opinião interna.
- **Comportamento:** Participa de todos os eventos da empresa, compartilha conquistas no LinkedIn, empolga a equipe e é ativo nas redes internas.
- **Objetivos/Necessidades:** Viver intensamente a cultura da empresa, gamificar sua experiência de metas e ser reconhecido publicamente pelo alcance de desafios.
- **Dores/Frustrações:** Falta de reconhecimento sistemático. Sistemas corporativos frios que tratam metas como stress e não como celebração de desafios.
- **Hipótese de Valor (Produto):** Animações de celebração (confetes Mantine no check-in), vitrines de Badges (espaço VIP "PIN+") e destaque no Feed Social. No SDD, exige um módulo transversal de Gamificação (Pontuação por tempo Real).

## 5. Roberto, o Técnico Cético ("The Skeptic")
- **Nome Fictício e Foto:** Roberto (Avatar: Homem de 35 anos, braços cruzados observando uma tela com telas de código/métricas).
- **Perfil (Demográfico):** 35 anos, Especialista Técnico Sênior (jovem que atingiu senioridade rápida devido à alta capacidade técnica).
- **Comportamento:** É uma referência técnica (Hard Skills excelentes), mas possui carência em Soft Skills. Resiste a mudanças de processos ou alinhamentos de gestão que julga "burocráticos". Vê a cultura de OKR como "modinha de RH que atrapalha meu trabalho real".
- **Objetivos/Necessidades:** Fazer o seu trabalho técnico focal com perfeição e sem interrupções de microgerenciamento. Precisa perceber objetivamente o valor da ferramenta ("O que eu ganho com isso?") ao invés de ouvi-lo em jargões de RH.
- **Dores/Frustrações:** Ferramentas de metas com linguagem focada em "vigiar/punir". Processos de comunicação interpessoal exaustivos ou reuniões que não engajam sua mente analítica.
- **Hipótese de Valor (Produto):** Textos diretos (Plain Language objetiva) e fluxo com o menor atrito possível. A IA Estratégica atua na tradução das métricas de RH usando linguagem técnica e sugerindo melhorias como mentor construtivo, e não como supervisor robótico.

## 6. Camila, a Recém-Chegada ("The Lost Newcomer")
- **Nome Fictício e Foto:** Camila (Avatar: Mulher jovem, 24 anos, com um bloco de anotações tentando organizar um zilhão de novidades).
- **Perfil (Demográfico):** 24 anos, Nova funcionária (Analista Júnior ou Pleno), 1º mês de integração.
- **Comportamento:** Faz muitas perguntas, consome documentações avidamente, tem receio de errar por estar em fase probatória.
- **Objetivos/Necessidades:** Reduzir seu tempo de rampa até o "voo de cruzeiro". Precisa saber urgentemente qual é o seu papel (como as tarefas operacionais se ligam ao objetivo da diretoria).
- **Dores/Frustrações:** Não saber o que é um "OKR", sentir "síndrome do impostor" de início e bater de frente com jargões não explicados em sistemas que supõem que todo usuário é expert.
- **Hipótese de Valor (Produto):** Empty States ultra-educativos, Tours guiados, Vídeos e Tooltips explicativos inseridos no fluxo. No Banco de Dados, gestão por flags de `has_completed_onboarding` para adaptar a UI inicialmente.

---

### Como usar essas Proto Personas nas Especificações (IA do Antigravity)
Ao criar Specs (Especificações), as personas atuam como "Filtros de Qualidade Obrigatórios" para validar os requisitos Funcionais e Não-Funcionais da plataforma. A arquitetura de dados e as interfaces não existem sozinhas, elas são a resposta às Dores mapeadas.

**Matriz de Validação (Exemplos Práticos para as 6 Personas):**

1. **Requisito SDD:** "O sistema deve calcular a saúde macro da empresa em tempo real e renderizar Progress Rings no Front-End."
   - **Validação Cruzada (UX/Negócio):** Fundamental para o **Ricardo** obter sua "visão de águia" em menos de 10 segundos antes da reunião com o cliente. *Se demorar a carregar 5 segundos, a feature falhou pro usuário 1.*
2. **Requisito SDD:** "A exibição dos KRs deve conter Timeline filtrável e rastreio inalterável de `last_updated_at` / `owner_id`."
   - **Validação Cruzada (UX/Negócio):** Respeita o Job primário da **Ana**, que não pode mais perder tempo cobrando status no Slack. A interface deve dar a ela o controle tático da situação e visibilidade das atualizações sem atritos.
3. **Requisito SDD:** "Barra de progresso de um KR deve ser um slider mobile-friendly e salvar a alteração com apenas 1 clique (Input de baixa fricção)."
   - **Validação Cruzada (UX/Negócio):** Isso garante a adesão do **Lucas** à plataforma corporativa. A inserção não pode causar a sensação de "trabalho burocrático extra", mantendo o check-in extremamente volátil e fluido.
4. **Requisito SDD:** "Disparo de emblema visual (Badge / PIN+) na tela ao assinar a meta de 100% como concluída no prazo."
   - **Validação Cruzada (UX/Negócio):** O **Marcelo** (Multiplicador Engajado) usará essa conquista instantânea para engajar o time, alimentando com naturalidade o pipeline de Gamificação cruzada na rede social interna da empresa.
5. **Requisito SDD:** "A IA deve sugerir correções de rota ou dicas em linguagem comum (Plain Language), de maneira sutil e construtiva (Feedback construtivo)."
   - **Validação Cruzada (UX/Negócio):** Exigência total para contornar a resistência natural do **Roberto** (Técnico Cético), provando de "cara" o valor da ferramenta para ele (O "Que ganho com isso?").
6. **Requisito SDD:** "O Dashboard sem metas atreladas deve exibir *Empty States* educativos com tours / tooltips sobre como criar o primeiro OKR, em vez de vazios estruturais."
   - **Validação Cruzada (UX/Negócio):** Essa é a tábua de salvação da **Camila** (A Recém-Chegada). O onboarding guiado reduz sua curva de aprendizado (rampa) e mitiga a "síndrome do impostor" pelo jargão desconhecido.
