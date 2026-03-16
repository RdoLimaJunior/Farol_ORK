import {
  Container,
  Stack,
  Group,
  Text,
  Badge,
  Paper,
  Avatar,
  Box,
  rem,
  Skeleton,
  SimpleGrid,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  IconListCheck,
  IconCircleCheck,
  IconLoader,
  IconAlertTriangle,
  IconClock,
} from '@tabler/icons-react';
import { useEffect } from 'react';
import { useInitiatives } from '../../application/hooks/useInitiatives';
import { PageHeader } from '../components/common/PageHeader';
import { motion } from 'framer-motion';

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  pending:     { label: 'A Iniciar',      color: 'gray',    icon: IconClock },
  in_progress: { label: 'Em Andamento',   color: 'blue',    icon: IconLoader },
  completed:   { label: 'Concluído',      color: 'green',   icon: IconCircleCheck },
  blocked:     { label: 'Impedido',       color: 'red',     icon: IconAlertTriangle },
};

const KANBAN_ORDER = ['pending', 'in_progress', 'completed', 'blocked'];

function KanbanColumn({ status, items }: { status: string; items: any[] }) {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <Stack gap="sm">
      <Group gap="xs" pb="xs" style={{ borderBottom: `2px solid var(--mantine-color-${cfg.color}-4)` }}>
        <ThemeIcon size="sm" color={cfg.color} variant="light" radius="md">
          <Icon size={14} />
        </ThemeIcon>
        <Text size="sm" fw={800} c={`${cfg.color}.7`}>{cfg.label}</Text>
        <Badge size="xs" color={cfg.color} variant="filled" circle>{items.length}</Badge>
      </Group>

      {items.length === 0 ? (
        <Paper withBorder p="md" radius="md" style={{ borderStyle: 'dashed', textAlign: 'center' }}>
          <Text size="xs" c="dimmed">Nenhuma iniciativa</Text>
        </Paper>
      ) : (
        items.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Paper
              withBorder
              p="md"
              radius="md"
              style={{
                borderLeft: `4px solid var(--mantine-color-${cfg.color}-5)`,
                cursor: 'pointer',
                transition: 'box-shadow 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              <Stack gap="xs">
                <Text size="sm" fw={700} lineClamp={2}>{item.title}</Text>
                {item.description && (
                  <Text size="xs" c="dimmed" lineClamp={2}>{item.description}</Text>
                )}
                {item.key_results?.title && (
                  <Group gap={4}>
                    <Box style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--mantine-color-farol-blue-5)' }} />
                    <Text size="xs" c="farol-blue.6" fw={600} lineClamp={1}>{item.key_results.title}</Text>
                  </Group>
                )}
                <Group justify="space-between" mt="xs">
                  <Group gap="xs">
                    <Avatar size="xs" radius="xl" color="farol-blue" variant="light">
                      {item.profiles?.full_name?.substring(0, 2).toUpperCase() || 'EU'}
                    </Avatar>
                    <Text size="xs" c="dimmed">{item.profiles?.full_name?.split(' ')[0] || 'Eu'}</Text>
                  </Group>
                  {item.end_date && (
                    <Text size="xs" c="dimmed">{new Date(item.end_date).toLocaleDateString('pt-BR')}</Text>
                  )}
                </Group>
              </Stack>
            </Paper>
          </motion.div>
        ))
      )}
    </Stack>
  );
}

export default function ActionPlans() {
  const { initiatives, loading, fetchInitiatives } = useInitiatives();

  useEffect(() => { fetchInitiatives(); }, [fetchInitiatives]);

  const grouped = KANBAN_ORDER.reduce<Record<string, any[]>>((acc, s) => {
    acc[s] = initiatives.filter(i => i.status === s);
    return acc;
  }, {});

  const stats = {
    total: initiatives.length,
    completed: initiatives.filter(i => i.status === 'completed').length,
    inProgress: initiatives.filter(i => i.status === 'in_progress').length,
    blocked: initiatives.filter(i => i.status === 'blocked').length,
  };

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <PageHeader
          title="Meus Planos"
          highlightedText="de Ação"
          description="Iniciativas e tarefas vinculadas diretamente a você"
          icon={IconListCheck}
          color="farol-blue"
        />

        {/* Quick stats */}
        {!loading && initiatives.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Group gap="md">
              {[
                { label: 'Total', value: stats.total, color: 'gray' },
                { label: 'Concluídas', value: stats.completed, color: 'green' },
                { label: 'Andamento', value: stats.inProgress, color: 'blue' },
                { label: 'Impedidas', value: stats.blocked, color: 'red' },
              ].map(s => (
                <Paper key={s.label} withBorder px="lg" py="sm" radius="md">
                  <Stack gap={0} align="center">
                    <Text fw={900} size="xl" c={`${s.color}.6`}>{s.value}</Text>
                    <Text size="xs" c="dimmed" fw={600}>{s.label}</Text>
                  </Stack>
                </Paper>
              ))}
            </Group>
          </motion.div>
        )}

        {/* Kanban board */}
        {loading ? (
          <SimpleGrid cols={4} spacing="md">
            {[...Array(4)].map((_, i) => <Skeleton key={i} height={300} radius="md" />)}
          </SimpleGrid>
        ) : initiatives.length === 0 ? (
          <Paper withBorder p={60} radius="lg" style={{ borderStyle: 'dashed', textAlign: 'center' }}>
            <Stack align="center" gap="md">
              <ThemeIcon size={64} radius="xl" color="farol-blue" variant="light">
                <IconListCheck size={32} />
              </ThemeIcon>
              <Title order={3}>Nenhuma iniciativa ainda</Title>
              <Text c="dimmed" style={{ maxWidth: rem(400) }}>
                As iniciativas aparecem aqui quando são criadas e vinculadas aos seus Key Results.
              </Text>
            </Stack>
          </Paper>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
            {KANBAN_ORDER.map(status => (
              <KanbanColumn key={status} status={status} items={grouped[status]} />
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Container>
  );
}
