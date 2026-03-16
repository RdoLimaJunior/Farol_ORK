import { 
  Title, 
  Grid, 
  Paper, 
  Text, 
  Box, 
  Stack, 
  Button, 
  TextInput, 
  Group, 
  Badge, 
  ColorSwatch,
  useMantineTheme,
  Switch,
  Avatar,
  SimpleGrid,
  ThemeIcon,
  ActionIcon,
  useMantineColorScheme,
  RingProgress,
  MultiSelect,
  ScrollArea,
  NavLink,
  Drawer,
  Kbd,
  Divider,
  NumberInput,
  Code,
  Tooltip,
  Alert,
  Menu,
  Breadcrumbs,
  Anchor,
  Loader,
  Indicator,
  ColorInput
} from '@mantine/core';
import { AreaChart, DonutChart, RadarChart } from '@mantine/charts';
import { useDisclosure, useClipboard, useOs, useIdle, useCounter } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Spotlight, spotlight } from '@mantine/spotlight';
import { Carousel } from '@mantine/carousel';
import { 
  IconSearch,
  IconSettings,
  IconTrophy,
  IconMedal,
  IconStar,
  IconSun,
  IconMoon,
  IconFlame,
  IconCrown,
  IconRocket,
  IconCode,
  IconForms,
  IconHammer,
  IconBox,
  IconVariable,
  IconClipboard,
  IconDeviceDesktop,
  IconCheck,
  IconX,
  IconInfoCircle,
  IconAlertCircle,
  IconMessageCircle,
  IconLock,
  IconTrash
} from '@tabler/icons-react';
import { useState } from 'react';

// --- MOCK DATA ---
const chartData = [
  { date: 'Set', Março: 2400, Abril: 1800 },
  { date: 'Out', Março: 3200, Abril: 2100 },
  { date: 'Nov', Março: 2800, Abril: 2900 },
  { date: 'Dez', Março: 3900, Abril: 3100 },
];

const radarData = [
  { product: 'Foco no Cliente', sales: 120, fullMark: 150 },
  { product: 'Inovação', sales: 98, fullMark: 150 },
  { product: 'Corte de Custos', sales: 86, fullMark: 150 },
  { product: 'Expansão', sales: 99, fullMark: 150 },
  { product: 'Qualidade', sales: 85, fullMark: 150 },
  { product: 'Agilidade', sales: 65, fullMark: 150 },
];

// --- TYPES & INTERFACES ---
interface ComponentData {
  title: string;
  description: string;
  correctUsage: string;
  code: string;
  category: 'Components' | 'Hooks' | 'Forms' | 'Extensions' | 'Foundations' | 'Gamification';
  component: React.ReactNode;
}

// --- SUB-COMPONENTS FOR EXAMPLES ---

function FormExample() {
  const form = useForm({
    initialValues: { email: '', title: '', agreed: false },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'E-mail inválido'),
      title: (value) => (value.length < 5 ? 'Título deve ter ao menos 5 letras' : null)
    }
  });

  return (
    <Paper withBorder p="xl" radius="md" bg="gray.1" c="black">
      <form onSubmit={form.onSubmit(() => { notifications.show({ title: 'Sucesso', message: 'Formulário válido!' }); })}>
        <Stack>
          <TextInput label="Seu E-mail" placeholder="dev@farol.com" {...form.getInputProps('email')} />
          <TextInput label="Título do Relatório" placeholder="Relatório Mensal" {...form.getInputProps('title')} />
          <Switch label="Aceito os termos" {...form.getInputProps('agreed', { type: 'checkbox' })} />
          <Button type="submit" mt="md" fullWidth>Validar e Enviar</Button>
        </Stack>
      </form>
    </Paper>
  );
}

