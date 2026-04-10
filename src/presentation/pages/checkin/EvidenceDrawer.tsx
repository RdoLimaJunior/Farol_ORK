import { 
  Drawer, 
  ScrollArea, 
  Stack, 
  Box, 
  Badge, 
  Title, 
  Text, 
  SimpleGrid, 
  Paper, 
  Group, 
  Button 
} from '@mantine/core';
import { 
  IconPhoto, 
  IconFileDescription, 
  IconLink 
} from '@tabler/icons-react';

interface EvidenceDrawerProps {
  opened: boolean;
  onClose: () => void;
  selectedAction: any;
}

export function EvidenceDrawer({ opened, onClose, selectedAction }: EvidenceDrawerProps) {
  return (
    <Drawer 
      opened={opened} 
      onClose={onClose} 
      title={<Text fw={900} size="lg">Portal de Evidências e Provas</Text>} 
      position="right" 
      size="md" 
      padding="xl" 
      styles={{ 
        header: { borderBottom: '1px solid var(--mantine-color-gray-2)', marginBottom: '20px' } 
      }}
    >
      <ScrollArea h="calc(100vh - 120px)">
        <Stack gap="xl">
          {selectedAction && (
            <Box>
              <Badge color="blue" variant="filled" mb="xs">Evidência Operacional</Badge>
              <Title order={3} size="md" mb="xl" c="dark.6">{selectedAction.title}</Title>
              <Stack gap="xl">
                 <Box>
                    <Text size="xs" fw={900} c="dimmed" mb="md" tt="uppercase">Evidências Visuais (Fotos/Prints)</Text>
                    <SimpleGrid cols={2} spacing="xs">
                       <Paper withBorder radius="md" p={4} h={140} bg="gray.0" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} shadow="xs"><IconPhoto size={40} color="gray" /></Paper>
                       <Paper withBorder radius="md" p={4} h={140} bg="gray.0" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} shadow="xs"><IconPhoto size={40} color="gray" /></Paper>
                    </SimpleGrid>
                 </Box>
                 <Box>
                    <Text size="xs" fw={900} c="dimmed" mb="md" tt="uppercase">Documentação Técnica</Text>
                    <Paper withBorder p="md" radius="md" shadow="none">
                      <Group justify="space-between">
                        <Group gap="md">
                          <IconFileDescription color="red" size={28} />
                          <Box>
                            <Text size="sm" fw={800}>relatorio_entrega_final.pdf</Text>
                            <Text size="xs" c="dimmed">PDF • 1.8 MB</Text>
                          </Box>
                        </Group>
                        <Button variant="subtle" size="xs">Download</Button>
                      </Group>
                    </Paper>
                 </Box>
                 <Box>
                    <Text size="xs" fw={900} c="dimmed" mb="md" tt="uppercase">Rastreabilidade Externa</Text>
                    <Paper withBorder p="md" radius="md" shadow="none" bg="blue.0">
                      <Group gap="md">
                        <IconLink color="blue" size={20} />
                        <Text size="sm" fw={700} c="blue.9" style={{ cursor: 'pointer', textDecoration: 'underline' }}>Link para Repositório de Documentos</Text>
                      </Group>
                    </Paper>
                 </Box>
              </Stack>
            </Box>
          )}
          {!selectedAction && <Text c="dimmed" ta="center">Selecione uma ação para visualizar as provas.</Text>}
        </Stack>
      </ScrollArea>
    </Drawer>
  );
}
