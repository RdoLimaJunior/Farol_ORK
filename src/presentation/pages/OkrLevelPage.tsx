import { 
  Container, 
  Text, 
  Stack, 
  Skeleton,
  Paper,
  Box,
  Button,
  Alert,
  Group,
  Modal,
  Title
} from '@mantine/core';
import { IconInfoCircle, IconFileImport, IconPlus } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useSearchParams } from 'react-router-dom';
import { useObjectives } from '../../application/hooks/useObjectives';
import { useKRs } from '../../application/hooks/useKRs';
import { useOkrCalculation } from '../../application/hooks/useOkrCalculation';
import { DetailedOkrList } from '../components/DetailedOkrList';
import { ImportObjectivesModal } from '../components/ImportObjectivesModal';
import { ObjectiveForm } from '../components/ObjectiveForm';
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
  const { objectives, loading: loadingObj, fetchObjectives, createObjective, importBatch } = useObjectives();
  const { krs, loading: loadingKR, fetchKRs } = useKRs();
  const [importOpened, { open: openImport, close: closeImport }] = useDisclosure(false);
  const [createOpened, { open: openCreate, close: closeCreate }] = useDisclosure(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Detect ?criar=true from Spotlight to auto-open the create modal
  useEffect(() => {
    if (searchParams.get('criar') === 'true') {
      openCreate();
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, openCreate, setSearchParams]);

  useEffect(() => {
    fetchObjectives();
    fetchKRs();
  }, [fetchObjectives, fetchKRs]);

  const { enrichedObjectives } = useOkrCalculation(objectives, krs);
  
  // Filter by level
  const filteredObjectives = enrichedObjectives.filter(obj => obj.level === level);
  // Parent objectives (for child alignment dropdown)
  const parentOptions = enrichedObjectives
    .filter(obj => !obj.parentObjectiveId)
    .map(obj => ({ value: obj.id, label: obj.title }));

  const isLoading = loadingObj || loadingKR;

  const handleCreate = async (values: any) => {
    // Force the correct level from the current page context
    await createObjective({ ...values, level });
    closeCreate();
  };

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <PageHeader 
          title={title.split(' ')[0]}
          highlightedText={title.split(' ').slice(1).join(' ')}
          description={description}
          icon={Icon}
          color={color}
          rightSection={
            <Group gap="sm">
              <Button 
                leftSection={<IconPlus size={18} />} 
                color={color} 
                size="md" 
                radius="md"
                onClick={openCreate}
              >
                Criar OKR
              </Button>
              <Button 
                leftSection={<IconFileImport size={18} />} 
                variant="light" 
                color={color} 
                size="md" 
                radius="md"
                onClick={openImport}
              >
                Importar
              </Button>
            </Group>
          }
        />

        <Alert 
          icon={<IconInfoCircle size={20} />} 
          title={`Sobre ${title}`} 
          color="farol-blue" 
          radius="md" 
          variant="light"
        >
          {level === 'organizational' && 'Eles definem o rumo de toda a companhia para o ciclo atual, focando em visão de longo prazo e moonshots.'}
          {level === 'departmental' && 'Eles alinham as frentes de trabalho dos departamentos à estratégia global, desdobrando o impacto em áreas específicas.'}
          {level === 'individual' && 'Eles representam a contribuição direta de cada talento para os objetivos táticos, garantindo protagonismo na execução.'}
        </Alert>

        {/* CONTENT */}
        <Box>
          {isLoading ? (
            <Stack>
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} height={80} radius="md" />
              ))}
            </Stack>
          ) : filteredObjectives.length > 0 ? (
              <DetailedOkrList 
                objectives={filteredObjectives} 
                onAddObjective={openCreate} 
              />
          ) : (
            <Paper withBorder p={50} radius="md" style={{ borderStyle: 'dashed', textAlign: 'center', backgroundColor: 'transparent' }}>
              <Stack align="center" gap="md">
                <Text fw={700} size="xl">Nenhum objetivo encontrado</Text>
                <Text c="dimmed">Crie o primeiro objetivo de nível {title} usando o botão acima.</Text>
                <Button leftSection={<IconPlus size={18} />} color={color} radius="md" onClick={openCreate}>
                  Criar Primeiro OKR
                </Button>
              </Stack>
            </Paper>
          )}
        </Box>
      </Stack>

      {/* Modal: Criar OKR */}
      <Modal
        opened={createOpened}
        onClose={closeCreate}
        title={<Title order={4}>Novo Objetivo — {title}</Title>}
        size="lg"
        radius="md"
        padding="xl"
      >
        <ObjectiveForm
          initialValues={{ level }}
          onSubmit={handleCreate}
          loading={loadingObj}
          parentObjectives={parentOptions}
        />
      </Modal>

      <ImportObjectivesModal 
        opened={importOpened} 
        onClose={closeImport} 
        onImport={importBatch} 
      />
    </Container>
  );
}
