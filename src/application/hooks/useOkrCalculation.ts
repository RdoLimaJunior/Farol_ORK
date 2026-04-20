import { useMemo } from 'react';
import type { Objective, KeyResult } from '../../domain/models/types';
import { calculateKRProgress, calculateObjectiveProgress } from '../../domain/services/okrMath';
import { calculateAdhesion, calculateClimate, calculateMaturity } from '../../domain/services/governanceLogic';

export function useOkrCalculation(objectives: Objective[], krs: KeyResult[]) {
  
  // 1. Calculate KR Progress
  const enrichedKRs = useMemo(() => {
    return krs.map(kr => ({
      ...kr,
      progress: calculateKRProgress(kr),
    }));
  }, [krs]);

  // 2. Calculate Objective Progress and Governance Metrics
  const enrichedObjectives = useMemo(() => {
    return objectives.map(obj => {
      const objKRs = enrichedKRs.filter(kr => kr.objectiveId === obj.id);
      
      const progress = calculateObjectiveProgress(objKRs);
      
      // Cálculos Dinâmicos de Governança (Metodologia 5.3)
      const adhesionPercentage = calculateAdhesion(objKRs);
      const climateStatus = calculateClimate(objKRs);
      const maturityLevel = calculateMaturity(obj, objKRs, adhesionPercentage, climateStatus);
      
      return {
        ...obj,
        progress,
        adhesionPercentage,
        climateStatus,
        maturityLevel,
        keyResults: objKRs
      };
    });
  }, [objectives, enrichedKRs]);

  return {
    enrichedObjectives,
    enrichedKRs,
  };
}
