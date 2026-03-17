import { 
  Modal, 
  NumberInput, 
  Textarea, 
  Select, 
  Button, 
  Stack, 
  Group, 
  Text,
  Paper,
  rem,
  ThemeIcon
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck, IconTarget, IconMessageDots, IconChartArrows } from '@tabler/icons-react';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { performCheckIn } from '../../application/services/checkinService';
import { useAuthContext } from '../../application/context/AuthContext';

interface CheckInModalProps {
  opened: boolean;
  onClose: () => void;
  kr: {
    id: string;
    title: string;
    objective_id: string;
    tenant_id: string;
    current_value: number;
    unit: string;
    owner_id: string;
  };
  onSuccess?: () => void;
}

export function CheckInModal({ opened, onClose, kr, onSuccess }: CheckInModalProps) {
  const { profile } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      new_value: kr.current_value,
      confidence_level: 'high',
      comment: '',
    },
    validate: {
      comment: (value) => (value.length < 5 ? 'Por favor, adicione um comentário mais detalhado.' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (!profile?.id || !profile?.tenantId) {
      notifications.show({ title: 'Erro', message: 'Usuário não autenticado.', color: 'red' });
      return;
    }
    setLoading(true);
    const result = await performCheckIn({
      kr_id: kr.id,
      objective_id: kr.objective_id,
      owner_id: profile.id,
      tenant_id: profile.tenantId,
      new_value: values.new_value,
      confidence_level: values.confidence_level as any,
      comment: values.comment
    });

    setLoading(false);

    if (result.success) {
      notifications.show({
        title: 'Check-in Realizado 🚀',
        message: 'Progresso atualizado com sucesso.',
        color: 'green',
        icon: <IconCheck size={18} />
      });
      onSuccess?.();
      onClose();
    } else {
      notifications.show({
        title: 'Erro no Check-in',
        message: result.error,
        color: 'red'
      });
    }
  };

  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title={
        <Group gap="xs">
          <ThemeIcon variant="light" color="cyan" size="md" radius="md">
            <IconChartArrows size={18} />
          </ThemeIcon>
          <Text fw={700}>Realizar Check-in</Text>
        </Group>
      }
      size="md"
      radius="lg"
      overlayProps={{ blur: 3, opacity: 0.55 }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="lg">
          <Paper withBorder p="md" radius="md" bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))">
            <Text size="xs" c="dimmed" fw={700} tt="uppercase">Key Result</Text>
            <Text fw={600} size="sm" mt={4}>{kr.title}</Text>
          </Paper>

          <NumberInput
            label="Novo Valor Atual"
            description={`Unidade: ${kr.unit}`}
            placeholder="Digite o novo valor..."
            required
            min={0}
            leftSection={<IconTarget size={16} />}
            {...form.getInputProps('new_value')}
          />

          <Select
            label="Nível de Confiança"
            placeholder="Como você se sente sobre esta meta?"
            data={[
              { value: 'high', label: 'Alta - Vamos bater a meta' },
              { value: 'medium', label: 'Média - Requer atenção' },
              { value: 'low', label: 'Baixa - Em risco real' },
            ]}
            {...form.getInputProps('confidence_level')}
          />

          <Textarea
            label="O que aconteceu?"
            placeholder="Descreva o que foi feito ou os desafios encontrados..."
            required
            minRows={3}
            leftSection={<IconMessageDots size={16} style={{ alignSelf: 'start', marginTop: rem(8) }} />}
            {...form.getInputProps('comment')}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="subtle" color="gray" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              color="farol-blue" 
              loading={loading}
              radius="md"
              style={{ boxShadow: '0 4px 15px rgba(3, 169, 244, 0.3)' }}
            >
              Salvar Check-in
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
