import { Paper, Stack, Group, Text, ThemeIcon, Badge, SimpleGrid, rem, Skeleton, Box, Tooltip } from '@mantine/core';
import { IconSearch, IconTargetArrow, IconInfoCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { aiAssistant } from '../../../application/services/AiAssistantService';
import type { AgentInsight } from '../../../application/services/AiAssistantService';
import { useCopilot } from '../../../application/context/CopilotContext';

export function AgentInsightsFeed() {
  const [insights, setInsights] = useState<AgentInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const { executeCommand } = useCopilot();

  useEffect(() => {
    async function load() {
      const data = await aiAssistant.getAgentInsights();
      setInsights(data || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <Box p={0}>
      <Stack gap="md">
        <Group gap="xs">
          <ThemeIcon variant="light" color="farol-blue" radius="md">
            <IconSearch size={18} />
          </ThemeIcon>
          <Text fw={800} size="lg" style={{ letterSpacing: rem(-0.5) }}>Radar de Estratégia</Text>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <Skeleton key={i} height={100} radius="md" />
            ))
          ) : (
            insights.map((insight) => (
              <Paper 
                key={insight.id} 
                withBorder 
                p="xs" 
                radius="md" 
                onClick={() => insight.actionCommand && executeCommand(insight.actionCommand)}
                style={{ 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  borderLeft: `3px solid var(--mantine-color-${insight.color}-6)`,
                  background: 'var(--mantine-color-body)',
                }}
              >
                <Stack gap={4}>
                  <Tooltip 
                    label={insight.message}
                    withArrow 
                    multiline 
                    w={300}
                    position="top-start"
                  >
                    <Text fw={800} size="sm" style={{ lineHeight: 1.2, cursor: 'help' }}>
                      {insight.title}
                    </Text>
                  </Tooltip>

                  {insight.linkedKrs && insight.linkedKrs.length > 0 && (
                    <Stack gap={2} mt={4}>
                      {insight.linkedKrs.map((kr, i) => (
                        <Group 
                          key={i} 
                          gap="xs" 
                          px={6}
                          py={4}
                          className="kr-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            executeCommand(`/tactical?search=${kr}`);
                          }}
                          style={{ 
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                          }}
                        >
                          <IconTargetArrow size={14} color={`var(--mantine-color-${insight.color}-6)`} />
                          <Text size="xs" fw={600} style={{ fontSize: rem(11) }}>
                            {kr}
                          </Text>
                        </Group>
                      ))}
                    </Stack>
                  )}
                </Stack>
              </Paper>
            ))
          )}
        </SimpleGrid>
      </Stack>

      <style dangerouslySetInnerHTML={{ __html: `
        .kr-item:hover {
          background: var(--mantine-color-default-hover);
        }
        .kr-item:hover span {
          text-decoration: underline;
        }
      `}} />
    </Box>
  );
}