function HooksExample() {
  const clipboard = useClipboard({ timeout: 2000 });
  const os = useOs();
  const idle = useIdle(5000);
  const [count, handlers] = useCounter(0, { min: 0, max: 10 });

  return (
    <SimpleGrid cols={2}>
      <Paper p="md" withBorder>
        <Text size="xs" c="dimmed">useClipboard</Text>
        <Button 
          fullWidth mt="xs" variant="light" 
          onClick={() => clipboard.copy('Farol-123')}
          color={clipboard.copied ? 'teal' : 'blue'}
        >
          {clipboard.copied ? 'Copiado!' : 'Copiar Token'}
        </Button>
      </Paper>
      <Paper p="md" withBorder>
        <Text size="xs" c="dimmed">useOs & useIdle</Text>
        <Group mt="xs" gap="xs">
          <Badge leftSection={<IconDeviceDesktop size={14} />}>{os}</Badge>
          <Badge color={idle ? 'red' : 'green'}>{idle ? 'Inativo' : 'Ativo'}</Badge>
        </Group>
      </Paper>
      <Paper p="md" withBorder>
        <Text size="xs" c="dimmed">useCounter</Text>
        <Group justify="center" mt="xs">
          <ActionIcon onClick={handlers.decrement} color="red"><IconX size={16} /></ActionIcon>
          <Text fw={700} size="xl">{count}</Text>
          <ActionIcon onClick={handlers.increment} color="green"><IconCheck size={16} /></ActionIcon>
        </Group>
      </Paper>
    </SimpleGrid>
  );
}

