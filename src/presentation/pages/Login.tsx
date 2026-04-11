import { 
  Paper, 
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
} from '@mantine/core';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  IconArrowRight, 
  IconLock, 
  IconMail, 
  IconBrandGoogle, 
  IconBuildingSkyscraper,
  IconBrandWindows,
  IconFingerprint
} from '@tabler/icons-react';
import { useAuthContext } from '../../application/context/AuthContext';

const WelcomeTexts = [
  "Direção Estratégica.",
  "Decisões Orientadas por Dados.",
  "Sua Bússola Corporativa.",
  "Onde OKRs Ganham Vida."
];

export default function Login() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, isAuthenticated } = useAuthContext();

  const [welcomeIndex, setWelcomeIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Typewriter Effect
  useEffect(() => {
    const currentFullText = WelcomeTexts[welcomeIndex];
    const typingSpeed = isDeleting ? 30 : 80;
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.slice(0, displayText.length + 1));
        if (displayText.length + 1 === currentFullText.length) {
          setTimeout(() => setIsDeleting(true), 2500);
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
      if (!error) {
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <Box 
      style={{ 
        minHeight: '100vh', 
        display: 'flex',
        backgroundColor: '#f8fafc', // Light slate bg
      }}
    >
      {/* LEFT SIDE: BRANDING & MARKETING */}
      <Box 
        visibleFrom="md"
        style={{ 
          flex: '1.2',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#001219',
        }}
      >
        <Box 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("/strategic_lighthouse_login_bg_1775921200751.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.6,
          }}
        />
        <Box 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(1, 87, 155, 0.8) 0%, rgba(0, 18, 25, 0.9) 100%)',
          }}
        />

        <Stack 
          p={rem(80)} 
          justify="center" 
          h="100%" 
          style={{ position: 'relative', zIndex: 10 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Group gap="xs">
              <IconFingerprint size={42} color="white" stroke={2.5} />
              <Title order={1} c="white" style={{ fontSize: rem(64), fontWeight: 900, letterSpacing: rem(-2) }}>
                FAROL
              </Title>
            </Group>
            
            <Box mt="xl" style={{ borderLeft: '4px solid var(--mantine-color-cyan-5)', paddingLeft: rem(30) }}>
              <Title order={2} c="white" style={{ fontSize: rem(42), fontWeight: 400, opacity: 0.9 }}>
                {displayText}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  style={{ marginLeft: rem(8), width: rem(3), height: '1em', background: 'var(--mantine-color-cyan-4)', display: 'inline-block' }}
                />
              </Title>
              <Text c="white" opacity={0.6} maw={500} size="lg" mt="md" fw={500}>
                Navegue pela estratégia corporativa com clareza absoluta e alinhamento total.
              </Text>
            </Box>
          </motion.div>
        </Stack>

        <Text 
          style={{ position: 'absolute', bottom: rem(40), left: rem(80), color: 'rgba(255,255,255,0.3)', fontSize: rem(10), fontWeight: 700, letterSpacing: rem(1) }}
        >
          © 2026 FAROL ESTRATÉGIA — GESTÃO INTELIGENTE DE OKRs
        </Text>
      </Box>

      {/* RIGHT SIDE: AUTH FORM */}
      <Box 
        style={{ 
          flex: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: rem(40),
        }}
      >
        <Container size="xs" w="100%" p={0}>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper radius="xl" p={0} bg="transparent">
              <Stack gap="xl">
                <Box>
                  <Title order={2} fw={900} size={rem(32)} c="dark.6">
                    Acesso ao Cockpit
                  </Title>
                  <Text c="dimmed" fw={500} mt={4}>
                    Bem-vindo de volta! Identifique-se para continuar.
                  </Text>
                </Box>

                <form onSubmit={handleLogin}>
                  <Stack gap="md">
                    <TextInput 
                      label="E-MAIL CORPORATIVO"
                      placeholder="seu.nome@empresa.com"
                      leftSection={<IconMail size={18} stroke={2} />}
                      size="md"
                      radius="md"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                      required
                      styles={{
                        label: { fontSize: rem(10), fontWeight: 800, marginBottom: rem(6), color: 'var(--mantine-color-gray-6)' },
                        input: { backgroundColor: 'white', border: '1px solid var(--mantine-color-gray-3)' }
                      }}
                    />

                    <PasswordInput 
                      label="SENHA DE ACESSO"
                      placeholder="••••••••"
                      leftSection={<IconLock size={18} stroke={2} />}
                      size="md"
                      radius="md"
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                      required
                      styles={{
                        label: { fontSize: rem(10), fontWeight: 800, marginBottom: rem(6), color: 'var(--mantine-color-gray-6)' },
                        input: { backgroundColor: 'white', border: '1px solid var(--mantine-color-gray-3)' }
                      }}
                    />

                    <Button 
                      fullWidth 
                      size="lg" 
                      radius="md" 
                      color="farol-blue"
                      type="submit"
                      loading={formLoading}
                      rightSection={<IconArrowRight size={20} />}
                      style={{ height: rem(56), boxShadow: 'var(--mantine-shadow-md)' }}
                    >
                      Entrar no Sistema
                    </Button>
                  </Stack>
                </form>

                <Divider 
                  label="OU ACESSE VIA SSO" 
                  labelPosition="center" 
                  c="dimmed" 
                  styles={{ label: { fontSize: rem(10), fontWeight: 700 } }} 
                />

                <Stack gap="sm">
                  <Group grow>
                    <Button 
                      variant="default" 
                      radius="md" 
                      size="md"
                      leftSection={<IconBrandGoogle size={20} color="#EA4335" />}
                      onClick={signInWithGoogle}
                      style={{ border: '1px solid var(--mantine-color-gray-3)' }}
                    >
                      Google
                    </Button>
                    <Button 
                      variant="default" 
                      radius="md" 
                      size="md"
                      leftSection={<IconBrandWindows size={20} color="#00A4EF" />}
                      style={{ border: '1px solid var(--mantine-color-gray-3)' }}
                    >
                      Microsoft
                    </Button>
                  </Group>
                  <Button 
                    variant="light" 
                    color="gray"
                    radius="md" 
                    size="md"
                    leftSection={<IconBuildingSkyscraper size={20} />}
                    style={{ border: '1px solid var(--mantine-color-gray-2)' }}
                  >
                    SSO Corporativo (SAML/ADFS)
                  </Button>
                </Stack>

                <Stack align="center" gap="xs">
                  <Anchor component={Link} to="/forgot-password" size="sm" fw={700} c="farol-blue.6">
                    Problemas com sua senha?
                  </Anchor>
                  <Text size="xs" c="dimmed" fw={600}>
                    Tecnologia de Segurança FAROL v3.2
                  </Text>
                </Stack>
              </Stack>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
