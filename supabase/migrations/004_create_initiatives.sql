-- ============================================
-- Migration 004: Initiatives Table (Plano de Ação)
-- ============================================

CREATE TABLE IF NOT EXISTS initiatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  key_result_id UUID NOT NULL REFERENCES key_results(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'blocked')),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indices
CREATE INDEX IF NOT EXISTS idx_initiatives_tenant ON initiatives(tenant_id);
CREATE INDEX IF NOT EXISTS idx_initiatives_kr ON initiatives(key_result_id);
CREATE INDEX IF NOT EXISTS idx_initiatives_owner ON initiatives(owner_id);

-- RLS
ALTER TABLE initiatives ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenant isolation for initiatives" ON initiatives
  FOR ALL USING (
    tenant_id IN (SELECT tenant_id FROM profiles WHERE id = auth.uid())
  );

-- Trigger for updated_at
CREATE TRIGGER update_initiatives_updated_at
  BEFORE UPDATE ON initiatives
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
