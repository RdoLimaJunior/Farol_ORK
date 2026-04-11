import { Group, Button, rem } from '@mantine/core';
import { IconAlertTriangle, IconChartBar, IconListCheck, IconPlus } from '@tabler/icons-react';
import { useCopilot } from '../../../application/context/CopilotContext';
import { motion } from 'framer-motion';

const SUGGESTIONS = [
  { label: 'KRs em risco hoje?', icon: IconAlertTriangle, color: 'red', command: '+ analisar riscos' },
  { label: 'Resumo de progresso Q1', icon: IconChartBar, color: 'blue', command: '+ resumo Q1' },
  { label: 'Ver meus OKRs pendentes', icon: IconListCheck, color: 'orange', command: '/checkins' },
  { label: 'Criar OKR para Engenharia', icon: IconPlus, color: 'teal', command: '+ criar OKR Engenharia' },
];

export function QuickActionChips() {
  const { executeCommand } = useCopilot();

  return (
    <Group justify="center" gap={4} mb="xs" px="md">
      {SUGGESTIONS.map((s, index) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Button
            variant="light"
            color={s.color}
            leftSection={<s.icon size={12} />}
            radius="xl"
            size="xs"
            onClick={() => executeCommand(s.command)}
            styles={{
              root: {
                backgroundColor: 'var(--mantine-color-default)',
                backdropFilter: 'blur(10px)',
                border: `1px solid var(--mantine-color-default-border)`,
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
                }
              }
            }}
          >
            {s.label}
          </Button>
        </motion.div>
      ))}
    </Group>
  );
}
