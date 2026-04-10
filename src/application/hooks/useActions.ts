import { useState, useCallback } from 'react';
import type { Action, FCA, Initiative } from '../../domain/models/types';
import { getMockData } from '../../infrastructure/data/mockStorage';

export function useActions() {
  const [loading, setLoading] = useState(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [fcas, setFCAs] = useState<FCA[]>([]);
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);

  const fetchCeremonyData = useCallback(async () => {
    setLoading(true);
    const data = getMockData();
    const tenantId = '00000000-0000-0000-0000-000000000001';

    setActions(data.actions.map((a: any) => ({ ...a, tenantId })));
    setFCAs(data.fcas.map((f: any) => ({ ...f, tenantId })));
    setInitiatives(data.initiatives.map((i: any) => ({ ...i, tenantId })));
    
    setLoading(false);
  }, []);





  return {
    actions,
    fcas,
    initiatives,
    loading,
    fetchCeremonyData,
  };
}
