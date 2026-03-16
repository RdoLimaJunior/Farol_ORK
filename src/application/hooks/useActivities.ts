import { useState, useCallback } from 'react';
import { supabase } from '../../infrastructure/supabaseClient';
import { notifications } from '@mantine/notifications';

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
    
    // Using explicit FK reference to avoid PostgREST ambiguity
    const { data, error } = await supabase
      .from('kr_updates')
      .select(`
        id,
        new_value,
        previous_value,
        update_date,
        comment,
        owner:profiles (
          full_name,
          avatar_url
        ),
        kr:key_results (
          title
        )
      `)
      .order('update_date', { ascending: false })
      .limit(10);

    if (error) {
      console.warn('Relationship fetch failed, attempting fallback query...', error);
      
      // Fallback: fetch without joins if relationship fails
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('kr_updates')
        .select(`id, new_value, previous_value, update_date, comment, owner_id, key_result_id`)
        .order('update_date', { ascending: false })
        .limit(10);

      if (fallbackError) {
        notifications.show({ title: 'Erro Crítico', message: fallbackError.message, color: 'red' });
      } else {
         // This is a minimal fallback, ideally we want the joins
         const mapped: Activity[] = (fallbackData || []).map((item: any) => ({
           id: item.id,
           userName: 'Colega',
           action: `Check-in realizado`,
           timestamp: item.update_date,
           krTitle: 'Ação estratégica',
           previousValue: item.previous_value,
           newValue: item.new_value
         }));
         setActivities(mapped);
      }
    } else {
      const mapped: Activity[] = (data || []).map((item: any) => ({
        id: item.id,
        userName: item.owner?.full_name || 'Usuário',
        userAvatar: item.owner?.avatar_url,
        action: `Fez check-in: ${item.comment}`,
        timestamp: item.update_date,
        krTitle: item.kr?.title || 'Meta',
        previousValue: item.previous_value,
        newValue: item.new_value
      }));
      setActivities(mapped);
    }
    setLoading(false);
  }, []);

  return {
    activities,
    loading,
    fetchActivities
  };
}
