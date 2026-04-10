import { useState, useCallback } from 'react';
import { getMockData } from '../../infrastructure/data/mockStorage';

export interface Activity {
  id: string;
  userName: string;
  userAvatar?: string;
  action: string;
  timestamp: string;
  krTitle: string;
  previousValue: number;
  newValue: number;
}

export function useActivities() {
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    const data = getMockData();
    
    // MOCK ACTIVITIES (SIMULADAS)
    const mockActivities: Activity[] = [
      { id: '1', userName: 'Lima Junior', action: 'Planejamento tático concluído', timestamp: new Date().toISOString(), krTitle: 'Estruturar plano...', previousValue: 0, newValue: 25 },
      { id: '2', userName: 'Lidia', action: 'Atualizou progresso', timestamp: new Date().toISOString(), krTitle: 'Alcançar CSAT...', previousValue: 75, newValue: 82 },
    ];

    setActivities(mockActivities);
    setLoading(false);
  }, []);

  return {
    activities,
    loading,
    fetchActivities
  };
}

