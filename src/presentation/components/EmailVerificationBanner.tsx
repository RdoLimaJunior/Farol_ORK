import { Alert, Group, Text, Button } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { supabase } from '../../infrastructure/supabaseClient';
import { notifications } from '@mantine/notifications';
import { useAuthContext } from '../../application/context/AuthContext';

export function EmailVerificationBanner() {
  const { profile } = useAuthContext();

  if (!profile || profile.emailVerified) return null;

  const handleResend = async () => {
    const { error } = await supabase.auth.resend({ type: 'signup', email: profile.email });
    if (error) {
      notifications.show({ title: 'Erro', message: error.message, color: 'red' });
    } else {
      notifications.show({ title: 'Email reenviado! 📧', message: 'Verifique sua caixa de entrada.', color: 'green' });
    }
  };

  return (
    <Alert color="yellow" icon={<IconAlertTriangle size={18} />} mb="md" radius="md">
      <Group justify="space-between">
        <Text size="sm">Seu email ainda não foi verificado.</Text>
        <Button variant="light" color="yellow" size="xs" onClick={handleResend}>
          Reenviar verificação
        </Button>
      </Group>
    </Alert>
  );
}
