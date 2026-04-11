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

type AuthMode = 'login' | 'register' | 'forgot' | 'magic' | 'otp' | 'sso';

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

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
    
    if (authMode === 'login' && !isAuthenticated) {
      notifications.show({
        id: 'login-hint', title: 'Acesso Rápido', message: 'Use admin / admin para testar.',
        color: 'farol-blue', radius: 'md', autoClose: 5000,
      });
    }
  }, [isAuthenticated, navigate, authMode]);

  useEffect(() => {
    const currentFullText = WelcomeTexts[welcomeIndex];
    const typingSpeed = isDeleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.slice(0, displayText.length + 1));
        if (displayText.length + 1 === currentFullText.length) setTimeout(() => setIsDeleting(true), 3000);
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
        notifications.show({ title: 'Acesso Negado', message: 'Verifique seus dados.', color: 'red', icon: <IconX size={16} /> });
      } else {
        navigate('/');
      }
    } catch (err) {
       notifications.show({ title: 'Erro', message: 'Falha na conexão.', color: 'red' });
    } finally {
      setFormLoading(false);
    }
  };

  const handleMagic = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      notifications.show({ title: 'Token Enviado', message: `Código enviado para o seu e-mail.`, color: 'farol-blue' });
      setAuthMode('otp');
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      if (otpCode === '123456' || otpCode === '000000') {
         navigate('/');
      } else {
        notifications.show({ title: 'Código Inválido', color: 'red' });
      }
    }, 1000);
  };

  const handleSso = async (provider: 'google' | 'microsoft') => {
    if (provider === 'google') {
      try { await signInWithGoogle(); } catch (err) { console.error(err); }
    } else {
      notifications.show({ title: 'SSO Microsoft', message: 'Integração em progresso.', color: 'farol-blue' });
    }
  };

  const handleCorporateSso = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
       setFormLoading(false);
       notifications.show({ title: 'SSO Corporativo', message: 'Redirecionando...', color: 'farol-blue' });
    }, 1200);
  };

  const SsoButton = ({ icon: Icon, label, color, onClick }: any) => (
    <UnstyledButton
      onClick={onClick}
      style={{
        height: rem(52),
        borderRadius: "var(--mantine-radius-md)",
        border: "1px solid var(--mantine-color-gray-2)",
        display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 12,
        backgroundColor: 'var(--mantine-color-white)',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--mantine-color-farol-blue-3)';
        e.currentTarget.style.backgroundColor = 'var(--mantine-color-gray-0)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--mantine-color-gray-2)';
        e.currentTarget.style.backgroundColor = 'var(--mantine-color-white)';
      }}
    >
      <Icon size={20} color={color} stroke={2} />
      <Text size="sm" fw={600} c="gray.7">{label}</Text>
    </UnstyledButton>
  );

  return (
    <Box style={{ height: '100vh', display: 'flex', backgroundColor: '#fdfdfd' }}>
      {/* BRANDING SIDE - Soft Apple Style with Brand Colors */}
      <Box visibleFrom="md" style={{ 
        flex: '1.2', 
        position: 'relative', 
        overflow: 'hidden', 
        backgroundColor: '#001219', // Deep navy indigo base
        display: 'flex',
        alignItems: 'center',
        padding: rem(80)
      }}>
        {/* Soft Organic Brand Aura */}
        <motion.div
           animate={{ 
             scale: [1, 1.15, 1],
             opacity: [0.4, 0.5, 0.4]
           }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
           style={{
             position: 'absolute',
             width: '90%', height: '90%',
             background: 'radial-gradient(circle, #01579B 0%, transparent 80%)',
             filter: 'blur(100px)',
             top: '-10%', left: '-10%',
           }}
        />
        <motion.div
           animate={{ 
             scale: [1.1, 1, 1.1],
             opacity: [0.3, 0.4, 0.3]
           }}
           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
           style={{
             position: 'absolute',
             width: '70%', height: '70%',
             background: 'radial-gradient(circle, #03A9F4 0%, transparent 80%)',
             filter: 'blur(80px)',
             bottom: '-10%', right: '-10%',
           }}
        />

        <Stack gap="xl" style={{ position: 'relative', zIndex: 10, maxWidth: 500 }}>
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
           >
              <Title order={1} c="white" style={{ fontSize: rem(80), fontWeight: 800, letterSpacing: rem(-3) }}>FAROL</Title>
              <Box h={2} w={50} bg="cyan.4" mt={10} />
           </motion.div>
           
           <Box h={rem(60)} mt="md">
              <AnimatePresence mode="wait">
                 <motion.div
                   key={displayText}
                   initial={{ x: -10, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   exit={{ x: 10, opacity: 0 }}
                   transition={{ duration: 0.4 }}
                 >
                    <Text c="white" opacity={0.8} fw={300} size="xl" style={{ fontSize: rem(38), lineHeight: 1.2 }}>{displayText}</Text>
                 </motion.div>
              </AnimatePresence>
           </Box>
           <Text c="white" opacity={0.5} size="sm" style={{ lineHeight: 1.6, maxWidth: 350 }}>
              O cockpit estratégico que guia decisões inteligentes em tempo real.
           </Text>
        </Stack>
      </Box>

      {/* FORM SIDE */}
      <Box style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
        <Container size={rem(400)} w="100%">
          <AnimatePresence mode="wait">
            {authMode === 'login' && (
              <motion.div key="login" initial={{ opacity: 0, px: 20 }} animate={{ opacity: 1, px: 0 }} exit={{ opacity: 0, px: -20 }}>
                <Stack gap={rem(35)}>
                  <Box>
                    <Title order={2} fw={800} size={rem(32)} c="dark.7">Olá novamente</Title>
                    <Text c="dimmed" mt={5} fw={500}>Acesse sua conta para continuar.</Text>
                  </Box>

                  <form onSubmit={handleLogin}>
                    <Stack gap="md">
                      <TextInput 
                        label="E-MAIL" placeholder="seu@email.com"
                        size="md" radius="md" required 
                        value={email} onChange={(e) => setEmail(e.currentTarget.value)}
                        styles={{ label: { fontSize: rem(10), fontWeight: 800, marginBottom: 5, color: 'gray' }, input: { height: rem(52), backgroundColor: '#f8fafc' } }}
                      />
                      <PasswordInput 
                        label="SENHA" placeholder="••••••••"
                        size="md" radius="md" required 
                        value={password} onChange={(e) => setPassword(e.currentTarget.value)}
                        styles={{ label: { fontSize: rem(10), fontWeight: 800, marginBottom: 5, color: 'gray' }, input: { height: rem(52), backgroundColor: '#f8fafc' } }}
                      />
                      
                      <Group justify="space-between" mt="xs">
                         <Checkbox label="Lembrar-me" size="xs" color="farol-blue" />
                         <Group gap="sm">
                           <Anchor component="button" type="button" onClick={() => setAuthMode('magic')} size="xs" fw={700} c="farol-blue" underline="never">Login via e-mail</Anchor>
                           <Anchor component="button" type="button" onClick={() => setAuthMode('sso')} size="xs" fw={700} c="farol-blue" underline="never">SSO Corporativo</Anchor>
                         </Group>
                      </Group>

                      <Button fullWidth size="lg" radius="md" color="farol-blue" type="submit" loading={formLoading} mt="lg" style={{ height: rem(54) }}>Entrar</Button>
                    </Stack>
                  </form>

                  <Divider label="ou entrar com" labelPosition="center" styles={{ label: { fontWeight: 600, fontSize: rem(11), color: 'gray' } }} />

                   <Group grow gap="sm">
                    <SsoButton icon={IconBrandGoogle} label="Google" color="#EA4335" onClick={() => handleSso('google')} />
                    <SsoButton icon={IconBrandWindows} label="Microsoft" color="#00A4EF" onClick={() => handleSso('microsoft')} />
                   </Group>

                  <Stack align="center" gap={5}>
                    <Text size="sm" c="gray.6" fw={500}>
                      Novo por aqui? <Anchor component="button" onClick={() => setAuthMode('register')} fw={800} c="farol-blue" underline="never">Crie sua conta</Anchor>
                    </Text>
                    <Anchor component="button" onClick={() => setAuthMode('forgot')} size="sm" fw={600} c="gray.5" underline="never">Esqueceu sua senha?</Anchor>
                  </Stack>
                </Stack>
              </motion.div>
            )}

            {authMode === 'magic' && (
              <motion.div key="magic" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                 <Stack gap={rem(30)}>
                    <Box>
                      <Anchor component="button" onClick={() => setAuthMode('login')} size="sm" c="gray.5" fw={700} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 15 }}>
                        <IconArrowLeft size={16} /> VOLTAR AO LOGIN
                      </Anchor>
                      <Title order={2} fw={800} size={rem(32)}>Login via e-mail</Title>
                      <Text c="dimmed" fw={500}>Enviaremos um código de acesso instantâneo.</Text>
                    </Box>

                    <form onSubmit={handleMagic}>
                      <Stack gap="md">
                        <TextInput 
                          placeholder="Digite seu e-mail" size="md" radius="md" required 
                          value={email} onChange={(e) => setEmail(e.currentTarget.value)}
                          styles={{ input: { height: rem(54), backgroundColor: '#f8fafc' } }} 
                        />
                        <Button fullWidth size="lg" radius="md" color="farol-blue" mt="md" type="submit" loading={formLoading} style={{ height: rem(54) }}>Receber código</Button>
                      </Stack>
                    </form>
                 </Stack>
              </motion.div>
            )}

            {authMode === 'otp' && (
              <motion.div key="otp" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                 <Stack gap={rem(30)} align="center">
                    <Box w="100%">
                      <Title order={2} fw={800} size={rem(32)} ta="center">Validar código</Title>
                      <Text c="dimmed" ta="center" fw={500}>Insira o token de 6 dígitos enviado por e-mail.</Text>
                    </Box>

                    <form onSubmit={handleVerifyOtp} style={{ width: '100%' }}>
                      <Stack gap="xl" align="center">
                        <PinInput size="lg" length={6} type="number" color="farol-blue" value={otpCode} onChange={setOtpCode} autoFocus />
                        <Button fullWidth size="lg" radius="md" color="farol-blue" type="submit" loading={formLoading} style={{ height: rem(54) }}>Verificar Token</Button>
                        <Anchor component="button" type="button" onClick={() => setAuthMode('login')} size="sm" c="gray.5" fw={700}>TENTAR OUTRO MÉTODO</Anchor>
                      </Stack>
                    </form>
                 </Stack>
              </motion.div>
            )}

            {authMode === 'sso' && (
              <motion.div key="sso" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                 <Stack gap={rem(30)}>
                    <Box>
                      <Anchor component="button" onClick={() => setAuthMode('login')} size="sm" c="gray.5" fw={700} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 15 }}>
                        <IconArrowLeft size={16} /> VOLTAR AO LOGIN
                      </Anchor>
                      <Title order={2} fw={800} size={rem(32)}>Single Sign-On</Title>
                      <Text c="dimmed" fw={500}>Autenticação via portal corporativo.</Text>
                    </Box>
                    <form onSubmit={handleCorporateSso}>
                      <Stack gap="md">
                        <TextInput placeholder="e-mail@empresa.com" size="md" radius="md" required value={email} onChange={(e) => setEmail(e.currentTarget.value)} styles={{ input: { height: rem(54), backgroundColor: '#f8fafc' } }} />
                        <Button fullWidth size="lg" radius="md" color="farol-blue" mt="md" type="submit" loading={formLoading} style={{ height: rem(54) }}>Continuar</Button>
                      </Stack>
                    </form>
                 </Stack>
              </motion.div>
            )}

            {authMode === 'register' && (
              <motion.div key="register" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                 <Stack gap={rem(30)}>
                    <Box>
                      <Title order={2} fw={800} size={rem(32)}>Criar conta</Title>
                      <Text c="dimmed" fw={500}>Bem-vindo ao cockpit de resultados.</Text>
                    </Box>
                    <form onSubmit={(e) => { e.preventDefault(); setAuthMode('login'); }}>
                      <Stack gap="md">
                        <TextInput placeholder="Nome completo" size="md" radius="md" required styles={{ input: { height: rem(54), backgroundColor: '#f8fafc' } }} />
                        <TextInput placeholder="E-mail" size="md" radius="md" required styles={{ input: { height: rem(54), backgroundColor: '#f8fafc' } }} />
                        <PasswordInput placeholder="Senha de acesso" size="md" radius="md" required styles={{ input: { height: rem(54), backgroundColor: '#f8fafc' } }} />
                        <Button fullWidth size="lg" radius="md" color="farol-blue" mt="md" type="submit" style={{ height: rem(54) }}>Cadastrar agora</Button>
                        <Anchor component="button" onClick={() => setAuthMode('login')} size="sm" c="gray.5" fw={700} ta="center">JÁ TENHO UMA CONTA</Anchor>
                      </Stack>
                    </form>
                 </Stack>
              </motion.div>
            )}

            {authMode === 'forgot' && (
              <motion.div key="forgot" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                 <Stack gap={rem(30)}>
                    <Box>
                      <Title order={2} fw={800} size={rem(32)}>Recuperar senha</Title>
                      <Text c="dimmed" fw={500}>Instruções chegarão via e-mail.</Text>
                    </Box>
                    <form onSubmit={(e) => { e.preventDefault(); setAuthMode('login'); }}>
                      <Stack gap="md">
                        <TextInput placeholder="seu@email.com" size="md" radius="md" required styles={{ input: { height: rem(54), backgroundColor: '#f8fafc' } }} />
                        <Button fullWidth size="lg" radius="md" color="farol-blue" mt="md" type="submit" style={{ height: rem(54) }}>Solicitar Link</Button>
                        <Anchor component="button" onClick={() => setAuthMode('login')} size="sm" c="gray.5" fw={700} ta="center" mt="md">VOLTAR AO LOGIN</Anchor>
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
