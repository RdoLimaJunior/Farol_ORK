import type { Objective, KeyResult, Profile, Initiative, Action, FCA, CeremonySession } from '../../domain/models/types';

// Extend Action type for mock purposes since we need specific dates for governance
export interface MockAction extends Action {
  plannedDate?: string;
  replannedDate?: string;
  completionDate?: string;
}

const tenantId = '00000000-0000-0000-0000-000000000001';

// --- PROFILES ---
export const MOCK_PROFILES: Profile[] = [
  {
    id: '12cb15b5-e534-4d49-b3b3-e88b35924ee5',
    tenantId,
    fullName: 'Luciana',
    email: 'luciana@sj.com.br',
    avatarUrl: 'https://i.pravatar.cc/150?u=luciana',
    role: 'admin',
    jobTitle: 'Diretora Executiva',
    department: 'Geral',
    isActive: true,
    emailVerified: true,
    xpPoints: 1500,
    level: 12,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'user-lidia',
    tenantId,
    fullName: 'Lidia',
    email: 'lidia@sj.com.br',
    avatarUrl: 'https://i.pravatar.cc/150?u=lidia',
    role: 'member',
    jobTitle: 'Gestora de Experiência',
    department: 'Comercial',
    isActive: true,
    emailVerified: true,
    xpPoints: 800,
    level: 5,
    createdAt: '2026-02-01T00:00:00Z',
    updatedAt: '2026-02-01T00:00:00Z',
  }
];

// --- OBJECTIVES (SJ IMÓVEIS) ---
export const MOCK_OBJECTIVES: Objective[] = [
  {
    id: 'O2',
    tenantId,
    title: 'O2 – Desenvolver os processos de moradia e negócios com foco na experiência do Cliente',
    ownerId: 'user-lidia',
    checkInCadence: 'weekly',
    isConfidential: false,
    type: 'committed',
    level: 'organizational',
    progress: 32,
    status: 'at_risk',
    createdAt: '2026-03-01T00:00:00Z',
    updatedAt: '2026-03-01T00:00:00Z',
  }
];

// --- KEY RESULTS ---
export const MOCK_KRS: KeyResult[] = [
  {
    id: 'KR1-O2',
    tenantId,
    objectiveId: 'O2',
    title: 'Estruturar plano de atuação da diretoria de relacionamentos até 31/03/2026',
    ownerId: 'user-lidia',
    ownerName: 'Lidia',
    unit: 'percentage',
    startValue: 0,
    targetValue: 100,
    currentValue: 25,
    weight: 0.5,
    progress: 25,
    perspective: 'warning',
    confidence: 'media',
    monthlyValues: { 'JAN': 20, 'FEV': 25 },
    polarity: 'ascending',
    status: 'at_risk',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'KR2-O2',
    tenantId,
    objectiveId: 'O2',
    title: 'Alcançar CSAT de 90% na jornada de captação',
    ownerId: 'user-lidia',
    ownerName: 'Lidia',
    unit: 'percentage',
    startValue: 75,
    targetValue: 90,
    currentValue: 82,
    weight: 1,
    progress: 46,
    perspective: 'good',
    confidence: 'alta',
    monthlyValues: { 'JAN': 75, 'FEV': 82 },
    polarity: 'ascending',
    status: 'on_track',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'KR3-O2',
    tenantId,
    objectiveId: 'O2',
    title: 'Reduzir o tempo de resposta do suporte de 48h para 4h',
    ownerId: '12cb15b5-e534-4d49-b3b3-e88b35924ee5',
    ownerName: 'Luciana',
    unit: 'number',
    startValue: 48,
    targetValue: 4,
    currentValue: 42,
    weight: 1.2,
    progress: 13,
    perspective: 'critical',
    confidence: 'baixa',
    monthlyValues: { 'JAN': 48, 'FEV': 42 },
    polarity: 'descending',
    status: 'off_track',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-03-01T00:00:00Z',
  }
];

