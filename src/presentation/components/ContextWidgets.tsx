import { SimpleGrid, Paper, Text, Group, ThemeIcon, Badge, Stack, Button, Box } from '@mantine/core';
import { IconBell, IconChevronRight, IconTrendingDown, IconCalendarCheck, IconArrowUpRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';

export function ContextWidgets() {
  const getTimeContext = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { greeting: 'Bom dia', task: 'Check-ins pendentes', color: 'orange' };
    if (hour < 18) return { greeting: 'Boa tarde', task: 'Análise de performance', color: 'blue' };
    return { greeting: 'Boa noite', task: 'Planejamento de amanhã', color: 'indigo' };
  };

  const context = getTimeContext();

  return (
    <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
      <motion.div whileHover={{ y: -5 }}>
        <Paper p="lg" radius="lg" withBorder style={{ height: '100%', position: 'relative', overflow: 'hidden', backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-7))' }}>
          <Box style={{ position: 'absolute', right: -20, top: -20, opacity: 0.1 }}>
             <IconCalendarCheck size={120} />
          </Box>
          <Stack gap="xs">
            <Group justify="space-between">
              <ThemeIcon color="farol-blue.4" variant="light" size="xl">
                <IconBell size={24} />
              </ThemeIcon>
              <Badge color="farol-blue" variant="light">HOJE</Badge>
            </Group>
            <Text fw={700} size="lg" mt="sm">{context.greeting}, Admin!</Text>
            <Text size="sm" c="dimmed">Você tem 3 check-ins estratégicos que precisam de atenção agora.</Text>
            <Button variant="light" color="farol-blue" fullWidth mt="md" rightSection={<IconChevronRight size={16} />}>
               Fazer Check-ins
            </Button>
          </Stack>
        </Paper>
      </motion.div>

      <motion.div whileHover={{ y: -5 }}>
        <Paper p="lg" radius="lg" withBorder style={{ height: '100%', borderLeft: '4px solid var(--mantine-color-error-6)', backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-7))' }}>
          <Stack gap="xs">
            <Group justify="space-between">
              <ThemeIcon color="error.1" variant="light" size="xl">
                <IconTrendingDown size={24} color="var(--mantine-color-error-6)" />
              </ThemeIcon>
              <Badge color="error" variant="light">ALERTA IA</Badge>
            </Group>
            <Text fw={700} size="lg" mt="sm">KR de Vendas caiu 5%</Text>
            <Text size="sm" c="dimmed">A IA detectou um desvio no fluxo de leads. Queremos analisar as causas raízes?</Text>
            <Button variant="outline" color="error" fullWidth mt="md">
               Análise Crítica
            </Button>
          </Stack>
        </Paper>
      </motion.div>

      <motion.div whileHover={{ y: -5 }}>
        <Paper 
          p="lg" 
          radius="lg" 
          withBorder 
          style={{ 
            height: '100%', 
            borderStyle: 'dashed', 
            borderColor: 'light-dark(var(--mantine-color-farol-blue-4), var(--mantine-color-dark-4))',
            backgroundColor: 'light-dark(var(--mantine-color-farol-blue-0), rgba(3, 169, 244, 0.05))'
          }}
        >
          <Stack gap="xs" align="center" justify="center" style={{ height: '100%' }}>
            <ThemeIcon color="farol-blue" variant="light" size={50} radius="xl">
              <IconArrowUpRight size={28} />
            </ThemeIcon>
            <Text fw={700} ta="center">Explorar Novas Fronteiras</Text>
            <Text size="xs" c="dimmed" ta="center">Dica IA: Expandir o objetivo de Talentos pode acelerar o KR de Produto em 15%.</Text>
            <Text size="xs" fw={700} c="farol-blue.7" style={{ cursor: 'pointer' }}>Ver Insight →</Text>
          </Stack>
        </Paper>
      </motion.div>

    </SimpleGrid>
  );
}
