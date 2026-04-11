import { 
  TextInput, 
  PasswordInput, 
  Button, 
  Title, 
  Text, 
  Stack, 
  Box,
  Divider,
  Group,
  Anchor,
  rem,
  Container,
  UnstyledButton,
  ThemeIcon,
  Checkbox,
} from '@mantine/core';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IconLock, 
  IconMail, 
  IconBrandGoogle, 
  IconBuildingSkyscraper,
  IconBrandWindows,
  IconFingerprint,
} from '@tabler/icons-react';
import { useAuthContext } from '../../application/context/AuthContext';

const WelcomeTexts = [
  "Direção Estratégica.",
  "Decisões por Dados.",
  "Sua Bússola.",
  "Resultado Real."
];

export default function Login() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, isAuthenticated } = useAuthContext();

  const [welcomeIndex, setWelcomeIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const currentFullText = WelcomeTexts[welcomeIndex];
    const typingSpeed = isDeleting ? 30 : 70;
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.slice(0, displayText.length + 1));
        if (displayText.length + 1 === currentFullText.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentFullText.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setWelcomeIndex((prev) => (prev + 1) % WelcomeTexts.length);
        }
      }
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, welcomeIndex]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (!error) navigate('/');
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setFormLoading(false);
    }
  };

  const SsoButton = ({ icon: Icon, label, color, onClick }: any) => (
    <UnstyledButton
      onClick={onClick}
      style={{
        padding: `${rem(10)} ${rem(16)}`,
        borderRadius: "var(--mantine-radius-md)",
        backgroundColor: "light-dark(var(--mantine-color-white), var(--mantine-color-dark-6))",
        border: "1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))",
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        gap: rem(10),
      }}
      className="sso-pill-button"
    >
      <Icon size={20} color={color} stroke={2} />
      <Text size="sm" fw={600} c="dimmed">{label}</Text>
      <style>{`
        .sso-pill-button:hover {
          border-color: var(--mantine-color-farol-blue-4) !important;
          background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-5)) !important;
          transform: translateY(-1px);
          box-shadow: var(--mantine-shadow-xs);
        }
      `}</style>
    </UnstyledButton>
  );

  return (
    <Box style={{ height: '100vh', display: 'flex', overflow: 'hidden', backgroundColor: '#f8fafc' }}>
      {/* BRANDING SIDE */}
      <Box visibleFrom="md" style={{ flex: '1', position: 'relative', overflow: 'hidden', backgroundColor: '#001219' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.5 }}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url("/strategic_lighthouse_login_bg_1775921200751.png")',
            backgroundSize: 'cover', backgroundPosition: 'center',
          }}
        />
        <Stack p={rem(60)} justify="center" h="100%" style={{ position: 'relative', zIndex: 10 }}>
          <Group gap="xs">
            <IconFingerprint size={38} color="white" stroke={2.5} />
            <Title order={1} c="white" style={{ fontSize: rem(48), fontWeight: 900, letterSpacing: rem(-1) }}>FAROL</Title>
          </Group>
          <Box mt="lg" style={{ borderLeft: '3px solid var(--mantine-color-cyan-5)', paddingLeft: rem(25) }}>
            <Title order={2} c="white" style={{ fontSize: rem(32), fontWeight: 400 }}>
              {displayText}
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ marginLeft: rem(5), width: rem(3), height: '0.9em', background: 'var(--mantine-color-cyan-4)', display: 'inline-block' }} />
            </Title>
          </Box>
        </Stack>
      </Box>

      {/* FORM SIDE */}
      <Box style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: rem(20), overflowY: 'auto' }}>
        <Container size={rem(400)} w="100%" p={0}>
          <motion.div initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <Stack gap={rem(25)}>
              <Box>
                <Title order={2} fw={900} size={rem(28)} c="dark.7">Acesso ao Sistema</Title>
                <Text c="dimmed" fw={500} size="sm">Gestão estratégica inteligente.</Text>
              </Box>

              <form onSubmit={handleLogin}>
                <Stack gap="sm">
                  <TextInput 
                    label="E-MAIL"
                    placeholder="seu@email.com"
                    leftSection={<IconMail size={16} color="var(--mantine-color-farol-blue-6)" />}
                    radius="md" required
                    styles={{
                      label: { fontSize: rem(10), fontWeight: 800, marginBottom: rem(4), color: 'var(--mantine-color-gray-6)' },
                      input: { height: rem(46), backgroundColor: '#f1f5f9' }
                    }}
                  />
                  <PasswordInput 
                    label="SENHA"
                    placeholder="••••••••"
                    leftSection={<IconLock size={16} color="var(--mantine-color-farol-blue-6)" />}
                    radius="md" required
                    styles={{
                      label: { fontSize: rem(10), fontWeight: 800, marginBottom: rem(4), color: 'var(--mantine-color-gray-6)' },
                      input: { height: rem(46), backgroundColor: '#f1f5f9' }
                    }}
                  />

                  <Checkbox 
                    label="Lembrar-me neste dispositivo" 
                    size="xs" 
                    color="farol-blue"
                    styles={{
                      label: { fontWeight: 600, color: 'var(--mantine-color-gray-6)' }
                    }}
                  />

                  <Button 
                    fullWidth size="md" radius="md" color="farol-blue" type="submit" loading={formLoading}
                    style={{ height: rem(48), marginTop: rem(10) }}
                  >
                    Entrar
                  </Button>
                </Stack>
              </form>

              <Divider label="OU ENTRAR COM" labelPosition="center" styles={{ label: { fontSize: rem(9), fontWeight: 800 } }} />

              <Stack gap="xs">
                <Group grow gap="xs">
                  <SsoButton icon={IconBrandGoogle} label="Google" color="#EA4335" onClick={signInWithGoogle} />
                  <SsoButton icon={IconBrandWindows} label="Microsoft" color="#00A4EF" />
                </Group>
                <UnstyledButton
                  style={{
                    padding: rem(10),
                    textAlign: 'center',
                    borderRadius: "var(--mantine-radius-md)",
                    border: "1px solid transparent",
                    transition: 'all 0.2s',
                  }}
                  className="sso-pill-button"
                >
                  <Group justify="center" gap={8}>
                    <IconBuildingSkyscraper size={16} stroke={2} color="var(--mantine-color-gray-6)" />
                    <Text size="xs" fw={700} c="dimmed">SSO CORPORATIVO</Text>
                  </Group>
                </UnstyledButton>
              </Stack>

              <Stack gap="md" align="center" mt="md">
                <Divider w="100%" opacity={0.5} />
                
                <Group justify="space-between" w="100%">
                  <Stack gap={2}>
                    <Text size="xs" c="dimmed" fw={700} style={{ letterSpacing: rem(0.5) }}>NOVO POR AQUI?</Text>
                    <Anchor component={Link} to="/register" size="sm" fw={800} c="farol-blue">
                      Crie sua conta agora
                    </Anchor>
                  </Stack>

                  <Button 
                    component={Link} 
                    to="/forgot-password" 
                    variant="subtle" 
                    color="gray" 
                    size="compact-xs" 
                    styles={{ label: { fontSize: rem(11), fontWeight: 700 } }}
                  >
                    Esqueci minha senha
                  </Button>
                </Group>
              </Stack>
            </Stack>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
