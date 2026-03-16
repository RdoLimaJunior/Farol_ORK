import { useForm } from '@mantine/form';
import { 
  NumberInput, 
  Textarea, 
  Button, 
  Stack, 
  Group, 
  Text, 
  UnstyledButton,
  Select,
  Collapse,
  Box,
  rem 
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconMoodSmile, 
  IconMoodNeutral, 
  IconMoodSad, 
  IconAlertCircle,
  IconChevronDown,
  IconChevronUp,
  IconUpload,
  IconPhoto,
  IconX
} from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import type { ConfidenceLevel, Status } from '../../domain/models/types';

interface KrCheckInFormProps {
  currentValue: number;
  unit: string;
  onSubmit: (values: any) => void;
  loading?: boolean;
}

export function KrCheckInForm({ currentValue, unit, onSubmit, loading }: KrCheckInFormProps) {
  const [overrideOpened, { toggle }] = useDisclosure(false);
  
  const form = useForm({
    initialValues: {
      newValue: currentValue,
      confidenceLevel: 'high' as ConfidenceLevel,
      comment: '',
      manualStatusOverride: null as Status | null,
      statusOverrideJustification: '',
    },

    validate: {
      comment: (value) => (value.length < 10 ? 'Por favor, detalhe mais sua análise (mín. 10 caracteres)' : null),
      statusOverrideJustification: (value, values) => 
        values.manualStatusOverride && value.length < 15 
          ? 'Justificativa obrigatória para sobrescrever o status' 
          : null,
    },
  });

  const confidenceOptions = [
    { value: 'high', label: 'Confiante', icon: IconMoodSmile, color: 'green' },
    { value: 'medium', label: 'Atenção', icon: IconMoodNeutral, color: 'yellow' },
    { value: 'low', label: 'Preocupado', icon: IconMoodSad, color: 'red' },
  ];

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <NumberInput
          label={`Novo Valor (${unit})`}
          placeholder="Digite o valor atual reachado"
          required
          hideControls
          size="lg"
          {...form.getInputProps('newValue')}
        />

        <Box>
          <Text size="sm" fw={500} mb={8}>Como você se sente em relação a essa meta?</Text>
          <Group grow>
            {confidenceOptions.map((opt) => (
              <UnstyledButton
                key={opt.value}
                onClick={() => form.setFieldValue('confidenceLevel', opt.value as ConfidenceLevel)}
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  border: `2px solid ${form.values.confidenceLevel === opt.value ? `var(--mantine-color-${opt.color}-filled)` : 'var(--mantine-color-gray-2)'}`,
                  background: form.values.confidenceLevel === opt.value ? `var(--mantine-color-${opt.color}-light)` : 'transparent',
                  textAlign: 'center',
                  transition: 'all 200ms ease'
                }}
              >
                <Stack align="center" gap={4}>
                  <opt.icon color={`var(--mantine-color-${opt.color}-filled)`} size={28} />
                  <Text size="xs" fw={700} c={form.values.confidenceLevel === opt.value ? `${opt.color}.9` : 'dimmed'}>
                    {opt.label}
                  </Text>
                </Stack>
              </UnstyledButton>
            ))}
          </Group>
        </Box>

        <Textarea
          label="Análise e Comentários"
          placeholder="O que aconteceu desde a última atualização? Quais são os próximos passos?"
          required
          rows={3}
          {...form.getInputProps('comment')}
        />

        <Box>
          <Text size="sm" fw={500} mb={4}>Evidências Visuais (Fotos/Prints)</Text>
          <Dropzone
            onDrop={(files) => console.log('accepted files', files)}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            radius="md"
          >
            <Group justify="center" gap="xl" mih={80} style={{ pointerEvents: 'none' }}>
              <Dropzone.Accept>
                <IconUpload
                  style={{ width: rem(32), height: rem(32), color: 'var(--mantine-color-blue-6)' }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{ width: rem(32), height: rem(32), color: 'var(--mantine-color-red-6)' }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto
                  style={{ width: rem(32), height: rem(32), color: 'var(--mantine-color-dimmed)' }}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div>
                <Text size="sm" inline>
                  Arraste imagens ou clique para selecionar
                </Text>
                <Text size="xs" c="dimmed" inline mt={7}>
                  Anexe provas da entrega (máx 3MB)
                </Text>
              </div>
            </Group>
          </Dropzone>
        </Box>

        <Box>
          <UnstyledButton onClick={toggle} w="100%">
             <Group justify="space-between" py="xs">
                <Group gap="xs">
                   <IconAlertCircle size={16} color="var(--mantine-color-orange-6)" />
                   <Text size="sm" fw={500}>Discordo do status sugerido pelo sistema</Text>
                </Group>
                {overrideOpened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
             </Group>
          </UnstyledButton>
          
          <Collapse in={overrideOpened}>
            <Stack gap="xs" mt="xs">
              <Select
                label="Qual o status real?"
                placeholder="Selecione o semáforo correto"
                data={[
                  { value: 'on_track', label: 'On Track (Verde)' },
                  { value: 'at_risk', label: 'At Risk (Amarelo)' },
                  { value: 'off_track', label: 'Off Track (Vermelho)' },
                ]}
                {...form.getInputProps('manualStatusOverride')}
              />
              <Textarea
                label="Justificativa do Override"
                placeholder="Por que você acredita que o status deve ser este?"
                rows={2}
                {...form.getInputProps('statusOverrideJustification')}
              />
            </Stack>
          </Collapse>
        </Box>

        <Button type="submit" fullWidth mt="md" loading={loading} color="blue" size="md">
          Salvar Check-in
        </Button>
      </Stack>
    </form>
  );
}
