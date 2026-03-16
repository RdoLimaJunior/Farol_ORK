import { Paper, Title, Stack, Group, Text, Progress, Avatar, Box, rem, Skeleton, Badge, Tabs } from '@mantine/core';
import { IconTrendingUp, IconListCheck, IconActivity, IconBrain } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';
import { InitiativesTable } from './InitiativesTable';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

export function OverviewBottom({ 
    objectives, 
    activities, 
    initiatives,
    stats,
    loading 
}: { 
    objectives: any[], 
    activities: any[], 
    initiatives: any[],
    stats: any,
    loading: boolean 
}) {
  const navigate = useNavigate();
  const standardPaperStyle = {
    backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-7))',
    borderColor: 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))'
  };

  if (loading) return <Skeleton height={400} radius="lg" />;

  return (
    <Stack gap="xl">
        <Tabs defaultValue="actions" variant="pills" color="farol-blue">
            <Tabs.List mb="md">
                <Tabs.Tab value="actions" leftSection={<IconListCheck size={16} />}>Plano de Ação</Tabs.Tab>
                <Tabs.Tab value="objectives" leftSection={<IconTrendingUp size={16} />}>Mapa de Objetivos</Tabs.Tab>
                <Tabs.Tab value="analysis" leftSection={<IconBrain size={16} />}>Análise Analítica</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="actions">
                <InitiativesTable initiatives={initiatives} />
            </Tabs.Panel>

            <Tabs.Panel value="objectives">
                <Group grow align="stretch">
                    <Paper withBorder p="xl" radius="lg" style={standardPaperStyle}>
                        <Stack gap="xl">
                            <Group justify="space-between">
                                <Title order={4} style={{ letterSpacing: rem(-0.5) }}>Mapa de Objetivos</Title>
                                <Text size="xs" c="dimmed" fw={700}>{objectives.length} Ativos</Text>
                            </Group>
                            <Stack gap="xl">
                                {objectives.map((obj) => (
                                    <Paper key={obj.id} withBorder p="md" radius="md" style={{ borderColor: 'var(--mantine-color-gray-1)' }}>
                                        <Stack gap="md">
                                            <Group justify="space-between" wrap="nowrap" style={{ cursor: 'pointer' }} onClick={() => navigate(`/objective/${obj.id}`)}>
                                                <Group gap="md">
                                                    <Box style={{ 
                                                        minWidth: 42, height: 42, borderRadius: '10px', 
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        backgroundColor: `light-dark(var(--mantine-color-farol-blue-0), rgba(var(--mantine-color-farol-blue-6-rgb), 0.15))`,
                                                        color: `var(--mantine-color-farol-blue-7)`, fontWeight: 800, fontSize: '12px'
                                                    }}>
                                                        {obj.title.substring(0, 2).toUpperCase()}
                                                    </Box>
                                                    <Stack gap={2}>
                                                        <Text size="sm" fw={700} lineClamp={1}>{obj.title}</Text>
                                                        <Badge size="xs" color={obj.status === 'on_track' ? 'success' : 'warning'} variant="light">
                                                            {obj.status.replace('_', ' ')}
                                                        </Badge>
                                                    </Stack>
                                                </Group>
                                                <Box style={{ width: 100 }}>
                                                    <Text size="xs" ta="right" fw={700} mb={4}>{Math.round(obj.progress)}%</Text>
                                                    <Progress value={obj.progress} color="farol-blue" size="xs" radius="xl" />
                                                </Box>
                                            </Group>
                                            
                                            {/* Key Results View */}
                                            <Stack gap="xs" pl="54px">
                                                {obj.keyResults?.slice(0, 3).map((kr: any) => (
                                                    <Group key={kr.id} justify="space-between">
                                                        <Text size="xs" fw={500} c="dimmed">{kr.title}</Text>
                                                        <Group gap="xs">
                                                            <Box style={{ width: 60 }}>
                                                                <Progress value={kr.progress} size={2} color="success" />
                                                            </Box>
                                                            <Text size="xs" fw={700}>{Math.round(kr.progress)}%</Text>
                                                        </Group>
                                                    </Group>
                                                ))}
                                                {obj.keyResults?.length > 3 && (
                                                    <Text size="xs" c="farol-blue" fw={700} style={{ cursor: 'pointer' }} onClick={() => navigate(`/objective/${obj.id}`)}>
                                                        + {obj.keyResults.length - 3} outros Key Results
                                                    </Text>
                                                )}
                                            </Stack>
                                        </Stack>
                                    </Paper>
                                ))}
                            </Stack>
                        </Stack>
                    </Paper>

                    <Paper withBorder p="xl" radius="lg" style={standardPaperStyle}>
                        <Stack gap="xl">
                        <Group justify="space-between">
                            <Title order={4} style={{ letterSpacing: rem(-0.5) }}>Atividade Recente</Title>
                            <IconActivity size={18} color="var(--mantine-color-farol-blue-6)" />
                        </Group>
                        <Stack gap="xs">
                            {activities.map((act) => (
                            <Group key={act.id} gap="md" py="sm" style={{ borderBottom: '1px solid light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-5))' }}>
                                <Avatar radius="md" color="farol-blue" variant="light" size="md">{act.userName.substring(0, 2).toUpperCase()}</Avatar>
                                <Stack gap={0} style={{ flex: 1 }}>
                                    <Group justify="space-between">
                                        <Text size="sm" fw={700}>{act.userName}</Text>
                                        <Text size="xs" c="dimmed">{dayjs(act.timestamp).fromNow()}</Text>
                                    </Group>
                                    <Text size="xs" c="dimmed" lineClamp={1}>{act.action}</Text>
                                </Stack>
                            </Group>
                            ))}
                        </Stack>
                        </Stack>
                    </Paper>
                </Group>
            </Tabs.Panel>

            <Tabs.Panel value="analysis">
                <Paper withBorder p="xl" radius="lg" style={standardPaperStyle}>
                     <Stack gap="xl">
                        <Title order={4}>Análise Geral dos Dados</Title>
                        <Group grow>
                            <Paper withBorder p="md" radius="md">
                                <Text size="xs" fw={700} c="dimmed" tt="uppercase">Meta vs Realidade</Text>
                                <Text size="lg" fw={900}>{stats?.avgProgress}% Concluído</Text>
                                <Text size="xs" c={stats?.avgProgress > 70 ? 'success.6' : 'warning.6'} fw={500}>
                                    Progresso global da carteira
                                </Text>
                            </Paper>
                            <Paper withBorder p="md" radius="md">
                                <Text size="xs" fw={700} c="dimmed" tt="uppercase">Saúde da Carteira</Text>
                                <Text size="lg" fw={900}>{stats?.atRisk + stats?.offTrack} em Risco/Atraso</Text>
                                <Text size="xs" c={stats?.atRisk + stats?.offTrack > 0 ? "error.6" : "success.6"} fw={500}>
                                    De {stats?.totalObjectives} objetivos ativos
                                </Text>
                            </Paper>
                            <Paper withBorder p="md" radius="md">
                                <Text size="xs" fw={700} c="dimmed" tt="uppercase">Principal Gargalo</Text>
                                <Text size="lg" fw={900}>{stats?.actions?.blocked || 0} Ações Impedidas</Text>
                                <Text size="xs" c="dimmed">{stats?.actions?.completionRate}% do plano executado</Text>
                            </Paper>
                        </Group>
                        <Text size="sm">Com base nos dados em tempo real, {stats?.offTrack > 0 ? `há ${stats.offTrack} meta(s) com atraso crítico que requerem intervenção imediata.` : 'a carteira encontra-se com boa estabilidade, nenhuma meta em atraso grave.'} Atualmente, {stats?.actions?.inProgress} iniciativas estão em andamento para impulsionar os resultados.</Text>
                     </Stack>
                </Paper>
            </Tabs.Panel>
        </Tabs>
    </Stack>
  );
}
