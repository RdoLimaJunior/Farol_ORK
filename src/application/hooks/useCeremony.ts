import { useState, useCallback } from 'react';
import { supabase } from '../../infrastructure/supabaseClient';
import type { CeremonySession, SessionType } from '../../domain/models/types';
import { notifications } from '@mantine/notifications';

export function useCeremony() {
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<CeremonySession[]>([]);

  const fetchSessions = useCallback(async () => {
    setLoading(true);

    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      const { MOCK_SESSIONS } = await import('../../infrastructure/data/mockData');
      setSessions(MOCK_SESSIONS);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('ceremony_sessions')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      notifications.show({ title: 'Erro', message: error.message, color: 'red' });
    } else {
      setSessions(data || []);
    }
    setLoading(false);
  }, []);

  const createSession = async (values: Partial<CeremonySession>) => {
    setLoading(true);
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        const newSession: CeremonySession = {
            id: Math.random().toString(36).substr(2, 9),
            tenantId: 'mock-tenant',
            date: values.date || new Date().toISOString(),
            type: values.type || 'checkin',
            participantIds: values.participantIds || [],
            notes: values.notes,
            status: 'draft',
            createdAt: new Date().toISOString()
        };
        setSessions(prev => [newSession, ...prev]);
        setLoading(false);
        return newSession;
    }
    
    // Supabase logic would go here
    setLoading(false);
  };

  return {
    sessions,
    loading,
    fetchSessions,
    createSession
  };
}
