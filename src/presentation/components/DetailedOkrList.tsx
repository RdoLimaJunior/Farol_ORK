import { 
  Paper, 
  Text, 
  Group, 
  Stack, 
  Box, 
  TextInput, 
  SegmentedControl, 
  Button, 
  Accordion, 
  Badge, 
  Progress, 
  ActionIcon,
  rem,
  Table,
  Collapse,
  ThemeIcon
} from '@mantine/core';
import { 
  IconSearch, 
  IconPlus, 
  IconEdit, 
  IconTrash, 
  IconChevronDown, 
  IconChevronRight, 
  IconReload,
  IconTrophy,
  IconChecks
} from '@tabler/icons-react';
import { useState } from 'react';
import { KeyResultDetailView } from './KeyResultDetailView';

interface DetailedOkrListProps {
  objectives: any[];
  onAddObjective: () => void;
}

const levelShortLabels: Record<string, string> = {
  organizational: 'EST',
  departmental: 'TÁT',
  operational: 'OPE',
  individual: 'IND'
};

const levelFullLabels: Record<string, string> = {
  organizational: 'Estratégico',
  departmental: 'Tático',
  operational: 'Operacional',
  individual: 'Individual'
};

const confidenceColors: Record<string, string> = {
  high: 'green',
  medium: 'yellow',
  low: 'red'
};

