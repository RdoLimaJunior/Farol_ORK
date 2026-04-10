import { 
  Text, 
  Box, 
  rem, 
  Group, 
  Stack, 
  Paper, 
  SimpleGrid, 
  ThemeIcon,
  Badge,
  Avatar
} from '@mantine/core';
import { IconAlertOctagon, IconSearch, IconBulb, IconCalendar } from '@tabler/icons-react';

interface FCAData {
  fato: string;
  items: {
    causa: string;
    acao: string;
    prazo: string;
    responsavel: string;
    status?: string; // Ex: 'Iniciado', 'Não Iniciado', 'Em Andamento'
  }[];
}

interface FCAMatrixProps {
  data: FCAData;
  stickyTop?: string | number;
}

export function FCAMatrix({ data, stickyTop }: FCAMatrixProps) {
  return (
    <Box mb={rem(40)}>
      <Stack gap="xl">
        {/* SEÇÃO 1: O FATO (FULL WIDTH) - SMART STICKY */}
        <Paper 
          withBorder 
          p="md" 
          radius="md" 
          bg="red.0" 
          style={{ 
            borderTop: '4px solid var(--mantine-color-red-6)',
            position: stickyTop ? 'sticky' : 'relative',
            top: stickyTop,
            zIndex: 31,
            boxShadow: stickyTop ? '0 4px 6px -1px rgba(0,0,0,0.05)' : 'none'
          }}
        >
          <Group wrap="nowrap" align="center" gap="xl">
            <Box style={{ flexShrink: 0, minWidth: rem(200) }}>
              <Group gap="md" wrap="nowrap">
                <ThemeIcon color="red" size="lg" radius="md" variant="filled">
                  <IconAlertOctagon size={20} />
                </ThemeIcon>
                <Box>
                  <Text size="xs" fw={900} c="red.9" tt="uppercase" style={{ letterSpacing: rem(1) }}>1. O FATO</Text>
                  <Text size="sm" fw={900} c="red.9">O QUE OCORREU?</Text>
                </Box>
              </Group>
            </Box>
            
            <Box style={{ flex: 1 }}>
              <Text size="md" fw={700} c="red.9" style={{ lineHeight: 1.2 }}>
                {data.fato}
              </Text>
            </Box>
          </Group>
        </Paper>

        {/* SEÇÃO 2: CAUSAS E AÇÕES (LADO A LADO) */}
        <Stack gap="md">
          {data.items.map((item, index) => (
            <Paper key={index} withBorder radius="md" p={0} shadow="xs" style={{ overflow: 'hidden' }}>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing={0}>
                {/* 2. A CAUSA */}
                <Box p="xl" bg="orange.0" style={{ borderRight: '1px solid var(--mantine-color-gray-2)' }}>
                  <Group mb="md">
                    <ThemeIcon color="orange" size="lg" radius="md" variant="light">
                      <IconSearch size={20} />
                    </ThemeIcon>
                    <Text size="xs" fw={900} c="orange.9" tt="uppercase">2. A CAUSA</Text>
                  </Group>
                  <Text size="sm" fw={700} c="orange.9" style={{ lineHeight: 1.5 }}>
                    {item.causa}
                  </Text>
                </Box>

                {/* 3. A AÇÃO */}
                <Box p="xl" bg="white">
                  <Group justify="space-between" mb="md">
                    <Group>
                      <ThemeIcon color="teal" size="lg" radius="md" variant="light">
                        <IconBulb size={20} />
                      </ThemeIcon>
                      <Text size="xs" fw={900} c="teal.9" tt="uppercase">3. A AÇÃO</Text>
                    </Group>
                    <Badge color="teal" variant="filled" size="sm" radius="sm">AÇÃO CORRETIVA</Badge>
                  </Group>
                  <Text size="md" fw={900} c="dark.6" mb="lg" style={{ lineHeight: 1.4 }}>
                    {item.acao}
                  </Text>
                  
                  <Group gap="sm" wrap="wrap">
                    <Badge 
                      color={item.status === 'Iniciado' ? 'teal.7' : item.status === 'Em Andamento' ? 'blue' : 'gray'} 
                      variant="filled" 
                      size="xs" 
                      radius="xs"
                    >
                      {item.status || 'Não Iniciado'}
                    </Badge>
                    <Group gap="xs">
                      <Avatar size="xs" radius="xl" src={`https://i.pravatar.cc/150?u=${item.responsavel}`} />
                      <Text size="xs" fw={800} c="dimmed">{item.responsavel}</Text>
                    </Group>
                    <Group gap="xs">
                      <IconCalendar size={14} color="var(--mantine-color-gray-5)" />
                      <Text size="xs" fw={800} c="dimmed">PRAZO: {item.prazo}</Text>
                    </Group>
                  </Group>
                </Box>
              </SimpleGrid>
            </Paper>
          ))}
        </Stack>
      </Stack>

    <Box mt="xl" style={{ textAlign: 'center' }}>
        <Text size="xs" fw={800} c="dimmed" fs="italic">
          Matriz FCA v2.0 • Governança de Alta Performance • Farol OKR
        </Text>
      </Box>
    </Box>
  );
}
