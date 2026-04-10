import { 
  Container, 
  Card, 
  Group, 
  ThemeIcon, 
  Stack, 
  Badge, 
  Button, 
  rem,
  Box,
  Title,
  Text,
} from '@mantine/core';
import { 
  IconTrophy, 
  IconRefresh, 
  IconChecks, 
  IconHistory, 
  IconArrowsJoin,
  IconArrowRight,
  IconCalendarEvent,
  IconCalendar
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';

const rituals = [
  {
    title: 'OKR Planning',
    description: 'Definição e alinhamento estratégico para o novo ciclo.',
    icon: IconTrophy,
    color: 'blue',
    path: '/ceremony/planning',
    badge: 'Início do Ciclo',
    lastExecution: '01/01/2026'
  },
  {
    title: 'Weekly Check-in',
    description: 'Ritual mais importante: acompanhamento semanal de progresso e bloqueios.',
    icon: IconRefresh,
    color: 'teal',
    path: '/ceremony/checkin',
    badge: 'Recorrente',
    highlight: true,
    lastExecution: '06/04/2026'
  },
  {
    title: 'Results Review',
    description: 'Avaliação dos resultados finais e atingimento das metas.',
    icon: IconChecks,
    color: 'indigo',
    path: '/ceremony/review',
    badge: 'Fim do Ciclo',
    lastExecution: '31/03/2026'
  },
  {
    title: 'Retrospective',
    description: 'Reflexão sobre o processo: o que funcionou e lições aprendidas.',
    icon: IconHistory,
    color: 'orange',
    path: '/ceremony/retrospective',
    badge: 'Aprendizado',
    lastExecution: '31/03/2026'
  },
  {
    title: 'Sync / Alignment',
    description: 'Sincronização entre áreas para resolver dependências e conflitos.',
    icon: IconArrowsJoin,
    color: 'cyan',
    path: '/ceremony/sync',
    badge: 'Integração',
    lastExecution: '02/04/2026'
  }
];

export default function CeremonyHub() {
  const navigate = useNavigate();

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <PageHeader 
          title="Cerimônia"
          highlightedText="de Gestão"
          description="Rituais recorrentes para garantir o alinhamento, acompanhamento e aprendizado contínuo da estratégia."
          icon={IconCalendarEvent}
          color="farol-blue"
        />

        <Box>
          <Text fw={800} size="sm" c="dimmed" mb="lg" style={{ letterSpacing: rem(1) }}>
            RITUAIS DISPONÍVEIS
          </Text>

          <Stack gap="md">
            {rituals.map((ritual) => (
              <Card 
                key={ritual.title} 
                shadow="sm" 
                padding="lg" 
                radius="lg" 
                withBorder
                style={{ 
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer',
                  borderColor: ritual.highlight ? 'var(--mantine-color-teal-3)' : undefined,
                  borderWidth: ritual.highlight ? rem(2) : undefined
                }}
                onClick={() => navigate(ritual.path)}
                className="ritual-card"
              >
                <Group justify="space-between" wrap="nowrap">
                   <Group gap="xl">
                      <ThemeIcon 
                        size={48} 
                        radius="md" 
                        variant="light" 
                        color={ritual.color}
                      >
                        <ritual.icon size={26} stroke={2} />
                      </ThemeIcon>
                      
                      <Stack gap={2}>
                        <Group gap="xs">
                           <Text fw={800} size="lg">{ritual.title}</Text>
                           <Badge variant="light" color={ritual.color} size="xs" radius="sm">
                             {ritual.badge}
                           </Badge>
                        </Group>
                        <Text size="sm" c="dimmed" style={{ maxWidth: rem(450) }}>
                          {ritual.description}
                        </Text>
                      </Stack>
                   </Group>

                   <Stack align="flex-end" gap={4}>
                      <Text size="xs" c="dimmed" fw={700}>Última execução</Text>
                      <Group gap={5}>
                         <IconCalendar size={14} color="var(--mantine-color-gray-5)" />
                         <Text size="sm" fw={600}>{ritual.lastExecution}</Text>
                      </Group>
                      <Button 
                        variant="subtle" 
                        color={ritual.color} 
                        rightSection={<IconArrowRight size={16} />}
                        size="xs"
                        mt="xs"
                      >
                        Iniciar
                      </Button>
                   </Stack>
                </Group>
              </Card>
            ))}
          </Stack>
        </Box>

        <Card radius="lg" p="xl" bg="var(--mantine-color-blue-0)" withBorder style={{ borderStyle: 'dashed' }}>
           <Group justify="space-between">
             <Stack gap={4}>
               <Text fw={800} size="md">Histórico de Cerimônias</Text>
               <Text size="sm" c="dimmed">Consulte as atas e decisões tomadas em rituais passados.</Text>
             </Stack>
             <Button variant="outline" color="blue" radius="md">Ver Histórico Completo</Button>
           </Group>
        </Card>
      </Stack>

      <style dangerouslySetInnerHTML={{ __html: `
        .ritual-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--mantine-shadow-md);
        }
      `}} />
    </Container>
  );
}
