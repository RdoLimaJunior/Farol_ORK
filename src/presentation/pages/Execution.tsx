import { Container, Title, Text, Stack, ThemeIcon, rem, Group } from '@mantine/core';
import { IconRocket, IconListDetails } from '@tabler/icons-react';
import { motion } from 'framer-motion';

export default function Execution() {
  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Group justify="space-between" align="flex-end">
            <Stack gap={0}>
              <Group gap="xs">
                <ThemeIcon variant="light" color="blue" size="xl" radius="md">
                  <IconListDetails size={24} />
                </ThemeIcon>
                <Title order={1} style={{ fontSize: rem(32), fontWeight: 900 }}>
                  Execução & <Text span c="blue.6" inherit>Iniciativas</Text>
                </Title>
              </Group>
              <Text c="dimmed" size="lg">Gerenciamento de tarefas e projetos vinculados aos KRs estratégicos.</Text>
            </Stack>
          </Group>
        </motion.div>

        <Stack align="center" py={100} gap="xs">
            <ThemeIcon size={60} radius="xl" color="blue" variant="light">
                <IconRocket size={30} />
            </ThemeIcon>
            <Text fw={700}>Onde o trabalho real acontece</Text>
            <Text c="dimmed">Em breve você poderá gerenciar seu backlog e plano de ação aqui.</Text>
        </Stack>
      </Stack>
    </Container>
  );
}
