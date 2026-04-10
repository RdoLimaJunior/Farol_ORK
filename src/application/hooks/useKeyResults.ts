import { useState, useCallback } from 'react';
import type { KeyResult } from '../../domain/models/types';
import { getMockData } from '../../infrastructure/data/mockStorage';

export function useKeyResults(objectiveId?: string) {
  const [loading, setLoading] = useState(false);
  const [keyResults, setKeyResults] = useState<KeyResult[]>([]);

  const fetchKRs = useCallback(async () => {
    setLoading(true);
    const data = getMockData();
    const tenantId = '00000000-0000-0000-0000-000000000001';

    let list = data.krs.map((kr: any) => ({
      ...kr,
      tenantId,
      createdAt: kr.createdAt || new Date().toISOString(),
      updatedAt: kr.updatedAt || new Date().toISOString()
    }));

    if (objectiveId) {
      list = list.filter((kr: any) => kr.objectiveId === objectiveId);
    }

    setKeyResults(list);
    setLoading(false);
  }, [objectiveId]);

  return {
    keyResults,
    loading,
    fetchKRs
  };
}

