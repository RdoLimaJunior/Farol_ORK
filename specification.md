# SPECIFICATION — Plataforma FAROL (FRs e NFRs)

## Requisitos Funcionais (FR)

### Gestão de OKRs
- **FR-001**: CRUD Objetivos
- **FR-002**: CRUD KRs
- **FR-003**: Registrar base, meta, atual, variação
- **FR-004**: Calcular progresso automaticamente
- **FR-005**: Histórico mensal (KRUpdate)
- **FR-006**: Filtros por área/objetivo/status

### Análise Crítica
- **FR-011**: Registrar KRUpdate
- **FR-012**: Registrar 5 Porquês
- **FR-013**: Registrar Ishikawa
- **FR-014**: Criar ações a partir de análises

### Iniciativas e Ações
- **FR-016**: CRUD Iniciativas
- **FR-017**: Semáforo
- **FR-018**: Datas + replanejamento
- **FR-019**: CRUD Ações
- **FR-020**: Detectar atraso automaticamente

### IA Estratégica (MVP)
- **FR-022**: IA gerar OKRs
- **FR-023**: IA avaliar OKRs
- **FR-024**: IA sugerir métricas
- **FR-025**: IA apontar falhas (sem meta, sem fórmula etc.)

### Gamificação
- **FR-033**: Eventos de gamificação
- **FR-034**: Pontuação
- **FR-035**: Ranking
- **FR-036**: Badges

### Social Feed
- **FR-038**: Posts automáticos
- **FR-039**: Comentários
- **FR-040**: Reações

### Dashboard
- **FR-047**: Visão consolidada
- **FR-048**: Semáforo geral
- **FR-049**: Filtros

### Governança e Setup Base
- **FR-051**: RBAC (User Roles)
- **FR-052**: AuditLog para Rastreabilidade
- **FR-053**: CRUD de Ciclos / Trimestres (Anos Fiscais)
- **FR-054**: CRUD de Áreas e Organograma da Empresa

### Integrações
- **FR-055**: Importação Excel
- **FR-056**: Exportação Excel
- **FR-057**: API REST
- **FR-059**: Azure DevOps leve

---

## Requisitos Não Funcionais (NFR)

### UX/UI e Experiência
- **NFR-001**: Interface clara, minimalista e com linguagem simples (Plain Language).
- **NFR-002**: Altamente responsiva (adaptação total para Mobile, Tablets, Desktops e TVs/Painéis).
- **NFR-003**: Microinterações visuais com resposta ≤ 200ms para inputs.
- **NFR-004**: Aplicativo como PWA (Progressive Web App) instalável.
- **NFR-005**: Conformidade restrita às 10 Heurísticas de Jakob Nielsen (ex: visibilidade do status do sistema, prevenção de erros).
- **NFR-006**: Conformidade com as Leis da Psicologia de UX (ex: Lei de Fitts, Lei de Hick).
- **NFR-007**: Telas de Empty States e Telas de Erro humanizadas, amigáveis e "fofinhas" (estilo Amazon/Error Dogs), oferecendo caminho de volta claro.
- **NFR-008**: Feedback contínuo de estado do sistema: Skeleton Loaders no carregamento de tela, Spinners nos botões em mutate, e Progress Bars na tela toda para processamentos assíncronos (evitar telas travadas).

### Acessibilidade (A11y) e Inclusão
- **NFR-011**: Contraste mínimo de texto 4.5:1 (WCAG AA).
- **NFR-012**: Área mínima de toque em botões mobile (Hit area) de 44x44px.
- **NFR-013**: Navegação 100% acessível por teclado (Focus management visível).
- **NFR-014**: Internacionalização (i18n) na base de código desde o dia 1 (para suporte pt-BR e en-US inicialmente).

### Performance
- **NFR-010**: 400ms ações críticas
- **NFR-011**: Dashboard progressivo

### Segurança
- **NFR-013**: HTTPS
- **NFR-014**: AES-256 em repouso
- **NFR-015**: RBAC

### Arquitetura
- **NFR-017**: Modular
- **NFR-018**: API REST
- **NFR-019**: IA respeitar SDD
