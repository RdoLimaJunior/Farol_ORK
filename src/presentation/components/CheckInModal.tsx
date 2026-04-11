import { 
  Modal, 
  Group, 
  Text,
  Paper,
  ThemeIcon
} from '@mantine/core';
import { IconCheck, IconChartArrows } from '@tabler/icons-react';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { performCheckIn } from '../../application/services/checkinService';
import { useAuthContext } from '../../application/context/AuthContext';
import { KrCheckInForm } from './KrCheckInForm';

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

  const handleSubmit = async (values: any) => {
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
      new_value: values.newValue,
      confidence_level: values.confidenceLevel,
      confidence_score: values.confidenceScore,
      comment: values.confidenceScore < 8 
        ? `[FCA] Fato: ${values.fact} | Causa: ${values.cause} | Ação: ${values.correctiveAction}` 
        : values.comment,
      manual_status_override: values.manualStatusOverride,
      status_override_justification: values.statusOverrideJustification,
      team_climate: values.teamClimate
    });

    setLoading(true); // Manter loading até fechar
    
    if (result.success) {
      notifications.show({
        title: 'Check-in Realizado 🚀',
        message: 'A metodologia FAROL foi aplicada com sucesso.',
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
    setLoading(false);
  };

  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title={
        <Group gap="xs">
          <ThemeIcon variant="light" color="blue" size="md" radius="md">
            <IconChartArrows size={18} />
          </ThemeIcon>
          <Text fw={700}>Ritual de Check-in</Text>
        </Group>
      }
      size="lg"
      radius="lg"
      overlayProps={{ blur: 3, opacity: 0.55 }}
    >
      <Paper withBorder p="md" radius="md" mb="lg" bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))">
        <Text size="xs" c="dimmed" fw={700} tt="uppercase">Key Result em Foco</Text>
        <Text fw={800} size="md" mt={4} c="blue">{kr.title}</Text>
      </Paper>

      <KrCheckInForm 
        currentValue={kr.current_value} 
        unit={kr.unit} 
        onSubmit={handleSubmit} 
        loading={loading} 
      />
    </Modal>
  );
}
