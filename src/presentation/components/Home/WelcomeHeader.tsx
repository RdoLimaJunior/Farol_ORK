import { Group, ThemeIcon, Title, Text, Stack, rem } from '@mantine/core';
import { IconRocket } from '@tabler/icons-react';

export function WelcomeHeader() {
  return (
    <Stack gap="xs" align="center">
      <Group gap="xs">
        <ThemeIcon variant="light" color="farol-blue" size="xl" radius="md">
          <IconRocket size={24} />
        </ThemeIcon>
        <Title order={1} style={{ fontSize: rem(42), fontWeight: 900, textAlign: 'center' }}>
          Olá, <Text span c="farol-blue.6" inherit>Admin</Text>.
        </Title>
      </Group>
      <Text c="dimmed" size="lg" fw={500}>Qual o foco estratégico de hoje?</Text>
    </Stack>
  );
}
