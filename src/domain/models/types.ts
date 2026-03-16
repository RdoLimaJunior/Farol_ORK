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
