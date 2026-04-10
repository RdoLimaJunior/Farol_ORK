import { useState, useCallback } from 'react';
import { getMockData } from '../../infrastructure/data/mockStorage';

export interface Initiative {
  id: string;
  tenant_id: string;
  key_result_id: string;
  title: string;
  description: string;
  owner_id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  progress: number;
  profiles?: {
    full_name: string;
  };
  key_results?: {
    title: string;
  };
}

export function useInitiatives() {
  const [loading, setLoading] = useState(false);
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);

  const fetchInitiatives = useCallback(async () => {
    setLoading(true);
    const data = getMockData();
    const tenantId = '00000000-0000-0000-0000-000000000001';

    const mapped = data.initiatives.map((i: any) => {
      // Busca o KR relacionado para o título
      const kr = data.krs.find((k: any) => k.id === i.keyResultId);
      // Busca o dono (usando o primeiro perfil como fallback se não houver ownerId)
      const owner = data.profiles.find((p: any) => p.id === i.ownerId) || data.profiles[0];

      return {
        ...i,
        tenant_id: tenantId,
        key_result_id: i.keyResultId,
        status: i.status || 'in_progress',
        progress: i.progress || 0,
        description: i.description || 'Iniciativa estratégica vinculada ao KR',
        profiles: { full_name: owner?.fullName || 'Responsável' },
        key_results: { title: kr?.title || 'Meta Relacionada' }
      };
    });

    setInitiatives(mapped);
    setLoading(false);
  }, []);

  return {
    initiatives,
    loading,
    fetchInitiatives
  };
}