// --- DATA DEFINITIONS ---
const EXAMPLES: ComponentData[] = [
  {
    category: 'Components',
    title: 'Buttons & Variants',
    description: 'Hierarquia visual de ações através de variantes de botões.',
    correctUsage: 'Use botões redondos para interações rápidas. O gradiente BlueMain é exclusivo para o botão de ação principal.',
    code: `<Button variant="gradient" gradient={{ from: '#1DA5DE', to: '#00567B' }}>CTA</Button>`,
    component: (
      <Stack>
        <Group>
          <Button variant="filled">Filled</Button>
          <Button variant="light">Light</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="subtle">Subtle</Button>
        </Group>
        <Group>
          <Button radius="xl" variant="gradient" gradient={{ from: '#1DA5DE', to: '#00567B' }}>Premium Button</Button>
          <Button leftSection={<IconRocket size={16} />} variant="light" color="cyan">Launch</Button>
        </Group>
      </Stack>
    )
  },
  {
    category: 'Components',
    title: 'Navigation & Overlays',
    description: 'Breadcrumbs, Menus e Tooltips.',
    correctUsage: 'Tooltips devem ser curtos e diretos.',
    code: `<Tooltip label="Dica"><Button>Hover me</Button></Tooltip>`,
    component: (
      <Stack>
        <Breadcrumbs>
          <Anchor href="#">Farol</Anchor>
          <Anchor href="#">MKT</Anchor>
          <Text c="dimmed">Campanha Q2</Text>
        </Breadcrumbs>
        <Group>
          <Menu shadow="md" width={200}>
            <Menu.Target><Button variant="outline">Ações</Button></Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
              <Menu.Item leftSection={<IconMessageCircle size={14} />}>Messages</Menu.Item>
              <Menu.Divider />
              <Menu.Item color="red" leftSection={<IconTrash size={14} />}>Delete</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Tooltip label="Informação importante" withArrow>
            <ActionIcon variant="light" radius="xl"><IconInfoCircle size={18} /></ActionIcon>
          </Tooltip>
        </Group>
      </Stack>
    )
  },
  {
    category: 'Components',
    title: 'Indicators & Feedback',
    description: 'Alertas, Badges e loaders.',
    correctUsage: 'Use Loader apenas quando a ação durar mais de 500ms.',
    code: `<Alert color="red" title="Atenção">KR em atraso!</Alert>`,
    component: (
      <Stack>
        <Alert color="red" variant="light" title="Atraso Crítico" icon={<IconAlertCircle size={16} />}>
          O Resultado-Chave está abaixo do esperado.
        </Alert>
        <Group>
          <Indicator inline label="Novo" size={16}>
            <Avatar radius="md" />
          </Indicator>
          <Badge variant="dot" color="blue">Pendente</Badge>
          <Badge variant="gradient" gradient={{ from: 'orange', to: 'red' }}>Urgente</Badge>
          <Loader size="sm" />
        </Group>
      </Stack>
    )
  },
  {
    category: 'Gamification',
    title: 'Progresso & XP',
    description: 'Níveis e experiência.',
    correctUsage: 'O XP aumenta a cada Check-in.',
    code: `<RingProgress sections={[{ value: 75, color: 'blue' }]} ... />`,
    component: (
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        <Paper withBorder p="xl" radius="lg">
          <Stack align="center" gap="xs">
            <Indicator label="Lvl 12" size={24} offset={5} position="bottom-end" color="blue">
              <RingProgress
                size={120}
                thickness={10}
                roundCaps
                sections={[{ value: 75, color: 'cyan.6' }]}
                label={<div style={{ display: 'flex', justifyContent: 'center' }}><IconTrophy size={32} color="#1DA5DE" /></div>}
              />
            </Indicator>
            <Text fw={800} size="xl">Geraldo Lima</Text>
            <Badge variant="light">2.450 XP</Badge>
          </Stack>
        </Paper>
        <Paper p="xl" radius="lg" style={{ background: 'linear-gradient(135deg, #1BDBAD 0%, #3192D0 100%)', color: 'white' }}>
          <Group justify="space-between">
            <IconFlame size={40} />
            <Badge variant="white" color="green">STREAK</Badge>
          </Group>
          <Title order={2} mt="md">7 Dias Seguidos!</Title>
          <Text size="sm" opacity={0.8}>Meta de governança batida.</Text>
        </Paper>
      </SimpleGrid>
    )
  },
  {
    category: 'Gamification',
    title: 'Achievements Carousel',
    description: 'Medalhas e conquistas.',
    correctUsage: 'Medalhas bloqueadas devem ter opacidade reduzida.',
    code: `<Carousel slideSize="33%"> ... </Carousel>`,
    component: (
      <Carousel slideSize="33.333333%" slideGap="md">
        <Carousel.Slide>
          <Paper shadow="md" p="lg" radius="md" style={{ background: 'linear-gradient(180deg, #ECC625 0%, #D66D31 100%)', color: 'white', textAlign: 'center' }}>
            <IconMedal size={45} />
            <Text fw={700} mt="xs">Pioneiro</Text>
          </Paper>
        </Carousel.Slide>
        <Carousel.Slide>
          <Paper shadow="md" p="lg" radius="md" style={{ background: 'linear-gradient(180deg, #1DA5DE 0%, #00567B 100%)', color: 'white', textAlign: 'center' }}>
            <IconStar size={45} />
            <Text fw={700} mt="xs">Estrategista</Text>
          </Paper>
        </Carousel.Slide>
        <Carousel.Slide>
          <Paper shadow="md" p="lg" radius="md" bg="gray.2" c="dimmed" style={{ textAlign: 'center' }}>
            <IconLock size={45} />
            <Text fw={700} mt="xs">Bloqueado</Text>
          </Paper>
        </Carousel.Slide>
        <Carousel.Slide>
          <Paper shadow="md" p="lg" radius="md" style={{ background: 'linear-gradient(180deg, #392749 0%, #3192D0 100%)', color: 'white', textAlign: 'center' }}>
            <IconCrown size={45} />
            <Text fw={700} mt="xs">Rei do Mês</Text>
          </Paper>
        </Carousel.Slide>
      </Carousel>
    )
  },
  {
    category: 'Forms',
    title: 'Inputs & Controls',
    description: 'Campos de entrada padronizados.',
    correctUsage: 'Sempre inclua placeholders.',
    code: `<TextInput label="Título" radius="md" />`,
    component: (
      <Stack maw={400}>
        <TextInput label="Título" placeholder="Digite..." radius="md" />
        <NumberInput label="Meta" defaultValue={0} max={100} min={0} radius="md" />
        <MultiSelect label="Time" data={['TI', 'RH']} radius="md" />
        <ColorInput label="Cor" radius="md" />
      </Stack>
    )
  },
  {
    category: 'Forms',
    title: 'Form Validation',
    description: 'Validação via @mantine/form.',
    correctUsage: 'Valide em tempo real.',
    code: `form.onSubmit(() => { ... });`,
    component: <FormExample />
  },
  {
    category: 'Hooks',
    title: 'Nativos',
    description: 'Hooks utilitários.',
    correctUsage: 'useClipboard para links.',
    code: `const os = useOs();`,
    component: <HooksExample />
  },
  {
    category: 'Extensions',
    title: 'Radar & Performance',
    description: 'Alinhamento e desempenho.',
    correctUsage: 'Essencial para OKRs.',
    code: `<RadarChart ... />`,
    component: (
      <Stack gap="xl">
        <Paper withBorder p="xl" radius="md">
          <RadarChart h={300} data={radarData} dataKey="product" series={[{ name: 'sales', color: 'blue', opacity: 0.2 }]} />
        </Paper>
        <AreaChart
          h={240}
          data={chartData}
          dataKey="date"
          series={[{ name: 'Março', color: 'blue.6' }, { name: 'Abril', color: 'teal.6' }]}
          curveType="monotone"
        />
        <DonutChart
          data={[{ name: 'A', value: 45, color: 'blue' }, { name: 'B', value: 55, color: 'teal' }]}
          size={160}
          withLabels
        />
      </Stack>
    )
  }
];

