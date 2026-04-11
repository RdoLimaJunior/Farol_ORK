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
  rem,
  Slider,
  Badge,
  Alert,
  Divider
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
  IconX,
  IconInfoCircle,
  IconTerminal2
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
      confidenceScore: 10,
      confidenceLevel: 'high' as ConfidenceLevel,
      comment: '',
      fact: '',
      cause: '',
      correctiveAction: '',
      manualStatusOverride: null as Status | null,
      statusOverrideJustification: '',
      teamClimate: 5,
    },

    validate: {
      comment: (value, values) => 
        values.confidenceScore >= 7 && value.length < 10 
          ? 'Por favor, detalhe sua análise (mín. 10 caracteres)' 
          : null,
      fact: (value, values) => 
        values.confidenceScore < 7 && value.length < 5 
          ? 'O Fato é obrigatório (o que aconteceu?)' 
          : null,
      cause: (value, values) => 
        values.confidenceScore < 7 && value.length < 5 
          ? 'A Causa é obrigatória (por que aconteceu?)' 
          : null,
      correctiveAction: (value, values) => 
        values.confidenceScore < 7 && value.length < 10 
          ? 'A Ação Corretiva deve ser SMART (mín. 10 caracteres)' 
          : null,
      statusOverrideJustification: (value, values) => 
        values.manualStatusOverride && value.length < 15 
          ? 'Justificativa obrigatória para sobrescrever o status' 
          : null,
    },
  });

  // Map 1-10 to ConfidenceLevel
  const updateConfidenceLevel = (val: number) => {
    let level: ConfidenceLevel = 'high';
    if (val <= 3) level = 'low';
    else if (val <= 6) level = 'medium';
    
    form.setFieldValue('confidenceLevel', level);
    form.setFieldValue('confidenceScore', val);
  };

  const getConfidenceColor = (val: number) => {
    if (val <= 3) return 'red';
    if (val <= 6) return 'orange';
    return 'teal';
  };

  const isFcaRequired = form.values.confidenceScore < 8;

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap="lg">
        <NumberInput
          label={`Novo Valor Atual (${unit})`}
          placeholder="Digite o valor alcançado"
          required
          hideControls
          size="lg"
          {...form.getInputProps('newValue')}
        />

        <Box>
          <Group justify="space-between" mb="xs">
            <Text size="sm" fw={700}>Matriz de Confiança</Text>
            <Badge size="lg" color={getConfidenceColor(form.values.confidenceScore)} variant="filled">
              {form.values.confidenceScore}/10 - {form.values.confidenceLevel.toUpperCase()}
            </Badge>
          </Group>
          
          <Box px="md" py="xl" style={{ 
            background: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-7))', 
            borderRadius: '12px',
            border: `1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))`
          }}>
            <Slider
              value={form.values.confidenceScore}
              onChange={updateConfidenceLevel}
              min={1}
              max={10}
              step={1}
              label={null}
              color={getConfidenceColor(form.values.confidenceScore)}
              marks={[
                { value: 1, label: 'Crítico' },
                { value: 5, label: 'Atenção' },
                { value: 10, label: 'Garantido' },
              ]}
              styles={{
                markLabel: { fontWeight: 700, fontSize: rem(10), marginTop: 10 }
              }}
            />
          </Box>
          <Text size="xs" c="dimmed" mt="xs">
            {form.values.confidenceScore < 8 
              ? '⚠️ Confiança abaixo de 8 exige preenchimento do FCA (Fato, Causa e Ação).' 
              : '✅ Confiança alta. Apenas um comentário geral é suficiente.'}
          </Text>
        </Box>

        <Divider label="Análise de Performance" labelPosition="center" />

        <Collapse in={!isFcaRequired}>
          <Textarea
            label="Comentários da Evolução"
            placeholder="O que aconteceu desde a última atualização?"
            required={!isFcaRequired}
            rows={4}
            {...form.getInputProps('comment')}
          />
        </Collapse>

        <Collapse in={isFcaRequired}>
          <Stack gap="md">
            <Alert color="orange" icon={<IconInfoCircle size={16} />} radius="md">
              <Text size="xs" fw={700}>Rigor Metodológico: Técnica FCA Obrigatória</Text>
              <Text size="xs">Como a confiança é reduzida, aplique a regra: Fato, Causa e Ação SMART.</Text>
            </Alert>
            
            <Textarea
              label="📉 Fato (O que aconteceu?)"
              description="Descreva o desvio exato entre o projetado e o real."
              placeholder="Ex: Não atingimos a meta devido ao atraso no fornecedor X..."
              required={isFcaRequired}
              {...form.getInputProps('fact')}
            />
            
            <Textarea
              label="🔍 Causa (Por que aconteceu?)"
              description="Aplique a técnica dos 5 porquês."
              placeholder="Ex: O fornecedor atrasou porque houve uma greve no transporte local..."
              required={isFcaRequired}
              {...form.getInputProps('cause')}
            />
            
            <Textarea
              label="🚀 Ação Corretiva (O que faremos?)"
              description="Deve ser RIGOROSAMENTE SMART."
              placeholder="Ex: Vou contratar o fornecedor Y até amanhã para suprir o lote Z..."
              required={isFcaRequired}
              {...form.getInputProps('correctiveAction')}
            />
          </Stack>
        </Collapse>

        <Box>
          <Text size="sm" fw={700} mb="xs">OKR de Corpo e Alma (e-NPS)</Text>
          <Text size="xs" c="dimmed" mb="md">Como está o clima e a motivação do time nesta semana?</Text>
          
          <Group justify="center" gap={0} bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-7))" p="md" style={{ borderRadius: '12px', border: '1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))' }}>
            {[1, 2, 3, 4, 5].map((value) => (
              <UnstyledButton
                key={value}
                onClick={() => form.setFieldValue('teamClimate', value)}
                style={{
                  padding: rem(10),
                  borderRadius: '8px',
                  background: form.values.teamClimate === value ? 'var(--mantine-color-blue-1)' : 'transparent',
                  transition: 'all 0.2s',
                  flex: 1,
                  textAlign: 'center'
                }}
              >
                <Stack gap={4} align="center">
                  {value === 1 && <IconMoodSad size={28} color={form.values.teamClimate === 1 ? 'var(--mantine-color-red-6)' : 'var(--mantine-color-gray-4)'} />}
                  {value === 2 && <IconMoodSad size={28} color={form.values.teamClimate === 2 ? 'var(--mantine-color-orange-6)' : 'var(--mantine-color-gray-4)'} />}
                  {value === 3 && <IconMoodNeutral size={28} color={form.values.teamClimate === 3 ? 'var(--mantine-color-yellow-6)' : 'var(--mantine-color-gray-4)'} />}
                  {value === 4 && <IconMoodSmile size={28} color={form.values.teamClimate === 4 ? 'var(--mantine-color-teal-6)' : 'var(--mantine-color-gray-4)'} />}
                  {value === 5 && <IconMoodSmile size={28} color={form.values.teamClimate === 5 ? 'var(--mantine-color-green-6)' : 'var(--mantine-color-gray-4)'} />}
                  <Text size="xs" fw={form.values.teamClimate === value ? 700 : 400} c={form.values.teamClimate === value ? 'blue' : 'dimmed'}>
                    {value}
                  </Text>
                </Stack>
              </UnstyledButton>
            ))}
          </Group>
        </Box>

        <Box>
          <Text size="sm" fw={700} mb={8}>Evidências de Execução</Text>
          <Dropzone
            onDrop={(files) => console.log('accepted files', files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            radius="md"
          >
            <Group justify="center" gap="xl" mih={80} style={{ pointerEvents: 'none' }}>
              <IconPhoto size={32} color="var(--mantine-color-dimmed)" />
              <div>
                <Text size="sm" inline fw={600}>Anexar provas da entrega</Text>
                <Text size="xs" c="dimmed" inline mt={4}>Print de dashboards, fotos ou documentos (máx 3MB)</Text>
              </div>
            </Group>
          </Dropzone>
        </Box>

        <Box>
          <Divider mb="xs" />
          <UnstyledButton onClick={toggle} w="100%">
             <Group justify="space-between">
                <Group gap="xs">
                   <IconTerminal2 size={16} color="var(--mantine-color-blue-6)" />
                   <Text size="sm" fw={600}>Configurações Avançadas de Status</Text>
                </Group>
                {overrideOpened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
             </Group>
          </UnstyledButton>
          
          <Collapse in={overrideOpened}>
            <Stack gap="xs" mt="xs">
              <Select
                label="Sobrescrever Semáforo Sugerido"
                placeholder="Selecione o status real"
                data={[
                  { value: 'on_track', label: '🟢 On Track (No Prazo)' },
                  { value: 'at_risk', label: '🟡 At Risk (Em Risco)' },
                  { value: 'off_track', label: '🔴 Off Track (Crítico)' },
                ]}
                {...form.getInputProps('manualStatusOverride')}
              />
              <Textarea
                label="Justificativa do Override"
                placeholder="Por que o status do sistema está incorreto?"
                rows={2}
                {...form.getInputProps('statusOverrideJustification')}
              />
            </Stack>
          </Collapse>
        </Box>

        <Button 
          type="submit" 
          fullWidth 
          mt="lg" 
          loading={loading} 
          color="blue" 
          size="lg"
          radius="md"
          style={{ boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)' }}
        >
          Confirmar e Salvar Check-in
        </Button>
      </Stack>
    </form>
  );
}
