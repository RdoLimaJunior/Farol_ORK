import { SimpleGrid, Paper, Text, Group, ThemeIcon, Stack } from '@mantine/core';
import { IconTarget, IconAlertTriangle, IconCircleCheck, IconTrendingUp } from '@tabler/icons-react';

interface OkrStatsProps {
  onTrack: number;
  atRisk: number;
  offTrack: number;
  avgProgress: number;
}

export function OkrStats({ onTrack, atRisk, offTrack, avgProgress }: OkrStatsProps) {
  const stats = [
    { 
      label: 'Progresso Médio', 
      value: `${Math.round(avgProgress)}%`, 
      icon: IconTrendingUp, 
      color: 'cyan' 
    },
    { 
      label: 'No Prazo', 
      value: onTrack, 
      icon: IconCircleCheck, 
      color: 'green' 
    },
    { 
      label: 'Em Atenção', 
      value: atRisk, 
      icon: IconAlertTriangle, 
      color: 'orange' 
    },
    { 
      label: 'Críticos', 
      value: offTrack, 
      icon: IconTarget, 
      color: 'red' 
    },
  ];

  return (
    <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="md">
      {stats.map((stat) => (
        <Paper key={stat.label} withBorder p="md" radius="md">
          <Group justify="space-between">
            <Stack gap={0}>
              <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                {stat.label}
              </Text>
              <Text fw={700} size="xl">
                {stat.value}
              </Text>
            </Stack>
            <ThemeIcon color={stat.color} variant="light" size="xl" radius="md">
              <stat.icon size={24} />
            </ThemeIcon>
          </Group>
        </Paper>
      ))}
    </SimpleGrid>
  );
}
