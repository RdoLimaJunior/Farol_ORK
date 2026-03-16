import { Paper, Title, Group, Stack, Text, Box, rem, Skeleton } from '@mantine/core';
import { DonutChart, BarChart } from '@mantine/charts';

export function OverviewCharts({ stats, objectives }: { stats: any, objectives: any[] }) {
  if (!stats) return <Skeleton height={300} />;

  const progressData = objectives
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 5)
    .map(obj => ({
      objective: obj.title.length > 12 ? obj.title.substring(0, 12) + '...' : obj.title,
      progress: obj.progress
    }));

  const ownerData = (stats.ownerProgress || [])
    .slice(0, 5)
    .map((o: any) => ({
      owner: o.owner.length > 10 ? o.owner.substring(0, 10) + '...' : o.owner,
      avg: Math.round(o.avg)
    }));

  const standardPaperStyle = {
    backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-7))',
    borderColor: 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))'
  };

  return (
    <Group grow align="stretch">
      <Paper withBorder p="xl" radius="lg" style={standardPaperStyle}>
        <Stack gap="xl">
          <Title order={4} style={{ letterSpacing: rem(-0.5) }}>Saúde Geral (Status)</Title>
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 250 }}>
            <DonutChart 
              size={180} 
              thickness={20} 
              data={stats.statusDistribution} 
              withLabels 
              withTooltip
              chartLabel="OKRs"
            />
          </Box>
          <Stack gap="xs">
            {stats.statusDistribution.map((item: any) => (
              <Group key={item.name} justify="space-between" px="md">
                <Group gap="xs">
                  <Box style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: `var(--mantine-color-${item.color.split('.')[0]}-6)` }} />
                  <Text size="sm" fw={600}>{item.name}</Text>
                </Group>
                <Text size="sm" fw={800}>{item.value}</Text>
              </Group>
            ))}
          </Stack>
        </Stack>
      </Paper>

      <Paper withBorder p="xl" radius="lg" style={standardPaperStyle}>
        <Stack gap="md" style={{ height: '100%' }}>
          <Title order={4} style={{ letterSpacing: rem(-0.5) }}>OKR por Objetivo (%)</Title>
          <Box style={{ height: 220 }}>
            <BarChart
              h={200}
              data={progressData}
              dataKey="objective"
              series={[{ name: 'progress', color: 'farol-blue.6', label: 'Progresso (%)' }]}
              tickLine="y"
              gridAxis="xy"
              yAxisProps={{ domain: [0, 100] }}
              barProps={{ radius: [4, 4, 0, 0] }}
            />
          </Box>
          
          <Divider mt="xs" mb="xs" />

          <Title order={4} style={{ letterSpacing: rem(-0.5) }}>Performance por Responsável</Title>
          <Box style={{ height: 220 }}>
            <BarChart
              h={200}
              data={ownerData}
              dataKey="owner"
              series={[{ name: 'avg', color: 'teal.6', label: 'Média (%)' }]}
              tickLine="y"
              gridAxis="xy"
              yAxisProps={{ domain: [0, 100] }}
              barProps={{ radius: [4, 4, 0, 0] }}
            />
          </Box>
        </Stack>
      </Paper>
    </Group>
  );
}

import { Divider } from '@mantine/core';
