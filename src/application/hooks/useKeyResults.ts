import { useState, useCallback } from 'react';
import { supabase } from '../../infrastructure/supabaseClient';
import { notifications } from '@mantine/notifications';
import type { KeyResult } from '../../domain/models/types';

export function useKeyResults(objectiveId?: string) {
  const [loading, setLoading] = useState(false);
  const [keyResults, setKeyResults] = useState<KeyResult[]>([]);

  const fetchKRs = useCallback(async () => {
    setLoading(true);
    
    let query = supabase
      .from('key_results')
      .select(`
        *,
        owner:profiles(full_name)
      `)
      .order('created_at', { ascending: true });

    if (objectiveId) {
      query = query.eq('objective_id', objectiveId);
    }

    const { data, error } = await query;

    if (error) {
      notifications.show({ title: 'Erro', message: error.message, color: 'red' });
    } else {
      const mapped: KeyResult[] = (data || []).map(item => ({
        id: item.id,
        tenantId: item.tenant_id,
        objectiveId: item.objective_id,
        title: item.title,
        description: item.description,
        ownerId: item.owner_id,
        unit: item.unit,
        startValue: item.start_value,
        targetValue: item.target_value,
        currentValue: item.current_value,
        weight: item.weight,
        progress: item.progress || 0,
        polarity: item.polarity || 'ascending',
        status: item.status,
        lastCheckIn: item.last_check_in,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        ownerName: item.owner?.full_name
      }));
      setKeyResults(mapped);
    }
    setLoading(false);
  }, [objectiveId]);

  return {
    keyResults,
    loading,
    fetchKRs
  };
}
