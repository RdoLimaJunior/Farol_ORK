import { Paper, Stack, Group, Text, ThemeIcon, UnstyledButton, Badge, SimpleGrid, Skeleton } from '@mantine/core';
import { IconAlertTriangle, IconRocket, IconCheckbox, IconSearch, IconBulb } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { aiAssistant } from '../../../application/services/AiAssistantService';
import type { AgentInsight } from '../../../application/services/AiAssistantService';
import { useCopilot } from '../../../application/context/CopilotContext';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap = {
  alert: IconAlertTriangle,
  success: IconCheckbox,
  task: IconRocket,
  insight: IconBulb,
};

export function AgentInsightsFeed() {
  const [insights, setInsights] = useState<AgentInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const { executeCommand } = useCopilot();

  useEffect(() => {
    async function load() {
      const data = await aiAssistant.getAgentInsights();
      setInsights(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <Stack gap="md" mt={50}>
      <Group justify="space-between">
        <Group gap="xs">
          <ThemeIcon variant="light" color="farol-blue" radius="md">
            <IconSearch size={18} />
          </ThemeIcon>
          <Text fw={700} size="lg">Feed do Agente (Radar)</Text>
        </Group>
        <Badge variant="dot" color="green">Atualizado agora</Badge>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <Skeleton key={i} height={100} radius="md" />
          ))
        ) : (
          <AnimatePresence>
            {insights.map((insight, index) => {
              const Icon = iconMap[insight.type] || IconBulb;
              return (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Paper 
                    withBorder 
                    p="md" 
                    radius="md" 
                    className="insight-card"
                    style={{
                      height: '100%',
                      transition: 'all 0.2s ease',
                      borderLeft: `4px solid var(--mantine-color-${insight.color}-6)`
                    }}
                  >
                    <Stack gap="sm">
                      <Group justify="space-between" wrap="nowrap" align="flex-start">
                        <Group gap="sm" wrap="nowrap" align="flex-start">
                          <ThemeIcon color={insight.color} variant="light" size="lg" radius="md">
                            <Icon size={20} />
                          </ThemeIcon>
                          <Stack gap={2}>
                            <Text fw={700} size="sm">{insight.title}</Text>
                            <Text size="xs" c="dimmed" lineClamp={2}>{insight.message}</Text>
                          </Stack>
                        </Group>
                      </Group>
                      
                      {insight.actionLabel && (
                        <UnstyledButton 
                          onClick={() => insight.actionCommand && executeCommand(insight.actionCommand)}
                          style={{ alignSelf: 'flex-end' }}
                        >
                          <Text size="xs" fw={700} c={insight.color} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            {insight.actionLabel} →
                          </Text>
                        </UnstyledButton>
                      )}
                    </Stack>
                  </Paper>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </SimpleGrid>

      <style dangerouslySetInnerHTML={{ __html: `
        .insight-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--mantine-shadow-md);
          background: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6));
        }
      `}} />
    </Stack>
  );
}
