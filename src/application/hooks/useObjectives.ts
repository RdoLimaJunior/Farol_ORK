import { useState, useCallback } from 'react';
import { supabase } from '../../infrastructure/supabaseClient';
import type { Objective } from '../../domain/models/types';
import { notifications } from '@mantine/notifications';

export function useObjectives() {
  const [loading, setLoading] = useState(false);
  const [objectives, setObjectives] = useState<Objective[]>([]);

  const fetchObjectives = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('objectives')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      notifications.show({ title: 'Erro', message: error.message, color: 'red' });
    } else {
      // Map Snake_Case from DB to CamelCase for Domain
      const mapped: Objective[] = (data || []).map(item => ({
        id: item.id,
        tenantId: item.tenant_id,
        parentObjectiveId: item.parent_objective_id,
        title: item.title,
        description: item.description,
        cycleId: item.cycle_id,
        ownerId: item.owner_id,
        checkInCadence: item.check_in_cadence,
        isConfidential: item.is_confidential,
        type: item.type || 'committed',
        level: item.level || 'organizational',
        progress: 0, // Calculated in UI/Business logic
        status: item.status,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));
      setObjectives(mapped);
    }
    setLoading(false);
  }, []);

  const createObjective = async (values: Partial<Objective>) => {
    setLoading(true);
    
    const { data: { user } } = await supabase.auth.getUser();
    const ownerId = user?.id;
    if (!ownerId) { setLoading(false); return; }

    // Fetch tenant_id from profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', ownerId)
      .single();
    const tenantId = profile?.tenant_id;
    if (!tenantId) { setLoading(false); return; }

    const { error } = await supabase.from('objectives').insert([{
      tenant_id: tenantId,
      parent_objective_id: values.parentObjectiveId || null,
      title: values.title,
      description: values.description,
      cycle_id: values.cycleId || '2024-Q1',
      owner_id: ownerId,
      check_in_cadence: values.checkInCadence || 'monthly',
      is_confidential: values.isConfidential || false,
      type: values.type || 'committed',
      level: values.level || 'organizational',
      status: 'draft'
    }]);

    if (error) {
      notifications.show({ title: 'Erro ao criar', message: error.message, color: 'red' });
    } else {
      notifications.show({ title: 'Sucesso', message: 'Objetivo criado!', color: 'green' });
      fetchObjectives();
    }
    setLoading(false);
  };

  const updateObjective = async (id: string, values: Partial<Objective>) => {
    setLoading(true);
    const { error } = await supabase
      .from('objectives')
      .update({
        title: values.title,
        description: values.description,
        cycle_id: values.cycleId,
        check_in_cadence: values.checkInCadence,
        is_confidential: values.isConfidential,
        parent_objective_id: values.parentObjectiveId || null,
        status: values.status
      })
      .eq('id', id);

    if (error) {
      notifications.show({ title: 'Erro ao atualizar', message: error.message, color: 'red' });
    } else {
      notifications.show({ title: 'Sucesso', message: 'Objetivo atualizado!', color: 'green' });
      fetchObjectives();
    }
    setLoading(false);
  };


  const importBatch = async (batch: any[]) => {
    setLoading(true);
    const tenantId = '00000000-0000-0000-0000-000000000000'; 
    const ownerId = (await supabase.auth.getUser()).data.user?.id || '00000000-0000-0000-0000-000000000000';

    const insertData = batch.map(item => ({
      tenant_id: tenantId,
      parent_objective_id: item.parent_id || null,
      title: item.title,
      description: item.description || '',
      owner_id: ownerId,
      status: 'on_track'
    }));

    const { error } = await supabase.from('objectives').insert(insertData);

    if (error) {
      notifications.show({ title: 'Erro na importação', message: error.message, color: 'red' });
      throw error;
    } else {
      await fetchObjectives();
    }
    setLoading(false);
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
