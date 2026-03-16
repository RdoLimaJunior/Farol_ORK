-- ============================================
-- Migration 003: Cycles Table
-- ============================================

CREATE TABLE IF NOT EXISTS cycles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_cycles_tenant ON cycles(tenant_id);

-- RLS
ALTER TABLE cycles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenant isolation for cycles" ON cycles
  FOR ALL USING (
    tenant_id IN (SELECT tenant_id FROM profiles WHERE id = auth.uid())
  );

-- Link objectives to cycles if not already linked correctly
ALTER TABLE objectives DROP COLUMN IF EXISTS cycle_id;
ALTER TABLE objectives ADD COLUMN cycle_id UUID REFERENCES cycles(id);
