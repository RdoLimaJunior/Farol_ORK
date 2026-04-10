# Schema do Banco de Dados — Farol OKR

Este documento descreve a estrutura atual das tabelas do Supabase e sugere melhorias para a próxima iteração do banco de dados.

## Tabelas Atuais

### `profiles`
Armazena dados estendidos dos usuários vinculados ao `auth.users`.
- `id` (uuid, PK): Vínculo com auth.users.
- `tenant_id` (uuid, FK): Empresa vinculada.
- `full_name` (text): Nome completo.
- `email` (text): Email corporativo.
- `avatar_url` (text, optional): URL da imagem de perfil.
- `role` (text): 'admin' | 'member'.
- `job_title` (text): Cargo.
- `department` (text): Departamento/Área.
- `manager_id` (uuid, FK, optional): Gestor imediato.
- `is_active` (boolean): Status da conta.
- `xp_points` (int): Gamificação.
- `level` (int): Gamificação.

### `objectives`
Metadados dos Objetivos.
- `id` (uuid, PK)
- `tenant_id` (uuid, FK)
- `parent_objective_id` (uuid, FK, optional): Hierarquia/Alinhamento.
- `title` (text)
- `description` (text, optional)
- `cycle_id` (uuid, FK, optional): Ciclo vinculado.
- `owner_id` (uuid, FK): Responsável.
- `check_in_cadence` (text): 'weekly' | 'biweekly' | 'monthly'.
- `is_confidential` (boolean)
- `type` (text): 'aspirational' | 'committed' | 'learning'.
- `level` (text): 'organizational' | 'departmental' | 'individual' | 'operational'.
- `status` (text): 'on_track' | 'at_risk' | 'off_track' | 'draft' | 'closed' | 'stale'.

### `key_results`
Métricas dos Objetivos.
- `id` (uuid, PK)
- `objective_id` (uuid, FK)
- `title` (text)
- `description` (text, optional)
- `owner_id` (uuid, FK)
- `unit` (text): 'percentage' | 'currency' | 'number' | 'boolean'.
- `start_value` (float)
- `target_value` (float)
- `current_value` (float)
- `weight` (float, default: 1)
- `polarity` (text): 'ascending' | 'descending'.
- `status` (text)

### `kr_updates`
Registro de check-ins.
- `id` (uuid, PK)
- `key_result_id` (uuid, FK)
- `owner_id` (uuid, FK): Quem fez o check-in.
- `previous_value` (float)
- `new_value` (float)
- `confidence_level` (text): 'high' | 'medium' | 'low'.
- `comment` (text)
- `update_date` (timestamp)

---

## Sugestões de Melhoria (Roadmap BD)

### 1. Tabela `cycles` (Gestão de Períodos)
Atualmente o ciclo é um campo de texto ou ID solto.
- `id` (PK)
- `name` (ex: "Q2 2026")
- `start_date`
- `end_date`
- `is_active` (boolean)

### 2. Tabela `initiatives` (Planos de Ação)
Vincular projetos/tarefas aos OKRs para responder "como vamos atingir isso?".
- `id` (PK)
- `objective_id` ou `key_result_id` (FK)
- `title`
- `status` (todo, doing, done)
- `due_date`

### 3. Tabela `teams` (Estrutura Organizacional)
Melhor que apenas um campo `department` em texto.
- `id` (PK)
- `name`
- `manager_id` (FK profiles)
- `parent_team_id` (Hierarchy)

### 4. Tabela `checkin_reactions` (Engajamento)
Permitir que líderes e colegas comentem ou "reajam" (palmas, fogo) aos check-ins.
- `id` (PK)
- `kr_update_id` (FK)
- `user_id` (FK)
- `reaction_type` (emoji/string)
