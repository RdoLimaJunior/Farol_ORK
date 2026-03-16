import { UnstyledButton, Group, Text, ThemeIcon, rem } from '@mantine/core';
import type { ElementType } from 'react';
import { motion } from 'framer-motion';

interface ActionChipProps {
  label: string;
  icon: ElementType;
  color?: string;
  onClick: () => void;
  index?: number;
}

export function ActionChip({ label, icon: Icon, color = 'farol-blue', onClick, index = 0 }: ActionChipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <UnstyledButton
        onClick={onClick}
        style={(theme) => ({
          padding: `${rem(8)} ${rem(16)}`,
          borderRadius: theme.radius.xl,
          backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-6))',
          border: `1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))`,
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: `var(--mantine-color-${color}-4)`,
            backgroundColor: `light-dark(var(--mantine-color-${color}-0), rgba(var(--mantine-color-${color}-6-rgb), 0.1))`,
            boxShadow: 'var(--mantine-shadow-sm)'
          },
        })}
      >
        <Group gap="sm" wrap="nowrap">
          <ThemeIcon 
            size="sm" 
            variant="light" 
            color={color} 
            radius="md"
          >
            <Icon size={14} stroke={2.5} />
          </ThemeIcon>
          <Text size="xs" fw={700} c="dimmed" style={{ whiteSpace: 'nowrap' }}>
            {label}
          </Text>
        </Group>
      </UnstyledButton>
    </motion.div>
  );
}
