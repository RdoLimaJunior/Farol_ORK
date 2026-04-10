import { useState, useCallback } from 'react';
import { supabase } from '../../infrastructure/supabaseClient';
import type { Action, FCA, Initiative } from '../../domain/models/types';
import { notifications } from '@mantine/notifications';

export function useActions() {
  const [loading, setLoading] = useState(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [fcas, setFCAs] = useState<FCA[]>([]);
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);

  const fetchCeremonyData = useCallback(async () => {
    setLoading(true);

    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      const { MOCK_ACTIONS, MOCK_FCAS, MOCK_INITIATIVES } = await import('../../infrastructure/data/mockData');
      setActions(MOCK_ACTIONS);
      setFCAs(MOCK_FCAS);
      setInitiatives(MOCK_INITIATIVES);
      setLoading(false);
      return;
    }

    // Parallel fetch from Supabase
    try {
        const [actionsRes, fcasRes, initiRes] = await Promise.all([
            supabase.from('actions').select('*'),
            supabase.from('fcas').select('*'),
            supabase.from('initiatives').select('*')
        ]);

        if (actionsRes.error) throw actionsRes.error;
        if (fcasRes.error) throw fcasRes.error;
        if (initiRes.error) throw initiRes.error;

        setActions(actionsRes.data || []);
        setFCAs(fcasRes.data || []);
        setInitiatives(initiRes.data || []);
    } catch (error: any) {
        notifications.show({ title: 'Erro', message: error.message, color: 'red' });
    }
    
    setLoading(false);
  }, []);

  return {
    actions,
    fcas,
    initiatives,
    loading,
    fetchCeremonyData,
  };
}
