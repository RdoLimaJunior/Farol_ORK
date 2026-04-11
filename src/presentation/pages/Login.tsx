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
  Checkbox,
  SimpleGrid,
  PinInput,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IconLock, 
  IconMail, 
  IconBrandGoogle, 
  IconBuildingSkyscraper,
  IconBrandWindows,
  IconArrowLeft,
  IconUser,
  IconBuilding,
  IconCheck,
  IconX,
  IconInfoCircle,
  IconSparkles,
  IconSend,
  IconAlertCircle
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useAuthContext } from '../../application/context/AuthContext';

const WelcomeTexts = [
  "Direção Estratégica.",
  "Decisões por Dados.",
  "Sua Bússola.",
  "Resultado Real."
];

type AuthMode = 'login' | 'register' | 'forgot' | 'magic' | 'otp';

export default function Login() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, isAuthenticated } = useAuthContext();

  const [authMode, setAuthMode] = useState<AuthMode>('login');
  
  // States for all forms
  const [welcomeIndex, setWelcomeIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [gradientPos, setGradientPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });

    if (authMode === 'login') {
      notifications.show({
        id: 'login-hint',
        title: 'Modo Demonstração',
        message: 'Utilize admin / admin para acessar o sistema.',
        color: 'blue',
        icon: <IconInfoCircle size={18} />,
        autoClose: 5000,
      });
    }
  }, [isAuthenticated, navigate, authMode]);

  useEffect(() => {
    setGradientPos({ x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100) });
  }, []);

  useEffect(() => {
    const currentFullText = WelcomeTexts[welcomeIndex];
    const typingSpeed = isDeleting ? 30 : 70;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.slice(0, displayText.length + 1));
        if (displayText.length + 1 === currentFullText.length) setTimeout(() => setIsDeleting(true), 2000);
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
      if (error) {
        notifications.show({
          title: 'Erro de Login',
          message: 'Usuário ou senha incorretos.',
          color: 'red',
          icon: <IconX size={18} />,
        });
      } else {
        notifications.show({
          title: 'Acesso Permitido',
          message: 'Carregando cockpit estratégico...',
          color: 'green',
          icon: <IconCheck size={18} />,
        });
        navigate('/');
      }
    } catch (err) {
      notifications.show({ title: 'Erro de Conexão', message: 'Falha no servidor.', color: 'red', icon: <IconX size={18} /> });
    } finally {
      setFormLoading(false);
    }
  };

  const handleMagic = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      notifications.show({
        title: 'Token Enviado',
        message: `Insira o código enviado para ${email || 'seu e-mail'}.`,
        color: 'cyan',
        icon: <IconSend size={18} />,
      });
      setAuthMode('otp');
    }, 1800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      if (otpCode === '123456' || otpCode === '000000') {
        notifications.show({
          title: 'Acesso Verificado',
          message: 'Tokens conferem. Iniciando sessão...',
          color: 'green',
          icon: <IconCheck size={18} />,
        });
        navigate('/');
      } else {
        notifications.show({
          title: 'Token Inválido',
          message: 'O código inserido não confere ou expirou.',
          color: 'red',
          icon: <IconX size={18} />,
        });
      }
    }, 1200);
  };

  const handleSso = async (provider: 'google' | 'microsoft') => {
    notifications.show({
      title: 'Conectando...',
      message: `Redirecionando para autenticação com ${provider === 'google' ? 'Google' : 'Microsoft'}...`,
      color: 'blue',
      loading: true,
      autoClose: 2000,
    });

    if (provider === 'google') {
      try {
        await signInWithGoogle();
      } catch (err) {
        console.error('SSO error:', err);
      }
    } else {
      // Mock Microsoft for now
      setTimeout(() => {
        notifications.show({
          title: 'Integração em Configuração',
          message: 'O SSO da Microsoft está sendo validado pelo TI da sua empresa.',
          color: 'orange',
          icon: <IconAlertCircle size={18} />,
        });
      }, 1000);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      notifications.show({ title: 'Solicitação Enviada', message: 'Conta em análise comercial.', color: 'green', icon: <IconCheck size={18} /> });
      setAuthMode('login');
    }, 1500);
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      notifications.show({ title: 'E-mail Enviado', message: 'Instruções enviadas com sucesso.', color: 'blue', icon: <IconMail size={18} /> });
      setAuthMode('login');
    }, 1500);
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
        display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, gap: rem(10),
      }}
      className="sso-pill-button"
    >
      <Icon size={20} color={color} stroke={2} />
      <Text size="sm" fw={600} c="dimmed">{label}</Text>
    </UnstyledButton>
  );

  const containerVariants = {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 }
  };

  return (
    <Box style={{ height: '100vh', display: 'flex', overflow: 'hidden', backgroundColor: '#f8fafc' }}>
      <style>{`
        .sso-pill-button:hover {
          border-color: var(--mantine-color-farol-blue-4) !important;
          background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-5)) !important;
          transform: translateY(-1px);
          box-shadow: var(--mantine-shadow-xs);
        }
      `}</style>

      {/* BRANDING SIDE */}
      <Box visibleFrom="md" style={{ flex: '1.2', position: 'relative', overflow: 'hidden', backgroundColor: '#001219' }}>
        <motion.div
          animate={{ 
            background: [
              `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, rgba(1, 87, 155, 0.4) 0%, rgba(0, 18, 25, 1) 70%)`,
              `radial-gradient(circle at ${100 - gradientPos.x}% ${100 - gradientPos.y}%, rgba(3, 169, 244, 0.2) 0%, rgba(0, 18, 25, 1) 70%)`,
              `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, rgba(1, 87, 155, 0.4) 0%, rgba(0, 18, 25, 1) 70%)`,
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', inset: 0 }}
        />
        <Box style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%2 noiseFilter)'/%3E%3C/svg%3E")` }} />

        <Stack p={rem(80)} justify="center" h="100%" style={{ position: 'relative', zIndex: 10 }}>
          <Title order={1} c="white" style={{ fontSize: rem(64), fontWeight: 900, letterSpacing: rem(-2) }}>FAROL</Title>
          <Box mt="xl" style={{ borderLeft: '4px solid var(--mantine-color-cyan-5)', paddingLeft: rem(30) }}>
            <Title order={2} c="white" style={{ fontSize: rem(42), fontWeight: 400 }}>
              {displayText}
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ marginLeft: rem(8), width: rem(3), height: '0.9em', background: 'var(--mantine-color-cyan-4)', display: 'inline-block' }} />
            </Title>
          </Box>
        </Stack>
      </Box>

      {/* FORM SIDE */}
      <Box style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: rem(40), overflowY: 'auto' }}>
        <Container size={rem(420)} w="100%" p={0}>
          <AnimatePresence mode="wait">
            {authMode === 'login' && (
              <motion.div key="login" variants={containerVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                <Stack gap={rem(25)}>
                  <Box>
                    <Title order={2} fw={900} size={rem(32)} c="dark.7">Acesso ao Sistema</Title>
                    <Text c="dimmed" fw={500}>Gestão estratégica inteligente.</Text>
                  </Box>

                  <form onSubmit={handleLogin}>
                    <Stack gap="sm">
                      <TextInput 
                        label="E-MAIL" placeholder="seu@email.com" 
                        leftSection={<IconMail size={16} color="var(--mantine-color-farol-blue-6)" />} 
                        radius="md" required value={email} onChange={(e) => setEmail(e.currentTarget.value)}
                        styles={{ label: { fontSize: rem(10), fontWeight: 800, marginBottom: rem(4), color: 'var(--mantine-color-gray-6)' }, input: { height: rem(46), backgroundColor: '#f1f5f9' } }}
                      />
                      <PasswordInput 
                        label="SENHA" placeholder="••••••••" 
                        leftSection={<IconLock size={16} color="var(--mantine-color-farol-blue-6)" />} 
                        radius="md" required value={password} onChange={(e) => setPassword(e.currentTarget.value)}
                        styles={{ label: { fontSize: rem(10), fontWeight: 800, marginBottom: rem(4), color: 'var(--mantine-color-gray-6)' }, input: { height: rem(46), backgroundColor: '#f1f5f9' } }}
                      />
                      <Group justify="space-between">
                         <Checkbox label="Lembrar-me" size="xs" color="farol-blue" />
                         <Anchor component="button" type="button" onClick={() => setAuthMode('magic')} size="xs" fw={700} c="farol-blue">Acesso Verificado</Anchor>
                      </Group>
                      <Button fullWidth size="md" radius="md" color="farol-blue" type="submit" loading={formLoading} style={{ height: rem(48), marginTop: rem(10) }}>Entrar</Button>
                    </Stack>
                  </form>

                  <Divider label="OU ENTRAR COM" labelPosition="center" styles={{ label: { fontSize: rem(9), fontWeight: 800 } }} />
+
                   <Group grow gap="xs">
                    <SsoButton icon={IconBrandGoogle} label="Google" color="#EA4335" onClick={() => handleSso('google')} />
                    <SsoButton icon={IconBrandWindows} label="Microsoft" color="#00A4EF" onClick={() => handleSso('microsoft')} />
                   </Group>

                  <Stack align="center" gap={5} mt="md">
                    <Text size="xs" c="dimmed" fw={600}>
                      Novo por aqui? <Anchor component="button" onClick={() => setAuthMode('register')} fw={800} c="farol-blue">Crie sua conta</Anchor>
                    </Text>
                    <Anchor component="button" onClick={() => setAuthMode('forgot')} size="xs" fw={700} c="gray.5">Esqueci minha senha</Anchor>
                  </Stack>
                </Stack>
              </motion.div>
            )}

            {authMode === 'magic' && (
              <motion.div key="magic" variants={containerVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                 <Stack gap={rem(25)}>
                    <Box>
                      <UnstyledButton onClick={() => setAuthMode('login')} style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--mantine-color-dimmed)', marginBottom: 10 }}>
                        <IconArrowLeft size={16} /><Text size="xs" fw={700}>VOLTAR AO LOGIN</Text>
                      </UnstyledButton>
                      <Title order={2} fw={900} size={rem(32)} c="dark.7">Acesso Verificado</Title>
                      <Text c="dimmed" fw={500}>Identificação segura via Token de Segurança.</Text>
                    </Box>

                    <form onSubmit={handleMagic}>
                      <Stack gap="md">
                        <TextInput 
                          label="E-MAIL CORPORATIVO" 
                          placeholder="seu@empresa.com" 
                          leftSection={<IconMail size={16} />} 
                          radius="md" required 
                          value={email} 
                          onChange={(e) => setEmail(e.currentTarget.value)}
                          styles={{ label: { fontSize: rem(10), fontWeight: 800 }, input: { height: rem(52), backgroundColor: '#f1f5f9' } }} 
                        />
                        <Button 
                          fullWidth size="md" radius="md" color="cyan" mt="md" type="submit" loading={formLoading}
                          leftSection={<IconSend size={18} />}
                          style={{ height: rem(54) }}
                        >
                          Solicitar Token de Acesso
                        </Button>
                        <Text size="xs" c="dimmed" ta="center" px="xl">
                           Enviaremos um código de 6 dígitos para validar sua identidade.
                        </Text>
                      </Stack>
                    </form>
                 </Stack>
              </motion.div>
            )}

            {authMode === 'otp' && (
              <motion.div key="otp" variants={containerVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                 <Stack gap={rem(25)} align="center">
                    <Box w="100%">
                      <UnstyledButton onClick={() => setAuthMode('magic')} style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--mantine-color-dimmed)', marginBottom: 10 }}>
                        <IconArrowLeft size={16} /><Text size="xs" fw={700}>VOLTAR</Text>
                      </UnstyledButton>
                      <Title order={2} fw={900} size={rem(32)} c="dark.7" ta="center">Validar Token</Title>
                      <Text c="dimmed" fw={500} ta="center">Insira o código enviado para o seu e-mail.</Text>
                    </Box>

                    <form onSubmit={handleVerifyOtp} style={{ width: '100%' }}>
                      <Stack gap="xl" align="center">
                        <PinInput 
                          size="lg" 
                          length={6} 
                          type="number" 
                          placeholder="" 
                          value={otpCode}
                          onChange={setOtpCode}
                          autoFocus
                          styles={{ input: { height: rem(60), width: rem(50), fontSize: rem(24), fontWeight: 700 } }}
                        />
                        
                        <Button 
                          fullWidth size="md" radius="md" color="farol-blue" type="submit" loading={formLoading}
                          style={{ height: rem(54) }}
                        >
                          Verificar e Entrar
                        </Button>

                        <Text size="xs" c="dimmed" fw={600}>
                          Não recebeu o código? <Anchor component="button" type="button" onClick={() => handleMagic({ preventDefault: () => {} } as any)} fw={800} c="farol-blue">Reenviar</Anchor>
                        </Text>
                      </Stack>
                    </form>
                 </Stack>
              </motion.div>
            )}

            {authMode === 'register' && (
              <motion.div key="register" variants={containerVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                 <Stack gap={rem(25)}>
                    <Box>
                      <UnstyledButton onClick={() => setAuthMode('login')} style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--mantine-color-dimmed)', marginBottom: 10 }}>
                        <IconArrowLeft size={16} /><Text size="xs" fw={700}>VOLTAR AO LOGIN</Text>
                      </UnstyledButton>
                      <Title order={2} fw={900} size={rem(32)} c="dark.7">Criar Conta</Title>
                      <Text c="dimmed" fw={500}>Inicie sua jornada estratégica.</Text>
                    </Box>

                    <form onSubmit={handleRegister}>
                      <Stack gap="sm">
                        <SimpleGrid cols={2} gap="sm">
                           <TextInput label="NOME" placeholder="João Silva" leftSection={<IconUser size={16} />} radius="md" required styles={{ label: { fontSize: rem(10), fontWeight: 800 }, input: { height: rem(46), backgroundColor: '#f1f5f9' } }} />
                           <TextInput label="EMPRESA" placeholder="ACME Corp" leftSection={<IconBuilding size={16} />} radius="md" required styles={{ label: { fontSize: rem(10), fontWeight: 800 }, input: { height: rem(46), backgroundColor: '#f1f5f9' } }} />
                        </SimpleGrid>
                        <TextInput label="E-MAIL" placeholder="seu@email.com" leftSection={<IconMail size={16} />} radius="md" required styles={{ label: { fontSize: rem(10), fontWeight: 800 }, input: { height: rem(46), backgroundColor: '#f1f5f9' } }} />
                        <PasswordInput label="SENHA" placeholder="••••••••" leftSection={<IconLock size={16} />} radius="md" required styles={{ label: { fontSize: rem(10), fontWeight: 800 }, input: { height: rem(46), backgroundColor: '#f1f5f9' } }} />
                        <Button fullWidth size="md" radius="md" color="farol-blue" mt="md" type="submit" loading={formLoading} style={{ height: rem(48) }}>Cadastrar e Continuar</Button>
                      </Stack>
                    </form>
                 </Stack>
              </motion.div>
            )}

            {authMode === 'forgot' && (
              <motion.div key="forgot" variants={containerVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                 <Stack gap={rem(25)}>
                    <Box>
                      <UnstyledButton onClick={() => setAuthMode('login')} style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--mantine-color-dimmed)', marginBottom: 10 }}>
                        <IconArrowLeft size={16} /><Text size="xs" fw={700}>VOLTAR AO LOGIN</Text>
                      </UnstyledButton>
                      <Title order={2} fw={900} size={rem(32)} c="dark.7">Recuperar Senha</Title>
                      <Text c="dimmed" fw={500}>Enviaremos um link de acesso.</Text>
                    </Box>

                    <form onSubmit={handleForgot}>
                      <Stack gap="sm">
                        <TextInput label="E-MAIL CADASTRADO" placeholder="seu@email.com" leftSection={<IconMail size={16} />} radius="md" required value={email} onChange={(e) => setEmail(e.currentTarget.value)} styles={{ label: { fontSize: rem(10), fontWeight: 800 }, input: { height: rem(46), backgroundColor: '#f1f5f9' } }} />
                        <Button fullWidth size="md" radius="md" color="farol-blue" mt="md" type="submit" loading={formLoading} style={{ height: rem(48) }}>Enviar Instruções</Button>
                      </Stack>
                    </form>
                 </Stack>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Box>
    </Box>
  );
}
