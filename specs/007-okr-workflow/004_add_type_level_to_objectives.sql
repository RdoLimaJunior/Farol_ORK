-- ============================================
-- MIGRATION: Adicionar colunas type e level à tabela objectives
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- Adicionar coluna 'type' (natureza do objetivo)
ALTER TABLE objectives
  ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'committed'
  CHECK (type IN ('aspirational', 'committed', 'learning'));

-- Adicionar coluna 'level' (hierarquia do objetivo)
ALTER TABLE objectives
  ADD COLUMN IF NOT EXISTS level TEXT NOT NULL DEFAULT 'organizational'
  CHECK (level IN ('organizational', 'departmental', 'individual'));

-- Índices para filtro por nível (usado no OkrLevelPage)
CREATE INDEX IF NOT EXISTS idx_objectives_level ON objectives(level);
CREATE INDEX IF NOT EXISTS idx_objectives_type  ON objectives(type);

-- Verificação: ver a estrutura atualizada
-- SELECT column_name, data_type, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'objectives'
-- ORDER BY ordinal_position;
