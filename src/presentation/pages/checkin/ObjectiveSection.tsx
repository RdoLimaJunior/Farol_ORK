import { 
  Box, 
  Paper, 
  Group, 
  Stack, 
  Text, 
  Title, 
  Avatar, 
  Badge, 
  SimpleGrid, 
  Divider, 
  rem 
} from '@mantine/core';
import { DonutChart } from '@mantine/charts';
import { 
  IconChevronRight, 
  IconTarget, 
  IconBriefcase, 
  IconListCheck,
  IconAlertTriangle, 
  IconShieldCheck, 
  IconArrowUpRight
} from '@tabler/icons-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KRCard } from './KRCard';

interface ObjectiveSectionProps {
  obj: any;
  krs: any[];
  initiatives: any[];
  getActionsForInitiative: (id: string) => any[];
  onShowEvidence: (action: any) => void;
  getConfidenceData: (conf: string) => { color: string; label: string };
  isPresentation?: boolean;
}


export function ObjectiveSection({ 
  obj, 
  krs, 
  initiatives, 
  getActionsForInitiative, 
  onShowEvidence, 
  getConfidenceData,
  isPresentation = false
}: ObjectiveSectionProps) {

  const [opened, setOpened] = useState(true);
  const [isStuck, setIsStuck] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // CÁLCULOS DINÂMICOS PARA O RESUMO
  const allActions = initiatives.flatMap(i => getActionsForInitiative(i.id));
  const actionStats = {
    done: allActions.filter(a => a.status === 'done').length,
    doing: allActions.filter(a => a.status === 'doing').length,
    todo: allActions.filter(a => a.status === 'todo').length,
    overdue: allActions.filter(a => a.status === 'overdue' || a.isOverdue).length,
    blocked: allActions.filter(a => a.status === 'blocked').length,
    cancelled: allActions.filter(a => a.status === 'cancelled').length,
  };
  const fcaCount = krs.filter(k => k.status === 'at_risk' || k.status === 'off_track').length;

  // DATA PARA OS GRÁFICOS
  const krChartData = [
    { name: 'On Track', value: krs.filter(k => k.status === 'on_track').length, color: 'teal.6' },
    { name: 'Atenção', value: krs.filter(k => k.status === 'at_risk').length, color: 'orange.6' },
    { name: 'Em Risco', value: krs.filter(k => k.status === 'off_track').length, color: 'red.6' },
  ];

  const avgProgress = initiatives.length > 0 
    ? Math.round(initiatives.reduce((acc, i) => acc + i.progress, 0) / initiatives.length) 
    : 0;

  const projectChartData = [
    { name: 'Progresso', value: avgProgress, color: 'indigo.6' },
    { name: 'Restante', value: 100 - avgProgress, color: 'gray.1' },
  ];

  const actionsChartData = [
    { name: 'Concluídas', value: actionStats.done, color: 'teal.6' },
    { name: 'Andamento', value: actionStats.doing, color: 'blue.6' },
    { name: 'A Iniciar', value: actionStats.todo, color: 'gray.4' },
    { name: 'Atrasadas', value: actionStats.overdue, color: 'pink.6' },
    { name: 'Impedidas', value: actionStats.blocked, color: 'orange.6' },
    { name: 'Canceladas', value: actionStats.cancelled, color: 'gray.2' },
    { name: 'FCA', value: fcaCount, color: 'red.6' },
  ];

  // LOGICA PARA SMART LEGENDS (DESTAQUES CRÍTICOS COM ESCALABILIDADE)
  const allCriticalKRs = krs.filter(k => k.status !== 'on_track')
    .sort((a, _b) => a.status === 'off_track' ? -1 : 1);
  const criticalKRs = allCriticalKRs.slice(0, 3);
  
  const allCriticalProjects = initiatives.filter(i => i.status === 'blocked' || i.progress < 20)
    .sort((a, _b) => a.status === 'blocked' ? -1 : 1);
  const criticalProjects = allCriticalProjects.slice(0, 3);
  
  const allCriticalActions = allActions.filter(a => a.status === 'overdue' || a.status === 'blocked')
    .sort((a, _b) => a.status === 'blocked' ? -1 : 1);
  const criticalActions = allCriticalActions.slice(0, 3);


  useEffect(() => {
    if (!sentinelRef.current) return;
    // IntersectionObserver é assíncrono e roda fora do ciclo de layout —
    // não sofre feedback loop com reflows causados pela mudança de altura do sticky.
    // rootMargin negativo no topo = detecta quando o sentinel sai da faixa visível
    // abaixo do AppShell header (70px) ou do topo em modo apresentação.
    const topMargin = isPresentation ? '0px' : '-70px';
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { rootMargin: `${topMargin} 0px 0px 0px`, threshold: 0 }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [isPresentation]);



  const handleDeepLink = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Pequeno delay para disparar o glow após o início do scroll
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('highlight-node', { detail: { id } }));
      }, 300);
    }
  };

  return (
    <Box mb={rem(100)}>
      {/* Sentinela: div de altura zero em fluxo normal. O scroll handler lê a posição
          deste elemento (não do sticky) para evitar o loop de oscilação. */}
      <div ref={sentinelRef} style={{ height: 0 }} />

      {/* NÍVEL 1: HEADER DO OBJETIVO (PLATINUM SMART STICKY) */}
      <Box
        ref={headerRef}
        style={{ 
          position: 'sticky', 
          top: isPresentation ? 0 : rem(60), 
          zIndex: 40, 
          height: isStuck ? rem(40) : rem(180),

          backgroundColor: isStuck ? 'rgba(255, 255, 255, 0.98)' : 'transparent', 
          backdropFilter: isStuck ? 'blur(12px)' : 'none',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', // Aceleração UX
          display: 'flex',
          alignItems: 'center'
        }}

      >
        <Paper 
          withBorder={!isStuck}
          p={isStuck ? rem(4) : rem(40)} 
          radius={isStuck ? 0 : "md"} 
          shadow={isStuck ? "md" : "lg"} 
          bg={opened ? "white" : "gray.0"}
          w="100%"
          style={{ 
            borderLeft: '14px solid var(--mantine-color-blue-7)', 
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            borderTop: isStuck ? 'none' : undefined,
            borderRight: isStuck ? 'none' : undefined,
            borderBottom: isStuck ? '1px solid var(--mantine-color-gray-2)' : undefined,
          }}
          onClick={() => setOpened(!opened)}
        >
          <Group justify="space-between" wrap="nowrap">
            <Stack gap={0} flex={1} style={{ overflow: 'hidden' }}>
              {/* Fade out rápido dos selos estratégicos para evitar sopa de letras */}
              <Box style={{ 
                opacity: isStuck ? 0 : 1, 
                maxHeight: isStuck ? 0 : rem(40), 
                transition: 'all 0.15s ease',
                visibility: isStuck ? 'hidden' : 'visible'
              }}>
                <Group gap="xs" mb={4} align="center">
                  <IconTarget size={16} color="var(--mantine-color-blue-7)" />
                  <Badge size="xs" color="blue" variant={opened ? "filled" : "light"} radius="sm">ESTRATÉGICO</Badge>
                  <Text size="xs" fw={800} c={opened ? "blue.8" : "dimmed"} tt="uppercase" style={{ letterSpacing: rem(1) }}>Objetivo de Negócio</Text>
                </Group>
              </Box>

              <Box style={{ minHeight: isStuck ? rem(20) : 'auto', paddingTop: isStuck ? 0 : rem(4) }}>
                <AnimatePresence mode="wait">
                  {isStuck ? (
                    <motion.div
                      key="stuck-title"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'flex', alignItems: 'center', gap: rem(8) }}
                    >
                      <IconTarget size={16} color="var(--mantine-color-blue-8)" />
                      <Title order={2} fw={900} size={rem(16)} c="blue.9" lineClamp={1}>
                        O: {obj.title}
                      </Title>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="normal-title"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Stack gap={rem(4)}>
                        <Title order={2} fw={900} size={rem(32)} c="blue.9" style={{ lineHeight: 1.1 }}>
                          {obj.title}
                        </Title>
                        
                        {obj.description && (
                          <Text size="sm" c="dimmed" fw={500} ml={rem(40)} mb={rem(8)}>
                            {obj.description}
                          </Text>
                        )}

                        <Group gap="md" mt={rem(4)}>
                          <Avatar size="sm" radius="xl" color="blue" src={`https://i.pravatar.cc/150?u=${obj.ownerId}`} />
                          <Text size="md" fw={700} c="dimmed">Responsável: {obj.ownerId === '12cb15b5-e534-4d49-b3b3-e88b35924ee5' ? 'Luciana' : 'Lidia'}</Text>
                        </Group>
                      </Stack>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </Stack>
            
            <Group gap={isStuck ? "md" : "xl"}>
              <Stack align="flex-end" gap={0}>
                {isStuck ? (
                  <Badge size="md" color="blue" variant="filled" radius="sm">
                    <Text fw={900} size="xs">{obj.progress}% ATINGIDO</Text>
                  </Badge>
                ) : (
                  <>
                    <Text size="xs" fw={800} c="dimmed" tt="uppercase">ATINGIMENTO MÉDIO</Text>
                    <Text fw={900} c="blue.8" style={{ fontSize: rem(68), lineHeight: 1 }}>{obj.progress}%</Text>
                  </>
                )}
              </Stack>
              {!isStuck && (
                <Box style={{ 
                  transform: opened ? 'rotate(90deg)' : 'none', 
                  transition: 'transform 0.3s ease',
                  color: opened ? 'var(--mantine-color-blue-6)' : 'var(--mantine-color-gray-4)'
                }}>
                  <IconChevronRight size={38} />
                </Box>
              )}
            </Group>
          </Group>
        </Paper>
      </Box>

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Stack gap={rem(40)} pl={rem(20)} pr={0} mt="xl" style={{ borderLeft: '2px solid var(--mantine-color-blue-1)', marginLeft: rem(20) }}>
              
              {/* PAINEL DE RESUMO TÁTICO V2 */}
              <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
                {/* CARD KEY RESULTS */}
                <Paper withBorder p="lg" radius="md" bg="white" shadow="xs" style={{ minHeight: rem(180), display: 'flex', flexDirection: 'column' }}>
                  <Group gap="xs" mb="md"><IconTarget size={18} color="var(--mantine-color-teal-6)" /><Text size="xs" fw={800} c="dimmed" tt="uppercase">Key Results</Text></Group>
                  <Group wrap="nowrap" align="center" gap="xl" style={{ flex: 1 }}>
                    <Box style={{ position: 'relative', flexShrink: 0 }}>
                      <DonutChart 
                        size={100} 
                        thickness={10} 
                        data={krChartData} 
                        tooltipDataSource="segment"
                        tooltipProps={{ wrapperStyle: { zIndex: 1000 } }}
                      />
                      <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none', zIndex: 1 }}>
                        <Text fw={900} size="lg" style={{ lineHeight: 1 }}>{krs.length}</Text>
                        <Text size="8px" c="dimmed" fw={800} tt="uppercase">KRs</Text>
                      </Box>
                    </Box>
                    <Stack gap={6} flex={1}>
                      <Text size="10px" fw={900} c="dimmed" tt="uppercase" mb={2}>Pontos de Atenção</Text>
                      {criticalKRs.length > 0 ? (
                        <>
                          {criticalKRs.map(k => {
                            const reason = k.status === 'off_track' ? 'Abaixo da meta' : 'Confiança Baixa';
                            return (
                              <Group 
                                key={k.id} 
                                gap={4} 
                                wrap="nowrap" 
                                align="flex-start" 
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleDeepLink(`kr-${k.id}`)}
                              >
                                <IconAlertTriangle size={10} color={k.status === 'off_track' ? 'var(--mantine-color-red-6)' : 'var(--mantine-color-orange-6)'} style={{ marginTop: 2 }} />
                                <Box style={{ flex: 1, minWidth: 0 }}>
                                  <Text size="11px" fw={700} c="dark.6" lineClamp={1} style={{ lineHeight: 1.2 }}>
                                    {k.title}
                                  </Text>
                                  <Text size="9px" fw={800} c={k.status === 'off_track' ? 'red.7' : 'orange.7'} tt="uppercase" style={{ lineHeight: 1 }}>
                                    {reason}
                                  </Text>
                                </Box>
                              </Group>
                            );
                          })}
                          {allCriticalKRs.length > 3 && (
                            <Badge 
                              variant="light" 
                              color="gray" 
                              size="xs" 
                              radius="xs" 
                              mt={4} 
                              style={{ cursor: 'pointer' }}
                              onClick={() => document.getElementById('krs-detail')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                              + {allCriticalKRs.length - 3} OUTROS
                            </Badge>
                          )}
                        </>
                      ) : (
                        <Group gap={4}>
                          <IconShieldCheck size={10} color="var(--mantine-color-teal-6)" />
                          <Text size="11px" fw={700} c="teal.8">Toda operação em dia</Text>
                        </Group>
                      )}
                    </Stack>
                  </Group>
                </Paper>

                {/* CARD PROJETOS */}
                <Paper withBorder p="lg" radius="md" bg="white" shadow="xs" style={{ minHeight: rem(180), display: 'flex', flexDirection: 'column' }}>
                  <Group gap="xs" mb="md"><IconBriefcase size={18} color="var(--mantine-color-indigo-6)" /><Text size="xs" fw={800} c="dimmed" tt="uppercase">Projetos</Text></Group>
                  <Group wrap="nowrap" align="center" gap="xl" style={{ flex: 1 }}>
                    <Box style={{ position: 'relative', flexShrink: 0 }}>
                      <DonutChart 
                        size={100} 
                        thickness={10} 
                        data={projectChartData} 
                        tooltipDataSource="segment"
                        tooltipProps={{ wrapperStyle: { zIndex: 1000 } }}
                      />
                      <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none', zIndex: 1 }}>
                        <Text fw={900} size="lg" style={{ lineHeight: 1 }}>{avgProgress}%</Text>
                        <Text size="8px" c="dimmed" fw={800}>MÉDIA</Text>
                      </Box>
                    </Box>
                    <Stack gap={6} flex={1}>
                      <Text size="10px" fw={900} c="dimmed" tt="uppercase" mb={2}>Performance</Text>
                      <Group gap={4}>
                         <IconArrowUpRight size={10} color="var(--mantine-color-blue-6)" />
                         <Text size="11px" fw={700} c="dark.6">Status: {obj.status === 'at_risk' ? 'Revisão Necessária' : 'Em Execução'}</Text>
                      </Group>
                      {criticalProjects.map(p => {
                        const reason = p.status === 'blocked' ? 'Impedimento Técnico' : 'Progresso Lento';
                        return (
                          <Group 
                            key={p.id} 
                            gap={4} 
                            wrap="nowrap" 
                            align="flex-start" 
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleDeepLink(`project-${p.id}`)}
                          >
                            <Box style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'var(--mantine-color-red-6)', marginTop: 6 }} />
                            <Box style={{ flex: 1, minWidth: 0 }}>
                              <Text size="11px" fw={700} c="dark.6" lineClamp={1} style={{ lineHeight: 1.2 }}>
                                {p.title}
                              </Text>
                              <Text size="9px" fw={800} c="red.7" tt="uppercase" style={{ lineHeight: 1 }}>
                                {reason}
                              </Text>
                            </Box>
                          </Group>
                        );
                      })}
                      {allCriticalProjects.length > 3 && (
                        <Badge 
                          variant="light" 
                          color="gray" 
                          size="xs" 
                          radius="xs" 
                          mt={4} 
                          style={{ cursor: 'pointer' }}
                          onClick={() => document.getElementById('krs-detail')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                          + {allCriticalProjects.length - 3} OUTROS
                        </Badge>
                      )}
                    </Stack>
                  </Group>
                </Paper>

                {/* CARD AÇÕES */}
                <Paper withBorder p="lg" radius="md" bg="white" shadow="xs" style={{ minHeight: rem(180), display: 'flex', flexDirection: 'column' }}>
                  <Group gap="xs" mb="md"><IconListCheck size={18} color="var(--mantine-color-orange-6)" /><Text size="xs" fw={800} c="dimmed" tt="uppercase">Ações</Text></Group>
                  <Group wrap="nowrap" align="center" gap="xl" style={{ flex: 1 }}>
                    <Box style={{ position: 'relative', flexShrink: 0 }}>
                      <DonutChart 
                        size={100} 
                        thickness={10} 
                        data={actionsChartData} 
                        tooltipDataSource="segment"
                        tooltipProps={{ wrapperStyle: { zIndex: 1000 } }}
                      />
                      <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none', zIndex: 1 }}>
                        <Text fw={900} size="lg" style={{ lineHeight: 1 }}>{allActions.length}</Text>
                        <Text size="8px" c="dimmed" fw={800} tt="uppercase">Ações</Text>
                      </Box>
                    </Box>
                    <Stack gap={6} flex={1}>
                      <Text size="10px" fw={900} c="dimmed" tt="uppercase" mb={2}>Impedimentos</Text>
                      {actionStats.overdue > 0 || actionStats.blocked > 0 ? (
                        <>
                          <Group gap={4}>
                            <Badge variant="light" color="red" size="xs">{actionStats.overdue} ATRASADAS</Badge>
                          </Group>
                          {criticalActions.map(a => {
                            const reason = a.status === 'blocked' ? 'Impedimento' : 'Prazo Vencido';
                            return (
                              <Box 
                                key={a.id} 
                                mb={4} 
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleDeepLink(`project-${a.initiativeId}`)}
                              >
                                <Text size="11px" fw={700} c="dark.6" lineClamp={1} style={{ lineHeight: 1.2 }}>
                                  • {a.title}
                                </Text>
                                <Text size="9px" fw={800} c="pink.7" tt="uppercase" ml={8} style={{ lineHeight: 1 }}>
                                  {reason}
                                </Text>
                              </Box>
                            );
                          })}
                          {allCriticalActions.length > 3 && (
                            <Badge 
                          variant="light" 
                          color="gray" 
                          size="xs" 
                          radius="xs" 
                          mt={4} 
                          style={{ cursor: 'pointer' }}
                          onClick={() => document.getElementById('krs-detail')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                          + {allCriticalActions.length - 3} OUTROS
                        </Badge>
                          )}
                        </>
                      ) : (
                        <Group gap={4}>
                          <IconShieldCheck size={10} color="var(--mantine-color-teal-6)" />
                          <Text size="11px" fw={700} c="teal.8">Tudo fluindo bem</Text>
                        </Group>
                      )}
                    </Stack>
                  </Group>
                </Paper>
              </SimpleGrid>

              <Divider 
                id="krs-detail"
                label={<Text size="md" fw={800} c="blue.9" tt="uppercase">Desdobramento em Key Results</Text>} 
                labelPosition="center" 
                style={{ scrollMarginTop: isPresentation ? rem(80) : rem(122), transition: 'all 0.5s ease' }}
              />

              {/* LISTA DE KRs */}
              <Stack gap="xl">
                {krs.map((kr) => (
                  <KRCard 
                    key={kr.id} 
                    kr={kr} 
                    initiatives={initiatives.filter(i => i.keyResultId === kr.id)}
                    getActionsForInitiative={getActionsForInitiative}
                    onShowEvidence={onShowEvidence}
                    getConfidenceData={getConfidenceData}
                    isPresentation={isPresentation}
                  />

                ))}
              </Stack>
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
