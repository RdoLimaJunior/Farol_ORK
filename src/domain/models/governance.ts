export type CycleStatus = 'planning' | 'active' | 'closed';

export interface Cycle {
  id: string;
  tenant_id: string;
  name: string;
  start_date: string; // ISO Date
  end_date: string;   // ISO Date
  status: CycleStatus;
  created_at?: string;
}

export type UserRole = 'admin' | 'member';

export interface MemberProfile {
  id: string;
  tenant_id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  role: UserRole;
  job_title?: string;
  department?: string;
  manager_id?: string;
  is_active: boolean;
  email_verified: boolean;
}
