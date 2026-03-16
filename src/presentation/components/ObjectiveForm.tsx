import { useForm } from '@mantine/form';
import {
  TextInput,
  Textarea,
  Select,
  Switch,
  Button,
  Stack,
  Group,
  MultiSelect,
  Text,
  Badge,
  Box,
  Paper,
  ThemeIcon
} from '@mantine/core';
import { useState } from 'react';
import { IconSparkles, IconUserPlus, IconRobot } from '@tabler/icons-react';
import type { Objective } from '../../domain/models/types';
import { aiAssistant } from '../../application/services/AiAssistantService';
import { AiActionIcon } from './AiActionIcon';
import { useMembers } from '../../application/hooks/useMembers';
import { motion, AnimatePresence } from 'framer-motion';

interface ObjectiveFormProps {
  initialValues?: Partial<Objective>;
  onSubmit: (values: any) => void;
  loading?: boolean;
  parentObjectives: { value: string; label: string }[];
}

export function ObjectiveForm({ initialValues, onSubmit, loading, parentObjectives }: ObjectiveFormProps) {
  const { members } = useMembers();
  const [aiLoading, setAiLoading] = useState<Record<string, boolean>>({});
  const [suggestedMembers, setSuggestedMembers] = useState<string[]>([]);

  const form = useForm({
    initialValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      parentObjectiveId: initialValues?.parentObjectiveId || null,
      stakeholders: [] as string[],
      checkInCadence: initialValues?.checkInCadence || 'monthly',
      isConfidential: initialValues?.isConfidential || false,
      cycleId: initialValues?.cycleId || '2024-Q1',
      type: initialValues?.type || 'committed',
      level: initialValues?.level || 'organizational',
    },

    validate: {
      title: (value: string) => (value.length < 5 ? 'Título deve ter pelo menos 5 caracteres' : null),
    },
  });

  const handleRefineTitle = async () => {
    if (!form.values.title) return;
    setAiLoading(prev => ({ ...prev, title: true }));
    try {
      const suggestion = await aiAssistant.refineTitle(form.values.title);
      form.setFieldValue('title', suggestion.text);

      // Auto-suggest members based on new title
      const suggestions = await aiAssistant.suggestMembers(suggestion.text, members);
      setSuggestedMembers(suggestions.map(m => m.id));
    } finally {
      setAiLoading(prev => ({ ...prev, title: false }));
    }
  };

  const handleGenerateDescription = async () => {
    if (!form.values.title) return;
    setAiLoading(prev => ({ ...prev, description: true }));
    try {
      const desc = await aiAssistant.generateDescription(form.values.title);
      form.setFieldValue('description', desc);
    } finally {
      setAiLoading(prev => ({ ...prev, description: false }));
    }
  };

  const memberData = members.map(m => ({ value: m.id, label: m.fullName }));

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Título do Objetivo"
          placeholder="Ex: Vender mais software"
          required
          rightSection={
            <AiActionIcon
              onClick={handleRefineTitle}
              loading={aiLoading.title}
              tooltip="Melhorar título com IA"
            />
          }
          rightSectionWidth={45}
          {...form.getInputProps('title')}
          styles={(theme) => ({
            input: {
              transition: 'all 0.3s ease',
              boxShadow: aiLoading.title ? `0 0 15px ${theme.colors.cyan[2]}` : 'none',
              borderColor: aiLoading.title ? theme.colors.cyan[4] : undefined
            }
          })}
        />

        <Textarea
          label="Descrição / Propósito"
          placeholder="Qual o 'porquê' deste objetivo?"
          rows={4}
          rightSection={
            <Box style={{ position: 'absolute', top: 5, right: 5 }}>
              <AiActionIcon
                onClick={handleGenerateDescription}
                loading={aiLoading.description}
                tooltip="Gerar descrição com IA"
                size="md"
              />
            </Box>
          }
          {...form.getInputProps('description')}
          styles={(theme) => ({
            input: {
              transition: 'all 0.3s ease',
              boxShadow: aiLoading.description ? `0 0 15px ${theme.colors.cyan[2]}` : 'none',
              borderColor: aiLoading.description ? theme.colors.cyan[4] : undefined
            }
          })}
        />

        <Stack gap={5}>
          <Text size="sm" fw={500}>Time Envolvido (Stakeholders)</Text>
          <MultiSelect
            placeholder="Selecione as pessoas impactadas"
            data={memberData}
            searchable
            leftSection={<IconUserPlus size={16} />}
            {...form.getInputProps('stakeholders')}
          />

          <AnimatePresence>
            {suggestedMembers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Paper withBorder p="xs" radius="md" bg="cyan.0" style={{ borderStyle: 'dashed' }}>
                  <Group gap="xs">
                    <ThemeIcon color="cyan" variant="light" size="sm">
                       <IconRobot size={14} />
                    </ThemeIcon>
                    <Text size="xs" fw={700} c="cyan.9">Sugerido por IA:</Text>
                    <Group gap={5}>
                      {suggestedMembers.map(id => {
                        const m = members.find(mem => mem.id === id);
                        if (!m) return null;
                        return (
                          <Badge
                            key={id}
                            variant="light"
                            color="cyan"
                            size="sm"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              const current = form.values.stakeholders;
                              if (!current.includes(id)) {
                                form.setFieldValue('stakeholders', [...current, id]);
                              }
                              setSuggestedMembers(prev => prev.filter(mid => mid !== id));
                            }}
                          >
                            + {m.fullName.split(' ')[0]}
                          </Badge>
                        );
                      })}
                    </Group>
                  </Group>
                </Paper>
              </motion.div>
            )}
          </AnimatePresence>
        </Stack>

        <Select
          label="Objetivo Pai (Alinhamento)"
          placeholder="Selecione um objetivo para alinhar este"
          data={parentObjectives}
          clearable
          searchable
          {...form.getInputProps('parentObjectiveId')}
        />

        <Group grow>
          <Select
            label="Ambição / Natureza"
            placeholder="Ex: Moonshot, Roofshot..."
            data={[
              { value: 'aspirational', label: 'Aspiracional (Moonshot)' },
              { value: 'committed', label: 'Comprometido (Roofshot)' },
              { value: 'learning', label: 'Aprendizado' },
            ]}
            {...form.getInputProps('type')}
          />
          <Select
            label="Hierarquia / Nível"
            placeholder="Estratégico, Tático..."
            data={[
              { value: 'organizational', label: 'Organizacional (Estratégico)' },
              { value: 'departmental', label: 'Departamental (Tático)' },
              { value: 'individual', label: 'Individual' },
            ]}
            {...form.getInputProps('level')}
          />
        </Group>

        <Group grow>
          <Select
            label="Cadência de Check-in"
            data={[
              { value: 'weekly', label: 'Semanal' },
              { value: 'biweekly', label: 'Quinzenal' },
              { value: 'monthly', label: 'Mensal' },
            ]}
            {...form.getInputProps('checkInCadence')}
          />
          <Select
            label="Ciclo / Trimestre"
            data={['2024-Q1', '2024-Q2', '2024-Q3', '2024-Q4']}
            disabled
            {...form.getInputProps('cycleId')}
          />
        </Group>

        <Switch
          label="Objetivo Confidencial"
          description="Apenas o dono e gestores diretos poderão visualizar"
          {...form.getInputProps('isConfidential', { type: 'checkbox' })}
        />

        <Button 
          type="submit" 
          fullWidth 
          mt="md" 
          loading={loading} 
          variant="gradient"
          gradient={{ from: 'cyan', to: 'indigo' }}
          size="md"
          radius="md"
          leftSection={initialValues?.id ? null : <IconSparkles size={18} />}
        >
          {initialValues?.id ? 'Salvar Alterações' : 'Lançar Objetivo Estratégico'}
        </Button>
      </Stack>
    </form>
  );
}
