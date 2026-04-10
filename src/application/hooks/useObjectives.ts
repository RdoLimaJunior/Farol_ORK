import { useState, useCallback } from 'react';
import { supabase } from '../../infrastructure/supabaseClient';
import type { Objective } from '../../domain/models/types';
import { notifications } from '@mantine/notifications';
import { useAuthContext } from '../context/AuthContext';

import { getMockData, updateMockEntity } from '../../infrastructure/data/mockStorage';

export function useObjectives() {
  const { profile } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [objectives, setObjectives] = useState<Objective[]>([]);

  const fetchObjectives = useCallback(async () => {
    setLoading(true);
    const data = getMockData();
    const tenantId = '00000000-0000-0000-0000-000000000001';
    
    setObjectives(data.objectives.map((o: any) => ({
      ...o,
      tenantId,
      createdAt: o.createdAt || new Date().toISOString(),
      updatedAt: o.updatedAt || new Date().toISOString()
    })));
    setLoading(false);
  }, [profile?.tenantId]);

  const createObjective = async (values: Partial<Objective>) => {
    setLoading(true);
    const newObj = {
      id: `O-${Date.now()}`,
      ...values,
      progress: 0,
      status: 'draft',
      createdAt: new Date().toISOString()
    };

    updateMockEntity('objectives', (items) => [...items, newObj]);
    
    setTimeout(() => {
      notifications.show({ title: 'Sucesso', message: 'Objetivo salvo no LocalStorage!', color: 'green' });
      fetchObjectives();
      setLoading(false);
    }, 500);
  };

  const updateObjective = async (id: string, values: Partial<Objective>) => {
    setLoading(true);
    updateMockEntity('objectives', (items) => 
      items.map(o => o.id === id ? { ...o, ...values, updatedAt: new Date().toISOString() } : o)
    );

    setTimeout(() => {
      notifications.show({ title: 'Sucesso', message: 'Alterações persistidas localmente!', color: 'green' });
      fetchObjectives();
      setLoading(false);
    }, 500);
  };

  const importBatch = async (batch: any[]) => {
    setLoading(true);
    const newItems = batch.map((item, idx) => ({
      id: `O-IMP-${idx}-${Date.now()}`,
      title: item.title,
      description: item.description,
      status: 'on_track',
      progress: 0
    }));

    updateMockEntity('objectives', (items) => [...items, ...newItems]);

    setTimeout(() => {
      notifications.show({ title: 'Importação Concluída', message: 'Dados salvos no navegador.', color: 'green' });
      fetchObjectives();
      setLoading(false);
    }, 800);
  };


  return {
    objectives,
    loading,
    fetchObjectives,
    createObjective,
    updateObjective,
    importBatch
  };
}
