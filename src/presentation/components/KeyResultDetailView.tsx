import { 
  Paper, 
  Text, 
  Group, 
  Stack, 
  Box, 
  Progress, 
  Badge, 
  Avatar, 
  Timeline,
  SimpleGrid,
  rem,
} from '@mantine/core';
import { 
  IconTrendingUp, 
  IconHistory, 
} from '@tabler/icons-react';
import { useEffect } from 'react';
import { useKRHistory } from '../../application/hooks/useKRHistory';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

interface KeyResultDetailViewProps {
  krId: string;
  startValue: number;
  currentValue: number;
  targetValue: number;
  unit: string;
}

const confidenceColors: Record<string, string> = {
  high: 'green',
  medium: 'yellow',
  low: 'red'
};

const confidenceLabels: Record<string, string> = {
  high: 'Alta',
  medium: 'Média',
  low: 'Baixa'
};

export function KeyResultDetailView({ krId, startValue, currentValue, targetValue, unit }: KeyResultDetailViewProps) {
  const { updates, fetchHistory } = useKRHistory();

  useEffect(() => {
    fetchHistory(krId);
  }, [krId, fetchHistory]);

  const getProgress = (prev: number, next: number) => {
    const range = Math.abs(targetValue - startValue);
    if (range === 0) return 0;
    return Math.round((Math.abs(next - prev) / range) * 100);
  };

  return (
    <Stack gap="xl" p="md">
      {/* METRIC CARDS */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
        <Paper withBorder p="md" radius="md" bg="var(--mantine-color-gray-0)">
          <Stack gap={4}>
            <Group gap="xs">
              <Box w={8} h={8} style={{ borderRadius: '50%', backgroundColor: 'var(--mantine-color-gray-5)' }} />
              <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: rem(1) }}>BASELINE</Text>
            </Group>
            <Text size="xs" c="dimmed">Valor inicial</Text>
            <Group gap={4} align="baseline" mt={4}>
              <Text size="xl" fw={800}>{startValue}</Text>
              <Text size="sm" c="dimmed">{unit === 'percentage' ? '%' : unit}</Text>
            </Group>
            <Text size="xs" c="dimmed" mt="xs">Owner: Lima Júnior</Text>
          </Stack>
        </Paper>

        <Paper withBorder p="md" radius="md" bg="var(--mantine-color-gray-0)">
          <Stack gap={4}>
            <Group gap="xs">
              <Box w={8} h={8} style={{ borderRadius: '50%', backgroundColor: 'var(--mantine-color-blue-6)' }} />
              <Text size="xs" fw={700} c="blue.6" style={{ letterSpacing: rem(1) }}>VALOR ATUAL</Text>
            </Group>
            <Text size="xs" c="dimmed">Progresso</Text>
            <Group gap={4} align="baseline" mt={4}>
              <Text size="xl" fw={800} c="blue.7">{currentValue}</Text>
              <Text size="sm" c="dimmed">{unit === 'percentage' ? '%' : unit}</Text>
            </Group>
            <Box mt="xs">
               <Group justify="space-between" mb={4}>
                  <Text size="xs" fw={700}>0</Text>
                  <Text size="xs" fw={700} c="blue.6">50%</Text>
                  <Text size="xs" fw={700}>{targetValue}</Text>
               </Group>
               <Progress value={50} color="blue" size="sm" radius="xl" />
            </Box>
          </Stack>
        </Paper>

        <Paper withBorder p="md" radius="md" bg="var(--mantine-color-gray-0)">
          <Stack gap={4}>
            <Group gap="xs">
              <Box w={8} h={8} style={{ borderRadius: '50%', backgroundColor: 'var(--mantine-color-green-6)' }} />
              <Text size="xs" fw={700} c="green.6" style={{ letterSpacing: rem(1) }}>META</Text>
            </Group>
            <Text size="xs" c="dimmed">Alvo</Text>
            <Group gap={4} align="baseline" mt={4}>
              <Text size="xl" fw={800} c="green.7">{targetValue}</Text>
              <Text size="sm" c="dimmed">{unit === 'percentage' ? '%' : unit}</Text>
            </Group>
            <Group gap="apart" mt="xs">
               <Text size="xs" c="dimmed">Peso: <Text span fw={700} c="dark">100%</Text></Text>
               <Text size="xs" c="dimmed">Confiança: <Text span fw={700} c="green.6">Alta</Text></Text>
            </Group>
          </Stack>
        </Paper>
      </SimpleGrid>

      {/* HISTORY TIMELINE */}
      <Box>
        <Group mb="md">
          <IconHistory size={20} color="var(--mantine-color-blue-6)" />
          <Text fw={700} size="sm">Histórico de Check-ins</Text>
        </Group>

        <Timeline active={updates.length} bulletSize={36} lineWidth={2}>
          {updates.map((update: any) => {
            const pp = getProgress(update.previousValue, update.newValue);
            
            return (
              <Timeline.Item 
                key={update.id} 
                bullet={
                  <Avatar 
                    size={36} 
                    radius="xl" 
                    src={update.ownerAvatar} 
                    alt={update.ownerName}
                  >
                    {update.ownerName?.charAt(0)}
                  </Avatar>
                }
              >
                <Paper withBorder p="md" radius="md" bg="white" ml="md">
                  <Stack gap="sm">
                    <Group justify="space-between">
                      <Group gap="xs">
                        <Text size="sm" fw={700} c="blue.7">ref. {dayjs(update.updateDate).format('DD/MM/YYYY')}</Text>
                        <Text size="xs" c="dimmed">• {dayjs(update.updateDate).locale('pt-br').format('DD [de] MMM [de] YYYY [às] HH:mm')}</Text>
                        <Text size="xs" fw={600} c="gray.7">| {update.ownerName}</Text>
                      </Group>
                      <Group gap="xs">
                        <Badge variant="light" color={confidenceColors[update.confidenceLevel]}>
                          {confidenceLabels[update.confidenceLevel]}
                        </Badge>
                        <Text size="xs" fw={800} c="green.6">+{pp}pp</Text>
                      </Group>
                    </Group>

                    <Group gap="md">
                       <Text size="xs" style={{ textDecoration: 'line-through' }} c="dimmed">{update.previousValue} {unit === 'percentage' ? '%' : unit}</Text>
                       <IconTrendingUp size={14} color="var(--mantine-color-gray-5)" />
                       <Text size="sm" fw={800}>{update.newValue} {unit === 'percentage' ? '%' : unit}</Text>
                       <Text size="xs" c="dimmed" bg="gray.1" px={6} py={2} style={{ borderRadius: rem(4) }}>({Math.round((update.newValue/targetValue)*100)}%)</Text>
                       <Progress value={(update.newValue/targetValue)*100} color="blue" size="xs" radius="xl" style={{ flex: 1 }} />
                    </Group>

                    <Paper bg="var(--mantine-color-gray-0)" p="xs" radius="sm">
                       <Text size="xs">{update.comment}</Text>
                    </Paper>

                    <Group gap="xs">
                       <Text size="xs" c="blue.6" fw={600} style={{ cursor: 'pointer' }}>Editar</Text>
                       <Text size="xs" c="red.6" fw={600} style={{ cursor: 'pointer' }}>Apagar</Text>
                    </Group>
                  </Stack>
                </Paper>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </Box>
    </Stack>
  );
}
