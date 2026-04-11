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
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useAuthContext } from '../../application/context/AuthContext';

const WelcomePhrases = [
  "Direção Estratégica",
  "Decisões por Dados",
  "Sua Bússola",
  "Resultado Real"
];

type AuthMode = 'login' | 'register' | 'forgot' | 'magic' | 'otp' | 'sso';

export default function Login() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, isAuthenticated } = useAuthContext();

  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [welcomeIndex, setWelcomeIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const currentFullText = WelcomePhrases[welcomeIndex];
    const typingSpeed = isDeleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.slice(0, displayText.length + 1));
        if (displayText.length + 1 === currentFullText.length) setTimeout(() => setIsDeleting(true), 3000);
      } else {
         setDisplayText(currentFullText.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setWelcomeIndex((prev) => (prev + 1) % WelcomePhrases.length);
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
      notifications.show({ title: 'Código Enviado', message: `Verifique sua caixa de entrada.`, color: 'farol-blue' });
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
      notifications.show({ title: 'SSO Microsoft', message: 'Indisponível no momento.', color: 'gray' });
    }
  };

  const handleCorporateSso = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
       setFormLoading(false);
       notifications.show({ title: 'SSO Corporativo', message: 'Aguarde redirecionamento...', color: 'farol-blue' });
    }, 1200);
  };

  const SsoButton = ({ icon: Icon, label, color, onClick }: any) => (
    <UnstyledButton
      onClick={onClick}
      style={{
        height: rem(46),
        borderRadius: "var(--mantine-radius-md)",
        border: "1px solid var(--mantine-color-gray-2)",
        display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 10,
        backgroundColor: 'var(--mantine-color-white)',
        transition: 'all 0.15s ease',
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--mantine-color-gray-0)'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--mantine-color-white)'}
    >
      <Icon size={18} color={color} stroke={2} />
      <Text size="sm" fw={600} c="gray.7">{label}</Text>
    </UnstyledButton>
  );

  return (
    <Box style={{ height: '100vh', display: 'flex', backgroundColor: '#ffffff' }}>
      {/* BRANDING SIDE - Minimalist Apple/Google Style */}
      <Box visibleFrom="md" style={{ 
        flex: '1.1', 
        position: 'relative', 
        overflow: 'hidden', 
        backgroundColor: '#00080a', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Soft Organic Aura */}
        <motion.div
           animate={{ opacity: [0.3, 0.4, 0.3] }}
           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
           style={{
             position: 'absolute',
             width: '80%', height: '80%',
             background: 'radial-gradient(circle, #01579B 0%, transparent 70%)',
             filter: 'blur(100px)',
           }}
        />

        <Stack align="center" gap={0} style={{ position: 'relative', zIndex: 10 }}>
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           >
              <Title order={1} c="white" style={{ fontSize: rem(82), fontWeight: 800, letterSpacing: rem(-3) }}>FAROL</Title>
           </motion.div>
           
           <Box h={rem(30)} style={{ overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                 <motion.div
                   key={displayText}
                   initial={{ y: -10, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   exit={{ y: 5, opacity: 0 }}
                   transition={{ duration: 0.5, ease: "easeOut" }}
                 >
                    <Text c="white" opacity={0.5} fw={400} size="xl" style={{ fontSize: rem(20), letterSpacing: 1 }}>{displayText}</Text>
                 </motion.div>
              </AnimatePresence>
           </Box>
        </Stack>
      </Box>

      {/* FORM SIDE */}
      <Box style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container size={rem(380)} w="100%">
          <AnimatePresence mode="wait">
            {authMode === 'login' && (
              <motion.div key="login" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <Stack gap={rem(30)}>
                  <Box>
                    <Title order={2} fw={700} size={rem(28)}>Fazer login</Title>
                    <Text c="dimmed" size="sm" mt={4}>Prossiga para o cockpit estratégico.</Text>
                  </Box>

                  <form onSubmit={handleLogin}>
                    <Stack gap="md">
                      <TextInput 
                        placeholder="E-mail" size="md" radius="md" required 
                        value={email} onChange={(e) => setEmail(e.currentTarget.value)}
                        styles={{ input: { height: rem(48) } }}
                      />
                      <PasswordInput 
                        placeholder="Senha" size="md" radius="md" required 
                        value={password} onChange={(e) => setPassword(e.currentTarget.value)}
                        styles={{ input: { height: rem(48) } }}
                      />
                      
                      <Group justify="space-between" mt={4}>
                         <Checkbox label="Lembrar-me" size="xs" color="farol-blue" />
                         <Group gap="sm">
                           <Anchor component="button" type="button" onClick={() => setAuthMode('magic')} size="xs" fw={700} c="farol-blue">Login via e-mail</Anchor>
                           <Anchor component="button" type="button" onClick={() => setAuthMode('sso')} size="xs" fw={700} c="farol-blue">SSO</Anchor>
                         </Group>
                      </Group>

                      <Button fullWidth size="lg" radius="md" color="farol-blue" type="submit" loading={formLoading} mt="md" style={{ height: rem(48) }}>Próximo</Button>
                    </Stack>
                  </form>

                  <Divider label="ou continue com" labelPosition="center" styles={{ label: { fontSize: rem(12), color: 'gray' } }} />

                   <Group grow gap="sm">
                    <SsoButton icon={IconBrandGoogle} label="Google" color="#EA4335" onClick={() => handleSso('google')} />
                    <SsoButton icon={IconBrandWindows} label="Microsoft" color="#00A4EF" onClick={() => handleSso('microsoft')} />
                   </Group>

                  <Stack align="center" gap={4}>
                    <Text size="sm" c="dimmed">
                      Novo por aqui? <Anchor component="button" onClick={() => setAuthMode('register')} fw={700} c="farol-blue">Crie sua conta</Anchor>
                    </Text>
                    <Anchor component="button" onClick={() => setAuthMode('forgot')} size="sm" c="dimmed">Esqueceu a senha?</Anchor>
                  </Stack>
                </Stack>
              </motion.div>
            )}

            {authMode === 'magic' && (
              <motion.div key="magic" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                 <Stack gap={rem(25)}>
                    <Box>
                      <Anchor component="button" onClick={() => setAuthMode('login')} size="sm" c="gray.5" fw={700} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 15 }}>
                        <IconArrowLeft size={16} /> VOLTAR AO LOGIN
                      </Anchor>
                      <Title order={2} fw={700} size={rem(28)}>Login via e-mail</Title>
                    </Box>
                    <form onSubmit={handleMagic}>
                      <Stack gap="md">
                        <TextInput placeholder="Seu e-mail" size="md" radius="md" required value={email} onChange={(e) => setEmail(e.currentTarget.value)} styles={{ input: { height: rem(48) } }} />
                        <Button fullWidth size="lg" radius="md" color="farol-blue" type="submit" loading={formLoading} style={{ height: rem(48) }}>Receber código</Button>
                      </Stack>
                    </form>
                 </Stack>
              </motion.div>
            )}

            {authMode === 'otp' && (
              <motion.div key="otp" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                 <Stack gap={rem(25)} align="center">
                    <Title order={2} fw={700} size={rem(28)}>Inserir código</Title>
                    <form onSubmit={handleVerifyOtp} style={{ width: '100%' }}>
                      <Stack gap="xl" align="center">
                        <PinInput size="lg" length={6} type="number" color="farol-blue" value={otpCode} onChange={setOtpCode} autoFocus />
                        <Button fullWidth size="lg" radius="md" color="farol-blue" type="submit" loading={formLoading} style={{ height: rem(48) }}>Verificar</Button>
                        <Anchor component="button" type="button" onClick={() => setAuthMode('login')} size="sm" c="dimmed">Tentar outro método</Anchor>
                      </Stack>
                    </form>
                 </Stack>
              </motion.div>
            )}

            {authMode === 'sso' && (
              <motion.div key="sso" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                 <Stack gap={rem(25)}>
                    <Anchor component="button" onClick={() => setAuthMode('login')} size="sm" c="gray.5" fw={700} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 15 }}>
                      <IconArrowLeft size={16} /> VOLTAR
                    </Anchor>
                    <Title order={2} fw={700} size={rem(28)}>SSO Corporativo</Title>
                    <form onSubmit={handleCorporateSso}>
                      <Stack gap="md">
                        <TextInput placeholder="e-mail@empresa.com" size="md" radius="md" required value={email} onChange={(e) => setEmail(e.currentTarget.value)} styles={{ input: { height: rem(48) } }} />
                        <Button fullWidth size="lg" radius="md" color="farol-blue" type="submit" loading={formLoading} style={{ height: rem(48) }}>Continuar</Button>
                      </Stack>
                    </form>
                 </Stack>
              </motion.div>
            )}

            {authMode === 'register' && (
              <motion.div key="register" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                 <Stack gap={rem(25)}>
                    <Title order={2} fw={700} size={rem(28)}>Criar conta</Title>
                    <form onSubmit={(e) => { e.preventDefault(); setAuthMode('login'); }}>
                      <Stack gap="md">
                        <TextInput placeholder="Nome" size="md" radius="md" required styles={{ input: { height: rem(48) } }} />
                        <TextInput placeholder="E-mail" size="md" radius="md" required styles={{ input: { height: rem(48) } }} />
                        <PasswordInput placeholder="Senha" size="md" radius="md" required styles={{ input: { height: rem(48) } }} />
                        <Button fullWidth size="lg" radius="md" color="farol-blue" mt="md" type="submit" style={{ height: rem(48) }}>Começar</Button>
                        <Anchor component="button" onClick={() => setAuthMode('login')} size="sm" c="dimmed" ta="center">Voltar ao login</Anchor>
                      </Stack>
                    </form>
                 </Stack>
              </motion.div>
            )}

            {authMode === 'forgot' && (
              <motion.div key="forgot" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                 <Stack gap={rem(25)}>
                    <Title order={2} fw={700} size={rem(28)}>Recuperar senha</Title>
                    <form onSubmit={(e) => { e.preventDefault(); setAuthMode('login'); }}>
                      <Stack gap="md">
                        <TextInput placeholder="Seu e-mail" size="md" radius="md" required styles={{ input: { height: rem(48) } }} />
                        <Button fullWidth size="lg" radius="md" color="farol-blue" type="submit" style={{ height: rem(48) }}>Enviar link</Button>
                        <Anchor component="button" onClick={() => setAuthMode('login')} size="sm" c="dimmed" ta="center" mt="md">Cancelar</Anchor>
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
