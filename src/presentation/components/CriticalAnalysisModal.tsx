import { 
  Text, 
  Stack, 
  TextInput, 
  Button, 
  Stepper, 
  Group, 
  Paper, 
  ThemeIcon,
  rem 
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { IconHelp, IconCircleCheck, IconPlus } from '@tabler/icons-react';

interface CriticalAnalysisModalProps {
  krTitle: string;
  onSubmit: (values: any) => void;
}

export function CriticalAnalysisModal({ krTitle, onSubmit }: CriticalAnalysisModalProps) {
  const [active, setActive] = useState(0);

  const form = useForm({
    initialValues: {
      why1: '',
      why2: '',
      why3: '',
      why4: '',
      why5: '',
      rootAction: '',
    },
    validate: (values) => {
      if (active === 0 && values.why1.length < 5) return { why1: 'Explique o motivo inicial' };
      if (active === 4 && values.why5.length < 5) return { why5: 'Chegue à causa raiz' };
      if (active === 5 && values.rootAction.length < 10) return { rootAction: 'Defina uma ação clara' };
      return {};
    }
  });

  const nextStep = () => setActive((current) => (current < 5 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Stack gap="md">
      <Paper p="md" withBorder radius="md" bg="red.0">
        <Group>
          <ThemeIcon color="red" variant="light" size="xl">
            <IconHelp size={24} />
          </ThemeIcon>
          <div>
            <Text fw={700}>Análise Crítica: {krTitle}</Text>
            <Text size="xs" c="dimmed">Este KR está fora da meta. Vamos entender a causa raiz.</Text>
          </div>
        </Group>
      </Paper>

      <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false} size="xs">
        <Stepper.Step label="1º Porquê" />
        <Stepper.Step label="2º Porquê" />
        <Stepper.Step label="3º Porquê" />
        <Stepper.Step label="4º Porquê" />
        <Stepper.Step label="Causa Raiz" />
        <Stepper.Step label="Plano de Ação" icon={<IconCircleCheck size={18} />} />
      </Stepper>

      <div style={{ minHeight: rem(120) }}>
        {active === 0 && (
          <TextInput
            label="Por que o KR não atingiu a meta?"
            placeholder="Ex: Porque a campanha de marketing atrasou"
            {...form.getInputProps('why1')}
            autoFocus
          />
        )}
        {active === 1 && (
          <TextInput
            label={`E por que '${form.values.why1}'?`}
            placeholder="Ex: Porque o designer não entregou as peças"
            {...form.getInputProps('why2')}
            autoFocus
          />
        )}
        {active === 2 && (
          <TextInput
            label={`E por que '${form.values.why2}'?`}
            placeholder="Ex: Porque ele estava sobrecarregado com outro projeto"
            {...form.getInputProps('why3')}
            autoFocus
          />
        )}
        {active === 3 && (
          <TextInput
            label={`E por que '${form.values.why3}'?`}
            placeholder="Ex: Porque não houve priorização no time de design"
            {...form.getInputProps('why4')}
            autoFocus
          />
        )}
        {active === 4 && (
          <TextInput
            label="Causa Raiz Final (O real motivo)"
            placeholder="Ex: Falta de um processo centralizado de requisições"
            {...form.getInputProps('why5')}
            autoFocus
          />
        )}
        {active === 5 && (
          <Stack gap="xs">
            <Text size="sm" fw={700} c="green">Defina a Ação Corretiva Obrigatória</Text>
            <TextInput
              placeholder="Ex: Implementar Jira para todas as demandas de design"
              leftSection={<IconPlus size={16} />}
              {...form.getInputProps('rootAction')}
              autoFocus
            />
            <Text size="xs" c="dimmed italic">
              * Conforme as regras de governança, uma análise só é concluída com um plano de ação vinculado.
            </Text>
          </Stack>
        )}
      </div>

      <Group justify="flex-end">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>Voltar</Button>
        )}
        {active < 5 ? (
          <Button onClick={nextStep}>Próximo</Button>
        ) : (
          <Button color="green" onClick={() => onSubmit(form.values)}>Concluir Análise</Button>
        )}
      </Group>
    </Stack>
  );
}
