import { Stack, Group, Title, Text, rem, Skeleton, Box, ThemeIcon } from '@mantine/core';
import { useAuthContext } from '../../../application/context/AuthContext';
import { ActionChip } from './ActionChip';
import { useEffect, useState } from 'react';
import { useCopilot } from '../../../application/context/CopilotContext';
import { useManagerContext } from '../../../application/hooks/useManagerContext';
import { aiAssistant } from '../../../application/services/AiAssistantService';
import { IconSun, IconMoonStars, IconSunrise, IconSunset } from '@tabler/icons-react';

export function ActiveDashboardHero() {
  const { profile } = useAuthContext();
  const { executeCommand } = useCopilot();
  const { suggestions } = useManagerContext();
  const [greeting, setGreeting] = useState('');
  const [GreetingIcon, setGreetingIcon] = useState<any>(IconSun);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 6) {
      setGreeting('Boa noite');
      setGreetingIcon(IconMoonStars);
    } else if (hour < 12) {
      setGreeting('Bom dia');
      setGreetingIcon(IconSunrise);
    } else if (hour < 18) {
      setGreeting('Boa tarde');
      setGreetingIcon(IconSun);
    } else if (hour < 21) {
      setGreeting('Boa noite');
      setGreetingIcon(IconSunset);
    } else {
      setGreeting('Boa noite');
      setGreetingIcon(IconMoonStars);
    }
    
    async function loadData() {
      const execSummary = await aiAssistant.getExecutiveSummary();
      setSummary(execSummary);
      setLoading(false);
    }
    loadData();
  }, []);

  const firstName = profile?.fullName?.split(' ')[0] || 'Admin';

  return (
    <Stack gap={4} align="center">
      <Stack gap={0} align="center">
        <Title order={1} style={{ 
          fontSize: rem(28),
          fontWeight: 900, 
          letterSpacing: rem(-0.5),
          textAlign: 'center'
        }}>
          {greeting}, <Text span variant="gradient" gradient={{ from: 'farol-blue', to: 'blue' }} inherit>{firstName}.</Text>
        </Title>
        <Box style={{ maxWidth: rem(600) }}>
          {loading ? (
             <Skeleton height={20} width={400} />
          ) : (
            <Text size="md" fw={600} ta="center" c="dimmed" style={{ lineHeight: 1.3 }}>
              {summary}
            </Text>
          )}
        </Box>
      </Stack>
    </Stack>
  );
}
