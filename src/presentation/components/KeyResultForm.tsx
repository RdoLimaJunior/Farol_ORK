import { useForm } from '@mantine/form';
import { 
  TextInput, 
  Textarea, 
  Select, 
  NumberInput, 
  Button, 
  Stack, 
  Group, 
  Slider,
  Text,
  Box 
} from '@mantine/core';
import type { KeyResult } from '../../domain/models/types';

interface KeyResultFormProps {
  initialValues?: Partial<KeyResult>;
  onSubmit: (values: any) => void;
  loading?: boolean;
}

export function KeyResultForm({ initialValues, onSubmit, loading }: KeyResultFormProps) {
  const form = useForm({
    initialValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      unit: initialValues?.unit || 'percentage',
      startValue: initialValues?.startValue || 0,
      targetValue: initialValues?.targetValue || 100,
      weight: initialValues?.weight || 1,
    },

    validate: {
      title: (value) => (value.length < 5 ? 'Título muito curto' : null),
      targetValue: (value, values) => (value === values.startValue ? 'Meta não pode ser igual ao Valor Inicial' : null),
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <TextInput
          label="Título do Key Result"
          placeholder="Ex: Aumentar NPS para 80"
          required
          {...form.getInputProps('title')}
        />

        <Textarea
          label="Como mediremos isso?"
          placeholder="Detalhes sobre a métrica e fonte de dados"
          rows={2}
          {...form.getInputProps('description')}
        />

        <Group grow>
          <Select
            label="Unidade"
            data={[
              { value: 'percentage', label: 'Porcentagem (%)' },
              { value: 'currency', label: 'Moeda (R$)' },
              { value: 'number', label: 'Numérico' },
            ]}
            {...form.getInputProps('unit')}
          />
          <NumberInput
            label="Peso no Objetivo"
            min={1}
            max={10}
            {...form.getInputProps('weight')}
          />
        </Group>

        <Group grow>
          <NumberInput
            label="Valor Inicial"
            placeholder="0"
            {...form.getInputProps('startValue')}
          />
          <NumberInput
            label="Meta (Target)"
            placeholder="100"
            required
            {...form.getInputProps('targetValue')}
          />
        </Group>

        <Box>
          <Text size="sm" fw={500} mb={4}>Importância Relativa</Text>
          <Slider 
             marks={[
               { value: 1, label: 'Baixa' },
               { value: 5, label: 'Média' },
               { value: 10, label: 'Alta' }
             ]}
             min={1}
             max={10}
             {...form.getInputProps('weight')}
          />
        </Box>

        <Button type="submit" fullWidth mt="xl" loading={loading} color="blue">
          {initialValues?.id ? 'Atualizar KR' : 'Adicionar KR'}
        </Button>
      </Stack>
    </form>
  );
}

