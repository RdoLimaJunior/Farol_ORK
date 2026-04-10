import { useState, useCallback } from 'react';
import { supabase } from '../../infrastructure/supabaseClient';
import type { KRUpdate } from '../../domain/models/types';
import { notifications } from '@mantine/notifications';

export function useKRHistory() {
  const [loading, setLoading] = useState(false);
  const [updates, setUpdates] = useState<KRUpdate[]>([]);

  const fetchHistory = useCallback(async (krId: string) => {
    setLoading(true);

    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      const { MOCK_UPDATES } = await import('../../infrastructure/data/mockData');
      setUpdates(MOCK_UPDATES.filter(upd => upd.keyResultId === krId));
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('kr_updates')
      .select(`
        id,
        tenant_id,
        key_result_id,
        owner_id,
        previous_value,
        new_value,
        confidence_level,
        manual_status_override,
        status_override_justification,
        comment,
        update_date,
        owner:profiles!owner_id (
          full_name,
          avatar_url
        )
      `)
      .eq('key_result_id', krId)
      .order('update_date', { ascending: false });

    if (error) {
      notifications.show({ title: 'Erro', message: error.message, color: 'red' });
    } else {
      const mapped: any[] = (data || []).map(item => ({
        id: item.id,
        tenantId: item.tenant_id,
        keyResultId: item.key_result_id,
        ownerId: item.owner_id,
        ownerName: (item.owner as any)?.full_name,
        ownerAvatar: (item.owner as any)?.avatar_url,
        previousValue: item.previous_value,
        newValue: item.new_value,
        confidenceLevel: item.confidence_level,
        manualStatusOverride: item.manual_status_override,
        statusOverrideJustification: item.status_override_justification,
        comment: item.comment,
        updateDate: item.update_date,
      }));
      setUpdates(mapped);
    }
    setLoading(false);
  }, []);

  return {
    updates,
    loading,
    fetchHistory,
  };
}
