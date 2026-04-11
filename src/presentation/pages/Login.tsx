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
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useAuthContext } from '../../application/context/AuthContext';

const WelcomePhrases = [
  "Direção Estratégica",
  "Decisões por Dados",
  "Sua Bússola",
  "Resultado Real",
  "Performance de Elite",
  "Alinhamento Total",
  "Gestão Inteligente"
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
        notifications.show({ title: 'Acesso Negado', message: 'Verifique seus dados.', color: 'red', icon: <IconX size={16} /> });
      } else {
        navigate('/');
      }
    } catch (err) {
       notifications.show({ title: 'Erro de Conexão', color: 'red' });
    } finally {
      setFormLoading(false);
    }
  };

  const handleMagic = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      notifications.show({ title: 'Token Enviado', message: 'Confira seu e-mail.', color: 'blue' });
      setAuthMode('otp');
    }, 1200);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      if (otpCode === '123456' || otpCode === '000000') navigate('/');
      else notifications.show({ title: 'Código Inválido', color: 'red' });
    }, 1000);
  };

  const handleSso = async (provider: 'google' | 'microsoft') => {
    notifications.show({
      title: 'Conectando...',
      message: `Iniciando autenticação com ${provider}...`,
      color: 'blue',
      loading: true,
      autoClose: 1500,
    });

    if (provider === 'google') {
      try { await signInWithGoogle(); } catch (err) { console.error(err); }
    } else {
      setTimeout(() => {
        notifications.show({ title: 'SSO Microsoft', message: 'Disponível em breve.', color: 'gray' });
      }, 1000);
    }
  };

  const handleCorporateSso = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
       setFormLoading(false);
       notifications.show({ title: 'Redirecionando...', color: 'blue' });
    }, 1200);
  };

  const SsoButton = ({ icon: Icon, label, color, onClick }: any) => (
    <UnstyledButton
      onClick={onClick}
      style={{
        height: rem(48),
        borderRadius: "var(--mantine-radius-md)",
        border: "1px solid var(--mantine-color-gray-1)",
        display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 10,
        backgroundColor: 'var(--mantine-color-white)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--mantine-color-gray-0)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--mantine-color-white)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <Icon size={18} color={color} stroke={1.5} />
      <Text size="sm" fw={500} c="gray.7">{label}</Text>
    </UnstyledButton>
  );

  // Animation variants
  const itemVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
  };

  return (
    <Box style={{ height: '100vh', display: 'flex', backgroundColor: '#ffffff' }}>
      
      {/* BRANDING SIDE - Apple Account Style (White + Iridescent Blob) */}
      <Box visibleFrom="md" style={{ 
        flex: '1.2', 
        position: 'relative', 
        overflow: 'hidden', 
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRight: '1px solid var(--mantine-color-gray-1)'
      }}>
        {/* Soft Iridescent Blob Centerpiece */}
        <motion.div
           animate={{ 
             scale: [1, 1.2, 1],
             rotate: [0, 180, 360],
           }}
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           style={{
             position: 'absolute',
             width: '600px', height: '600px',
             background: 'linear-gradient(135deg, rgba(1, 87, 155, 0.12) 0%, rgba(3, 169, 244, 0.12) 25%, rgba(103, 58, 183, 0.12) 50%, rgba(33, 150, 243, 0.08) 75%, rgba(1, 87, 155, 0.12) 100%)',
             filter: 'blur(100px)',
             borderRadius: '50%',
           }}
        />

        <Stack align="center" gap={0} style={{ position: 'relative', zIndex: 10 }}>
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           >
              <Title order={1} c="dark.7" style={{ fontSize: rem(82), fontWeight: 700, letterSpacing: rem(-4) }}>FAROL</Title>
           </motion.div>
           
           <Box h={rem(32)} mt={rem(10)} style={{ overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                 <motion.div
                   key={displayText}
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   exit={{ y: -20, opacity: 0 }}
                   transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                 >
                    <Text c="gray.6" fw={400} size="lg" style={{ letterSpacing: 0.5 }}>{displayText}</Text>
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
              <motion.div 
                key="login" 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                variants={{ 
                  animate: { transition: { staggerChildren: 0.08 } } 
                }}
              >
                <Stack gap={rem(32)}>
                  <motion.div variants={itemVariants}>
                    <Title order={2} fw={600} size={rem(32)} c="dark.7" ta="center">Fazer login</Title>
                    <Text c="gray.5" size="md" mt={8} fw={500} ta="center">Bem-vindo ao cockpit de resultados.</Text>
                  </motion.div>

                  <motion.form onSubmit={handleLogin} variants={itemVariants}>
                    <Stack gap="md">
                      <TextInput 
                        placeholder="E-mail" size="md" radius="md" required 
                        value={email} onChange={(e) => setEmail(e.currentTarget.value)}
                        styles={{ input: { height: rem(52), border: '1.5px solid var(--mantine-color-gray-1)', '&:focus': { borderColor: 'var(--mantine-color-dark-4)' } } }}
                      />
                      <PasswordInput 
                        placeholder="Senha" size="md" radius="md" required 
                        value={password} onChange={(e) => setPassword(e.currentTarget.value)}
                        styles={{ input: { height: rem(52), border: '1.5px solid var(--mantine-color-gray-1)', '&:focus': { borderColor: 'var(--mantine-color-dark-4)' } } }}
                      />
                      
                      <Group justify="space-between" mt={4}>
                         <Checkbox label="Permanecer conectado" size="xs" color="dark" styles={{ label: { paddingLeft: 8, fontWeight: 500 } }} />
                         <Group gap="xs">
                           <Anchor component="button" type="button" onClick={() => setAuthMode('magic')} size="xs" fw={700} c="dark" underline="never">Usar e-mail</Anchor>
                           <Text size="xs" c="gray.3">|</Text>
                           <Anchor component="button" type="button" onClick={() => setAuthMode('sso')} size="xs" fw={700} c="dark" underline="never">SSO</Anchor>
                         </Group>
                      </Group>

                      <Button fullWidth size="lg" radius="md" color="dark" type="submit" loading={formLoading} mt="lg" style={{ height: rem(52), fontWeight: 700 }}>Acessar</Button>
                    </Stack>
                  </motion.form>

                  <motion.div variants={itemVariants}>
                    <Divider label="ou continuar com" labelPosition="center" styles={{ label: { color: 'var(--mantine-color-gray-4)', fontWeight: 600, fontSize: rem(10), textTransform: 'uppercase', letterSpacing: 1 } }} />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                     <Group grow gap="sm">
                      <SsoButton icon={IconBrandGoogle} label="Google" color="#EA4335" onClick={() => handleSso('google')} />
                      <SsoButton icon={IconBrandWindows} label="Microsoft" color="#00A4EF" onClick={() => handleSso('microsoft')} />
                     </Group>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Stack align="center" gap={8} mt="md">
                      <Text size="sm" c="gray.5" fw={500}>
                        Novo por aqui? <Anchor component="button" onClick={() => setAuthMode('register')} fw={700} c="dark" underline="hover">Criar conta</Anchor>
                      </Text>
                      <Anchor component="button" onClick={() => setAuthMode('forgot')} size="sm" c="gray.4" fw={500}>Esqueceu sua senha?</Anchor>
                    </Stack>
                  </motion.div>
                </Stack>
              </motion.div>
            )}

            {authMode === 'magic' && (
              <motion.div key="magic" initial="initial" animate="animate" exit="exit" variants={{ animate: { transition: { staggerChildren: 0.1 } } }}>
                 <Stack gap={rem(30)}>
                    <motion.div variants={itemVariants}>
                      <Anchor component="button" onClick={() => setAuthMode('login')} size="sm" c="gray.5" fw={700} mb={10} underline="never" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <IconArrowLeft size={16} /> Voltar
                      </Anchor>
                      <Title order={2} fw={600} size={rem(32)}>Entrar com e-mail</Title>
                      <Text c="gray.5" mt={5}>Enviaremos um código de segurança.</Text>
                    </motion.div>
                    <motion.form onSubmit={handleMagic} variants={itemVariants}>
                      <Stack gap="md">
                        <TextInput placeholder="seu@email.com" size="md" radius="md" required styles={{ input: { height: rem(52) } }} />
                        <Button fullWidth size="lg" radius="md" color="dark" type="submit" loading={formLoading}>Enviar código</Button>
                      </Stack>
                    </motion.form>
                 </Stack>
              </motion.div>
            )}

            {authMode === 'otp' && (
              <motion.div key="otp" initial="initial" animate="animate" exit="exit" variants={itemVariants}>
                 <Stack gap={rem(30)} align="center">
                    <Title order={2} fw={600} size={rem(32)} ta="center">Validar token</Title>
                    <form onSubmit={handleVerifyOtp} style={{ width: '100%' }}>
                      <Stack gap="xl" align="center">
                        <PinInput size="lg" length={6} type="number" color="dark" value={otpCode} onChange={setOtpCode} autoFocus />
                        <Button fullWidth size="lg" radius="md" color="dark" type="submit" loading={formLoading} style={{ height: (52) }}>Entrar</Button>
                        <Anchor component="button" type="button" onClick={() => setAuthMode('login')} size="sm" c="gray.4" fw={700} underline="never">TENTAR OUTRA FORMA</Anchor>
                      </Stack>
                    </form>
                 </Stack>
              </motion.div>
            )}

            {authMode === 'sso' && (
              <motion.div key="sso" initial="initial" animate="animate" exit="exit" variants={itemVariants}>
                 <Stack gap={rem(25)}>
                    <Anchor component="button" onClick={() => setAuthMode('login')} size="sm" c="gray.5" fw={700} mb={10} underline="never" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <IconArrowLeft size={16} /> Voltar
                    </Anchor>
                    <Title order={2} fw={600} size={rem(32)}>SSO Corporativo</Title>
                    <form onSubmit={handleCorporateSso}>
                      <Stack gap="md">
                        <TextInput placeholder="e-mail@empresa.com" size="md" radius="md" required styles={{ input: { height: rem(52) } }} />
                        <Button fullWidth size="lg" radius="md" color="dark" type="submit" loading={formLoading}>Continuar</Button>
                      </Stack>
                    </form>
                 </Stack>
              </motion.div>
            )}

            {authMode === 'register' && (
              <motion.div key="register" initial="initial" animate="animate" exit="exit" variants={{ animate: { transition: { staggerChildren: 0.1 } } }}>
                 <Stack gap={rem(25)}>
                    <motion.div variants={itemVariants}>
                      <Title order={2} fw={600} size={rem(32)}>Criar conta</Title>
                    </motion.div>
                    <motion.form onSubmit={(e) => { e.preventDefault(); setAuthMode('login'); }} variants={itemVariants}>
                      <Stack gap="md">
                        <TextInput placeholder="Nome" size="md" radius="md" required styles={{ input: { height: rem(52) } }} />
                        <TextInput placeholder="E-mail" size="md" radius="md" required styles={{ input: { height: rem(52) } }} />
                        <PasswordInput placeholder="Senha" size="md" radius="md" required styles={{ input: { height: rem(52) } }} />
                        <Button fullWidth size="lg" radius="md" color="dark" mt="md" type="submit">Cadastrar</Button>
                        <Anchor component="button" onClick={() => setAuthMode('login')} size="sm" c="gray.4" ta="center" fw={700} mt="md" display="block">JÁ TENHO CONTA</Anchor>
                      </Stack>
                    </motion.form>
                 </Stack>
              </motion.div>
            )}

            {authMode === 'forgot' && (
              <motion.div key="forgot" initial="initial" animate="animate" exit="exit" variants={itemVariants}>
                 <Stack gap={rem(25)}>
                    <Title order={2} fw={600} size={rem(32)} ta="center">Recuperar acesso</Title>
                    <form onSubmit={(e) => { e.preventDefault(); setAuthMode('login'); }}>
                      <Stack gap="md">
                        <TextInput placeholder="Seu e-mail" size="md" radius="md" required styles={{ input: { height: rem(52) } }} />
                        <Button fullWidth size="lg" radius="md" color="dark" type="submit">Enviar link</Button>
                        <Anchor component="button" onClick={() => setAuthMode('login')} size="sm" c="gray.4" ta="center" fw={700} mt="md" display="block">CANCELAR</Anchor>
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
