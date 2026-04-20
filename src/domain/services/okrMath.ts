import type { KeyResult, Objective, Status, Cadence } from '../models/types';
import dayjs from 'dayjs';

/**
 * Calculates the progress percentage of a Key Result.
 */
export const calculateKRProgress = (kr: Pick<KeyResult, 'startValue' | 'targetValue' | 'currentValue' | 'polarity'>): number => {
  const { startValue, targetValue, currentValue, polarity = 'ascending' } = kr;
  if (targetValue === startValue) return 100;
  
  let progress = 0;
  if (polarity === 'descending') {
    progress = ((startValue - currentValue) / (startValue - targetValue)) * 100;
  } else {
    progress = ((currentValue - startValue) / (targetValue - startValue)) * 100;
  }
  
  return Math.round(Math.min(Math.max(progress, 0), 100)); // Clamp 0-100 and round to integer
};

/**
 * Suggests a status based on linear time progression.
 * If progress is significantly behind the current time in the cycle, it suggests 'at_risk' or 'off_track'.
 */
export const suggestStatus = (
  progress: number,
  startDate: string,
  endDate: string
): Status => {
  const totalDays = dayjs(endDate).diff(dayjs(startDate), 'day');
  const elapsedDays = dayjs().diff(dayjs(startDate), 'day');
  
  if (elapsedDays <= 0) return 'on_track';
  if (progress >= 100) return 'on_track';

  const expectedProgress = (elapsedDays / totalDays) * 100;
  const deviation = expectedProgress - progress;

  if (deviation > 25) return 'off_track';
  if (deviation > 10) return 'at_risk';
  return 'on_track';
};

/**
 * Checks if a status should be marked as 'stale' based on cadence.
 */
export const checkIsStale = (lastCheckIn: string | undefined, cadence: Cadence): boolean => {
  if (!lastCheckIn) return true;
  
  const now = dayjs();
  const last = dayjs(lastCheckIn);
  const diffDays = now.diff(last, 'day');

  switch (cadence) {
    case 'weekly': return diffDays > 7;
    case 'biweekly': return diffDays > 14;
    case 'monthly': return diffDays > 30;
    default: return false;
  }
};

/**
 * Calculates the total progress of an Objective based on its KRs and Child Objectives.
 * As per the 'Contributive' rule (Option B clarified).
 */
export const calculateObjectiveProgress = (
  krs: KeyResult[],
  childObjectives: Objective[] = []
): number => {
  const krPoints = krs.map(kr => ({ value: kr.progress, weight: kr.weight || 1 }));
  const childPoints = childObjectives.map(obj => ({ value: obj.progress, weight: 1 }));
  
  const allPoints = [...krPoints, ...childPoints];
  
  if (allPoints.length === 0) return 0;

  const totalWeight = allPoints.reduce((acc, curr) => acc + curr.weight, 0);
  const weightedSum = allPoints.reduce((acc, curr) => acc + (curr.value * curr.weight), 0);

  return Math.round(weightedSum / totalWeight);
};