export default function DesignSystem() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [activeCategory, setActiveCategory] = useState<string>('Foundations');
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);

  const filteredExamples = EXAMPLES.filter(ex => ex.category === activeCategory);

  return (
    <Box bg={colorScheme === 'dark' ? 'dark.9' : 'gray.0'} mih="100vh">
      <Spotlight.Root query={''} onQueryChange={() => { }}>
        <Spotlight.Search placeholder="Pesquisar..." leftSection={<IconSearch size={18} />} />
        <Spotlight.ActionsList>
          {EXAMPLES.map((item, idx) => (
            <Spotlight.Action key={idx} onClick={() => { setActiveCategory(item.category); notifications.show({ title: 'Navegando', message: item.title }); }}>
              <Group gap="md">
                <IconBox size={18} />
                <Box>
                  <Text size="sm">{item.title}</Text>
                  <Text size="xs" c="dimmed">{item.category}</Text>
                </Box>
              </Group>
            </Spotlight.Action>
          ))}
        </Spotlight.ActionsList>
      </Spotlight.Root>

      <Grid gutter={0}>
        <Grid.Col span={{ base: 0, lg: 2.5 }} h="100vh" visibleFrom="lg" style={{ position: 'sticky', top: 0, borderRight: `1px solid ${colorScheme === 'dark' ? '#333' : '#e0e0e0'}` }} bg={colorScheme === 'dark' ? 'dark.8' : 'white'}>
          <ScrollArea h="100%" p="md">
            <Group mb={40} px="md">
              <ThemeIcon size="xl" radius="md" style={{ background: (theme as any).other.gradients.blueMain }}>
                <IconRocket size={24} />
              </ThemeIcon>
              <Box>
                <Title order={4}>FAROL <span style={{ opacity: 0.5, fontWeight: 400 }}>SYSTEM</span></Title>
                <Text size="10px" fw={700} c="blue">HUB V3.2 FIXED</Text>
              </Box>
            </Group>

            <Stack gap={2}>
              <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="xs" px="md">Framework</Text>
              <NavLink label="Foundations" leftSection={<IconVariable size={18} />} active={activeCategory === 'Foundations'} onClick={() => setActiveCategory('Foundations')} />
              <NavLink label="Components" leftSection={<IconBox size={18} />} active={activeCategory === 'Components'} onClick={() => setActiveCategory('Components')} />
              <NavLink label="Forms" leftSection={<IconForms size={18} />} active={activeCategory === 'Forms'} onClick={() => setActiveCategory('Forms')} />
              <NavLink label="Hooks" leftSection={<IconHammer size={18} />} active={activeCategory === 'Hooks'} onClick={() => setActiveCategory('Hooks')} />
              <NavLink label="Extensions" leftSection={<IconCode size={18} />} active={activeCategory === 'Extensions'} onClick={() => setActiveCategory('Extensions')} />
              <NavLink label="Gamification" leftSection={<IconTrophy size={18} />} active={activeCategory === 'Gamification'} onClick={() => setActiveCategory('Gamification')} />
            </Stack>
          </ScrollArea>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 9.5 }}>
          <Box p={{ base: 'md', md: 60 }}>
            <Stack gap={80}>
              <Group justify="space-between">
                <Button variant="default" radius="md" leftSection={<IconSearch size={16} />} onClick={spotlight.open}>
                  Buscar... <Kbd ml={5} size="xs">Ctrl + K</Kbd>
                </Button>
                <Group>
                  <ActionIcon variant="light" size="xl" onClick={() => toggleColorScheme()}>
                    {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
                  </ActionIcon>
                  <Button variant="light" leftSection={<IconSettings size={16} />} onClick={openDrawer}>Settings</Button>
                </Group>
              </Group>
              <Box>
                <Badge variant="filled" color="blue" size="lg" mb="sm">Documentation Hub</Badge>
                <Title order={1} size={64} fw={900} style={{ letterSpacing: '-3px', lineHeight: 1 }}>{activeCategory}</Title>
              </Box>
              {activeCategory === 'Foundations' ? <FoundationsPanel /> : (
                <Stack gap={100}>
                  {filteredExamples.map((ex, i) => (
                    <ShowcaseSection key={i} data={ex} />
                  ))}
                </Stack>
              )}
            </Stack>
          </Box>
        </Grid.Col>
      </Grid>
      <Drawer opened={drawerOpened} onClose={closeDrawer} title="Configuration" position="right">
        <Text size="sm">Docs setup properties.</Text>
      </Drawer>
    </Box>
  );
}

