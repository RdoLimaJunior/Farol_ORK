import { 
  Stack, 
  Paper, 
  Text, 
  Group, 
  Box, 
  Avatar, 
  Badge, 
  Divider, 
  Button 
} from '@mantine/core';
import { 
  IconAlertTriangle, 
  IconCalendarTime, 
  IconPaperclip 
} from '@tabler/icons-react';

interface ActionTableProps {
  actions: any[];
  onShowEvidence: (action: any) => void;
}

export function ActionTable({ actions, onShowEvidence }: ActionTableProps) {
  const sections = [
    { label: 'A FAZER / PENDENTES', status: ['todo', 'blocked'], color: 'gray', showCompletion: false },
    { label: 'FAZENDO / EM EXECUÇÃO', status: ['doing'], color: 'blue', showCompletion: false },
    { label: 'FEITO / ENTREGUE', status: ['done'], color: 'teal', showCompletion: true }
  ];

  return (
    <Stack gap="xl">
      <Divider label={<Text size="xs" fw={800} c="indigo.8" tt="uppercase">Plano de Ação e Evidências</Text>} labelPosition="left" />
      
      {sections.map((section) => (
        <Stack key={section.label} gap="xs">
          <Paper bg={`${section.color}.6`} p="xs" radius="sm">
            <Text size="xs" fw={900} c="white" tt="uppercase" px={5}>{section.label}</Text>
          </Paper>

          {actions.filter(a => section.status.includes(a.status)).map((action) => (
            <Paper 
              key={action.id} 
              withBorder 
              p="sm" 
              radius="sm" 
              bg="white" 
              shadow="none" 
              style={{ borderLeft: `4px solid var(--mantine-color-${section.color}-3)` }}
            >
              <Box style={{ 
                display: 'grid', 
                gridTemplateColumns: '2.5fr 1fr 1fr 1fr 1fr 1fr 1fr', 
                gap: '16px', 
                alignItems: 'center' 
              }}>
                <Box style={{ overflow: 'hidden' }}>
                  <Group gap="sm" wrap="nowrap">
                    {action.status === 'blocked' ? <IconAlertTriangle size={18} color="var(--mantine-color-red-6)" /> : <Box w={2} />}
                    <Text size="sm" fw={700} c={action.status === 'done' ? 'dimmed' : 'dark'} lineClamp={2}>{action.title}</Text>
                  </Group>
                </Box>

                <Group gap="xs" wrap="nowrap">
                  <Avatar size="xs" radius="xl" src={`https://i.pravatar.cc/150?u=${action.ownerId}`} />
                  <Text size="xs" fw={700}>{action.ownerId === 'user-lidia' ? 'Lidia' : 'Luciana'}</Text>
                </Group>

                <Stack gap={0}>
                  <Text size="10px" c="dimmed" fw={800} tt="uppercase">Planejado</Text>
                  <Text size="xs" fw={700}>{action.plannedDate || '15/03/24'}</Text>
                </Stack>

                <Stack gap={0}>
                  <Text size="10px" c="dimmed" fw={800} tt="uppercase">Replanejado</Text>
                  {action.replannedDate ? (
                    <Badge variant="light" color="red" size="xs">{action.replannedDate}</Badge>
                  ) : <Text size="xs" fw={700}>-</Text>}
                </Stack>

                <Stack gap={0}>
                  <Text size="10px" c="dimmed" fw={800} tt="uppercase">Duração</Text>
                  <Group gap={4} wrap="nowrap">
                    <IconCalendarTime size={12} color="gray" />
                    <Text size="xs" fw={700}>15 dias</Text>
                  </Group>
                </Stack>

                <Stack gap={0}>
                  <Text size="10px" c="dimmed" fw={800} tt="uppercase">Término</Text>
                  {section.showCompletion ? (
                    <Text size="xs" fw={700} c="teal.7">{action.completionDate || '14/03/24'}</Text>
                  ) : (
                    <Text size="xs" fw={700} c="gray.3">-</Text>
                  )}
                </Stack>

                <Group gap="xs" justify="flex-end">
                  <Button 
                    variant="light" 
                    size="compact-xs" 
                    color="blue" 
                    leftSection={<IconPaperclip size={14} />}
                    onClick={() => onShowEvidence(action)}
                  >
                    Artefatos
                  </Button>
                </Group>
              </Box>
            </Paper>
          ))}
        </Stack>
      ))}
    </Stack>
  );
}
