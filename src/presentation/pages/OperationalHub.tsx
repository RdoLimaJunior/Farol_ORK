import { 
  Container, 
  Stack, 
  Box,
  rem,
  Divider,
} from '@mantine/core';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { IconCompass } from '@tabler/icons-react';

// Components from Timoneiro (Home)
import { OperationHealth } from '../components/Home/OperationHealth';

// Components from Overview
import { OverviewStats } from '../components/overview/OverviewStats';
import { OverviewCharts } from '../components/overview/OverviewCharts';
import { OverviewBottom } from '../components/overview/OverviewBottom';

// Hooks
import { PageHeader } from '../components/common/PageHeader';
import { useDashboardData } from '../../application/hooks/useDashboardData';
import { useKeyResults } from '../../application/hooks/useKeyResults';
import { useActivities } from '../../application/hooks/useActivities';
import { useInitiatives } from '../../application/hooks/useInitiatives';
import { useObjectives } from '../../application/hooks/useObjectives';

export default function OperationalHub() {
  const { objectives, fetchObjectives } = useObjectives();
  const { keyResults, fetchKRs } = useKeyResults();
  const { initiatives, fetchInitiatives, loading: iniLoading } = useInitiatives();
  const { stats, objectives: dashboardObjectives, loading: objLoading } = useDashboardData(keyResults, initiatives);
  const { activities, fetchActivities, loading: actLoading } = useActivities();

  useEffect(() => {
    fetchObjectives();
    fetchKRs();
    fetchActivities();
    fetchInitiatives();
  }, [fetchObjectives, fetchKRs, fetchActivities, fetchInitiatives]);

  return (
    <Box pb="xl">
      <Container size="xl" py="md">
        <Stack gap="xl">
          {/* HEADER SECTION */}
          <PageHeader 
            title="Hub de"
            highlightedText="Operações"
            description="Visão consolidada do Timoneiro e Gestão Estratégica"
            icon={IconCompass}
          />

          {/* OVERVIEW STATS (Executive BI) */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.1 }}
          >
            <OverviewStats stats={stats} loading={objLoading || iniLoading} />
          </motion.div>

          <Divider variant="dashed" />

          {/* OPERATION HEALTH (Detailed Ratios & Rituals) */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.15 }}
          >
            <OperationHealth />
          </motion.div>

          {/* CHARTS (Trends) */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
          >
            <OverviewCharts stats={stats} objectives={dashboardObjectives} />
          </motion.div>

          {/* LISTS & ACTIVITIES */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.3 }}
          >
            <OverviewBottom 
              objectives={dashboardObjectives} 
              activities={activities} 
              initiatives={initiatives}
              stats={stats}
              loading={objLoading || actLoading || iniLoading} 
            />
          </motion.div>
        </Stack>
      </Container>

    </Box>
  );
}
