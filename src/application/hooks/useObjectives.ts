import { useState, useCallback } from 'react';
import { supabase } from '../../infrastructure/supabaseClient';
import type { Objective } from '../../domain/models/types';
import { notifications } from '@mantine/notifications';
import { useAuthContext } from '../context/AuthContext';

export function useObjectives() {
  const { profile } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [objectives, setObjectives] = useState<Objective[]>([]);

  const fetchObjectives = useCallback(async () => {
    setLoading(true);

    let query = supabase.from('objectives').select('*').order('created_at', { ascending: false });
    if (profile?.tenantId) query = query.eq('tenant_id', profile.tenantId);

    const { data, error } = await query;

    if (error) {
      notifications.show({ title: 'Erro', message: error.message, color: 'red' });
    } else {
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
        progress: 0,
        status: item.status,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));
      setObjectives(mapped);
    }
    setLoading(false);
  }, [profile?.tenantId]);

  const createObjective = async (values: Partial<Objective>) => {
    if (!profile?.id || !profile?.tenantId) {
      notifications.show({ title: 'Erro', message: 'Usuário não autenticado.', color: 'red' });
      return;
    }
    setLoading(true);

    const { error } = await supabase.from('objectives').insert([{
      tenant_id: profile.tenantId,
      parent_objective_id: values.parentObjectiveId || null,
      title: values.title,
      description: values.description,
      cycle_id: values.cycleId || null,
      owner_id: profile.id,
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
    if (!profile?.id) {
      notifications.show({ title: 'Erro', message: 'Usuário não autenticado.', color: 'red' });
      return;
    }
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
    if (!profile?.id || !profile?.tenantId) {
      notifications.show({ title: 'Erro', message: 'Usuário não autenticado.', color: 'red' });
      return;
    }
    setLoading(true);

    const insertData = batch.map(item => ({
      tenant_id: profile.tenantId,
      parent_objective_id: item.parent_id || null,
      title: item.title,
      description: item.description || '',
      owner_id: profile.id,
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
