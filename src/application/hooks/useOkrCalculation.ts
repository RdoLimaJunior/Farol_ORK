import { useMemo } from 'react';
import type { Objective, KeyResult } from '../../domain/models/types';
import { calculateKRProgress, calculateObjectiveProgress } from '../../domain/services/okrMath';

export function useOkrCalculation(objectives: Objective[], krs: KeyResult[]) {
  
  // 1. Calculate KR Progress
  const enrichedKRs = useMemo(() => {
    return krs.map(kr => ({
      ...kr,
      progress: calculateKRProgress(kr),
    }));
  }, [krs]);

  // 2. Calculate Objective Progress and Status
  const enrichedObjectives = useMemo(() => {
    return objectives.map(obj => {
      const objKRs = enrichedKRs.filter(kr => kr.objectiveId === obj.id);
      
      const progress = calculateObjectiveProgress(objKRs);
      
      return {
        ...obj,
        progress,
        status: obj.status, // Keep original or suggest based on progress
        keyResults: objKRs
      };
    });
  }, [objectives, enrichedKRs]);

  return {
    enrichedObjectives,
    enrichedKRs,
  };
}
