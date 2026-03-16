import { 
  Container, 
  Title, 
  Text, 
  Group, 
  Stack, 
  Progress, 
  Badge, 
  Paper, 
  Table, 
  Divider, 
  Button, 
  rem,
  Box,
  Skeleton,
  Modal
} from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconPlus, IconTrendingUp } from '@tabler/icons-react';
import { useObjectives } from '../../application/hooks/useObjectives';
import { useKeyResults } from '../../application/hooks/useKeyResults';
import { useOkrCalculation } from '../../application/hooks/useOkrCalculation';
import { useEffect, useMemo, useState } from 'react';
import { RadarHealthChart } from '../components/RadarHealthChart';
import { Grid } from '@mantine/core';
import { motion } from 'framer-motion';
import { CheckInModal } from '../components/CheckInModal';
import { ObjectiveForm } from '../components/ObjectiveForm';

export default function OkrDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { objectives, fetchObjectives, updateObjective, loading: objLoading } = useObjectives();
  const { keyResults, fetchKRs, loading: krLoading } = useKeyResults(id);
  const [editOpened, setEditOpened] = useState(false);
  
  const [checkInOpened, setCheckInOpened] = useState(false);
  const [selectedKR, setSelectedKR] = useState<any>(null);

  const { enrichedObjectives, enrichedKRs } = useOkrCalculation(objectives, keyResults);
  const objective = enrichedObjectives.find((obj: any) => obj.id === id);

  useEffect(() => {
    fetchObjectives();
    fetchKRs();
  }, [fetchObjectives, fetchKRs]);

  const healthData = useMemo(() => {
    if (!objective) return [];
    
    return [
      { dimension: 'Progresso', score: objective.progress, fullMark: 100 },
      { dimension: 'Confiança', score: objective.status === 'on_track' ? 100 : objective.status === 'at_risk' ? 60 : 30, fullMark: 100 },
      { dimension: 'Engajamento', score: 85, fullMark: 100 },
      { dimension: 'Alinhamento', score: objective.parentObjectiveId ? 100 : 40, fullMark: 100 },
      { dimension: 'Qualidade', score: (objective.description ? 50 : 0) + (keyResults.length >= 2 ? 50 : 25), fullMark: 100 },
    ];
  }, [objective, keyResults.length]);

  const handleCheckIn = (kr: any) => {
    setSelectedKR(kr);
    setCheckInOpened(true);
  };

  const onCheckInSuccess = () => {
    fetchObjectives();
    fetchKRs();
  };

  const handleEditSubmit = async (values: any) => {
    if (id) {
        await updateObjective(id, values);
        setEditOpened(false);
    }
  };

  if (objLoading && !objective) {
    return (
      <Container size="lg" py="xl">
        <Stack gap="xl">
          <Skeleton height={40} width={200} />
          <Grid>
            <Grid.Col span={7}><Skeleton height={300} /></Grid.Col>
            <Grid.Col span={5}><Skeleton height={300} /></Grid.Col>
          </Grid>
        </Stack>
      </Container>
    );
  }

  if (!objective) return <Container p="xl"><Text>Objetivo não encontrado.</Text></Container>;

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <Button 
            variant="subtle" 
            leftSection={<IconArrowLeft size={16} />} 
            onClick={() => navigate('/')}
            color="gray"
          >
            Voltar ao Dashboard
          </Button>
          <Group>
            <Button variant="light" color="farol-blue" radius="md" onClick={() => setEditOpened(true)}>Editar Objetivo</Button>
            <Button leftSection={<IconPlus size={16} />} radius="md" color="farol-blue">Novo KR</Button>
          </Group>
        </Group>

        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack gap="xl">
              <Paper withBorder p="xl" radius="md" style={{ 
                position: 'relative', 
                overflow: 'hidden'
              }}>
                <Box style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '4px', 
                    background: `var(--mantine-color-${objective.status === 'on_track' ? 'success' : objective.status === 'at_risk' ? 'warning' : 'error'}-6)` 
                }} />
                
                <Group justify="space-between" align="flex-start">
                  <Stack gap="xs" style={{ flex: 1 }}>
                    <Badge size="lg" color={objective.status === 'on_track' ? 'success' : objective.status === 'at_risk' ? 'warning' : 'error'} variant="light">
                      {objective.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <Title order={2} fw={900}>{objective.title}</Title>
                    <Text c="dimmed" size="sm" fw={500}>{objective.description}</Text>
                  </Stack>
                  
                  <Stack align="center" gap={0}>
                    <Text fw={900} size={rem(48)} c="farol-blue.6" style={{ lineHeight: 1 }}>
                      {Math.round(objective.progress)}%
                    </Text>
                    <Text size="xs" c="dimmed" fw={800} tt="uppercase" style={{ letterSpacing: rem(1) }}>Progresso Geral</Text>
                  </Stack>
                </Group>
                <Progress 
                  value={objective.progress} 
                  mt="xl" 
                  size="xl" 
                  radius="xl" 
                  color="farol-blue"
                  animated 
                />
              </Paper>

              <Title order={3}>Key Results</Title>
              <Stack gap="md">
                {enrichedKRs.map((kr: any) => (
                  <Paper key={kr.id} withBorder p="md" radius="md">
                    <Group justify="space-between">
                      <Stack gap={4} style={{ flex: 1 }}>
                        <Text fw={700}>{kr.title}</Text>
                        <Group gap="xs">
                          <Progress 
                            value={kr.progress} 
                            style={{ flex: 1 }} 
                            color={kr.status === 'on_track' ? 'green' : kr.status === 'at_risk' ? 'orange' : 'red'} 
                          />
                          <Text size="sm" fw={700}>{Math.round(kr.progress)}%</Text>
                        </Group>
                        <Group justify="space-between">
                          <Text size="xs" c="dimmed">Início: {kr.startValue}</Text>
                          <Text size="xs" c="dimmed">Atual: {kr.currentValue}</Text>
                          <Text size="xs" fw={700}>Meta: {kr.targetValue}</Text>
                        </Group>
                      </Stack>
                      
                      <Button 
                        variant="light" 
                        size="sm" 
                        leftSection={<IconTrendingUp size={14} />}
                        onClick={() => handleCheckIn(kr)}
                        loading={krLoading}
                      >
                        Check-in
                      </Button>
                    </Group>
                  </Paper>
                ))}
              </Stack>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <RadarHealthChart data={healthData} />
            </motion.div>
          </Grid.Col>
        </Grid>

        <Divider label="Histórico de Atualizações" labelPosition="center" />
        
        <Table verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Data</Table.Th>
              <Table.Th>Responsável</Table.Th>
              <Table.Th>Alteração</Table.Th>
              <Table.Th>Confiança</Table.Th>
              <Table.Th>Comentário</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
             {/* Histórico virá do banco na próxima iteração */}
             <Table.Tr>
               <Table.Td colSpan={5} align="center">
                 <Text size="sm" c="dimmed">Carregando histórico detalhado...</Text>
               </Table.Td>
             </Table.Tr>
          </Table.Tbody>
        </Table>
      </Stack>

      {selectedKR && (
        <CheckInModal 
          opened={checkInOpened}
          onClose={() => setCheckInOpened(false)}
          kr={selectedKR}
          onSuccess={onCheckInSuccess}
        />
      )}

      <Modal 
        opened={editOpened} 
        onClose={() => setEditOpened(false)} 
        title={<Title order={4}>Editar Objetivo Estratégico</Title>}
        size="lg"
        radius="md"
      >
        <ObjectiveForm 
          initialValues={objective} 
          onSubmit={handleEditSubmit} 
          loading={objLoading} 
          parentObjectives={objectives.filter((o: any) => o.id !== id && !o.parentObjectiveId).map((o: any) => ({ value: o.id, label: o.title }))}
        />
      </Modal>

    </Container>
  );
}
