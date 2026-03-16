import {
  Container,
  Stack,
} from '@mantine/core';
import { SmartPrompt } from '../components/SmartPrompt';
import { ActiveDashboardHero } from '../components/Home/ActiveDashboardHero';

export default function Home() {
  return (
    <Container size="xl" py="xl">
      <Stack gap={50}>
        <ActiveDashboardHero />

        {/* SEARCH-FIRST CENTER */}
        <SmartPrompt />
      </Stack>
    </Container>
  );
}
