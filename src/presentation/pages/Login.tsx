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
        id: 'login-hint', title: 'Demonstração', message: 'Acesse com admin / admin.',
        color: 'gray', radius: 'md', autoClose: 5000,
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
        notifications.show({ title: 'Acesso Negado', message: 'Credenciais inválidas.', color: 'red', icon: <IconX size={16} /> });
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
      notifications.show({ title: 'Código Enviado', message: `Verifique seu e-mail.`, color: 'blue' });
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
      notifications.show({ title: 'SSO Microsoft', message: 'Em breve disponível.', color: 'gray' });
    }
  };

  const handleCorporateSso = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
       setFormLoading(false);
       notifications.show({ title: 'SSO Corporativo', message: 'Redirecionando...', color: 'blue' });
    }, 1200);
  };

  const SsoButton = ({ icon: Icon, label, color, onClick }: any) => (
    <UnstyledButton
      onClick={onClick}
      style={{
        height: rem(48),
        borderRadius: "var(--mantine-radius-md)",
        border: "1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))",
        display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 10,
        backgroundColor: 'var(--mantine-color-white)',
        transition: 'background-color 0.2s ease',
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--mantine-color-gray-0)'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--mantine-color-white)'}
    >
      <Icon size={18} color={color} />
      <Text size="sm" fw={500} c="dimmed">{label}</Text>
    </UnstyledButton>
  );

  return (
    <Box style={{ height: '100vh', display: 'flex', backgroundColor: '#ffffff' }}>
      {/* BRANDING SIDE - Apple Minimalist Style */}
      <Box visibleFrom="md" style={{ 
        flex: '1.2', 
        position: 'relative', 
        overflow: 'hidden', 
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Soft Liquid Organic Glows */}
        <motion.div
           animate={{ 
             scale: [1, 1.2, 1],
             rotate: [0, 45, 0],
             opacity: [0.3, 0.4, 0.3]
           }}
           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
           style={{
             position: 'absolute',
             width: '80%', height: '80%',
             background: 'radial-gradient(circle, #01579B 0%, transparent 70%)',
             filter: 'blur(100px)',
             top: '-10%', left: '-10%',
           }}
        />
        <motion.div
           animate={{ 
             scale: [1.2, 1, 1.2],
             rotate: [0, -45, 0],
             opacity: [0.2, 0.3, 0.2]
           }}
           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
           style={{
             position: 'absolute',
             width: '70%', height: '70%',
             background: 'radial-gradient(circle, #03A9F4 0%, transparent 70%)',
             filter: 'blur(80px)',
             bottom: '-20%', right: '-10%',
           }}
        />

        <Stack align="center" gap="xl" style={{ position: 'relative', zIndex: 10 }}>
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           >
              <Title order={1} c="white" style={{ fontSize: rem(90), fontWeight: 700, letterSpacing: rem(-4) }}>FAROL</Title>
           </motion.div>
           
           <Box h={40} style={{ overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                 <motion.div
                   key={displayText}
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   exit={{ y: -20, opacity: 0 }}
                   transition={{ duration: 0.4 }}
                 >
                    <Text c="white" opacity={0.6} fw={400} size="xl">{displayText}</Text>
                 </motion.div>
              </AnimatePresence>
           </Box>
        </Stack>
      </Box>

      {/* FORM SIDE */}
      <Box style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container size={rem(400)} w="100%">
          <AnimatePresence mode="wait">
            {authMode === 'login' && (
              <motion.div key="login" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <Stack gap={rem(40)}>
                  <Box>
                    <Title order={2} fw={700} size={rem(32)}>Fazer login</Title>
                    <Text c="dimmed" mt={5}>Use sua conta corporativa para acessar o Farol.</Text>
                  </Box>

                  <form onSubmit={handleLogin}>
                    <Stack gap="md">
                      <TextInput 
                        placeholder="E-mail" 
                        size="md" radius="md" required 
                        value={email} onChange={(e) => setEmail(e.currentTarget.value)}
                        styles={{ input: { height: rem(52) } }}
                      />
                      <PasswordInput 
                        placeholder="Senha" 
                        size="md" radius="md" required 
                        value={password} onChange={(e) => setPassword(e.currentTarget.value)}
                        styles={{ input: { height: rem(52) } }}
                      />
                      
                      <Group justify="space-between" mt="xs">
                         <Checkbox label="Lembrar-me" size="xs" color="dark" />
                         <Group gap="sm">
                           <Anchor component="button" type="button" onClick={() => setAuthMode('magic')} size="xs" fw={600} c="dark">Login via e-mail</Anchor>
                           <Anchor component="button" type="button" onClick={() => setAuthMode('sso')} size="xs" fw={600} c="dark">SSO Corporativo</Anchor>
                         </Group>
                      </Group>

                      <Button fullWidth size="lg" radius="md" color="dark" type="submit" loading={formLoading} mt="lg">Próximo</Button>
                    </Stack>
                  </form>

                  <Divider label="ou continue com" labelPosition="center" />

                   <Group grow gap="sm">
                    <SsoButton icon={IconBrandGoogle} label="Google" color="#EA4335" onClick={() => handleSso('google')} />
                    <SsoButton icon={IconBrandWindows} label="Microsoft" color="#00A4EF" onClick={() => handleSso('microsoft')} />
                   </Group>

                  <Stack align="center" gap={5}>
                    <Text size="sm" c="dimmed">
                      Novo por aqui? <Anchor component="button" onClick={() => setAuthMode('register')} fw={700} c="dark">Crie sua conta</Anchor>
                    </Text>
                    <Anchor component="button" onClick={() => setAuthMode('forgot')} size="sm" c="dimmed">Esqueceu a senha?</Anchor>
                  </Stack>
                </Stack>
              </motion.div>
            )}

            {authMode === 'magic' && (
              <motion.div key="magic" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                 <Stack gap={rem(30)}>
                    <Box>
                      <Anchor component="button" onClick={() => setAuthMode('login')} size="sm" c="dimmed" style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 15 }}>
                        <IconArrowLeft size={16} /> Voltar ao login
                      </Anchor>
                      <Title order={2} fw={700} size={rem(32)}>Login via e-mail</Title>
                      <Text c="dimmed">Enviaremos um código de acesso instantâneo.</Text>
                    </Box>

                    <form onSubmit={handleMagic}>
                      <Stack gap="md">
                        <TextInput 
                          placeholder="Digite seu e-mail" size="md" radius="md" required 
                          value={email} onChange={(e) => setEmail(e.currentTarget.value)}
                          styles={{ input: { height: rem(52) } }} 
                        />
                        <Button fullWidth size="lg" radius="md" color="dark" mt="md" type="submit" loading={formLoading}>Enviar código</Button>
                      </Stack>
                    </form>
                 </Stack>
              </motion.div>
            )}

            {authMode === 'otp' && (
              <motion.div key="otp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                 <Stack gap={rem(30)} align="center">
                    <Box w="100%">
                      <Title order={2} fw={700} size={rem(32)} ta="center">Validar código</Title>
                      <Text c="dimmed" ta="center">Insira o token de 6 dígitos enviado por e-mail.</Text>
                    </Box>

                    <form onSubmit={handleVerifyOtp} style={{ width: '100%' }}>
                      <Stack gap="xl" align="center">
                        <PinInput size="lg" length={6} type="number" value={otpCode} onChange={setOtpCode} autoFocus aria-label="Código OTp" />
                        <Button fullWidth size="lg" radius="md" color="dark" type="submit" loading={formLoading}>Verificar</Button>
                        <Anchor component="button" type="button" onClick={() => setAuthMode('login')} size="sm" c="dimmed">Tentar outro método</Anchor>
                      </Stack>
                    </form>
                 </Stack>
              </motion.div>
            )}

            {authMode === 'sso' && (
              <motion.div key="sso" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                 <Stack gap={rem(30)}>
                    <Box>
                      <Anchor component="button" onClick={() => setAuthMode('login')} size="sm" c="dimmed" style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 15 }}>
                        <IconArrowLeft size={16} /> Voltar ao login
                      </Anchor>
                      <Title order={2} fw={700} size={rem(32)}>Single Sign-On</Title>
                      <Text c="dimmed">Informe seu e-mail para identificação.</Text>
                    </Box>
                    <form onSubmit={handleCorporateSso}>
                      <Stack gap="md">
                        <TextInput placeholder="e-mail@empresa.com" size="md" radius="md" required value={email} onChange={(e) => setEmail(e.currentTarget.value)} styles={{ input: { height: rem(52) } }} />
                        <Button fullWidth size="lg" radius="md" color="dark" mt="md" type="submit" loading={formLoading}>Continuar com SSO</Button>
                      </Stack>
                    </form>
                 </Stack>
              </motion.div>
            )}

            {authMode === 'register' && (
              <motion.div key="register" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                 <Stack gap={rem(30)}>
                    <Box>
                      <Title order={2} fw={700} size={rem(32)}>Criar conta</Title>
                      <Text c="dimmed">Bem-vindo à jornada estratégica.</Text>
                    </Box>
                    <form onSubmit={(e) => { e.preventDefault(); setAuthMode('login'); }}>
                      <Stack gap="md">
                        <TextInput placeholder="Nome completo" size="md" radius="md" required styles={{ input: { height: rem(52) } }} />
                        <TextInput placeholder="E-mail" size="md" radius="md" required styles={{ input: { height: rem(52) } }} />
                        <PasswordInput placeholder="Crie uma senha" size="md" radius="md" required styles={{ input: { height: rem(52) } }} />
                        <Button fullWidth size="lg" radius="md" color="dark" mt="md" type="submit">Começar</Button>
                        <Anchor component="button" onClick={() => setAuthMode('login')} size="sm" c="dimmed" ta="center">Já tenho conta</Anchor>
                      </Stack>
                    </form>
                 </Stack>
              </motion.div>
            )}

            {authMode === 'forgot' && (
              <motion.div key="forgot" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                 <Stack gap={rem(30)}>
                    <Box>
                      <Title order={2} fw={700} size={rem(32)}>Recuperar senha</Title>
                      <Text c="dimmed">Enviaremos as instruções por e-mail.</Text>
                    </Box>
                    <form onSubmit={(e) => { e.preventDefault(); setAuthMode('login'); }}>
                      <Stack gap="md">
                        <TextInput placeholder="Insira seu e-mail" size="md" radius="md" required styles={{ input: { height: rem(52) } }} />
                        <Button fullWidth size="lg" radius="md" color="dark" mt="md" type="submit">Enviar link</Button>
                        <Anchor component="button" onClick={() => setAuthMode('login')} size="sm" c="dimmed" ta="center">Voltar ao login</Anchor>
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
