import { Modal, TextInput, Select, Button, Stack, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconMail, IconUser, IconBriefcase, IconBuilding } from '@tabler/icons-react';
import { supabase } from '../../infrastructure/supabaseClient';
import { useAuthContext } from '../../application/context/AuthContext';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

interface InviteMemberModalProps {
  opened: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function InviteMemberModal({ opened, onClose, onSuccess }: InviteMemberModalProps) {
  const { profile } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      fullName: '',
      email: '',
      jobTitle: '',
      department: '',
      role: 'member',
    },
    validate: {
      fullName: (v) => (v.length < 2 ? 'Nome obrigatório' : null),
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Email inválido'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (!profile) return;
    setLoading(true);

    // T018: Criar usuário via Supabase Admin API
    // Nota: Em produção usar Edge Function com service_role_key.
    // Para MVP, criamos o perfil diretamente e o admin compartilha 
    // a senha temporária manualmente ou via invite link do Supabase Dashboard.
    
    // Criamos um placeholder no profiles para o convite
    // MOCK INVITE
    setTimeout(() => {
      setLoading(false);
      notifications.show({
        title: 'Convite enviado (Mock)! 📧',
        message: `${values.fullName} foi adicionado simuladamente.`,
        color: 'green',
      });
      form.reset();
      onClose();
      onSuccess();
    }, 800);

  };

  return (
    <Modal opened={opened} onClose={onClose} title="Convidar Novo Membro" size="md" radius="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Nome Completo"
            placeholder="João da Silva"
            leftSection={<IconUser size={16} />}
            required
            {...form.getInputProps('fullName')}
          />
          <TextInput
            label="E-mail"
            placeholder="joao@empresa.com"
            leftSection={<IconMail size={16} />}
            required
            {...form.getInputProps('email')}
          />
          <Group grow>
            <TextInput
              label="Cargo"
              placeholder="Gerente de Produto"
              leftSection={<IconBriefcase size={16} />}
              {...form.getInputProps('jobTitle')}
            />
            <TextInput
              label="Área / Departamento"
              placeholder="Produto"
              leftSection={<IconBuilding size={16} />}
              {...form.getInputProps('department')}
            />
          </Group>
          <Select
            label="Papel"
            data={[
              { value: 'member', label: 'Membro' },
              { value: 'admin', label: 'Administrador' },
            ]}
            {...form.getInputProps('role')}
          />
          <Button type="submit" fullWidth color="cyan" loading={loading} mt="sm">
            Enviar Convite
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
