import { 
  Container, 
  Text, 
  Stack, 
  Skeleton,
  Paper,
  Box,
  Button,
  Group,
  TextInput,
  ActionIcon,
  rem,
  ThemeIcon,
  Badge
} from '@mantine/core';
import { IconPlus, IconSparkles, IconTarget, IconArrowRight } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useObjectives } from '../../application/hooks/useObjectives';
import { useKRs } from '../../application/hooks/useKRs';
import { useOkrCalculation } from '../../application/hooks/useOkrCalculation';
import { DetailedOkrList } from '../components/DetailedOkrList';
import { TacticalKrList } from '../components/TacticalKrList';
import type { ObjectiveLevel } from '../../domain/models/types';
import { PageHeader } from '../components/common/PageHeader';

interface OkrLevelPageProps {
  level: ObjectiveLevel;
  title: string;
  icon: any;
  color: string;
  description: string;
}

export default function OkrLevelPage({ level, title, icon: Icon, color, description }: OkrLevelPageProps) {
  const { objectives, loading: loadingObj, fetchObjectives, createObjective } = useObjectives();
  const { krs, loading: loadingKR, fetchKRs } = useKRs();
  const [quickValue, setQuickValue] = useState('');
  
  useEffect(() => {
    fetchObjectives();
    fetchKRs();
  }, [fetchObjectives, fetchKRs]);

  const { enrichedObjectives } = useOkrCalculation(objectives, krs);
  const filteredObjectives = level === 'departmental' ? enrichedObjectives : enrichedObjectives.filter(obj => obj.level === level);
  const isLoading = loadingObj || loadingKR; 
  
  // No nível tático (KRs), queremos mostrar TODOS os KRs agrupados por objetivo
  // mas garantindo que o objetivo tem pelo menos um KR.
  const objectivesWithKrs = filteredObjectives.filter(o => (o.keyResults || []).length > 0);

  const handleQuickCreate = async () => {
    if (!quickValue.trim()) return;
    await createObjective({ title: quickValue, level });
    setQuickValue('');
  };

  return (
    <Container size="xl" py="md">
      <Stack gap="lg">
        <PageHeader 
          title={title}
          highlightedText=""
          description={description}
          icon={Icon}
          color={color}
          rightSection={
            <Badge variant="dot" color={color} size="lg" radius="sm">
               {level === 'departmental' ? `${filteredObjectives.flatMap(o => o.keyResults || []).length} KRs Ativos` : `${filteredObjectives.length} Objetivos Ativos`}
            </Badge>
          }
        />

        {/* QUICK CREATE BAR */}
        <Paper 
          p={6} 
          radius="xl" 
          withBorder 
          shadow="sm"
          style={{ 
            background: 'var(--mantine-color-body)',
            border: `1px solid var(--mantine-color-${color}-2)`
          }}
        >
          <Group gap={0}>
            <TextInput 
              placeholder={level === 'departmental' ? "Digite um novo RESULTADO-CHAVE..." : "Digite um novo OBJETIVO..."}
              variant="unstyled"
              size="lg"
              value={quickValue}
              onChange={(e) => setQuickValue(e.currentTarget.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleQuickCreate()}
              style={{ flex: 1 }}
              px="md"
              leftSection={
                <ThemeIcon variant="light" color={color} radius="xl" size="md">
                  <IconTarget size={18} />
                </ThemeIcon>
              }
              styles={{ input: { fontWeight: 500, fontSize: rem(15) } }}
            />
            <Button 
              color={color} 
              radius="xl" 
              size="md" 
              onClick={handleQuickCreate}
              disabled={!quickValue.trim()}
              leftSection={<IconSparkles size={18} />}
            >
              Criar com IA
            </Button>
          </Group>
        </Paper>

        {/* CONTENT */}
        <Box>
          {isLoading ? (
            <Stack>
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} height={80} radius="md" />
              ))}
            </Stack>
          ) : objectivesWithKrs.length > 0 ? (
              level === 'departmental' ? (
                <TacticalKrList objectives={objectivesWithKrs} />
              ) : (
                <DetailedOkrList 
                  objectives={objectivesWithKrs} 
                  onAddObjective={() => {}} 
                />
              )
          ) : (
            <Paper 
              withBorder 
              p={60} 
              radius="lg" 
              style={{ 
                borderStyle: 'dashed', 
                textAlign: 'center', 
                background: 'rgba(0,0,0,0.02)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: rem(400)
              }}
            >
              <Stack align="center" gap="lg" style={{ maxWidth: 400 }}>
                <ThemeIcon size={80} radius={100} variant="light" color="gray">
                  <IconTarget size={40} />
                </ThemeIcon>
                <Box>
                  <Text fw={900} size="xl">Horizonte Estratégico Vazio</Text>
                  <Text c="dimmed" size="sm">
                    Ainda não definimos os marcos que guiarão o futuro da companhia. Utilize a barra superior para registrar o primeiro objetivo organizacional.
                  </Text>
                </Box>
                <Group>
                  <Button variant="light" color="gray" radius="md">Explorar Metodologia</Button>
                  <Button rightSection={<IconArrowRight size={18} />} color={color} radius="md" onClick={() => document.querySelector('input')?.focus()}>
                    Começar Agora
                  </Button>
                </Group>
              </Stack>
            </Paper>
          )}
        </Box>
      </Stack>
    </Container>
  );
}
