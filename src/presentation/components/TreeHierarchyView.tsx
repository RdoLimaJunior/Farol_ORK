import { Box, Paper, Text, Stack, Group, ThemeIcon, Collapse, ActionIcon, rem, Badge, Progress } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconChevronRight, 
  IconChevronDown, 
  IconTarget, 
  IconChartBar,
  IconArrowUpRight
} from '@tabler/icons-react';
import type { Objective } from '../../domain/models/types';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface TreeItemProps {
  objective: Objective;
  allObjectives: Objective[];
  level: number;
}

const statusColors: Record<string, string> = {
  on_track: 'green',
  at_risk: 'orange',
  off_track: 'red',
  stale: 'gray',
  draft: 'blue'
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

function TreeItem({ objective, allObjectives, level }: TreeItemProps) {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure(true);
  const children = allObjectives.filter(obj => obj.parentObjectiveId === objective.id);
  const hasChildren = children.length > 0;
  const color = statusColors[objective.status] || 'blue';

  return (
    <Box mt="xs" mb="xs">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: level * 0.1 }}
      >
        <Paper
          withBorder
          p="md"
          radius="md"
          onClick={() => navigate(`/objective/${objective.id}`)}
          style={{
            borderLeft: `5px solid var(--mantine-color-${color}-6)`,
            marginLeft: rem(level * 30),
            backgroundColor: 'var(--mantine-color-body)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            cursor: 'pointer'
          }}
        >
          <Group justify="space-between" wrap="nowrap">
            <Group gap="md" wrap="nowrap" style={{ flex: 1 }}>
              {hasChildren ? (
                <ActionIcon variant="light" color="gray" size="sm" onClick={(e) => { e.stopPropagation(); toggle(); }} radius="xl">
                  {opened ? <IconChevronDown size={14} /> : <IconChevronRight size={14} />}
                </ActionIcon>
              ) : (
                <Box w={28} />
              )}
              
              <ThemeIcon color={color} variant="light" radius="md" size="lg">
                <IconTarget style={{ width: rem(20), height: rem(20) }} />
              </ThemeIcon>

              <div style={{ flex: 1 }}>
                <Group justify="space-between" mb={4}>
                  <Text fw={700} size="sm" lineClamp={1}>{objective.title}</Text>
                  <Group gap={4}>
                    <Badge color={typeColors[objective.type] || 'gray'} variant="light" size="xs">
                        {typeLabels[objective.type] || 'Comum'}
                    </Badge>
                    <Badge color={color} variant="filled" size="xs">
                        {statusLabels[objective.status] || objective.status.toUpperCase()}
                    </Badge>
                  </Group>
                </Group>
                
                <Stack gap={4}>
                  <Group justify="space-between">
                    <Text size="xs" c="dimmed">Progresso Alcançado</Text>
                    <Text size="xs" fw={700} c={color}>{Math.round(objective.progress)}%</Text>
                  </Group>
                  <Progress value={objective.progress} color={color} size="xs" radius="xl" />
                </Stack>
              </div>
            </Group>
            
            <ActionIcon 
              variant="subtle" 
              color="gray" 
              radius="md"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/objective/${objective.id}`);
              }}
            >
              <IconArrowUpRight size={16} />
            </ActionIcon>
          </Group>
        </Paper>
      </motion.div>

      <AnimatePresence>
        {hasChildren && opened && (
          <Collapse in={opened}>
            <Box style={{ borderLeft: '1px dashed var(--mantine-color-gray-3)', marginLeft: rem(level * 30 + 38) }}>
              {children.map(child => (
                <TreeItem 
                   key={child.id} 
                   objective={child} 
                   allObjectives={allObjectives} 
                   level={level + 1} 
                />
              ))}
            </Box>
          </Collapse>
        )}
      </AnimatePresence>
    </Box>
  );
}

interface TreeHierarchyViewProps {
  objectives: Objective[];
}

export function TreeHierarchyView({ objectives }: TreeHierarchyViewProps) {
  const objectiveIds = new Set(objectives.map(o => o.id));
  const rootObjectives = objectives.filter(
    obj => !obj.parentObjectiveId || !objectiveIds.has(obj.parentObjectiveId)
  );

  if (objectives.length === 0) {
    return (
      <Paper p={40} withBorder radius="md" ta="center" bg="gray.0" style={{ borderStyle: 'dashed' }}>
        <Stack align="center" gap="xs">
          <ThemeIcon size={50} radius="xl" color="gray" variant="light">
            <IconChartBar size={30} />
          </ThemeIcon>
          <Text fw={700}>Mapa Vazio</Text>
          <Text size="sm" c="dimmed">Crie objetivos e alinhe-os para ver a cascata estratégica.</Text>
        </Stack>
      </Paper>
    );
  }

  return (
    <Stack gap="xs">
      {rootObjectives.map(obj => (
        <TreeItem 
          key={obj.id} 
          objective={obj} 
          allObjectives={objectives} 
          level={0} 
        />
      ))}
    </Stack>
  );
}
