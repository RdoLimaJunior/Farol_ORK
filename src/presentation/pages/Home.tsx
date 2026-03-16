import {
  Container,
  Stack,
} from '@mantine/core';
import { SmartPrompt } from '../components/SmartPrompt';
import { ActiveDashboardHero } from '../components/Home/ActiveDashboardHero';
import { AgentInsightsFeed } from '../components/Home/AgentInsightsFeed';

export default function Home() {
  return (
    <Container size="xl" py="xl">
      <Stack gap={50}>
        <ActiveDashboardHero />

        {/* SEARCH-FIRST CENTER */}
        <SmartPrompt />

        {/* AGENT FEED */}
        <AgentInsightsFeed />
      </Stack>
    </Container>
  );
}
