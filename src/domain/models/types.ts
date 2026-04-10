export type Status = 'on_track' | 'at_risk' | 'off_track' | 'draft' | 'closed' | 'stale';
export type KRUnit = 'percentage' | 'currency' | 'number' | 'boolean';
export type ConfidenceLevel = 'high' | 'medium' | 'low';
export type Cadence = 'weekly' | 'biweekly' | 'monthly';
export type ObjectiveType = 'aspirational' | 'committed' | 'learning';
export type ObjectiveLevel = 'organizational' | 'departmental' | 'individual' | 'operational';

export interface Objective {
  id: string;                // UUID v4
  tenantId: string;          // FK -> Companies/Tenants
  parentObjectiveId?: string;// FK (Optional) -> Tree/Cascade
  title: string;
  description?: string;
  cycleId?: string;          // Reference to Quarter/Cycle
  ownerId: string;           // Responsible user
  checkInCadence: Cadence;   // Alert configuration
  isConfidential: boolean;   // Privacy flag
  type: ObjectiveType;       // Aspirational, Committed, Learning
  level: ObjectiveLevel;     // Organizational, Departmental, Individual
  progress: number;          // Calculated 0-100
  status: Status;            // Current status
  createdAt: string;
  updatedAt: string;
}

export interface KeyResult {
  id: string;                // UUID v4
  tenantId: string;
  objectiveId: string;       // Foreign Key -> Objective
  title: string;
  description?: string;
  ownerId: string;
  unit: KRUnit;
  startValue: number;        // Base value
  targetValue: number;       // The Goal
  currentValue: number;      // Latest update
  weight: number;            // Weight for Objective progress (default: 1)
  progress: number;          // Calculated (%)
  polarity: 'ascending' | 'descending';
  status: Status;            // Individual KR status
   perspective?: 'good' | 'warning' | 'critical';
   confidence?: string; // Alta, Media, Baixa
   monthlyValues?: Record<string, number>; // e.g. { 'JAN': 10, 'FEV': 15 }
  lastCheckIn?: string;      // Date of last update
  createdAt: string;
  updatedAt: string;
  ownerName?: string;        // Fetched from profiles
}

export interface KRUpdate {
  id: string;                // UUID v4
  tenantId: string;
  keyResultId: string;       // Foreign Key -> KeyResult
  ownerId: string;           // Who did the check-in
  previousValue: number;
  newValue: number;
  confidenceLevel: ConfidenceLevel;
  manualStatusOverride?: Status;
  statusOverrideJustification?: string;
  comment: string;           // Obligatory justification
  evidenceUrls?: string[];   // For photos/videos
  testimonials?: string[];   // Team quotes
  updateDate: string;
}

export interface CriticalAnalysis {
  id: string;
  tenantId: string;
  krUpdateId: string;        // The check-in that triggered it
  toolType: 'five_whys' | 'ishikawa';
  analysisData: any;         // Structured JSON
  actionIds: string[];       // Linked corrective actions (Initiatives)
  authorId: string;
  createdAt: string;
}

// === Ceremony & Execution (Spec 007) ===

export type SessionType = 'planning' | 'checkin' | 'review' | 'retrospective' | 'sync';

export interface CeremonySession {
  id: string;
  tenantId: string;
  date: string;
  type: SessionType;
  participantIds: string[];  // Profiles
  notes?: string;
  status: 'draft' | 'completed';
  createdAt: string;
}

export interface Initiative {
  id: string;
  tenantId: string;
  keyResultId: string;
  title: string;
  description?: string;
  ownerId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  progress: number;
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

export interface FCA {
  id: string;
  tenantId: string;
  keyResultId: string;
  fact: string;
  cause: string; // analysis (e.g. 5 whys)
  ownerId: string;
  createdAt: string;
}

export interface Action {
  id: string;
  tenantId: string;
  parentId: string; // FK -> Initiative OR FCA
  parentType: 'initiative' | 'fca';
  title: string;
  ownerId: string;
  status: 'todo' | 'doing' | 'done' | 'cancelled' | 'blocked';
  dueDate?: string;
  createdAt: string;
}

// === Auth & Users (Spec 002) ===

export type UserRole = 'admin' | 'member';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  createdAt: string;
}

export interface Profile {
  id: string;               // Same as auth.users.id
  tenantId: string;         // FK → Tenant
  fullName: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
  jobTitle?: string;        // Cargo
  department?: string;      // Área/Departamento
  managerId?: string;       // FK → Profile (Gestor Direto)
  isActive: boolean;
  emailVerified: boolean;
  xpPoints: number;
  level: number;
  createdAt: string;
  updatedAt: string;
}
