import { 
  Container, 
  Title, 
  Text, 
  Stack, 
  Group, 
  ThemeIcon, 
  rem, 
  Skeleton,
  Paper,
  Box,
  Button
} from '@mantine/core';
import { IconHierarchy2, IconInfoCircle, IconFileImport } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useObjectives } from '../../application/hooks/useObjectives';
import { useKRs } from '../../application/hooks/useKRs';
import { useOkrCalculation } from '../../application/hooks/useOkrCalculation';
import { TreeHierarchyView } from '../components/TreeHierarchyView';
import { ImportObjectivesModal } from '../components/ImportObjectivesModal';
import { motion } from 'framer-motion';

export default function Strategy() {
  const { objectives, loading: loadingObj, fetchObjectives, importBatch } = useObjectives();
  const { krs, loading: loadingKR, fetchKRs } = useKRs();
  const [importOpened, { open: openImport, close: closeImport }] = useDisclosure(false);

  useEffect(() => {
    fetchObjectives();
    fetchKRs();
  }, [fetchObjectives, fetchKRs]);

  const { enrichedObjectives } = useOkrCalculation(objectives, krs);
  const isLoading = loadingObj || loadingKR;

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Group justify="space-between" align="flex-end">
            <Stack gap={0}>
              <Group gap="xs">
                <ThemeIcon variant="light" color="cyan" size="xl" radius="md">
                  <IconHierarchy2 size={24} />
                </ThemeIcon>
                <Title order={1} style={{ fontSize: rem(32), fontWeight: 900 }}>
                  Mapa <Text span c="cyan.6" inherit>Estratégico</Text>
                </Title>
              </Group>
              <Text c="dimmed" size="lg">Visualize o alinhamento e a cascata de todos os objetivos da organização.</Text>
            </Stack>
          
            <Button 
              leftSection={<IconFileImport size={18} />} 
              variant="light" 
              color="cyan" 
              size="md" 
              radius="md"
              onClick={openImport}
            >
              Importar Planilha
            </Button>
          </Group>
        </motion.div>

        <Paper withBorder p="md" radius="md" bg="blue.0" style={{ borderLeft: '5px solid var(--mantine-color-blue-4)' }}>
          <Group gap="sm" wrap="nowrap" align="flex-start">
            <IconInfoCircle size={20} color="var(--mantine-color-blue-7)" style={{ marginTop: 2 }} />
            <Text size="sm" c="blue.9">
              Os objetivos são organizados hierarquicamente. Objetivos sem "Pai" são considerados 
              <b> Estratégicos</b>. Use este mapa para identificar gargalos e garantir que todos os 
              times estejam remando na mesma direção.
            </Text>
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
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <TreeHierarchyView objectives={enrichedObjectives} />
            </motion.div>
          )}
        </Box>
      </Stack>

      <ImportObjectivesModal 
        opened={importOpened} 
        onClose={closeImport} 
        onImport={importBatch} 
      />
    </Container>
  );
}

