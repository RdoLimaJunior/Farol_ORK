import { Paper, Group, Text, ThemeIcon, Stack, rem, Skeleton, RingProgress, Box } from '@mantine/core';
import { IconTarget, IconChartBar, IconBolt } from '@tabler/icons-react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: any;
  color: string;
}

function StatCard({ title, value, subtitle, icon: Icon, color }: SummaryCardProps) {
  return (
    <Paper 
      withBorder 
      p="xl" 
      radius="lg" 
      style={{ 
        flex: 1,
        backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-7))',
        borderColor: 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))'
      }}
    >
      <Group justify="space-between" wrap="nowrap">
        <Stack gap={0}>
          <Text size="xs" c="dimmed" fw={800} tt="uppercase" style={{ letterSpacing: rem(1) }}>
            {title}
          </Text>
          <Text size={rem(32)} fw={900} style={{ lineHeight: 1.2, margin: `${rem(4)} 0` }}>
            {value}
          </Text>
          <Text size="xs" c="dimmed" fw={500}>
            {subtitle}
          </Text>
        </Stack>
        <ThemeIcon 
          variant="light" 
          color={color} 
          size={52} 
          radius="md"
        >
          <Icon size={28} stroke={1.5} />
        </ThemeIcon>
      </Group>
    </Paper>
  );
}

export function OverviewStats({ stats, loading }: { stats: any, loading: boolean }) {
  if (loading || !stats) return (
    <Group grow align="stretch">
      {[...Array(4)].map((_, i) => (
        <Paper key={i} withBorder p="xl" radius="lg">
           <Skeleton height={20} width="60%" />
           <Skeleton height={40} mt="xs" />
        </Paper>
      ))}
    </Group>
  );

  return (
    <Group grow align="stretch">
      <StatCard 
        title="Objetivos" 
        value={stats.totalObjectives} 
        subtitle="Total de metas" 
        icon={IconTarget} 
        color="farol-blue" 
      />
      <StatCard 
        title="Key Results" 
        value={stats.totalKRs} 
        subtitle="Indicadores chave" 
        icon={IconChartBar} 
        color="success" 
      />
      <StatCard 
        title="Em Risco" 
        value={stats.atRisk + stats.offTrack} 
        subtitle={`${stats.offTrack} críticos`} 
        icon={IconBolt} 
        color={stats.atRisk + stats.offTrack > 0 ? "error" : "warning"} 
      />
      <Paper withBorder p="xl" radius="lg" style={{ flex: 1.5 }}>
         <Group justify="space-between" align="flex-start" wrap="nowrap">
            <Stack gap="xs" style={{ flex: 1 }}>
                <Text size="xs" c="dimmed" fw={800} tt="uppercase">Plano de Ação</Text>
                <Group grow mt="sm">
                    <Stack gap={0}>
                        <Text fw={900} size="xl">{stats.actions.total}</Text>
                        <Text size="xs" c="dimmed">Total</Text>
                    </Stack>
                    <Stack gap={0}>
                        <Text fw={900} size="xl" c="green.6">{stats.actions.completed}</Text>
                        <Text size="xs" c="dimmed">Concluídas</Text>
                    </Stack>
                </Group>
                <Group grow mt="sm">
                    <Stack gap={0}>
                        <Text fw={900} size="xl" c="orange.6">{stats.actions.inProgress}</Text>
                        <Text size="xs" c="dimmed">Andamento</Text>
                    </Stack>
                    <Stack gap={0}>
                        <Text fw={900} size="xl" c="red.6">{stats.actions.blocked}</Text>
                        <Text size="xs" c="dimmed">Impedidas</Text>
                    </Stack>
                </Group>
            </Stack>
            
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RingProgress
                    size={110}
                    thickness={12}
                    roundCaps
                    sections={[{ value: stats.actions.completionRate, color: 'farol-blue' }]}
                    label={
                        <Text c="farol-blue" fw={900} ta="center" size="sm">
                            {stats.actions.completionRate}%
                        </Text>
                    }
                />
            </Box>
         </Group>
      </Paper>
    </Group>
  );
}
