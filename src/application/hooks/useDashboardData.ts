import { useMemo, useEffect } from 'react';
import { useObjectives } from './useObjectives';
import { useOkrCalculation } from './useOkrCalculation';
import type { KeyResult } from '../../domain/models/types';
import type { Initiative } from './useInitiatives';

export function useDashboardData(allKRs: KeyResult[], initiatives: Initiative[] = []) {
  const { objectives, loading: objLoading, fetchObjectives } = useObjectives();
  const { enrichedObjectives } = useOkrCalculation(objectives, allKRs);

  useEffect(() => {
    fetchObjectives();
  }, [fetchObjectives]);


  const stats = useMemo(() => {
    if (enrichedObjectives.length === 0) return null;

    const totalObjectives = enrichedObjectives.length;
    const totalKRs = allKRs.length;
    
    const onTrack = enrichedObjectives.filter(o => o.status === 'on_track').length;
    const atRisk = enrichedObjectives.filter(o => o.status === 'at_risk').length;
    const offTrack = enrichedObjectives.filter(o => o.status === 'off_track').length;
    
    const avgProgress = enrichedObjectives.reduce((acc, o) => acc + (o.progress || 0), 0) / totalObjectives;

    // Plan of Action Stats
    const totalActions = initiatives.length;
    const completedActions = initiatives.filter(i => i.status === 'completed').length;
    const inProgressActions = initiatives.filter(i => i.status === 'in_progress').length;
    const pendingActions = initiatives.filter(i => i.status === 'pending').length;
    const blockedActions = initiatives.filter(i => i.status === 'blocked').length;
    const actionsCompletionRate = totalActions > 0 ? (completedActions / totalActions) * 100 : 0;

    // OKR by Owner
    const ownerMap: Record<string, { total: number, sum: number, name: string }> = {};
    allKRs.forEach(kr => {
        // Since we don't have owner names here easily, we'd ideally join them. 
        const ownerId = kr.ownerId;
        if (!ownerMap[ownerId]) {
            ownerMap[ownerId] = { total: 0, sum: 0, name: kr.ownerName || 'Responsável' };
        }
        ownerMap[ownerId].total++;
        ownerMap[ownerId].sum += kr.progress;
    });

    const ownerProgress = Object.values(ownerMap).map(o => ({
        owner: o.name,
        avg: o.sum / o.total
    })).sort((a, b) => b.avg - a.avg);

    return {
      totalObjectives,
      totalKRs,
      onTrack,
      atRisk,
      offTrack,
      avgProgress: Number(avgProgress.toFixed(1)),
      statusDistribution: [
        { name: 'No Prazo', value: onTrack, color: 'success.6' },
        { name: 'Em Risco', value: atRisk, color: 'warning.6' },
        { name: 'Atrasado', value: offTrack, color: 'error.6' },
      ],
      actions: {
          total: totalActions,
          completed: completedActions,
          inProgress: inProgressActions,
          pending: pendingActions,
          blocked: blockedActions,
          completionRate: Number(actionsCompletionRate.toFixed(1))
      },
      ownerProgress
    };
  }, [enrichedObjectives, allKRs, initiatives]);

  return {
    stats,
    objectives: enrichedObjectives,
    loading: objLoading
  };
}
