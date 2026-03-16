import { 
  Paper, 
  Text, 
  Group, 
  RingProgress, 
  Badge, 
  Stack, 
  ThemeIcon, 
  ActionIcon,
  Tooltip,
  Title,
  rem 
} from '@mantine/core';
import { IconTarget, IconMessageDots, IconHistory } from '@tabler/icons-react';
import type { Objective } from '../../domain/models/types';

interface OkrCardProps {
  objective: Objective;
  onClick?: () => void;
}

const statusColors: Record<string, string> = {
  on_track: 'success',
  at_risk: 'warning',
  off_track: 'error',
  stale: 'gray',
  draft: 'farol-blue'
};


const statusLabels: Record<string, string> = {
  on_track: 'No Prazo',
  at_risk: 'Em Risco',
  off_track: 'Atrasado',
  stale: 'Desatualizado',
  draft: 'Rascunho'
};

const typeLabels: Record<string, string> = {
  aspirational: 'Moonshot',
  committed: 'Roofshot',
  learning: 'Aprendizado'
};

const typeColors: Record<string, string> = {
  aspirational: 'violet',
  committed: 'indigo',
  learning: 'cyan'
};

export function OkrCard({ objective, onClick }: OkrCardProps) {
  const color = statusColors[objective.status] || 'blue';

  return (
    <Paper 
      withBorder 
      p="md" 
      radius="lg" 
      onClick={onClick}
      style={{ 
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-7))',
        borderColor: 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))'
      }}
      className="okr-card"
    >
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Group align="center" wrap="nowrap">
          <RingProgress
            size={70}
            roundCaps
            thickness={6}
            sections={[{ value: objective.progress, color }]}
            label={
              <Text ta="center" fw={800} size="xs">
                {Math.round(objective.progress)}%
              </Text>
            }
          />
          
          <Stack gap={2}>
            <Group gap="xs" wrap="nowrap">
              <ThemeIcon color={color} variant="light" size="xs" radius="sm">
                <IconTarget size={12} stroke={2.5} />
              </ThemeIcon>
              <Title order={5} style={{ fontSize: rem(15), fontWeight: 700, lineHeight: 1.2 }}>
                {objective.title}
              </Title>
            </Group>
            
            <Text size="xs" c="dimmed" lineClamp={1} fw={500}>
              {objective.description || 'Sem descrição definida.'}
            </Text>

            <Group gap={6} mt={4}>
              <Badge color={color} variant="light" size="xs" radius="sm">
                {statusLabels[objective.status]}
              </Badge>
              <Badge color={typeColors[objective.type] || 'gray'} variant="outline" size="xs" radius="sm">
                {typeLabels[objective.type] || 'Comum'}
              </Badge>
              {objective.isConfidential && (
                <Badge color="gray" variant="dot" size="xs">Privado</Badge>
              )}
            </Group>
          </Stack>
        </Group>

        <Group gap={4}>
          <Tooltip label="Comentários">
            <ActionIcon variant="subtle" color="gray" size="sm" radius="md">
              <IconMessageDots size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Histórico">
            <ActionIcon variant="subtle" color="gray" size="sm" radius="md">
              <IconHistory size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>

      <style dangerouslySetInnerHTML={{ __html: `
        .okr-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--mantine-shadow-md);
          border-color: var(--mantine-color-farol-blue-4);
        }
      `}} />
    </Paper>
  );
}
