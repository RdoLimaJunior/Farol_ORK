import { Stack, Group, Title, Text, rem, Skeleton } from '@mantine/core';
import { useAuthContext } from '../../../application/context/AuthContext';
import { ActionChip } from './ActionChip';
import { useEffect, useState } from 'react';
import { useCopilot } from '../../../application/context/CopilotContext';
import { useManagerContext } from '../../../application/hooks/useManagerContext';

export function ActiveDashboardHero() {
  const { profile } = useAuthContext();
  const { executeCommand } = useCopilot();
  const { suggestions } = useManagerContext();
  const [greeting, setGreeting] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');
    
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const firstName = profile?.fullName?.split(' ')[0] || 'Admin';

  return (
    <Stack gap="md" align="center">
      <Stack gap={0} align="center">
        <Title order={1} style={{ 
          fontSize: rem(32), 
          fontWeight: 800, 
          letterSpacing: rem(-1),
          textAlign: 'center'
        }}>
          {greeting}, <Text span c="farol-blue" inherit>{firstName}.</Text>
        </Title>
        <Text size="md" c="dimmed" fw={500} ta="center" mt={rem(4)}>
          O que vamos conquistar hoje?
        </Text>
      </Stack>

      <Group gap="xs" justify="center" mt="sm">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <Skeleton key={i} height={36} radius="xl" width={160} />
          ))
        ) : (
          suggestions.map((chip, i) => (
            <ActionChip
              key={chip.label}
              index={i}
              label={chip.label}
              icon={chip.icon}
              color={chip.color}
              onClick={() => executeCommand(chip.label)}
            />
          ))
        )}
      </Group>
    </Stack>
  );
}
