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
  Grid,
  Anchor,
} from '@mantine/core';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { IconArrowRight, IconLock, IconMail, IconBrandGoogle } from '@tabler/icons-react';
import { useAuthContext } from '../../application/context/AuthContext';

const WelcomeTexts = [
  "Estratégia em Fluxo.",
  "Decisões orientadas por dados.",
  "Seu norte para o sucesso.",
  "Onde OKRs ganham vida."
];

export default function Login() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, isAuthenticated } = useAuthContext();

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
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

  // Efeito Typewriter
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

  // Lighthouse Beam mouse effect
  const handleMouseMove = useCallback((e: React.MouseEvent | MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    setMousePos({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Login handler
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
      className="split-login-container"
      style={{ 
        minHeight: '100vh', 
        width: '100vw',
        background: '#001219',
        overflowX: 'hidden',
        overflowY: 'auto',
        position: 'relative',
        display: 'flex',
      }}
    >
      <style>
        {`
          .split-login-container {
            flex-direction: column;
          }
          .marketing-side {
            width: 100%;
            min-height: 40vh;
            padding: 40px;
          }
          .auth-side {
            width: 100%;
            background-color: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(25px);
            padding: 20px;
            min-height: 60vh;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }
          .bg-image-fixed {
            width: 100%;
          }
          .beam-effect-fixed {
            width: 100%;
          }
          .auth-paper {
            background-color: transparent;
          }
          .auth-title { color: #fff; }
          .auth-text { color: rgba(255, 255, 255, 0.7); }
          .auth-label { color: rgba(255, 255, 255, 0.7); }
          .auth-input { 
            background-color: rgba(255, 255, 255, 0.9) !important; 
            color: #000 !important;
          }

          @media (min-width: 992px) {
            .split-login-container {
              flex-direction: row;
            }
            .marketing-side {
              width: 55%;
              height: 100vh;
              padding: 80px;
            }
            .auth-side {
              width: 45%;
              height: 100vh;
              background-color: #f8f9fa;
              backdrop-filter: none;
              padding: 60px;
              border-top: none;
              border-left: 1px solid rgba(0, 0, 0, 0.05);
            }
            .bg-image-fixed {
              width: 55%;
            }
            .beam-effect-fixed {
              width: 55%;
            }
            .auth-title { color: #1A1B1E; }
            .auth-text { color: #909296; }
            .auth-label { color: #495057; }
            .auth-input { 
              background-color: #fff !important; 
              color: #000 !important;
              border-color: #ced4da !important;
            }
            .copyright-text { display: block !important; }
          }
        `}
      </style>

      {/* Background Image */}
      <Box 
        className="bg-image-fixed"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          backgroundImage: 'url("/bg-farol.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
          filter: 'brightness(0.5) contrast(1.2)',
          zIndex: 0,
        }}
      />

      {/* Lighthouse Beam Effect */}
      <Box 
        className="beam-effect-fixed"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          zIndex: 1,
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(3, 169, 244, 0.2) 0%, rgba(0, 18, 25, 0.8) 60%)`,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }} 
      />

      <Box 
        style={{ 
          display: 'flex', 
          width: '100%', 
          position: 'relative', 
          zIndex: 2,
          flexDirection: 'inherit',
        }}
      >
        {/* LADO ESQUERDO: Branding */}
        <Box 
          className="marketing-side"
          style={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Stack gap="xl">
            <Box>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Title 
                  style={{ 
                    fontSize: 'clamp(48px, 10vw, 96px)', 
                    color: 'white', 
                    letterSpacing: '-3px',
                    fontWeight: 900,
                    lineHeight: 1,
                    textShadow: '0 0 30px rgba(3, 169, 244, 0.4)'
                  }}
                >
                  FAROL
                </Title>
              </motion.div>
              
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ 
                  height: '4px', 
                  background: 'linear-gradient(90deg, #03A9F4, transparent)', 
                  width: '180px', 
                  marginTop: '10px',
                  transformOrigin: 'left'
                }}
              />
            </Box>

            <Box style={{ minHeight: '100px' }}>
              <Title order={2} c="cyan.1" style={{ fontWeight: 400, opacity: 0.9, fontSize: 'clamp(20px, 4.5vw, 42px)', display: 'inline-flex', alignItems: 'center' }}>
                {displayText}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  style={{ 
                    marginLeft: '8px', 
                    width: '4px', 
                    height: '1em', 
                    background: '#03A9F4', 
                    display: 'inline-block' 
                  }}
                />
              </Title>
            </Box>

            <Text c="white" opacity={0.7} maw={520} size="xl" visibleFrom="sm" style={{ lineHeight: 1.6 }}>
              A plataforma definitiva para gerenciar sua estratégia com agilidade e clareza. 
              Navegue pelos seus OKRs com precisão estratégica e foco total em resultados.
            </Text>
          </Stack>
        </Box>

        {/* LADO DIREITO: Auth */}
        <Box 
          className="auth-side"
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ width: '100%', maxWidth: '420px' }}
          >
            <Paper 
              radius="lg" 
              p={{ base: 25, sm: 40 }} 
              className="auth-paper"
            >
              <Stack gap="xs" mb="xl">
                <Title order={3} className="auth-title" ta="center" fw={700} size="h3">Acesse o Cockpit</Title>
                <Text className="auth-text" size="sm" ta="center">
                  Informe suas credenciais para continuar
                </Text>
              </Stack>
              
              <form onSubmit={handleLogin}>
                <Stack gap="md">
                  <TextInput 
                    label={<Text className="auth-label" size="xs" mb={4} fw={700}>E-MAIL</Text>}
                    placeholder="seu@farol.com"
                    leftSection={<IconMail size={18} color="#03A9F4" />}
                    variant="filled"
                    size="md"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    required
                    className="auth-input"
                  />

                  <PasswordInput 
                    label={<Text className="auth-label" size="xs" mb={4} fw={700}>SENHA</Text>}
                    placeholder="••••••••"
                    leftSection={<IconLock size={18} color="#03A9F4" />}
                    variant="filled"
                    size="md"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    required
                    className="auth-input"
                  />

                  <Button 
                    fullWidth 
                    size="md" 
                    mt="md" 
                    color="cyan"
                    type="submit"
                    loading={formLoading}
                    rightSection={<IconArrowRight size={18} />}
                    style={{ 
                      height: '54px',
                      fontSize: '16px',
                      boxShadow: '0 8px 25px rgba(3, 169, 244, 0.4)'
                    }}
                  >
                    Iniciar Sessão
                  </Button>
                </Stack>
              </form>

              <Divider my="xl" label={<Text size="xs" c="dimmed">ou entre com</Text>} labelPosition="center" />
              
              <Grid gutter="sm">
                <Grid.Col span={12}>
                  <Button 
                    fullWidth 
                    variant="outline" 
                    color="gray" 
                    size="md" 
                    radius="md"
                    leftSection={<IconBrandGoogle size={20} />}
                    onClick={signInWithGoogle}
                    style={{ height: '48px' }}
                  >
                    Continuar com Google
                  </Button>
                </Grid.Col>
              </Grid>

              <Stack align="center" mt="xl" gap="sm">
                <Anchor component={Link} to="/forgot-password" size="xs" c="cyan.6" fw={600}>Esqueceu sua senha?</Anchor>
                <Text size="xs" c="dimmed">Powered by Google AI & Supabase</Text>
              </Stack>
            </Paper>
          </motion.div>
        </Box>
      </Box>

      {/* Copyright discreto */}
      <Text 
        className="copyright-text"
        style={{ 
          position: 'fixed', 
          bottom: '20px', 
          left: '40px', 
          color: 'rgba(255,255,255,0.4)', 
          fontSize: '10px',
          zIndex: 3,
          display: 'none',
        }}
      >
        © 2026 FAROL ESTRATÉGIA. TODOS OS DIREITOS RESERVADOS.
      </Text>
    </Box>
  );
}
