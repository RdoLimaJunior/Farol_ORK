import { ActiveDashboardHero } from '../components/Home/ActiveDashboardHero';
import { AgentInsightsFeed } from '../components/Home/AgentInsightsFeed';
import { TimoneiroFooter } from '../components/Timoneiro/TimoneiroFooter';
import { rem, Box, Stack } from '@mantine/core';

export default function Home() {
  return (
    <Box pb={rem(120)}>
      <Box pt={0}>
        <Stack gap="xs">
          {/* TOP: MISSION & WELCOME */}
          <ActiveDashboardHero />

          {/* DYNAMIC RADAR: AGENT FEED */}
          <AgentInsightsFeed />
        </Stack>
      </Box>

      {/* FIXED COPILOT-THROUGHPUT */}
      <TimoneiroFooter />
    </Box>
  );
}
