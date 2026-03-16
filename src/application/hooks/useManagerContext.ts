import { useMemo } from 'react';
import { IconPlus, IconAlertTriangle, IconChartBar, IconRocket, IconTarget } from '@tabler/icons-react';

export function useManagerContext() {
  // In a real scenario, this would fetch data from the store/database
  // For the MVP, we simulate context-aware suggestions
  
  const suggestions = useMemo(() => {
    const list = [
      { label: 'Criar OKR para Engenharia', icon: IconPlus, color: 'blue', priority: 1 },
      { label: 'KRs em risco hoje?', icon: IconAlertTriangle, color: 'orange', priority: 3 },
      { label: 'Resumo de progresso Q1', icon: IconChartBar, color: 'green', priority: 2 },
      { label: 'Nova Iniciativa estratégica', icon: IconRocket, color: 'violet', priority: 1 },
      { label: 'Ver meus OKRs pendentes', icon: IconTarget, color: 'cyan', priority: 2 },
    ];

    // Simple priority sorting + shuffle simulation
    return list
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 4);
  }, []);

  return { suggestions };
}
