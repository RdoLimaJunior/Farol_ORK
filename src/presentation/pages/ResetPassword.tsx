import { Paper, PasswordInput, Button, Title, Text, Stack, Box } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconLock } from '@tabler/icons-react';
import { supabase } from '../../infrastructure/supabaseClient';
import { notifications } from '@mantine/notifications';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Supabase envia o token via hash fragment na URL
  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        // Usuário chegou pelo link de recuperação — pode redefinir
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      notifications.show({ title: 'Erro', message: 'As senhas não coincidem.', color: 'red' });
      return;
    }
    if (password.length < 6) {
      notifications.show({ title: 'Erro', message: 'Senha deve ter no mínimo 6 caracteres.', color: 'red' });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      notifications.show({ title: 'Erro', message: error.message, color: 'red' });
    } else {
      notifications.show({ title: 'Senha redefinida! ✅', message: 'Faça login com sua nova senha.', color: 'green' });
      navigate('/login');
    }
  };

  return (
    <Box style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#001219' }}>
      <Paper radius="lg" p={40} w={420} bg="white">
        <Stack gap="xs" mb="xl">
          <Title order={3} ta="center" fw={700}>Nova Senha</Title>
          <Text size="sm" c="dimmed" ta="center">Defina sua nova senha abaixo</Text>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <PasswordInput
              label="Nova Senha"
              placeholder="Mínimo 6 caracteres"
              leftSection={<IconLock size={18} />}
              size="md"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
              minLength={6}
            />
            <PasswordInput
              label="Confirmar Senha"
              placeholder="Repita a senha"
              leftSection={<IconLock size={18} />}
              size="md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              required
            />
            <Button fullWidth size="md" color="cyan" type="submit" loading={loading} style={{ height: '48px' }}>
              Redefinir Senha
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
