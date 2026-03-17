import { supabase } from '../../infrastructure/supabaseClient';
import { calculateKRProgress, calculateObjectiveProgress } from '../../domain/services/okrMath';
import type { KeyResult, Objective } from '../../domain/models/types';

export interface CheckInData {
  kr_id: string;
  objective_id: string;
  owner_id: string;
  tenant_id: string;
  new_value: number;
  confidence_level: 'high' | 'medium' | 'low';
  comment: string;
}

/**
 * Performs a check-in: 
 * 1. Creates a record in kr_updates
 * 2. Updates Key Result (value, progress, status)
 * 3. Recalculates and updates Objective status/progress
 */
export async function performCheckIn(data: CheckInData) {
  try {
    // 1. Get current KR data to find previous value and polarity
    const { data: rawKr, error: krFetchError } = await supabase
      .from('key_results')
      .select('*')
      .eq('id', data.kr_id)
      .single();

    if (krFetchError) throw krFetchError;

    // Map to domain model
    const kr: KeyResult = {
        id: rawKr.id,
        tenantId: rawKr.tenant_id,
        objectiveId: rawKr.objective_id,
        title: rawKr.title,
        description: rawKr.description,
        ownerId: rawKr.owner_id,
        unit: rawKr.unit as any,
        startValue: rawKr.start_value,
        targetValue: rawKr.target_value,
        currentValue: rawKr.current_value,
        weight: rawKr.weight,
        progress: rawKr.progress,
        polarity: rawKr.polarity || 'ascending',
        status: rawKr.status as any,
        lastCheckIn: rawKr.last_check_in,
        createdAt: rawKr.created_at,
        updatedAt: rawKr.updated_at
    };

    const previousValue = kr.currentValue;
    
    // 2. Calculate new KR progress
    const newProgress = calculateKRProgress({
      startValue: kr.startValue,
      targetValue: kr.targetValue,
      currentValue: data.new_value,
      polarity: kr.polarity
    });

    // Dummy start/end dates for status suggestion (MVP level)
    const startDate = '2024-01-01';
    const endDate = '2024-06-30';

    // 3. Save Update record
    const { error: updateInsertError } = await supabase
      .from('kr_updates')
      .insert({
        tenant_id: data.tenant_id,
        key_result_id: data.kr_id,
        owner_id: data.owner_id,
        previous_value: previousValue,
        new_value: data.new_value,
        confidence_level: data.confidence_level,
        comment: data.comment
      });

    if (updateInsertError) throw updateInsertError;

    // 4. Update the Key Result
    const { error: krUpdateError } = await supabase
      .from('key_results')
      .update({
        current_value: data.new_value,
        progress: newProgress,
        last_check_in: new Date().toISOString()
      })
      .eq('id', data.kr_id);

    if (krUpdateError) throw krUpdateError;

    // 5. Recalculate Objective Progress
    const { data: rawKrs, error: siblingsError } = await supabase
      .from('key_results')
      .select('*')
      .eq('objective_id', data.objective_id)
      .eq('tenant_id', data.tenant_id);

    if (siblingsError) throw siblingsError;

    const mappedKrs: KeyResult[] = rawKrs.map(r => ({
        id: r.id,
        tenantId: r.tenant_id,
        objectiveId: r.objective_id,
        title: r.title,
        ownerId: r.owner_id,
        unit: r.unit,
        startValue: r.start_value,
        targetValue: r.target_value,
        currentValue: r.current_value,
        weight: r.weight,
        progress: Number(r.progress),
        polarity: r.polarity as any,
        status: r.status as any,
        createdAt: r.created_at,
        updatedAt: r.updated_at
    }));

    const newObjProgress = calculateObjectiveProgress(mappedKrs);

    // 6. Update the Objective
    const { error: objUpdateError } = await supabase
      .from('objectives')
      .update({
        progress: newObjProgress
      })
      .eq('id', data.objective_id);

    if (objUpdateError) throw objUpdateError;

    return { success: true };
  } catch (err: any) {
    console.error('Check-in failed:', err);
    return { success: false, error: err.message };
  }
}
