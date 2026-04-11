import { 
  Paper, 
  TextInput, 
  PasswordInput, 
  Button, 
  Title, 
  Text, 
  Stack, 
  Box,
  Group,
  Anchor,
  rem,
  Container,
  SimpleGrid
} from '@mantine/core';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  IconArrowRight, 
  IconLock, 
  IconMail, 
  IconUser,
  IconFingerprint,
  IconBuilding
} from '@tabler/icons-react';

export default function Register() {
  const navigate = useNavigate();
  const [formLoading, setFormLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    // Simulação de registro
    setTimeout(() => {
      setFormLoading(false);
      navigate('/login');
    }, 1500);
  };

  return (
    <Box 
      style={{ 
        minHeight: '100vh', 
        display: 'flex',
        backgroundColor: '#f8fafc',
      }}
    >
      {/* LADO ESQUERDO (Reutilizando branding) */}
      <Box 
        visibleFrom="md"
        style={{ 
          flex: '1',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#001219',
        }}
      >
        <Box 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("/strategic_lighthouse_login_bg.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.4,
          }}
        />
        <Stack p={rem(60)} justify="center" h="100%" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <Group gap="xs">
                <IconFingerprint size={32} color="white" stroke={2.5} />
                <Title order={2} c="white" style={{ fontSize: rem(32), fontWeight: 900 }}>FAROL</Title>
             </Group>
             <Title order={1} c="white" mt="xl" style={{ fontSize: rem(48), lineHeight: 1.1 }}>
                Comece sua jornada <br /> de resultado.
             </Title>
             <Text c="white" opacity={0.6} mt="md" size="lg" maw={400}>
                Junte-se a centenas de times que transformaram sua estratégia em execução real.
             </Text>
          </motion.div>
        </Stack>
      </Box>

      {/* LADO DIREITO (Formulário) */}
      <Box style={{ flex: '1.2', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: rem(40) }}>
        <Container size="sm" w="100%" p={0}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Paper bg="transparent">
              <Stack gap="xl">
                <Box>
                  <Title order={2} fw={900} size={rem(32)}>Criar Nova Conta</Title>
                  <Text c="dimmed" fw={500}>Preencha os dados abaixo para configurar seu cockpit.</Text>
                </Box>

                <form onSubmit={handleRegister}>
                  <Stack gap="md">
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                       <TextInput 
                          label="NOME COMPLETO"
                          placeholder="Ex: João Silva"
                          leftSection={<IconUser size={18} />}
                          radius="md"
                          required
                          styles={{ label: { fontSize: rem(10), fontWeight: 800, marginBottom: rem(6), color: 'var(--mantine-color-gray-6)' } }}
                       />
                       <TextInput 
                          label="EMPRESA / TIME"
                          placeholder="Ex: ACME Corp"
                          leftSection={<IconBuilding size={18} />}
                          radius="md"
                          required
                          styles={{ label: { fontSize: rem(10), fontWeight: 800, marginBottom: rem(6), color: 'var(--mantine-color-gray-6)' } }}
                       />
                    </SimpleGrid>

                    <TextInput 
                      label="E-MAIL CORPORATIVO"
                      placeholder="seu.nome@empresa.com"
                      leftSection={<IconMail size={18} />}
                      radius="md"
                      required
                      styles={{ label: { fontSize: rem(10), fontWeight: 800, marginBottom: rem(6), color: 'var(--mantine-color-gray-6)' } }}
                    />

                    <PasswordInput 
                      label="DEFINIR SENHA"
                      placeholder="Pelo menos 8 caracteres"
                      leftSection={<IconLock size={18} />}
                      radius="md"
                      required
                      styles={{ label: { fontSize: rem(10), fontWeight: 800, marginBottom: rem(6), color: 'var(--mantine-color-gray-6)' } }}
                    />

                    <Button 
                      fullWidth 
                      size="lg" 
                      radius="md" 
                      color="farol-blue"
                      type="submit"
                      loading={formLoading}
                      mt="md"
                      rightSection={<IconArrowRight size={20} />}
                      style={{ height: rem(56) }}
                    >
                      Criar Minha Conta
                    </Button>
                  </Stack>
                </form>

                <Stack align="center" gap="sm">
                   <Text size="sm" c="dimmed" fw={500}>
                      Já possui uma conta? <Anchor component={Link} to="/login" fw={700} c="farol-blue.6">Fazer Login</Anchor>
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
