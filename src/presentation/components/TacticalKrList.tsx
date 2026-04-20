import { 
  Table, 
  Text, 
  Group, 
  Stack, 
  Progress, 
  Badge, 
  ActionIcon, 
  Box, 
  rem, 
  Avatar, 
  Menu, 
  Button,
  TextInput,
  Paper,
  Tooltip,
  Divider
} from '@mantine/core';
import { 
  IconSearch, 
  IconPlus, 
  IconDotsVertical, 
  IconFileDescription, 
  IconHistory, 
  IconAlertTriangle,
  IconTarget,
  IconTrendingUp,
  IconExclamationMark,
  IconArrowUpRight,
  IconChecklist
} from '@tabler/icons-react';
import { useState, useMemo } from 'react';

interface TacticalKrListProps {
  objectives: any[];
}

export function TacticalKrList({ objectives }: TacticalKrListProps) {
  const [searchValue, setSearchValue] = useState('');

  // Planificar e agrupar KRs por objetivo
  const groupedData = useMemo(() => {
    const data: Record<string, any> = {};
    
    objectives.forEach(obj => {
      const krs = (obj.keyResults || []).filter((kr: any) => 
        kr.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        obj.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      
      if (krs.length > 0) {
        data[obj.id] = {
          objectiveTitle: obj.title,
          objectiveProgress: obj.progress,
          adhesionPercentage: obj.adhesionPercentage,
          climateStatus: obj.climateStatus,
          maturityLevel: obj.maturityLevel,
          krs: krs
        };
      }
    });
    
    return data;
  }, [objectives, searchValue]);

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'on_track': return { color: 'success', label: 'BOM', icon: IconTrendingUp };
      case 'at_risk': return { color: 'orange', label: 'ATENÇÃO', icon: IconAlertTriangle };
      case 'off_track': return { color: 'red', label: 'EM RISCO', icon: IconExclamationMark };
      default: return { color: 'gray', label: 'STATUS', icon: IconTarget };
    }
  };

  const getConfidenceData = (conf?: string) => {
    switch(conf?.toLowerCase()) {
      case 'alta': return { color: 'success', label: 'Alta' };
      case 'media': return { color: 'orange', label: 'Média' };
      case 'baixa': return { color: 'red', label: 'Baixa' };
      default: return { color: 'gray', label: '- -' };
    }
  };

  return (
    <Stack gap="xl">
      {/* FILTROS INTEGRADOS */}
      <Group justify="space-between" bg="white" p="md" radius="md" style={{ border: '1px solid var(--mantine-color-gray-2)' }}>
        <TextInput 
          placeholder="Pesquisar por KR ou Objetivo..." 
          leftSection={<IconSearch size={18} color="var(--mantine-color-gray-5)" />}
          style={{ flex: 1 }}
          variant="unstyled"
          size="md"
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          styles={{ input: { fontWeight: 500 } }}
        />
        <Group gap="sm">
           <Button variant="light" color="gray" radius="md">Download Relatório</Button>
           <Button color="success" radius="md" leftSection={<IconPlus size={18} />}>Novo KR</Button>
        </Group>
      </Group>

      {/* LISTAGEM AGRUPADA */}
      <Stack gap="xxl">
        {Object.keys(groupedData).length > 0 ? (
          Object.entries(groupedData).map(([objId, group]: [string, any]) => (
            <Box key={objId}>
              {/* SUB-HEADER DISCRETO DO OBJETIVO */}
              <Group justify="space-between" mb="xs" px="md">
                <Group gap="xs">
                   <IconTarget size={14} color="var(--mantine-color-gray-5)" />
                   <Text size="xs" fw={800} c="dimmed" tt="uppercase" style={{ letterSpacing: rem(1) }}>
                     Objetivo: {group.objectiveTitle}
                   </Text>
                   <Badge size="xs" color="gray" variant="light">{Math.round(group.objectiveProgress)}%</Badge>
                   
                   <Divider orientation="vertical" h={12} mx={4} />
                   
                   <Tooltip label="Adesão">
                     <Badge size="10px" color="blue" variant="light" radius="xs">{group.adhesionPercentage || 100}%</Badge>
                   </Tooltip>
                   <Box style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: `var(--mantine-color-${group.climateStatus || 'success'}-5)` }} />
                   <Text size="10px" fw={800} c="dimmed" tt="uppercase">{group.maturityLevel || 'BRONZE'}</Text>
                </Group>
                <Divider style={{ flex: 1 }} color="gray.1" />
              </Group>

              {/* TABELA DE KRs DESTE OBJETIVO */}
              <Paper withBorder radius="md" style={{ overflow: 'hidden', borderTop: 'none' }} shadow="xs">
                <Table verticalSpacing="md" horizontalSpacing="xl" highlightOnHover>
                  <Table.Thead bg="success.0">
                    <Table.Tr>
                      <Table.Th style={{ fontSize: rem(10), color: 'var(--mantine-color-success-9)', width: rem(400) }}>RESULTADO-CHAVE (KR)</Table.Th>
                      <Table.Th style={{ fontSize: rem(10), color: 'var(--mantine-color-success-9)' }}>DONO</Table.Th>
                      <Table.Th style={{ fontSize: rem(10), color: 'var(--mantine-color-success-9)' }}>PROCESSO / META</Table.Th>
                      <Table.Th style={{ fontSize: rem(10), color: 'var(--mantine-color-success-9)', width: rem(200) }}>ATINGIMENTO</Table.Th>
                      <Table.Th style={{ fontSize: rem(10), color: 'var(--mantine-color-success-9)' }}>CONFIANÇA</Table.Th>
                      <Table.Th style={{ fontSize: rem(10), color: 'var(--mantine-color-success-9)' }}>GESTÃO</Table.Th>
                      <Table.Th />
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {group.krs.map((kr: any) => {
                      const status = getStatusConfig(kr.status);
                      const conf = getConfidenceData(kr.confidence);
                      
                      return (
                        <Table.Tr key={kr.id}>
                          <Table.Td>
                            <Stack gap={2}>
                              <Group gap="xs">
                                <Badge variant="filled" color="success" size="xs" radius="xs">KR-{kr.id}</Badge>
                                <Text fw={900} size="sm" c="success.9">{kr.title}</Text>
                              </Group>
                              <Text size="10px" c="dimmed" fw={700} ml={rem(45)}>Unidade: {kr.unit}</Text>
                            </Stack>
                          </Table.Td>

                          <Table.Td>
                            <Group gap="xs">
                              <Avatar size="sm" radius="md" src={`https://i.pravatar.cc/150?u=${kr.ownerId}`} />
                              <Stack gap={0}>
                                <Text size="xs" fw={700}>{kr.ownerName || 'Membro'}</Text>
                                <Text size="10px" c="dimmed" fw={600}>Gestor</Text>
                              </Stack>
                            </Group>
                          </Table.Td>

                          <Table.Td>
                            <Stack gap={0}>
                               <Group gap={4}>
                                  <Text size="md" fw={900} c="success.8">{kr.currentValue}</Text>
                                  <Text size="xs" fw={800} c="dimmed">/ {kr.targetValue}</Text>
                               </Group>
                            </Stack>
                          </Table.Td>

                          <Table.Td>
                            <Stack gap={4}>
                               <Group justify="space-between" mb={-4}>
                                 <Text size="xs" fw={900} c="success.9">{Math.round(kr.progress)}%</Text>
                                 <IconTrendingUp size={12} color="var(--mantine-color-success-6)" />
                               </Group>
                               <Progress 
                                 value={kr.progress} 
                                 color="success.5" 
                                 size="sm" 
                                 radius="xl" 
                                 striped={kr.status !== 'on_track'}
                               />
                            </Stack>
                          </Table.Td>

                          <Table.Td>
                            <Badge 
                              color={conf.color} 
                              variant="light" 
                              size="sm" 
                              radius="sm" 
                              leftSection={<Box style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: `var(--mantine-color-${conf.color}-6)` }} />}
                            >
                               {conf.label}
                            </Badge>
                          </Table.Td>

                          <Table.Td>
                            <Group gap="xs">
                              <Tooltip label="FCA / Análise de Desvio">
                                <ActionIcon variant="light" color={kr.status === 'on_track' ? 'gray' : 'red'} size="md" radius="md">
                                  <IconExclamationMark size={18} />
                                </ActionIcon>
                              </Tooltip>
                              <Tooltip label="Evidências de Resultado">
                                <ActionIcon variant="light" color="gray" size="md" radius="md">
                                  <IconFileDescription size={18} />
                                </ActionIcon>
                              </Tooltip>
                            </Group>
                          </Table.Td>

                          <Table.Td>
                            <Menu shadow="xl" width={220} position="bottom-end" radius="md">
                              <Menu.Target>
                                <ActionIcon variant="subtle" color="gray">
                                  <IconDotsVertical size={18} />
                                </ActionIcon>
                              </Menu.Target>

                              <Menu.Dropdown>
                                <Menu.Label>Ações Táticas</Menu.Label>
                                <Menu.Item leftSection={<IconArrowUpRight size={16} color="var(--mantine-color-success-6)" />}>Check-in de Valor</Menu.Item>
                                <Menu.Item leftSection={<IconChecklist size={16} />}>Vincular Projeto</Menu.Item>
                                <Menu.Item leftSection={<IconHistory size={16} />}>Timeline de Mudanças</Menu.Item>
                                <Menu.Divider />
                                <Menu.Item color="red" leftSection={<IconExclamationMark size={16} />}>Declarar Risco Crítico</Menu.Item>
                              </Menu.Dropdown>
                            </Menu>
                          </Table.Td>
                        </Table.Tr>
                      );
                    })}
                  </Table.Tbody>
                </Table>
              </Paper>
            </Box>
          ))
        ) : (
          <Paper p="xl" withBorder style={{ borderStyle: 'dashed', textAlign: 'center' }}>
            <Text c="dimmed">Nenhum Key Result encontrado com os critérios de busca.</Text>
          </Paper>
        )}
      </Stack>
    </Stack>
  );
}
