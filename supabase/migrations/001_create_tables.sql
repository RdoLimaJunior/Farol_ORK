-- ============================================
-- FAROL OKR - Database Schema
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- 1. Tabela de Perfis de Usuário
-- (vincula ao auth.users do Supabase automaticamente)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  xp_points INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Tabela de Objetivos
CREATE TABLE IF NOT EXISTS objectives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  parent_objective_id UUID REFERENCES objectives(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  cycle_id TEXT,
  owner_id UUID NOT NULL REFERENCES profiles(id),
  check_in_cadence TEXT NOT NULL DEFAULT 'weekly' CHECK (check_in_cadence IN ('weekly', 'biweekly', 'monthly')),
  is_confidential BOOLEAN NOT NULL DEFAULT false,
  progress NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('on_track', 'at_risk', 'off_track', 'draft', 'closed', 'stale')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Tabela de Key Results
CREATE TABLE IF NOT EXISTS key_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  objective_id UUID NOT NULL REFERENCES objectives(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  owner_id UUID NOT NULL REFERENCES profiles(id),
  unit TEXT NOT NULL DEFAULT 'percentage' CHECK (unit IN ('percentage', 'currency', 'number', 'boolean')),
  start_value NUMERIC NOT NULL DEFAULT 0,
  target_value NUMERIC NOT NULL DEFAULT 100,
  current_value NUMERIC NOT NULL DEFAULT 0,
  weight NUMERIC NOT NULL DEFAULT 1,
  progress NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('on_track', 'at_risk', 'off_track', 'draft', 'closed', 'stale')),
  last_check_in TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Tabela de Check-ins / Atualizações de KR
CREATE TABLE IF NOT EXISTS kr_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  key_result_id UUID NOT NULL REFERENCES key_results(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES profiles(id),
  previous_value NUMERIC NOT NULL,
  new_value NUMERIC NOT NULL,
  confidence_level TEXT NOT NULL DEFAULT 'high' CHECK (confidence_level IN ('high', 'medium', 'low')),
  manual_status_override TEXT CHECK (manual_status_override IN ('on_track', 'at_risk', 'off_track', NULL)),
  status_override_justification TEXT,
  comment TEXT NOT NULL,
  evidence_urls TEXT[],
  testimonials TEXT[],
  update_date TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Tabela de Análises Críticas (5 Porquês)
CREATE TABLE IF NOT EXISTS critical_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  kr_update_id UUID NOT NULL REFERENCES kr_updates(id) ON DELETE CASCADE,
  tool_type TEXT NOT NULL DEFAULT 'five_whys' CHECK (tool_type IN ('five_whys', 'ishikawa')),
  analysis_data JSONB NOT NULL DEFAULT '{}',
  action_ids UUID[] DEFAULT '{}',
  author_id UUID NOT NULL REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- ÍNDICES para performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_objectives_tenant ON objectives(tenant_id);
CREATE INDEX IF NOT EXISTS idx_objectives_owner ON objectives(owner_id);
CREATE INDEX IF NOT EXISTS idx_objectives_parent ON objectives(parent_objective_id);
CREATE INDEX IF NOT EXISTS idx_key_results_objective ON key_results(objective_id);
CREATE INDEX IF NOT EXISTS idx_key_results_tenant ON key_results(tenant_id);
CREATE INDEX IF NOT EXISTS idx_kr_updates_key_result ON kr_updates(key_result_id);
CREATE INDEX IF NOT EXISTS idx_kr_updates_tenant ON kr_updates(tenant_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) - Segurança
-- ============================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE key_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE kr_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE critical_analyses ENABLE ROW LEVEL SECURITY;

-- Política: usuários só veem dados do seu tenant
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Para Objectives: ver apenas do mesmo tenant
CREATE POLICY "Tenant isolation for objectives" ON objectives
  FOR ALL USING (
    tenant_id IN (SELECT tenant_id FROM profiles WHERE id = auth.uid())
  );

-- Para Key Results: mesma lógica de tenant
CREATE POLICY "Tenant isolation for key_results" ON key_results
  FOR ALL USING (
    tenant_id IN (SELECT tenant_id FROM profiles WHERE id = auth.uid())
  );

-- Para KR Updates: mesma lógica
CREATE POLICY "Tenant isolation for kr_updates" ON kr_updates
  FOR ALL USING (
    tenant_id IN (SELECT tenant_id FROM profiles WHERE id = auth.uid())
  );

-- Para Critical Analyses: mesma lógica
CREATE POLICY "Tenant isolation for critical_analyses" ON critical_analyses
  FOR ALL USING (
    tenant_id IN (SELECT tenant_id FROM profiles WHERE id = auth.uid())
  );

-- ============================================
-- TRIGGER: Criar perfil automaticamente
-- quando um novo usuário se cadastra
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger que dispara ao criar novo user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- TRIGGER: Atualizar updated_at automaticamente
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_objectives_updated_at
  BEFORE UPDATE ON objectives
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_key_results_updated_at
  BEFORE UPDATE ON key_results
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
