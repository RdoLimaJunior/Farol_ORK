import { AppShell, Burger, Group, NavLink, Title, Text, Avatar, Menu, UnstyledButton, rem, Box, Badge, Divider, Stack, ThemeIcon, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconDashboard, 
  IconTargetArrow, 
  IconLogout, 
  IconSettings, 
  IconUser,
  IconSearch,
  IconUsers,
  IconListDetails,
  IconHeartHandshake,
  IconSparkles,
  IconTournament,
  IconTrophy,
  IconUserCircle,
  IconRocket,
  IconArrowUpRight,
  IconSun,
  IconMoonStars
} from '@tabler/icons-react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { spotlight } from '@mantine/spotlight';
import { useAuthContext } from '../../application/context/AuthContext';
import { EmailVerificationBanner } from '../components/EmailVerificationBanner';
import { useMantineColorScheme, ActionIcon } from '@mantine/core';

export function AppLayout() {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, signOut } = useAuthContext();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const initials = profile?.fullName
    ? profile.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : '??';

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const navGroups = [
    {
      label: 'GESTÃO ESTRATÉGICA',
      links: [
        { icon: IconRocket, label: 'Início', path: '/' },
        { icon: IconDashboard, label: 'Visão Geral', path: '/overview' },
        { icon: IconTrophy, label: 'Estratégicos', path: '/strategy' },
        { icon: IconTournament, label: 'Táticos', path: '/tactical' },
        { icon: IconUserCircle, label: 'Meus OKRs', path: '/individual' },
      ]
    },
    {
      label: 'OPERAÇÃO',
      links: [
        { icon: IconListDetails, label: 'Execução', path: '/execution' },
        { icon: IconHeartHandshake, label: 'Cultura', path: '/engagement', badge: 'NEW' },
      ]
    },
    {
      label: 'GOVERNANÇA',
      adminOnly: true,
      links: [
        { icon: IconUsers, label: 'Membros', path: '/members' },
        { icon: IconSettings, label: 'Configurações', path: '/settings' },
      ]
    }
  ];

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header style={{ borderBottom: '1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))' }}>
        <Group h="100%" px="xl" justify="space-between">
          <Group gap="xl">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group gap="xs" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              <Box style={{ 
                  background: 'linear-gradient(45deg, var(--mantine-color-blue-7), var(--mantine-color-cyan-5))',
                  borderRadius: '10px',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}>
                <IconTargetArrow size={24} color="white" />
              </Box>
              <Title order={3} fw={900} style={{ letterSpacing: -1 }}>
                FAROL
              </Title>
            </Group>
          </Group>

          <Group gap="xl" visibleFrom="sm">
            <UnstyledButton 
              onClick={spotlight.open}
              style={{
                padding: '10px 16px',
                borderRadius: '12px',
                background: 'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-6))',
                border: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
                width: rem(350),
                transition: 'all 0.2s ease'
              }}
            >
              <Group justify="space-between">
                <Group gap="xs">
                  <IconSearch size={18} color="var(--mantine-color-gray-6)" />
                  <Text size="sm" c="dimmed" fw={500}>Buscar no Farol...</Text>
                </Group>
                <Group gap={4} visibleFrom="md">
                   <Badge variant="light" color="gray" size="sm" radius="sm">Ctrl</Badge>
                   <Badge variant="light" color="gray" size="sm" radius="sm">K</Badge>
                </Group>
              </Group>
            </UnstyledButton>
          </Group>

          <Group gap="md">
            <ActionIcon
              onClick={() => toggleColorScheme()}
              variant="default"
              size="lg"
              aria-label="Toggle color scheme"
              radius="md"
            >
              {dark ? <IconSun size={20} stroke={1.5} /> : <IconMoonStars size={20} stroke={1.5} />}
            </ActionIcon>

            <Menu shadow="xl" width={220} position="bottom-end" withArrow radius="md">
              <Menu.Target>
                <UnstyledButton>
                  <Group gap="sm">
                    <Avatar 
                      radius="md" 
                      variant="filled" 
                      color="cyan"
                    >
                        {initials}
                    </Avatar>
                    <Box visibleFrom="md">
                      <Text size="sm" fw={700} lh={1}>{profile?.fullName || 'Carregando...'}</Text>
                      <Text size="xs" c="dimmed">{profile?.jobTitle || 'Membro'}</Text>
                    </Box>
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown p="xs">
                <Menu.Label>Meu Espaço</Menu.Label>
                <Menu.Item 
                  leftSection={<IconUser size={16} />}
                  onClick={() => navigate('/profile')}
                >
                  Perfil e Atividades
                </Menu.Item>
                <Menu.Item 
                  leftSection={<IconSparkles size={16} color="orange" />}
                  onClick={() => navigate('/')}
                >
                  Minhas Metas
                </Menu.Item>
                
                <Menu.Divider />
                
                <Menu.Label>Geral</Menu.Label>
                <Menu.Item 
                  leftSection={<IconSettings size={16} />}
                  onClick={() => navigate('/settings')}
                >
                  Configurações
                </Menu.Item>
                <Menu.Item 
                  color="red" 
                  leftSection={<IconLogout size={16} />}
                  onClick={handleLogout}
                >
                  Sair do Farol
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" style={{ borderRight: '1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))', backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-8))' }}>
        <AppShell.Section grow>
          <Stack gap="xl">
            {navGroups.map((group, idx) => {
              if (group.adminOnly && profile?.role !== 'admin') return null;
              
              return (
                <Box key={idx}>
                  <Text size="xs" fw={800} c="dimmed" mb="xs" pl="sm" style={{ letterSpacing: rem(1) }}>
                    {group.label}
                  </Text>
                  <Stack gap={4}>
                    {group.links.map((link: any) => (
                      <NavLink
                        key={link.path}
                        active={location.pathname === link.path}
                        label={
                          <Group justify="space-between" style={{ width: '100%' }}>
                            <Text size="sm" fw={600}>{link.label}</Text>
                            {link.badge && <Badge size="xs" variant="filled" color="pink">{link.badge}</Badge>}
                          </Group>
                        }
                        leftSection={
                            <ThemeIcon 
                                variant={location.pathname === link.path ? 'filled' : 'light'} 
                                color={location.pathname === link.path ? 'farol-blue' : 'gray'} 
                                size="md" 
                                radius="md"
                            >
                                <link.icon size={18} stroke={2} />
                            </ThemeIcon>
                        }
                        onClick={() => navigate(link.path)}
                        variant="filled"
                        py="sm"
                      />
                    ))}
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </AppShell.Section>

        <AppShell.Section>
          <Divider mb="sm" variant="dashed" />
          <Group justify="space-between" align="center" px="sm">
            <Text size="xs" c="dimmed" fw={500}>FAROL v3.2</Text>
            <Badge size="xs" color="gray" variant="outline">Stable</Badge>
          </Group>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <EmailVerificationBanner />
        <Container size="xl" py="md">
           <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
