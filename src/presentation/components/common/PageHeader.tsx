import { Group, Stack, ThemeIcon, Title, Text, rem, Box } from '@mantine/core';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  highlightedText?: string;
  description: string;
  icon: React.ElementType;
  color?: string;
  rightSection?: ReactNode;
}

export function PageHeader({ 
  title, 
  highlightedText, 
  description, 
  icon: Icon, 
  color = 'farol-blue',
  rightSection 
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Group justify="space-between" align="flex-end" mb="md">
        <Stack gap={0}>
          <Group gap="xs">
            <ThemeIcon 
              variant="light" 
              color={color} 
              size="xl" 
              radius="md"
              style={{
                backgroundColor: `light-dark(var(--mantine-color-${color}-0), rgba(var(--mantine-color-${color}-6-rgb), 0.15))`
              }}
            >
              <Icon size={24} stroke={2} strokeWidth={2} />
            </ThemeIcon>
            <Title order={1} style={{ fontSize: rem(32), fontWeight: 900, letterSpacing: rem(-0.5) }}>
              {title} {highlightedText && <Text span c={`${color}.6`} inherit>{highlightedText}</Text>}
            </Title>
          </Group>
          <Text c="dimmed" size="lg" fw={500} mt={rem(4)}>
            {description}
          </Text>
        </Stack>
        {rightSection && (
          <Box visibleFrom="sm">
            {rightSection}
          </Box>
        )}
      </Group>
    </motion.div>
  );
}
