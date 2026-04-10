import { 
  Text, 
  Box, 
  rem, 
  Paper, 
  Group, 
  Stack, 
  Avatar, 
  Title, 
  Badge, 
  SimpleGrid 
} from '@mantine/core';
import { IconChevronRight, IconTarget, IconAlertTriangle } from '@tabler/icons-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectBoard } from './ProjectBoard';
import { FCAMatrix } from './FCAMatrix';

interface KRCardProps {
  kr: any;
  initiatives: any[];
  getActionsForInitiative: (id: string) => any[];
  onShowEvidence: (action: any) => void;
  getConfidenceData: (conf: string) => { label: string; color: string };
  isPresentation?: boolean;
}


export function KRCard({ kr, initiatives, getActionsForInitiative, onShowEvidence, getConfidenceData, isPresentation = false }: KRCardProps) {

  const [opened, setOpened] = useState(true);
  const [isSlim, setIsSlim] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const p = getConfidenceData(kr.confidence);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Ajuste de threshold para o modo apresentação
      const threshold = isPresentation ? 90 : 111;
      if (rect.top <= threshold) {
        setIsSlim(true);
      } else {
        setIsSlim(false);
      }
    };


    document.addEventListener('scroll', handleScroll, true);
    handleScroll();
    return () => document.removeEventListener('scroll', handleScroll, true);
  }, [isPresentation]);



  // LÓGICA DE GLOW (DESTAQUE VISUAL)
  const [isHighlighted, setIsHighlighted] = useState(false);
  useEffect(() => {
    const handleHighlight = (e: any) => {
      // @ts-ignore
      if (e.detail?.id === `kr-${kr.id}`) {
        setIsHighlighted(true);
        setTimeout(() => setIsHighlighted(false), 2500);
      }
    };
    window.addEventListener('highlight-node', handleHighlight);
    return () => window.removeEventListener('highlight-node', handleHighlight);
  }, [kr.id]);

  // MOCK DE DADOS FCA (Fato, Causa e Ação) CONFORME O PRINT
  const fcaData = {
    fato: "A meta de receita de A&B para fevereiro não foi alcançada.",
    items: [
      { causa: "Baixa demanda de público corporativo devido ao recesso corporativo e feriado de carnaval.", acao: "Retomar contato com empresas locais a partir de visitas comerciais presenciais.", prazo: "31/03", responsavel: "Paulo", status: "Iniciado" },
      { causa: "Por decisão do cliente, não houve serviço de alimentação em 3 eventos.", acao: "Aumentar a venda dos espaços e serviços de eventos através de ações nas regionais.", prazo: "31/03", responsavel: "Paulo", status: "Em Andamento" },
      { causa: "Baixa receita no serviço de room service devido a baixa ocupação.", acao: "Realizar melhorias nas estratégias e discurso de vendas das equipes de recepção.", prazo: "31/03", responsavel: "Paulo", status: "Não Iniciado" }
    ]
  };

  // Regra de Negócio: FCA só aparece se o indicador estiver ruim (Yellow/Red)
  const isAtRisk = kr.status === 'at_risk' || kr.status === 'off_track';

  return (
    <Box 
      id={`kr-${kr.id}`} 
      mb="xl" 
      ref={containerRef} 
      style={{ 
        scrollMarginTop: isPresentation ? rem(82) : rem(122),
        transition: 'all 0.5s ease'
      }}

    >
      <motion.div
        animate={isHighlighted ? {
          boxShadow: ['0 0 0px var(--mantine-color-teal-2)', '0 0 25px var(--mantine-color-teal-4)', '0 0 0px var(--mantine-color-teal-2)'],
          backgroundColor: ['rgba(255,255,255,0)', 'var(--mantine-color-teal-0)', 'rgba(255,255,255,0)'],
          scale: [1, 1.01, 1]
        } : {}}
        transition={{ duration: 1.5, times: [0, 0.5, 1] }}
        style={{ borderRadius: '12px', padding: rem(2) }}
      >
      {/* HEADER DO KR (LEVEL 2) - PLATINUM SLIM STICKY */}
      <Box style={{ 
        position: 'sticky', 
        position: 'sticky', 
        top: isPresentation ? rem(40) : rem(100), 
        zIndex: 35, 
        height: rem(110),

        backgroundColor: isSlim ? 'rgba(255, 255, 255, 0.98)' : 'transparent', 
        backdropFilter: isSlim ? 'blur(10px)' : 'none',
        marginLeft: rem(-10),
        paddingLeft: rem(10),
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' 
      }}>

        <Paper 
          withBorder={!isSlim && !isPresentation}
          p={rem(25)} 
          radius={isSlim ? 0 : "md"} 
          shadow={isSlim ? "sm" : "lg"} 
          bg={isSlim ? "white" : "gray.0"}
          w="100%"
          style={{ 
            borderLeft: '10px solid var(--mantine-color-teal-5)', 
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            borderTop: isSlim ? 'none' : undefined,
            borderRight: isSlim ? 'none' : undefined,
            borderBottom: isSlim ? '1px solid var(--mantine-color-gray-2)' : undefined,
          }}
          onClick={() => setOpened(!opened)}
        >
          <Group justify="space-between" wrap="nowrap">
            <Stack gap={0} flex={1} style={{ overflow: 'hidden' }}>
              <Box style={{ 
                opacity: (isSlim && !isPresentation) ? 0 : 1, 
                maxHeight: (isSlim && !isPresentation) ? 0 : rem(20), 
                transition: 'all 0.15s ease',
                visibility: (isSlim && !isPresentation) ? 'hidden' : 'visible'
              }}>

                <Group gap="xs" mb={4} align="center">
                  <IconTarget size={14} color="var(--mantine-color-teal-6)" />
                  <Text size="xs" fw={800} c={opened ? "teal.7" : "dimmed"} tt="uppercase">KEY RESULT</Text>
                </Group>
              </Box>
              <Box style={{ minHeight: isSlim ? rem(16) : 'auto' }}>
                <AnimatePresence mode="wait">
                  {false ? ( // Desativado para manter sempre o visual completo


                    <motion.div
                      key="slim-title-kr"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'flex', alignItems: 'center', gap: rem(6) }}
                    >
                      <IconTarget size={14} color="var(--mantine-color-teal-6)" />
                      <Title order={3} fw={900} size={rem(14)} c="dark.6" lineClamp={1}>
                        K: {kr.title}
                      </Title>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="normal-title-kr"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Stack gap={rem(2)}>
                        <Title order={3} fw={900} size={rem(24)} c="dark.6" style={{ lineHeight: 1.1 }}>
                          {kr.title}
                        </Title>
                        
                        {kr.description && (
                          <Text size="xs" c="dimmed" fw={500} ml={rem(28)}>
                            {kr.description}
                          </Text>
                        )}
                        
                        <Group gap="xs" mt={rem(4)}>
                          <Avatar size="xs" radius="xl" src={`https://i.pravatar.cc/150?u=${kr.ownerId}`} />
                          <Text size="sm" fw={700} c="dimmed">Responsável: {kr.ownerName}</Text>
                        </Group>
                      </Stack>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </Stack>
            
            <Group gap={(isSlim && !isPresentation) ? "md" : "xl"}>
              <Stack align="flex-end" gap={0}>
                {(isSlim && !isPresentation) ? (

                  <Group gap={6}>
                    {isAtRisk && (
                      <Stack gap={0} align="center">
                        <IconAlertTriangle size={14} color="var(--mantine-color-yellow-6)" fill="var(--mantine-color-yellow-1)" />
                        <Text size="7px" fw={900} c="yellow.8" style={{ lineHeight: 1 }}>FCA</Text>
                      </Stack>
                    )}
                    <Badge color={p.color} variant="filled" size="sm" radius="xs">
                      <Text fw={900} size="xs">{kr.progress}%</Text>
                    </Badge>
                  </Group>
                ) : (
                  <Group gap={rem(12)}>
                    {isAtRisk && (
                       <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
                          <Stack gap={0} align="center">
                            <IconAlertTriangle size={28} color="var(--mantine-color-yellow-6)" fill="var(--mantine-color-yellow-1)" />
                            <Text size="10px" fw={900} c="yellow.8" style={{ lineHeight: 1, marginTop: -rem(2) }}>FCA</Text>
                          </Stack>
                       </motion.div>
                    )}
                    <Badge color={p.color} variant={opened ? "filled" : "light"} size="xl" radius="sm" py="md">
                      <Text fw={900} size="md" style={{ letterSpacing: rem(1) }}>
                        {kr.progress}% • {p.label.toUpperCase()}
                      </Text>
                    </Badge>
                  </Group>
                )}
              </Stack>
              {(!isSlim || isPresentation) && (
                <Box style={{ 
                  transform: opened ? 'rotate(90deg)' : 'none', 
                  transition: 'transform 0.3s ease',
                  color: opened ? 'var(--mantine-color-teal-6)' : 'var(--mantine-color-gray-4)'
                }}>
                  <IconChevronRight size={28} />
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
            <Stack gap="xl" mt="xl" pl={rem(20)} pr={0} style={{ borderLeft: '2px solid var(--mantine-color-teal-1)', marginLeft: rem(10) }}>
              {/* MÉTRICAS DE COMPARAÇÃO */}
              <SimpleGrid cols={{ base: 1, sm: 2, md: 5 }} spacing="md">
                <Paper withBorder p="md" radius="md" bg="gray.0"><Text size="xs" fw={800} c="dimmed" tt="uppercase">Baseline</Text><Text size="xl" fw={900}>{kr.startValue}%</Text></Paper>
                <Paper withBorder p="md" radius="md" bg="gray.1"><Text size="xs" fw={800} c="dimmed" tt="uppercase">Jan (Ant.)</Text><Text size="xl" fw={900}>{kr.monthlyValues?.['JAN'] || 0}%</Text></Paper>
                <Paper withBorder p="md" radius="md" shadow="sm" style={{ borderBottom: '4px solid var(--mantine-color-teal-6)' }}>
                  <Text size="xs" fw={800} c="teal.9" tt="uppercase">Fev (Atual)</Text>
                  <Group justify="space-between" align="baseline"><Text size="xl" fw={900} c="teal.9">{kr.currentValue}%</Text><Badge color="teal" size="xs">↑ 35%</Badge></Group>
                </Paper>
                <Paper withBorder p="md" radius="md" bg="blue.0"><Text size="xs" fw={800} c="blue.9" tt="uppercase">Meta Q1</Text><Text size="xl" fw={900} c="blue.9">{kr.targetValue}%</Text></Paper>
                <Paper withBorder p="md" radius="md"><Text size="xs" fw={800} c="dimmed" tt="uppercase">Confiança</Text><Badge color={p.color} variant="dot" fullWidth size="sm" mt={4}>{p.label}</Badge></Paper>
              </SimpleGrid>

              {/* LISTA DE PROJETOS DENTRO DO KR */}
              {initiatives.map((initi) => (
                <ProjectBoard 
                  key={initi.id} 
                  initiative={initi} 
                  actions={getActionsForInitiative(initi.id)}
                  onShowEvidence={onShowEvidence}
                  isPresentation={isPresentation}
                />
              ))}

              {/* MATRIZ FCA (EXIBIDA AO FINAL DO KR COMO CONCLUSÃO) */}
              {isAtRisk && (
                <Box mt="xl">
                  <Box style={{ 
                    position: 'sticky', 
                    top: isPresentation ? rem(150) : rem(210), 
                    zIndex: 32,
                    backgroundColor: 'white',
                    paddingBottom: rem(4)
                  }}>
                    <Group gap="xs" mb={2} py="xs" style={{ borderBottom: '1px solid var(--mantine-color-red-1)' }}>
                      <Badge color="red" variant="filled" size="md" radius="sm">MATRIZ FCA</Badge>
                      <Text size="xs" fw={800} c="red.9" tt="uppercase">Plano de Ação Corretiva (Fato, Causa, Ação)</Text>
                    </Group>
                  </Box>
                  <FCAMatrix data={fcaData} stickyTop={isPresentation ? rem(184) : rem(244)} /> 
                </Box>
              )}
            </Stack>
          </motion.div>
        )}
        </AnimatePresence>
      </motion.div>
    </Box>
  );
}
