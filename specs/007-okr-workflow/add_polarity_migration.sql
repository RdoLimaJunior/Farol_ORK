-- ============================================
-- ADIÇÃO DE POLARIDADE AOS KEY RESULTS
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- 1. Adiciona a coluna de polaridade para suportar metas de redução (ex: custo, turnover)
ALTER TABLE key_results 
ADD COLUMN IF NOT EXISTS polarity TEXT CHECK (polarity IN ('ascending', 'descending')) DEFAULT 'ascending';

-- 2. Atualiza comentários para ajudar desenvolvedores
COMMENT ON COLUMN key_results.polarity IS 'Determina se o progresso aumenta (ascending) ou diminui (descending) com o valor atual.';

-- 3. Garante que os registros existentes tenham a polaridade padrão
UPDATE key_results SET polarity = 'ascending' WHERE polarity IS NULL;

