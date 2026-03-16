import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../../infrastructure/supabaseClient';
import { useAuthContext } from '../context/AuthContext';

export interface Member {
  id: string;
  fullName: string;
  email: string;
  jobTitle: string | null;
  department: string | null;
  role: string;
  avatarUrl: string | null;
}

export function useMembers() {
  const { profile } = useAuthContext();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMembers = useCallback(async () => {
    if (!profile?.tenantId) return;
    setLoading(true);
    
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, job_title, department, role, avatar_url')
      .eq('tenant_id', profile.tenantId)
      .eq('is_active', true);

    if (!error && data) {
      const mapped = data.map(item => ({
        id: item.id,
        fullName: item.full_name,
        email: item.email,
        jobTitle: item.job_title,
        department: item.department,
        role: item.role,
        avatarUrl: item.avatar_url
      }));
      setMembers(mapped);
    }
    setLoading(false);
  }, [profile?.tenantId]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return { members, loading, fetchMembers };
}
