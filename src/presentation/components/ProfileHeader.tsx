import { Paper, Group, Avatar, Text, Stack, Badge, Progress, rem } from '@mantine/core';
import { IconTrophy, IconBolt, IconStar } from '@tabler/icons-react';

interface ProfileHeaderProps {
  userName: string;
  role: string;
  level: number;
  points: number;
  nextLevelPoints: number;
}

export function ProfileHeader({ userName, role, level, points, nextLevelPoints }: ProfileHeaderProps) {
  const progress = (points / nextLevelPoints) * 100;

  return (
    <Paper withBorder p="md" radius="md" bg="gray.0">
      <Group justify="space-between">
        <Group>
          <Avatar size="xl" radius="md" color="blue">
            {userName.substring(0, 2).toUpperCase()}
          </Avatar>
          <Stack gap={0}>
            <Text fw={700} size="lg">{userName}</Text>
            <Text size="xs" c="dimmed">{role}</Text>
            <Group gap="xs" mt={4}>
              <Badge variant="filled" color="yellow" leftSection={<IconStar size={12} />}>
                Nível {level}
              </Badge>
              <Badge variant="light" color="blue" leftSection={<IconBolt size={12} />}>
                {points} XP
              </Badge>
            </Group>
          </Stack>
        </Group>

        <Stack gap={4} style={{ minWidth: rem(200) }}>
          <Group justify="space-between">
            <Text size="xs" fw={700}>Próximo nível</Text>
            <Text size="xs" c="dimmed">{points} / {nextLevelPoints} XP</Text>
          </Group>
          <Progress value={progress} size="sm" radius="xl" color="yellow" striped animated />
          <Group gap={4} justify="center">
            <IconTrophy size={14} color="var(--mantine-color-yellow-6)" />
            <Text size="xs" c="dimmed">Complete 2 check-ins para subir!</Text>
          </Group>
        </Stack>
      </Group>
    </Paper>
  );
}