export function DetailedOkrList({ objectives, onAddObjective }: DetailedOkrListProps) {
  const [searchValue, setSearchValue] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [expandedKr, setExpandedKr] = useState<string | null>(null);

  const filteredObjectives = objectives.filter(obj => {
    const matchesSearch = obj.title.toLowerCase().includes(searchValue.toLowerCase());
    const matchesLevel = levelFilter === 'all' || levelShortLabels[obj.level] === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const totalObjectives = objectives.length;
  const totalKRs = objectives.reduce((acc, obj) => acc + (obj.keyResults?.length || 0), 0);

  return (
    <Stack gap="xl">
      {/* HEADER STATS */}
      <Group justify="space-between" align="flex-start">
        <Stack gap={2}>
          <Group gap="xs">
            <ThemeIcon color="blue" variant="light" radius="xl">
               <IconTrophy size={20} />
            </ThemeIcon>
            <Text size="xl" fw={800}>Objetivos</Text>
          </Group>
          <Text size="sm" c="dimmed">
            Projeto da empresa Z • <Text span fw={700} c="dark">{totalObjectives} objetivo(s)</Text> • <Text span fw={700} c="dark">{totalKRs} KR(s)</Text>
          </Text>
        </Stack>
        <Button 
          leftSection={<IconPlus size={18} />} 
          size="md" 
          radius="md" 
          color="blue"
          onClick={onAddObjective}
          style={{ boxShadow: '0 8px 15px rgba(34, 139, 230, 0.3)' }}
        >
          Novo Objetivo
        </Button>
      </Group>

      {/* FILTERS */}
      <Paper withBorder p="xs" radius="md" bg="var(--mantine-color-gray-0)">
        <Group gap="md">
          <TextInput 
            placeholder="Buscar por ID, descrição, owner..." 
            leftSection={<IconSearch size={18} />}
            style={{ flex: 1 }}
            variant="unstyled"
            px="md"
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
          />
          <SegmentedControl 
            data={[
              { label: 'Todos', value: 'all' },
              { label: 'EST', value: 'EST' },
              { label: 'TÁT', value: 'TÁT' },
              { label: 'OPE', value: 'OPE' },
            ]}
            value={levelFilter}
            onChange={setLevelFilter}
            radius="md"
            transitionDuration={200}
          />
          <ActionIcon variant="subtle" color="gray" radius="md" size="lg">
             <IconReload size={18} />
          </ActionIcon>
        </Group>
      </Paper>

      <Box>
        <Text fw={700} size="xs" c="dimmed" mb="md" style={{ letterSpacing: rem(1) }}>
          OBJETIVOS ESTRATÉGICOS
        </Text>

        <Accordion 
          variant="separated" 
          radius="md" 
          chevronPosition="left"
          styles={{
            item: { backgroundColor: 'white', border: '1px solid var(--mantine-color-gray-2)' },
            control: { paddingRight: rem(20) },
          }}
        >
          {filteredObjectives.map((obj) => (
            <Accordion.Item key={obj.id} value={obj.id}>
              <Accordion.Control>
                <Group justify="space-between" wrap="nowrap">
                  <Group gap="md">
                    <Badge color="violet" variant="light" size="lg" radius="sm">
                       {levelFullLabels[obj.level]}
                    </Badge>
                    <Text size="xs" c="dimmed" fw={700}>OE10</Text>
                    <Text fw={700} size="sm" lineClamp={1}>{obj.title}</Text>
                  </Group>
                  <Group gap="xl">
                    <Box style={{ width: rem(100) }}>
                       <Group justify="space-between" mb={2}>
                          <Progress value={obj.progress} color="blue" size="xs" radius="xl" style={{ flex: 1, marginRight: 8 }} />
                          <Text size="xs" fw={700} c="dimmed">{Math.round(obj.progress)}%</Text>
                       </Group>
                    </Box>
                    <Text size="xs" c="dimmed" fw={700}>{obj.keyResults?.length || 0} KR(S)</Text>
                    <Group gap={8}>
                       <Button variant="light" size="compact-xs" color="blue" radius="sm">+ KR</Button>
                       <ActionIcon variant="transparent" color="gray" size="sm"><IconEdit size={16} /></ActionIcon>
                       <ActionIcon variant="transparent" color="gray" size="sm"><IconTrash size={16} /></ActionIcon>
                    </Group>
                  </Group>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Box p="xs">
                   <Table verticalSpacing="sm">
                      <Table.Thead>
                         <Table.Tr>
                            <Table.Th style={{ fontSize: rem(11), color: 'var(--mantine-color-gray-6)' }}>ID</Table.Th>
                            <Table.Th style={{ fontSize: rem(11), color: 'var(--mantine-color-gray-6)' }}>DESCRIÇÃO</Table.Th>
                            <Table.Th style={{ fontSize: rem(11), color: 'var(--mantine-color-gray-6)' }}>OWNER</Table.Th>
                            <Table.Th style={{ fontSize: rem(11), color: 'var(--mantine-color-gray-6)' }}>ATUAL / META</Table.Th>
                            <Table.Th style={{ fontSize: rem(11), color: 'var(--mantine-color-gray-6)' }}>PROGRESSO</Table.Th>
                            <Table.Th style={{ fontSize: rem(11), color: 'var(--mantine-color-gray-6)' }}>CONF.</Table.Th>
                            <Table.Th />
                         </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {obj.keyResults?.map((kr: any) => (
                           <>
                             <Table.Tr key={kr.id} style={{ cursor: 'pointer' }} onClick={() => setExpandedKr(expandedKr === kr.id ? null : kr.id)}>
                               <Table.Td><Text size="xs" fw={700} c="blue.7">OE10KR1</Text></Table.Td>
                               <Table.Td><Text size="xs" fw={700}>{kr.title}</Text></Table.Td>
                               <Table.Td><Text size="xs" c="dimmed">Lima Júnior</Text></Table.Td>
                               <Table.Td><Text size="xs" fw={700}>{kr.currentValue} / {kr.targetValue} {kr.unit === 'percentage' ? '%' : kr.unit}</Text></Table.Td>
                               <Table.Td>
                                 <Group gap="xs" wrap="nowrap">
                                    <Progress value={kr.progress} color="blue" size="xs" radius="xl" style={{ width: rem(60) }} />
                                    <Text size="xs" fw={700} c="dimmed">{Math.round(kr.progress)}%</Text>
                                 </Group>
                               </Table.Td>
                               <Table.Td>
                                  <Badge color={confidenceColors.high} variant="light" size="sm">
                                     Alta
                                  </Badge>
                               </Table.Td>
                               <Table.Td>
                                  <Group gap="xs">
                                     <Button variant="light" size="compact-xs" color="blue" leftSection={<IconChecks size={14}/>}>Check-in</Button>
                                     <ActionIcon variant="transparent" color="blue">
                                        {expandedKr === kr.id ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
                                     </ActionIcon>
                                  </Group>
                               </Table.Td>
                             </Table.Tr>
                             <Table.Tr>
                                <Table.Td colSpan={7} p={0}>
                                   <Collapse in={expandedKr === kr.id}>
                                      <Box bg="var(--mantine-color-gray-0)" p="xl" style={{ borderRadius: rem(8), margin: rem(10) }}>
                                         <KeyResultDetailView 
                                            krId={kr.id}
                                            startValue={kr.startValue}
                                            currentValue={kr.currentValue}
                                            targetValue={kr.targetValue}
                                            unit={kr.unit}
                                         />
                                      </Box>
                                   </Collapse>
                                </Table.Td>
                             </Table.Tr>
                           </>
                        ))}
                      </Table.Tbody>
                   </Table>
                </Box>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Box>
    </Stack>
  );
}
