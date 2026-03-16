import {
  Container, Stack, Text, Paper, Group, Badge, Avatar,
  Progress, ThemeIcon, Skeleton, rem, Title, Box
} from '@mantine/core';
import { IconRefresh, IconCalendar, IconArrowUpRight, IconCheck, IconAlertCircle, IconClock } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { useActivities } from '../../application/hooks/useActivities';
import { useKeyResults } from '../../application/hooks/useKeyResults';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

function ConfidenceBadge({ level }: { level: string }) {
  const map: Record<string, { color: string; label: string; icon: any }> = {
    high:   { color: 'green',  label: 'Alta Confiança',    icon: IconCheck },
    medium: { color: 'orange', label: 'Média Confiança',   icon: IconClock },
    low:    { color: 'red',    label: 'Baixa Confiança',   icon: IconAlertCircle },
  };
  const cfg = map[level] ?? map.medium;
  const Icon = cfg.icon;
  return (
    <Badge color={cfg.color} variant="dot" size="sm" leftSection={<Icon size={10} />}>
      {cfg.label}
    </Badge>
  );
}

export default function Checkins() {
  const navigate = useNavigate();
  const { activities, fetchActivities, loading } = useActivities();
  const { keyResults, fetchKRs } = useKeyResults();

  useEffect(() => {
    fetchActivities();
    fetchKRs();
  }, [fetchActivities, fetchKRs]);

  // Enrich activities with KR info
  const enriched = activities.map(act => {
    const kr = keyResults.find(k => k.id === act.krId);
    return { ...act, krTitle: kr?.title, krProgress: kr?.progress, krStatus: kr?.status };
  });

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <PageHeader
          title="Check-ins"
          highlightedText="& Progresso"
          description="Fluxo de atualizações de progresso dos Key Results"
          icon={IconRefresh}
          color="teal"
        />

        {/* Feed de Check-ins */}
        {loading ? (
          <Stack gap="md">
            {[...Array(5)].map((_, i) => <Skeleton key={i} height={100} radius="md" />)}
          </Stack>
        ) : enriched.length === 0 ? (
          <Paper withBorder p={60} radius="lg" style={{ borderStyle: 'dashed', textAlign: 'center' }}>
            <Stack align="center" gap="md">
              <ThemeIcon size={64} radius="xl" color="teal" variant="light">
                <IconRefresh size={32} />
              </ThemeIcon>
              <Title order={3}>Nenhum check-in registrado</Title>
              <Text c="dimmed" style={{ maxWidth: rem(400) }}>
                Os check-ins surgem aqui quando os responsáveis atualizam o progresso dos seus Key Results.
              </Text>
            </Stack>
          </Paper>
        ) : (
          <Stack gap="md">
            {enriched.map((act, i) => (
              <motion.div key={act.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                <Paper
                  withBorder
                  p="lg"
                  radius="lg"
                  style={{ cursor: 'pointer', transition: 'box-shadow 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
                >
                  <Group justify="space-between" wrap="nowrap" align="flex-start">
                    <Group gap="md" align="flex-start" style={{ flex: 1 }}>
                      <Avatar size="md" radius="md" color="teal" variant="light">
                        {act.userName.substring(0, 2).toUpperCase()}
                      </Avatar>
                      <Stack gap="xs" style={{ flex: 1 }}>
                        <Group justify="space-between" wrap="nowrap">
                          <Text size="sm" fw={700}>{act.userName}</Text>
                          <Group gap="xs">
                            <IconCalendar size={12} color="var(--mantine-color-dimmed)" />
                            <Text size="xs" c="dimmed">{dayjs(act.timestamp).fromNow()}</Text>
                          </Group>
                        </Group>

                        {act.krTitle && (
                          <Group gap={4}>
                            <Box style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--mantine-color-teal-5)' }} />
                            <Text size="xs" c="teal.7" fw={600}>{act.krTitle}</Text>
                          </Group>
                        )}

                        <Text size="sm" c="dimmed" style={{ fontStyle: 'italic' }}>"{act.action}"</Text>

                        {(act.delta !== undefined) && (
                          <Group gap="md" mt="xs">
                            <Box
                              style={{
                                padding: '4px 10px',
                                borderRadius: '6px',
                                backgroundColor: 'var(--mantine-color-teal-0)',
                                border: '1px solid var(--mantine-color-teal-2)',
                              }}
                            >
                              <Text size="xs" fw={800} c="teal.8">
                                {act.delta > 0 ? '+' : ''}{act.delta.toFixed(1)} pts
                              </Text>
                            </Box>
                            {act.krProgress !== undefined && (
                              <Group gap="xs" style={{ flex: 1, maxWidth: 200 }}>
                                <Progress
                                  value={act.krProgress}
                                  size="sm"
                                  radius="xl"
                                  color={act.krStatus === 'on_track' ? 'green' : act.krStatus === 'at_risk' ? 'orange' : 'red'}
                                  style={{ flex: 1 }}
                                />
                                <Text size="xs" fw={700}>{Math.round(act.krProgress)}%</Text>
                              </Group>
                            )}
                          </Group>
                        )}

                        {act.confidenceLevel && <ConfidenceBadge level={act.confidenceLevel} />}
                      </Stack>
                    </Group>

                    <ThemeIcon
                      size="sm"
                      variant="subtle"
                      color="gray"
                      radius="md"
                      style={{ cursor: 'pointer', flexShrink: 0 }}
                      onClick={() => act.krId && navigate(`/objective/${act.krId}`)}
                    >
                      <IconArrowUpRight size={14} />
                    </ThemeIcon>
                  </Group>
                </Paper>
              </motion.div>
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
