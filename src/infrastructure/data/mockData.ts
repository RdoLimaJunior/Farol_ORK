import type { Objective, KeyResult, Profile, Initiative, Action, FCA, CeremonySession } from '../../domain/models/types';
import mockDb from './mock_db.json';

const tenantId = '00000000-0000-0000-0000-000000000001';

// --- PROFILES ---
export const MOCK_PROFILES: Profile[] = mockDb.profiles.map(p => ({
  ...p,
  tenantId,
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
  emailVerified: true
})) as Profile[];

// --- OBJECTIVES ---
export const MOCK_OBJECTIVES: Objective[] = mockDb.objectives.map(o => ({
  ...o,
  tenantId,
  createdAt: '2026-03-01T00:00:00Z',
  updatedAt: '2026-03-01T00:00:00Z'
})) as Objective[];

// --- KEY RESULTS ---
export const MOCK_KRS: KeyResult[] = mockDb.krs.map(kr => ({
  ...kr,
  tenantId,
  startValue: kr.startValue || 0,
  targetValue: kr.targetValue || 100,
  currentValue: kr.currentValue || 0,
  weight: 1,
  monthlyValues: { 'JAN': 20, 'FEV': kr.currentValue },
  polarity: 'ascending',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-03-01T00:00:00Z'
})) as KeyResult[];

// --- INITIATIVES (PROJECTS) ---
export const MOCK_INITIATIVES: Initiative[] = mockDb.initiatives.map(i => ({
  ...i,
  tenantId,
  createdAt: '2026-02-15T00:00:00Z'
})) as Initiative[];

// --- ACTIONS (TASKS) ---
export const MOCK_ACTIONS: any[] = mockDb.actions.map(a => ({
  ...a,
  tenantId,
  parentType: 'initiative',
  ownerId: 'user-lidia',
  createdAt: '2026-03-01T00:00:00Z'
}));

// --- FCA (Linked to KR) ---
export const MOCK_FCAS: FCA[] = mockDb.fcas.map(fca => ({
  id: fca.id,
  tenantId,
  keyResultId: fca.keyResultId,
  fato: fca.fato,
  causa: fca.causa,
  acao: fca.acao,
  createdAt: '2026-03-10T00:00:00Z',
  updatedAt: '2026-03-10T00:00:00Z'
})) as FCA[];

export const MOCK_UPDATES: any[] = [];
export const MOCK_SESSIONS: CeremonySession[] = [];


