import { useState, useCallback } from 'react';
import { supabase } from '../../infrastructure/supabaseClient';
import { notifications } from '@mantine/notifications';

export interface Initiative {
  id: string;
  tenant_id: string;
  key_result_id: string;
  title: string;
  description: string;
  owner_id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  start_date: string;
  end_date: string;
  profiles?: {
      full_name: string;
  };
  key_results?: {
      title: string;
  };
}

export function useInitiatives() {
  const [loading, setLoading] = useState(false);
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);

  const fetchInitiatives = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('initiatives')
      .select(`
        *,
        profiles!owner_id (full_name),
        key_results!key_result_id (title)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Initiatives fetch error:', error);
    } else {
      setInitiatives(data || []);
    }
    setLoading(false);
  }, []);

  return {
    initiatives,
    loading,
    fetchInitiatives
  };
}
