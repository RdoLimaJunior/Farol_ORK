import { useEffect } from 'react';
import { useObjectives } from '../../../application/hooks/useObjectives';
import { useKRs } from '../../../application/hooks/useKRs';
import { useActions } from '../../../application/hooks/useActions';
import { useOkrCalculation } from '../../../application/hooks/useOkrCalculation';
import { CeremonyDashboard } from '../../pages/checkin/CeremonyDashboard';

export function OperationHealth() {
  const { objectives, fetchObjectives } = useObjectives();
  const { krs, fetchKRs } = useKRs();
  const { actions, initiatives, fetchCeremonyData } = useActions();
  const { enrichedObjectives } = useOkrCalculation(objectives, krs);

  useEffect(() => {
    fetchObjectives();
    fetchKRs();
    fetchCeremonyData();
  }, [fetchObjectives, fetchKRs, fetchCeremonyData]);

  return (
    <CeremonyDashboard
      enrichedObjectives={enrichedObjectives}
      actions={actions}
      initiatives={initiatives}
    />
  );
}
