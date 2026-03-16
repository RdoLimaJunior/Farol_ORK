import { Container, Title, Text, Stack, ThemeIcon, rem, Group } from '@mantine/core';
import { IconTrophy, IconHeartHandshake } from '@tabler/icons-react';
import { motion } from 'framer-motion';

export default function Engagement() {
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
                <ThemeIcon variant="light" color="pink" size="xl" radius="md">
                  <IconHeartHandshake size={24} />
                </ThemeIcon>
                <Title order={1} style={{ fontSize: rem(32), fontWeight: 900 }}>
                  Engajamento & <Text span c="pink.6" inherit>Cultura</Text>
                </Title>
              </Group>
              <Text c="dimmed" size="lg">Hub CFR (Conversas, Feedback e Reconhecimento) e Gamificação.</Text>
            </Stack>
          </Group>
        </motion.div>

        <Stack align="center" py={100}>
            <ThemeIcon size={80} radius="xl" color="pink" variant="light">
                <IconTrophy size={40} />
            </ThemeIcon>
            <Title order={2}>Ranking PIN+ em breve</Title>
            <Text c="dimmed" ta="center" style={{ maxWidth: rem(400) }}>
                Estamos preparando um feed social e sistema de medalhas para celebrar as conquistas do seu time.
            </Text>
        </Stack>
      </Stack>
    </Container>
  );
}
