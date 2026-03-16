import { useState, useCallback } from 'react';
import { supabase } from '../../infrastructure/supabaseClient';
import type { KeyResult } from '../../domain/models/types';
import { notifications } from '@mantine/notifications';

export function useKRs() {
  const [loading, setLoading] = useState(false);
  const [krs, setKrs] = useState<KeyResult[]>([]);

  const fetchKRs = useCallback(async (objectiveId?: string) => {
    setLoading(true);
    let query = supabase.from('key_results').select('*');
    
    if (objectiveId) {
      query = query.eq('objective_id', objectiveId);
    }

    const { data, error } = await query.order('created_at', { ascending: true });

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
        weight: item.weight || 1,
        progress: 0, // Calculated in UI
        status: item.status,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));
      setKrs(mapped);
    }
    setLoading(false);
  }, []);

  return {
    krs,
    loading,
    fetchKRs,
  };
}
