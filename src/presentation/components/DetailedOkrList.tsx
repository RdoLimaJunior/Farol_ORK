import { 
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
  ThemeIcon,
  Divider,
  Tooltip
} from '@mantine/core';
import { 
  IconSearch, 
  IconEdit, 
  IconChevronDown, 
  IconChevronRight, 
  IconTrophy,
  IconActivity,
  IconPlus
} from '@tabler/icons-react';
import { useState } from 'react';

interface DetailedOkrListProps {
  objectives: any[];
  onAddObjective: () => void;
}

const confidenceColors: Record<string, string> = {
  high: 'green',
  medium: 'yellow',
  low: 'red'
};

export function DetailedOkrList({ objectives }: DetailedOkrListProps) {
  const [searchValue, setSearchValue] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [expandedKr, setExpandedKr] = useState<string | null>(null);

  const filteredObjectives = objectives.filter(obj => {
    const matchesSearch = obj.title.toLowerCase().includes(searchValue.toLowerCase());
    const matchesLevel = levelFilter === 'all' || obj.level === levelFilter || (levelFilter === 'EST' && obj.level === 'organizational') || (levelFilter === 'TÁT' && obj.level === 'departmental');
    return matchesSearch && matchesLevel;
  });

  return (
    <Stack gap="md">
      {/* FILTERS (METODOLOGIA 5.2) */}
      <Group gap="md">
        <TextInput 
          placeholder="Filtrar por nome, ID ou dono..." 
          leftSection={<IconSearch size={16} />}
          style={{ flex: 1 }}
          radius="md"
          size="sm"
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
        />
        <SegmentedControl 
          size="xs"
          data={[
            { label: 'Todos', value: 'all' },
            { label: 'EST', value: 'EST' },
            { label: 'TÁT', value: 'TÁT' },
            { label: 'IND', value: 'individual' },
          ]}
          value={levelFilter}
          onChange={setLevelFilter}
          radius="md"
        />
      </Group>

      <Box>
        <Accordion 
          variant="separated" 
          radius="md" 
          chevronPosition="right"
          styles={{
            item: { 
              backgroundColor: 'var(--mantine-color-body)', 
              border: '1px solid var(--mantine-color-default-border)',
              marginBottom: rem(8)
            },
            control: { padding: `${rem(12)} ${rem(16)}` },
            content: { padding: 0 }
          }}
        >
          {filteredObjectives.map((obj) => (
            <Accordion.Item key={obj.id} value={obj.id}>
              <Accordion.Control>
                <Group justify="space-between" wrap="nowrap">
                  <Group gap="sm">
                    <Badge color="blue" variant="light" size="sm" radius="sm" style={{ textTransform: 'none' }}>
                       OBJ-{obj.id}
                    </Badge>
                    <Text fw={700} size="sm" lineClamp={1} style={{ maxWidth: rem(400) }}>{obj.title}</Text>
                  </Group>
                  <Group gap="xl">
                    {/* TRÊS ESFERAS E SAÚDE (METODOLOGIA) */}
                    <Group gap="xs" visibleFrom="md">
                      <Tooltip label="Adesão aos Ritos (Cadência)">
                        <Stack gap={0} align="center">
                          <Text size="9px" fw={800} c="dimmed">ADESÃO</Text>
                          <Badge variant="light" color="blue" size="xs">98%</Badge>
                        </Stack>
                      </Tooltip>
                      <Tooltip label="Saúde do Time (Clima e-NPS)">
                        <Stack gap={0} align="center">
                          <Text size="9px" fw={800} c="dimmed">CLIMA</Text>
                          <ThemeIcon variant="transparent" color="green" size="sm">
                             <IconActivity size={14} />
                          </ThemeIcon>
                        </Stack>
                      </Tooltip>
                    </Group>

                    <Divider orientation="vertical" h={20} />

                    {/* MATURIDADE (SEÇÃO 6) */}
                    <Group gap={4} visibleFrom="sm" align="center">
                       <Stack gap={0}>
                         <Group gap={4} wrap="nowrap">
                            <IconTrophy size={14} color="var(--mantine-color-yellow-6)" />
                            <Text size="xs" fw={800}>OURO</Text>
                         </Group>
                         <Text size="9px" c="dimmed" fw={800} style={{ letterSpacing: 0.5 }}>MATURIDADE</Text>
                       </Stack>
                    </Group>

                    <Divider orientation="vertical" h={20} />

                    <Group gap={4}>
                       <Progress value={obj.progress} color="blue" size="xs" radius="xl" style={{ width: rem(60) }} />
                       <Text size="xs" fw={800} minWidth={35}>{Math.round(obj.progress)}%</Text>
                    </Group>

                    <Group gap={8}>
                       <Button variant="light" size="compact-xs" color="blue" radius="sm">+ KR</Button>
                       <ActionIcon variant="transparent" color="gray" size="sm"><IconEdit size={16} /></ActionIcon>
                    </Group>
                  </Group>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Box p="xs">
                   <Table verticalSpacing={4} horizontalSpacing="sm">
                       <Table.Thead>
                          <Table.Tr>
                             <Table.Th style={{ fontSize: rem(10), color: 'var(--mantine-color-gray-6)' }}>ID / RESULTADO-CHAVE</Table.Th>
                             <Table.Th style={{ fontSize: rem(10), color: 'var(--mantine-color-gray-6)' }}>DONO</Table.Th>
                             <Table.Th style={{ fontSize: rem(10), color: 'var(--mantine-color-gray-6)' }}>ATUAL / META</Table.Th>
                             <Table.Th style={{ fontSize: rem(10), color: 'var(--mantine-color-gray-6)' }}>PROGRESSO</Table.Th>
                             <Table.Th style={{ fontSize: rem(10), color: 'var(--mantine-color-gray-6)' }}>CONFIANÇA</Table.Th>
                             <Table.Th style={{ fontSize: rem(10), color: 'var(--mantine-color-gray-6)' }}>EVIDÊNCIA</Table.Th>
                             <Table.Th />
                          </Table.Tr>
                       </Table.Thead>
                       <Table.Tbody>
                         {obj.keyResults?.map((kr: any) => (
                            <Table.Tr key={kr.id} style={{ cursor: 'pointer' }}>
                               <Table.Td>
                                  <Stack gap={0}>
                                     <Text size="10px" fw={800} c="blue.7">KR-{kr.id}</Text>
                                     <Text size="xs" fw={700} lineClamp={1}>{kr.title}</Text>
                                  </Stack>
                               </Table.Td>
                               <Table.Td><Text size="xs" c="dimmed">Lima Júnior</Text></Table.Td>
                               <Table.Td><Text size="xs" fw={800}>{kr.currentValue} / {kr.targetValue}</Text></Table.Td>
                               <Table.Td>
                                 <Group gap="xs" wrap="nowrap">
                                    <Progress value={kr.progress} color="blue" size="xs" radius="xl" style={{ width: rem(50) }} />
                                    <Text size="xs" fw={800}>{Math.round(kr.progress)}%</Text>
                                 </Group>
                               </Table.Td>
                               <Table.Td>
                                  <Badge color={confidenceColors.high} variant="dot" size="sm">Alta (9/10)</Badge>
                                </Table.Td>
                               <Table.Td>
                                  <ActionIcon variant="light" color="gray" size="sm" title="Ver Artefato / Prova de Resultado (Metodologia 8.104)">
                                     <IconPlus size={14} />
                                  </ActionIcon>
                               </Table.Td>
                               <Table.Td>
                                  <Group gap="xs">
                                     <Button variant="light" size="compact-xs" color="blue">Check-in</Button>
                                     <ActionIcon 
                                        variant="transparent" 
                                        color="blue" 
                                        size="sm" 
                                        onClick={() => setExpandedKr(expandedKr === kr.id ? null : kr.id)}
                                      >
                                        {expandedKr === kr.id ? <IconChevronDown size={14} /> : <IconChevronRight size={14} />}
                                     </ActionIcon>
                                  </Group>
                               </Table.Td>
                            </Table.Tr>
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
