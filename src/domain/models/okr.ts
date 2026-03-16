export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface Objective {
  id: string;
  title: string;
  description?: string;
  cycleId: string;
  departmentId: string;
  ownerId: string;
  progress: number; // 0 to 100
  parentObjectiveId?: string; // For cascading
  createdAt: string;
}

export interface KeyResult {
  id: string;
  objectiveId: string;
  title: string;
  description?: string;
  baseValue: number;
  targetValue: number;
  currentValue: number;
  unit: 'percentage' | 'currency' | 'number';
  progress: number; // calculated (%)
  ownerId: string;
  confidenceLevel: ConfidenceLevel;
  createdAt: string;
}