function ShowcaseSection({ data }: { data: ComponentData }) {
  const { colorScheme } = useMantineColorScheme();
  const clipboard = useClipboard({ timeout: 2000 });
  return (
    <Stack gap="xl">
      <Box><Title order={2} size={32} fw={800}>{data.title}</Title><Text c="dimmed" size="lg" mt={5}>{data.description}</Text></Box>
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, lg: 7 }}>
          <Paper withBorder p="xl" radius="md" bg={colorScheme === 'dark' ? 'dark.8' : 'white'}><Box py="md">{data.component}</Box></Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 5 }}>
          <Stack gap="md" h="100%">
            <Paper withBorder p="lg" radius="md" bg={colorScheme === 'dark' ? 'rgba(29, 165, 222, 0.1)' : 'blue.0'} style={{ borderLeft: '4px solid #1DA5DE' }}>
              <Group gap="xs" mb="xs"><IconInfoCircle size={18} color="#1DA5DE" /><Text fw={700} size="sm">Guia de Uso</Text></Group>
              <Text size="sm">{data.correctUsage}</Text>
            </Paper>
            <Paper withBorder p="md" radius="md" bg="dark.9" style={{ position: 'relative', flex: 1 }}>
              <Group justify="space-between" mb="xs"><Text size="xs" c="dimmed" fw={700}>REACT SNIPPET</Text>
                <ActionIcon variant="subtle" color="gray" onClick={() => clipboard.copy(data.code)}>
                  {clipboard.copied ? <IconCheck size={14} /> : <IconClipboard size={14} />}
                </ActionIcon>
              </Group>
              <ScrollArea h={120}><Code block bg="transparent" color="white" style={{ fontSize: '11px' }}>{data.code}</Code></ScrollArea>
            </Paper>
          </Stack>
        </Grid.Col>
      </Grid>
      <Divider />
    </Stack>
  );
}

function FoundationsPanel() {
  const theme = useMantineTheme();
  return (
    <Stack gap={60}>
      <Box><Title order={2} mb="xl">Paleta Farol</Title>
        <SimpleGrid cols={{ base: 2, md: 5 }}>
          {theme.colors['farol-blue'].map((c, i) => (
            <Stack key={i} align="center" gap={4}><ColorSwatch color={c} size={50} radius="md" />
              <Text fw={700} size="xs">Farol {i}</Text><Text size="xs" c="dimmed">{c}</Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Box>
      <Box><Title order={2} mb="xl">Gradientes</Title>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
          <Paper p="xl" radius="md" style={{ background: (theme as any).other.gradients.blueMain, color: 'white' }}><Text fw={800}>blueMain</Text></Paper>
          <Paper p="xl" radius="md" style={{ background: (theme as any).other.gradients.techGreen, color: 'white' }}><Text fw={800}>techGreen</Text></Paper>
          <Paper p="xl" radius="md" style={{ background: (theme as any).other.gradients.formationWarm, color: 'white' }}><Text fw={800}>formationWarm</Text></Paper>
        </SimpleGrid>
      </Box>
    </Stack>
  );
}