// --- INITIATIVES (PROJECTS) ---
export const MOCK_INITIATIVES: Initiative[] = [
  {
    id: 'P1-KR1-O2',
    tenantId,
    keyResultId: 'KR1-O2',
    title: 'Mapeamento da Jornada do Cliente SJ',
    ownerId: 'user-lidia',
    status: 'in_progress',
    progress: 45,
    createdAt: '2026-02-15T00:00:00Z',
  },
  {
    id: 'P1-KR2-O2',
    tenantId,
    keyResultId: 'KR2-O2',
    title: 'Implantação do Sistema de Feedback Real-Time',
    ownerId: 'user-lidia',
    status: 'in_progress',
    progress: 85,
    createdAt: '2026-01-20T00:00:00Z',
  },
  {
    id: 'P1-KR3-O2',
    tenantId,
    keyResultId: 'KR3-O2',
    title: 'Reestruturação da Central de Atendimento (Zendesk)',
    ownerId: '12cb15b5-e534-4d49-b3b3-e88b35924ee5',
    status: 'blocked',
    progress: 20,
    createdAt: '2026-02-10T00:00:00Z',
  }
];

// --- ACTIONS (TASKS) ---
const baseAction = {
  tenantId,
  parentType: 'initiative' as const,
  ownerId: 'user-lidia',
  createdAt: '2026-03-01T00:00:00Z',
};

export const MOCK_ACTIONS: MockAction[] = [
  // P1-KR1-O2
  { ...baseAction, id: 'A1-P1', parentId: 'P1-KR1-O2', title: 'Entrevistas qualitativas', status: 'done', plannedDate: '2026-03-20', completionDate: '2026-03-18' },
  { ...baseAction, id: 'A2-P1', parentId: 'P1-KR1-O2', title: 'Mapas de empatia personas SJ', status: 'done', plannedDate: '2026-03-01' },
  
  // P1-KR2-O2 (Saudável)
  { ...baseAction, id: 'A1-P2', parentId: 'P1-KR2-O2', title: 'Contratação da plataforma de CSAT', status: 'done', plannedDate: '2026-01-30' },
  { ...baseAction, id: 'A2-P2', parentId: 'P1-KR2-O2', title: 'Integração via API com CRM', status: 'done', plannedDate: '2026-02-15' },
  { ...baseAction, id: 'A3-P2', parentId: 'P1-KR2-O2', title: 'Treinamento das equipes de ponta', status: 'doing', plannedDate: '2026-03-30' },
  { ...baseAction, id: 'A4-P2', parentId: 'P1-KR2-O2', title: 'Lançamento do dashboard de indicadores', status: 'todo', plannedDate: '2026-04-10' },

  // P1-KR3-O2 (Crítico)
  { ...baseAction, id: 'A1-P3', parentId: 'P1-KR3-O2', ownerId: '12cb15b5-e534-4d49-b3b3-e88b35924ee5', title: 'Diagnóstico de gargalos no suporte', status: 'done', plannedDate: '2026-02-15' },
  { ...baseAction, id: 'A2-P3', parentId: 'P1-KR3-O2', ownerId: '12cb15b5-e534-4d49-b3b3-e88b35924ee5', title: 'Contratação de novos analistas (Headcount)', status: 'blocked', plannedDate: '2026-03-10' },
  { ...baseAction, id: 'A3-P3', parentId: 'P1-KR3-O2', ownerId: '12cb15b5-e534-4d49-b3b3-e88b35924ee5', title: 'Configuração dos fluxos de automação', status: 'doing', plannedDate: '2026-03-25' },
  { ...baseAction, id: 'A4-P3', parentId: 'P1-KR3-O2', ownerId: '12cb15b5-e534-4d49-b3b3-e88b35924ee5', title: 'Implementação de IA para triagem inicial', status: 'todo', plannedDate: '2026-04-30' },
  { ...baseAction, id: 'A5-P3', parentId: 'P1-KR3-O2', ownerId: '12cb15b5-e534-4d49-b3b3-e88b35924ee5', title: 'Reunião de emergência com diretoria', status: 'doing', plannedDate: '2026-03-15' }
];

export const MOCK_UPDATES: any[] = [];
export const MOCK_FCAS: FCA[] = [];
export const MOCK_SESSIONS: CeremonySession[] = [];
