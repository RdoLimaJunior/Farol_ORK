import { Paper, TextInput, Button, Title, Text, Stack, Box, Anchor } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconMail, IconArrowLeft } from '@tabler/icons-react';
import { supabase } from '../../infrastructure/supabaseClient';
import { notifications } from '@mantine/notifications';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);

    if (error) {
      notifications.show({ title: 'Erro', message: error.message, color: 'red' });
    } else {
      setSent(true);
    }
  };

  return (
    <Box style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#001219' }}>
      <Paper radius="lg" p={40} w={420} bg="white">
        {!sent ? (
          <>
            <Stack gap="xs" mb="xl">
              <Title order={3} ta="center" fw={700}>Recuperar Senha</Title>
              <Text size="sm" c="dimmed" ta="center">
                Informe seu email e enviaremos um link de redefinição
              </Text>
            </Stack>

            <form onSubmit={handleSubmit}>
              <Stack gap="md">
                <TextInput
                  label="E-mail"
                  placeholder="seu@farol.com"
                  leftSection={<IconMail size={18} />}
                  size="md"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  required
                />
                <Button fullWidth size="md" color="cyan" type="submit" loading={loading} style={{ height: '48px' }}>
                  Enviar Link
                </Button>
              </Stack>
            </form>
          </>
        ) : (
          <Stack align="center" gap="md">
            <Title order={3}>📧 Email Enviado!</Title>
            <Text size="sm" c="dimmed" ta="center">
              Se o email <b>{email}</b> estiver cadastrado, você receberá um link para redefinir sua senha.
            </Text>
          </Stack>
        )}

        <Anchor component={Link} to="/login" size="sm" mt="xl" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <IconArrowLeft size={14} /> Voltar ao Login
        </Anchor>
      </Paper>
    </Box>
  );
}
