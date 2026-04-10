import { useState, useEffect, useRef } from 'react';
import { 
  Paper, 
  Text, 
  Group, 
  Stack, 
  Box, 
  Badge, 
  Progress, 
  Avatar, 
  Button, 
  SimpleGrid,
  Textarea,
  rem,
  Title
} from '@mantine/core';
import { 
  IconList,
  IconCircleCheck,
  IconPlayerPlay,
  IconClock,
  IconAlertCircle,
  IconAlertTriangle,
  IconCircleX,
  IconChevronRight,
  IconBriefcase,
  IconSend,
  IconMessage2
} from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ActionTable } from './ActionTable';

interface ProjectBoardProps {
  initiative: any;
  actions: any[];
  onShowEvidence: (action: any) => void;
  isPresentation?: boolean;
}


export function ProjectBoard({ initiative, actions, onShowEvidence, isPresentation = false }: ProjectBoardProps) {

  const [opened, setOpened] = useState(true);
  const [isStuck, setIsStuck] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [comment, setComment] = useState('');
  
  // Cálculo do Quadro Quantitativo (Mapeado para o novo Detalhamento de Ações)
  const stats = {
    total: actions.length,
    done: actions.filter(a => a.status === 'done').length,
    doing: actions.filter(a => a.status === 'doing').length,
    todo: actions.filter(a => a.status === 'todo').length,
    overdue: actions.filter(a => a.status === 'overdue' || a.isOverdue).length,
    blocked: actions.filter(a => a.status === 'blocked').length,
    cancelled: actions.filter(a => a.status === 'cancelled').length,
  };

  const [comments, setComments] = useState<any[]>([
    { 
      id: 1, 
      user: 'Luciana (Diretora)', 
      text: 'O projeto atingiu maturidade técnica. Execução tática acelerada e evidências robustas coletadas para auditoria.',
      time: 'Março/2024',
      avatar: 'https://i.pravatar.cc/150?u=luciana'
    }
  ]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSendComment = () => {
    if (!comment.trim()) return;
    const newComment = {
      id: Date.now(),
      user: 'Luciana (Diretora)',
      text: comment,
      time: 'Agora',
      avatar: 'https://i.pravatar.cc/150?u=luciana'
    };
    setComments([...comments, newComment]);
    setComment('');
    setIsWriting(false);
  };


  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Ajuste de threshold para o modo apresentação
      const threshold = isPresentation ? 130 : 149;
      if (rect.top <= threshold) {
        setIsStuck(true);
      } else {
        setIsStuck(false);
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
      if (e.detail?.id === `project-${initiative.id}`) {
        setIsHighlighted(true);
        setTimeout(() => setIsHighlighted(false), 2500);
      }
    };
    window.addEventListener('highlight-node', handleHighlight);
    return () => window.removeEventListener('highlight-node', handleHighlight);
  }, [initiative.id]);

  return (
    <Box 
      id={`project-${initiative.id}`} 
      mb="xl" 
      ref={containerRef} 
      style={{ 
        scrollMarginTop: isPresentation ? rem(118) : rem(158),
        transition: 'all 0.5s ease'
      }}

    >
      <motion.div
        animate={isHighlighted ? {
          boxShadow: ['0 0 0px var(--mantine-color-indigo-2)', '0 0 25px var(--mantine-color-indigo-4)', '0 0 0px var(--mantine-color-indigo-2)'],
          backgroundColor: ['rgba(255,255,255,0)', 'var(--mantine-color-indigo-0)', 'rgba(255,255,255,0)'],
          scale: [1, 1.005, 1]
        } : {}}
        transition={{ duration: 1.5, times: [0, 0.5, 1] }}
        style={{ borderRadius: '12px', padding: rem(2) }}
      >
      {/* HEADER DO PROJETO (LEVEL 3) */}
      <Box style={{ 
        position: 'sticky', 
        top: isPresentation ? rem(150) : rem(210), 
        zIndex: 30, 
        height: rem(70),

        backgroundColor: (isStuck || isPresentation) ? 'rgba(255, 255, 255, 0.98)' : 'transparent', 
        backdropFilter: (isStuck || isPresentation) ? 'blur(10px)' : 'none',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: (isStuck && !isPresentation) ? rem(10) : 0,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' 
      }}>

        <Paper 
          withBorder={!isStuck && !isPresentation}
          p="lg" 
          radius={(isStuck && !isPresentation) ? 0 : "md"} 
          shadow={(isStuck || isPresentation) ? "xs" : "lg"} 
          bg={opened ? "white" : "gray.0"}
          w="100%"
          style={{ 
            borderLeft: (isStuck && !isPresentation) ? '4px solid var(--mantine-color-indigo-6)' : '6px solid var(--mantine-color-indigo-6)', 
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            borderTop: isStuck ? 'none' : undefined,
            borderRight: isStuck ? 'none' : undefined,
            borderBottom: isStuck ? '1px solid var(--mantine-color-gray-2)' : undefined,
          }}
          onClick={() => setOpened(!opened)}
        >
          <Group justify="space-between" wrap="nowrap">
            <Group gap="xs" style={{ overflow: 'hidden', flex: 1, minHeight: isStuck ? rem(16) : 'auto' }}>
              <AnimatePresence mode="wait">
                {false ? ( // Desativado para manter sempre o visual completo
                  <motion.div

                    key="stuck-title-p"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'flex', alignItems: 'center', gap: rem(6) }}
                  >
                    <IconBriefcase size={12} color="var(--mantine-color-indigo-6)" />
                    <Text fw={900} size="xs" c={opened ? "indigo.9" : "dimmed"} lineClamp={1}>
                      P: {initiative.title}
                    </Text>
                  </motion.div>
                ) : (
                    <motion.div
                      key="normal-title-p"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Stack gap={rem(2)}>
                        <Group gap="xs" mb={4} align="center">
                          <IconBriefcase size={14} color={opened ? "var(--mantine-color-indigo-6)" : "var(--mantine-color-gray-4)"} />
                          <Text size="xs" fw={800} c={opened ? "indigo.7" : "dimmed"} tt="uppercase">Projeto</Text>
                        </Group>
                        <Title order={4} fw={900} size={rem(18)} c={opened ? "indigo.9" : "dimmed"} style={{ lineHeight: 1.2 }}>
                          {initiative.title}
                        </Title>
                        {initiative.description && (
                          <Text size="xs" c="dimmed" fw={500} ml={rem(28)}>
                            {initiative.description}
                          </Text>
                        )}
                      </Stack>
                    </motion.div>
                )}
              </AnimatePresence>
            </Group>
            <Group gap={(isStuck && !isPresentation) ? "xs" : "md"}>
              <Badge variant={opened ? "filled" : "light"} color="indigo" size={(isStuck && !isPresentation) ? "xs" : "md"} radius="xs">{initiative.progress}%</Badge>
              {(!isStuck || isPresentation) && (
                <Box style={{ 
                  transform: opened ? 'rotate(90deg)' : 'none', 
                  transition: 'transform 0.3s ease',
                  color: opened ? 'var(--mantine-color-indigo-6)' : 'var(--mantine-color-gray-4)'
                }}>
                  <IconChevronRight size={22} />
                </Box>
              )}
            </Group>

          </Group>
        </Paper>
      </Box>

      {/* COCKPIT DE GESTÃO (SEMPRE VISÍVEL) */}
      <Box px="lg" mt="md" mb="md">
        <SimpleGrid cols={{ base: 1, md: 12 }} spacing="md">
          {/* Detalhamento de Ações (80% da largura) */}
          <Box style={{ gridColumn: 'span 10' }}>
            <Text size="xs" fw={900} c="indigo.8" tt="uppercase" mb={8} style={{ letterSpacing: rem(1) }}>Detalhamento de Ações</Text>
            <SimpleGrid cols={{ base: 2, sm: 4, md: 7 }} spacing="xs">
              {/* Total */}
              <Paper withBorder p="xs" radius="md" bg="gray.0" h={rem(80)} style={{ borderBottom: '4px solid var(--mantine-color-gray-4)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Group gap={6} mb={2}>
                  <IconList size={14} color="var(--mantine-color-gray-6)" />
                  <Text size="xs" fw={700} c="gray.7">Total</Text>
                </Group>
                <Text size="xl" fw={900} c="gray.9">{stats.total}</Text>
              </Paper>

              {/* Concluídas */}
              <Paper withBorder p="xs" radius="md" bg="teal.0" h={rem(80)} style={{ borderColor: 'var(--mantine-color-teal-1)', borderBottom: '4px solid var(--mantine-color-teal-5)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Group gap={6} mb={2}>
                  <IconCircleCheck size={14} color="var(--mantine-color-teal-6)" />
                  <Text size="xs" fw={700} c="teal.8">Concluídas</Text>
                </Group>
                <Text size="xl" fw={900} c="teal.9">{stats.done}</Text>
              </Paper>

              {/* Andamento */}
              <Paper withBorder p="xs" radius="md" bg="blue.0" h={rem(80)} style={{ borderColor: 'var(--mantine-color-blue-1)', borderBottom: '4px solid var(--mantine-color-blue-5)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Group gap={6} mb={2}>
                  <IconPlayerPlay size={14} color="var(--mantine-color-blue-6)" />
                  <Text size="xs" fw={700} c="blue.8">Andamento</Text>
                </Group>
                <Text size="xl" fw={900} c="blue.9">{stats.doing}</Text>
              </Paper>

              {/* A Iniciar */}
              <Paper withBorder p="xs" radius="md" bg="gray.1" h={rem(80)} style={{ borderBottom: '4px solid var(--mantine-color-gray-3)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Group gap={6} mb={2}>
                  <IconClock size={14} color="var(--mantine-color-gray-5)" />
                  <Text size="xs" fw={700} c="gray.7">A Iniciar</Text>
                </Group>
                <Text size="xl" fw={900} c="gray.8">{stats.todo}</Text>
              </Paper>

              {/* Atrasadas */}
              <Paper withBorder p="xs" radius="md" bg="pink.0" h={rem(80)} style={{ borderColor: 'var(--mantine-color-pink-1)', borderBottom: '4px solid var(--mantine-color-pink-5)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Group gap={6} mb={2}>
                  <IconAlertCircle size={14} color="var(--mantine-color-pink-6)" />
                  <Text size="xs" fw={700} c="pink.8">Atrasadas</Text>
                </Group>
                <Text size="xl" fw={900} c="pink.9">{stats.overdue}</Text>
              </Paper>

              {/* Impedidas */}
              <Paper withBorder p="xs" radius="md" bg="orange.0" h={rem(80)} style={{ borderColor: 'var(--mantine-color-orange-1)', borderBottom: '4px solid var(--mantine-color-orange-5)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Group gap={6} mb={2}>
                  <IconAlertTriangle size={14} color="var(--mantine-color-orange-6)" />
                  <Text size="xs" fw={700} c="orange.8">Impedidas</Text>
                </Group>
                <Text size="xl" fw={900} c="orange.9">{stats.blocked}</Text>
              </Paper>

              {/* Canceladas */}
              <Paper withBorder p="xs" radius="md" bg="gray.2" h={rem(80)} style={{ opacity: 0.6, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Group gap={6} mb={2}>
                  <IconCircleX size={14} color="var(--mantine-color-gray-4)" />
                  <Text size="xs" fw={700} c="gray.5">Canceladas</Text>
                </Group>
                <Text size="xl" fw={900} c="gray.4">{stats.cancelled}</Text>
              </Paper>
            </SimpleGrid>
          </Box>

          {/* Progresso Global (20% da largura) */}
          <Box style={{ gridColumn: 'span 2' }}>
            <Text size="xs" fw={900} c="indigo.8" tt="uppercase" mb={8} style={{ letterSpacing: rem(1) }}>Progresso Global</Text>
            <Paper withBorder p="md" radius="md" bg="blue.0" h={rem(80)} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              borderBottom: '4px solid var(--mantine-color-blue-6)' 
            }}>
              <Group justify="space-between" align="center">
                <Text size="xl" fw={900} c="blue.9">{initiative.progress}%</Text>
                <Progress value={initiative.progress} color="blue" size="md" radius="xl" w="80px" />
              </Group>
            </Paper>
          </Box>
        </SimpleGrid>
      </Box>

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Stack gap="xl" pt="xs" pl={rem(20)} pr="xs" style={{ borderLeft: '2px solid var(--mantine-color-indigo-1)', marginLeft: rem(10) }}>
              
              {/* TABELA DE AÇÕES */}
              <ActionTable actions={actions} onShowEvidence={onShowEvidence} />

              {/* STATUS REPORT AREA - REDESIGNED AS SPEECH BUBBLES */}
              <SimpleGrid cols={1} spacing="xl">
                <Box style={{ gridColumn: 'span 1' }}>
                  <Stack gap="md">
                    <Group justify="space-between" align="center">

                      <Group gap="xs">
                        <IconMessage2 size={18} color="var(--mantine-color-indigo-6)" />
                        <Text size="xs" fw={900} c="indigo.9" tt="uppercase" style={{ letterSpacing: rem(0.8) }}>Análise do Check-in</Text>
                      </Group>
                      <Button variant="subtle" size="compact-xs" color="gray" leftSection={<IconChevronRight size={14} />}>Ver Histórico</Button>
                    </Group>
                    
                    <Stack gap="lg">
                      {comments.map((c) => (
                        <Group key={c.id} align="flex-start" gap="xs" wrap="nowrap">
                          <Avatar src={c.avatar} radius="xl" size="md" />
                          <Box style={{ flex: 1 }}>
                            <Paper 
                              withBorder 
                              p="md" 
                              radius="lg" 
                              shadow="xs"
                              bg="white"
                              style={{ 
                                position: 'relative',
                                borderTopLeftRadius: 0,
                                borderLeft: '4px solid var(--mantine-color-indigo-6)'
                              }}
                            >
                              <Group justify="space-between" mb={4}>
                                <Text size="xs" fw={900} c="indigo.9">{c.user.toUpperCase()}</Text>
                                <Text size="10px" c="dimmed" fw={700}>{c.time}</Text>
                              </Group>
                              <Text size="sm" fw={500} c="dark.7" style={{ lineHeight: 1.5 }}>
                                {c.text}
                              </Text>
                            </Paper>
                          </Box>
                        </Group>
                      ))}

                      {/* AREA DE NOVO COMENTÁRIO */}
                      {!isWriting ? (
                        <Button 
                          variant="light" 
                          color="indigo" 
                          fullWidth 
                          h={rem(50)} 
                          radius="md" 
                          onClick={() => setIsWriting(true)}
                          style={{ borderStyle: 'dashed', borderWidth: '1px' }}
                        >
                          + Adicionar nova análise tática...
                        </Button>
                      ) : (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                          <Paper withBorder p="md" radius="lg" shadow="sm">
                            <Textarea 
                              placeholder="Escreva sua análise do check-in aqui..." 
                              minRows={3}
                              value={comment}
                              onChange={(e) => setComment(e.currentTarget.value)}
                              variant="unstyled"
                              style={{ paddingBottom: rem(10) }}
                              autoFocus
                            />
                            <Group justify="flex-end" gap="sm">
                              <Button variant="subtle" size="xs" color="gray" onClick={() => setIsWriting(false)}>Cancelar</Button>
                              <Button 
                                size="xs" 
                                color="indigo" 
                                radius="md" 
                                leftSection={<IconSend size={14} />}
                                onClick={handleSendComment}
                                disabled={!comment.trim()}
                              >
                                Enviar Análise
                              </Button>
                            </Group>
                          </Paper>
                        </motion.div>
                      )}
                    </Stack>
                  </Stack>
                </Box>
              </SimpleGrid>

            </Stack>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>
    </Box>
  );
}
