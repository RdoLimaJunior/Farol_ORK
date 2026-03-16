-- ============================================
-- Migration 002: Auth Updates
-- Execute no SQL Editor do Supabase
-- ============================================

-- 1. Tabela de Tenants (Organizações)
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Inserir tenant default para usuários existentes
INSERT INTO tenants (id, name, slug) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Empresa Padrão', 'empresa-padrao')
ON CONFLICT DO NOTHING;

-- 3. Novos campos em profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS job_title TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS department TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS manager_id UUID REFERENCES profiles(id);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email_verified BOOLEAN NOT NULL DEFAULT false;

-- 4. Simplificar roles para admin/member
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check CHECK (role IN ('admin', 'member'));
ALTER TABLE profiles ALTER COLUMN role SET DEFAULT 'member';

-- 5. FK profiles → tenants
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_tenant_fk') THEN
    -- Atualizar tenant_id dos profiles existentes para o tenant default
    UPDATE profiles SET tenant_id = '00000000-0000-0000-0000-000000000001' 
    WHERE tenant_id NOT IN (SELECT id FROM tenants);
    
    ALTER TABLE profiles ADD CONSTRAINT profiles_tenant_fk 
      FOREIGN KEY (tenant_id) REFERENCES tenants(id);
  END IF;
END $$;

-- 6. Índices
CREATE INDEX IF NOT EXISTS idx_profiles_tenant ON profiles(tenant_id);
CREATE INDEX IF NOT EXISTS idx_profiles_manager ON profiles(manager_id);
CREATE INDEX IF NOT EXISTS idx_profiles_department ON profiles(department);

-- 7. RLS para tenants
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tenant" ON tenants
  FOR SELECT USING (
    id IN (SELECT tenant_id FROM profiles WHERE id = auth.uid())
  );

-- 8. Atualizar trigger de novo usuário para incluir role padrão
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, tenant_id, full_name, email, avatar_url, role)
  VALUES (
    NEW.id,
    COALESCE(
      (NEW.raw_user_meta_data->>'tenant_id')::uuid, 
      '00000000-0000-0000-0000-000000000001'
    ),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(NEW.raw_user_meta_data->>'role', 'member')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
