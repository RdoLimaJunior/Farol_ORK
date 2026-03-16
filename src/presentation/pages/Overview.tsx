import { 
  Container, 
  Stack, 
} from '@mantine/core';
import { OverviewStats } from '../components/overview/OverviewStats';
import { OverviewCharts } from '../components/overview/OverviewCharts';
import { OverviewBottom } from '../components/overview/OverviewBottom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

import { PageHeader } from '../components/common/PageHeader';
import { IconDashboard } from '@tabler/icons-react';
import { useDashboardData } from '../../application/hooks/useDashboardData';
import { useKeyResults } from '../../application/hooks/useKeyResults';
import { useActivities } from '../../application/hooks/useActivities';
import { useInitiatives } from '../../application/hooks/useInitiatives';

export default function Overview() {
  const { keyResults, fetchKRs } = useKeyResults();
  const { initiatives, fetchInitiatives, loading: iniLoading } = useInitiatives();
  const { stats, objectives, loading: objLoading } = useDashboardData(keyResults, initiatives);
  const { activities, fetchActivities, loading: actLoading } = useActivities();

  useEffect(() => {
    fetchKRs();
    fetchActivities();
    fetchInitiatives();
  }, [fetchKRs, fetchActivities, fetchInitiatives]);

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <PageHeader 
          title="Gestão"
          highlightedText="Estratégica"
          description="BI Cockpit — Painel Geral de Performance"
          icon={IconDashboard}
        />

        {/* TOP STATS */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.1 }}
        >
          <OverviewStats stats={stats} loading={objLoading || iniLoading} />
        </motion.div>

        {/* CHARTS */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.2 }}
        >
          <OverviewCharts stats={stats} objectives={objectives} />
        </motion.div>

        {/* BOTTOM SECTIONS */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.3 }}
        >
          <OverviewBottom 
            objectives={objectives} 
            activities={activities} 
            initiatives={initiatives}
            stats={stats}
            loading={objLoading || actLoading || iniLoading} 
          />
        </motion.div>
      </Stack>
    </Container>
  );
}
