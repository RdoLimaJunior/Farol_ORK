import { 
  Container,
  Stack, 
  Group, 
  Button, 
  Box,
  rem,
  Text,
  Divider,
  Menu,
  UnstyledButton
} from '@mantine/core';
import { 
  IconCheck,
  IconTarget,
  IconChevronDown,
  IconCalendar
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

// IMPORTAÇÃO DOS NOVOS COMPONENTES MODULARES
import { ObjectiveSection } from './checkin/ObjectiveSection';
import { EvidenceDrawer } from './checkin/EvidenceDrawer';

import { useObjectives } from '../../application/hooks/useObjectives';
import { useKRs } from '../../application/hooks/useKRs';
import { useActions } from '../../application/hooks/useActions';
import { PageHeader } from '../components/common/PageHeader';

export default function CheckinFlow() {
  const { objectives, fetchObjectives } = useObjectives();
  const { krs, fetchKRs } = useKRs();
  const { actions, initiatives, fetchCeremonyData } = useActions();
  
  const [openedArtifacts, { open, close }] = useDisclosure(false);
  const [selectedAction, setSelectedAction] = useState<any>(null);
  const [selectedMonth, setSelectedMonth] = useState('FEVEREIRO / 2026');
  
  const months = [
    'JANEIRO / 2026',
    'FEVEREIRO / 2026',
    'MARÇO / 2026',
    'ABRIL / 2026',
    'MAIO / 2026',
    'JUNHO / 2026'
  ];
  
  useEffect(() => {
    fetchObjectives();
    fetchKRs();
    fetchCeremonyData();
  }, [fetchObjectives, fetchKRs, fetchCeremonyData]);

  const getKRsForObjective = (objectiveId: string) => krs.filter(kr => kr.objectiveId === objectiveId);
  const getActionsForInitiative = (initiativeId: string) => actions.filter(a => a.parentId === initiativeId);

  const getConfidenceData = (confidence?: string) => {
    switch(confidence?.toLowerCase()) {
      case 'alta': return { color: 'teal', label: 'Alta' };
      case 'media': return { color: 'orange', label: 'Média' };
      case 'baixa': return { color: 'red', label: 'Baixa' };
      default: return { color: 'gray', label: '- -' };
    }
  };

  const handleShowEvidence = (action: any) => {
    setSelectedAction(action);
    open();
  };

  if (!objectives.length) return null;

  return (
    <Container size="fluid" py={rem(20)}>
      <Stack gap={rem(40)}>
        <PageHeader 
          title="Ritual de"
          highlightedText="Check-in Executivo"
          description="Acompanhamento tático, gestão de evidências e memória institucional."
          icon={IconTarget}
          color="blue"
          rightSection={
            <Stack gap={rem(4)} align="flex-end">
              <Text size="xs" fw={900} c="dimmed" tt="uppercase" style={{ letterSpacing: rem(1) }}>Período de Referência</Text>
              
              <Menu shadow="xl" width={220} position="bottom-end" transitionProps={{ transition: 'pop-top-right' }} radius="md">
                <Menu.Target>
                  <UnstyledButton 
                    style={{
                      padding: `${rem(8)} ${rem(20)}`,
                      borderRadius: '8px',
                      backgroundColor: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))',
                      border: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-5))',
                      }
                    }}
                  >
                    <Group gap="md">
                      <IconCalendar size={18} color="var(--mantine-color-blue-6)" />
                      <Text fw={900} size="sm" c="dark.6">{selectedMonth}</Text>
                      <IconChevronDown size={14} color="var(--mantine-color-gray-5)" />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown p={8}>
                  <Menu.Label>Ciclo de Gestão 2026</Menu.Label>
                  {months.map(m => (
                    <Menu.Item 
                      key={m} 
                      onClick={() => setSelectedMonth(m)}
                      style={{ 
                        fontWeight: selectedMonth === m ? 800 : 500,
                        backgroundColor: selectedMonth === m ? 'var(--mantine-color-blue-0)' : 'transparent',
                        color: selectedMonth === m ? 'var(--mantine-color-blue-9)' : 'inherit'
                      }}
                    >
                      {m}
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
            </Stack>
          }
        />

        {/* LISTA DE OBJETIVOS (ORQUESTRAÇÃO) */}
        <Box>
          {objectives.map((obj) => (
            <ObjectiveSection 
              key={obj.id} 
              obj={obj} 
              krs={getKRsForObjective(obj.id)}
              initiatives={initiatives.filter(i => getKRsForObjective(obj.id).some(k => k.id === i.keyResultId))}
              getActionsForInitiative={getActionsForInitiative}
              onShowEvidence={handleShowEvidence}
              getConfidenceData={getConfidenceData}
            />
          ))}
        </Box>

        {/* CONCLUSÃO DO RITUAL (DISCRETO) */}
        <Box mt={rem(60)} mb={rem(120)}>
          <Divider mb="xl" color="gray.2" />
          <Group justify="space-between" align="center" px="md">
            <Stack gap={0}>
              <Text size="xs" fw={900} c="dimmed" tt="uppercase" style={{ letterSpacing: rem(1) }}>Finalização do Encontro</Text>
              <Text size="sm" fw={600} c="gray.6">Clique para salvar as notas e artefatos deste check-in estratégico.</Text>
            </Stack>
            <Button 
              variant="filled"
              size="md" 
              radius="md" 
              color="dark.6" 
              px={30} 
              leftSection={<IconCheck size={18} />}
              style={{ boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
            >
              Concluir Check-in
            </Button>
          </Group>
        </Box>
      </Stack>

      {/* PAINEL LATERAL DE EVIDÊNCIAS */}
      <EvidenceDrawer 
        opened={openedArtifacts} 
        onClose={close} 
        selectedAction={selectedAction} 
      />
    </Container>
  );
}
