import { 
  Container, 
  Text, 
  Stack, 
  Group, 
  ThemeIcon, 
  Paper, 
  SimpleGrid,
  UnstyledButton,
  Box,
  Button
} from '@mantine/core';
import { 
  IconSettings, 
  IconPalette, 
  IconShieldLock, 
  IconNotification,
  IconChevronRight,
  IconDatabase,
  IconRocket
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../application/context/AuthContext';
import { motion } from 'framer-motion';
import { PageHeader } from '../components/common/PageHeader';
import { seedDemoData } from '../../infrastructure/data/seedingService';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

export default function Settings() {
  const navigate = useNavigate();
  const { profile } = useAuthContext();
  const [seeding, setSeeding] = useState(false);

  const handleSeed = async () => {
    setSeeding(true);
    const result = await seedDemoData();
    if (result.success) {
      notifications.show({
        title: 'MVP Populado! 🚀',
        message: `${result.count} membros criados e OKRs atribuídos com sucesso.`,
        color: 'green'
      });
    } else {
      notifications.show({
        title: 'Erro ao popular',
        message: result.error,
        color: 'red'
      });
    }
    setSeeding(false);
  };

  const settingsItems = [
    { 
      title: 'Design System', 
      description: 'Explore os componentes e tokens visuais do FAROL.', 
      icon: IconPalette, 
      color: 'violet', 
      path: '/design-system',
      adminOnly: true
    },
    { 
      title: 'Segurança', 
      description: 'Gerencie autenticação de dois fatores e senhas.', 
      icon: IconShieldLock, 
      color: 'blue', 
      path: '#',
      adminOnly: false
    },
    { 
      title: 'Notificações', 
      description: 'Configure alertas de check-in e prazos de OKR.', 
      icon: IconNotification, 
      color: 'orange', 
      path: '#',
      adminOnly: false
    },
  ];

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <PageHeader 
          title="Configurações"
          highlightedText="da Plataforma"
          description="Personalize sua experiência e gerencie as preferências da conta."
          icon={IconSettings}
        />

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {settingsItems.map((item, index) => {
            if (item.adminOnly && profile?.role !== 'admin') return null;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <UnstyledButton
                  onClick={() => navigate(item.path)}
                  style={{ width: '100%' }}
                >
                  <Paper 
                    withBorder 
                    p="xl" 
                    radius="md" 
                    style={{ 
                      transition: 'all 0.2s ease',
                      borderBottom: `4px solid var(--mantine-color-${item.color}-6)`
                    }}
                    className="hover-card"
                  >
                    <Stack gap="md">
                      <Group justify="space-between" wrap="nowrap">
                        <ThemeIcon color={item.color} variant="light" size="xl" radius="md">
                          <item.icon size={28} />
                        </ThemeIcon>
                        <IconChevronRight size={18} color="var(--mantine-color-gray-4)" />
                      </Group>
                      
                      <Box>
                        <Text fw={700} size="lg">{item.title}</Text>
                        <Text size="sm" c="dimmed">{item.description}</Text>
                      </Box>
                    </Stack>
                  </Paper>
                </UnstyledButton>
              </motion.div>
            );
          })}
        </SimpleGrid>
        {/* DEV TOOLS */}
        {profile?.role === 'admin' && (
          <Paper withBorder p="xl" radius="lg" mt="xl" style={{ borderStyle: 'dashed', backgroundColor: 'transparent' }}>
            <Stack align="center" gap="md">
              <Group gap="xs">
                <IconDatabase size={20} color="var(--mantine-color-farol-blue-6)" />
                <Text fw={700}>Área de Desenvolvimento</Text>
              </Group>
              <Text size="sm" c="dimmed" ta="center">
                Use o botão abaixo para popular o sistema com 25 membros mockados e atribuir os OKRs existentes. 
                Isso é útil para visualizar o MVP funcionando com volume de dados.
              </Text>
              <Button 
                variant="light" 
                color="farol-blue" 
                radius="md" 
                loading={seeding}
                onClick={handleSeed}
                leftSection={<IconRocket size={18} />}
              >
                Popular MVP com Dados
              </Button>
            </Stack>
          </Paper>
        )}
      </Stack>

      <style dangerouslySetInnerHTML={{ __html: `
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--mantine-shadow-xl);
          border-color: var(--mantine-color-farol-blue-3);
        }
      `}} />
    </Container>
  );
}
