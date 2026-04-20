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
  Button,
  Modal,
  Image,
  ThemeIcon,
  ActionIcon,
  rem
} from '@mantine/core';
import { 
  IconPhoto, 
  IconFileDescription, 
  IconLink,
  IconChevronLeft,
  IconChevronRight,
  IconX,
  IconCloudOff
} from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';

interface EvidenceDrawerProps {
  opened: boolean;
  onClose: () => void;
  selectedAction: any;
  withinPortal?: boolean;
  fullscreen?: boolean;
}

// FALLBACK MOCK (Apenas se a ação não trouxer nada do banco)
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2340&auto=format&fit=crop"
];

export function EvidenceDrawer({ opened, onClose, selectedAction, withinPortal = true }: EvidenceDrawerProps) {
  const [openedPreview, { open: openPreview, close: closePreview }] = useDisclosure(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Fonte de verdade: prioriza o que vem do banco (selectedAction), senão usa o fallback
  const currentImages = selectedAction?.evidenceUrls || [];
  const currentDocuments = selectedAction?.documents || [];

  const handleImageClick = (index: number) => {
    setActiveIndex(index);
    openPreview();
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % currentImages.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  // NAVEGAÇÃO POR TECLADO
  useEffect(() => {
    if (!openedPreview) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') closePreview();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openedPreview, currentImages.length]);

  return (
    <>
      <Drawer 
        opened={opened} 
        onClose={onClose} 
        title={<Text fw={900} size="lg">Portal de Evidências e Provas</Text>} 
        position="right" 
        size="md" 
        padding="xl" 
        withinPortal={withinPortal}
        styles={{ 
          header: { borderBottom: '1px solid var(--mantine-color-gray-2)', marginBottom: '20px' } 
        }}
      >
        <ScrollArea h="calc(100vh - 120px)">
          <Stack gap="xl">
            {selectedAction && (
              <Box>
                <Badge color="blue" variant="filled" mb="xs">Evidência: {selectedAction.title}</Badge>
                <Title order={3} size="md" mb="xl" c="dark.6">Registro de Execução</Title>
                
                <Stack gap="xl">
                  {/* IMAGENS / PRINTS */}
                  <Box>
                      <Text size="xs" fw={900} c="dimmed" mb="md" tt="uppercase">Evidências Visuais (Fotos/Prints)</Text>
                      {currentImages.length > 0 ? (
                        <SimpleGrid cols={2} spacing="xs">
                          {currentImages.map((img: string, idx: number) => (
                            <Paper 
                              key={idx}
                              withBorder 
                              radius="md" 
                              p={4} 
                              h={120} 
                              bg="gray.0" 
                              style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                cursor: 'pointer',
                                overflow: 'hidden',
                                position: 'relative',
                                transition: 'transform 0.2s ease'
                              }} 
                              shadow="xs"
                              onClick={() => handleImageClick(idx)}
                              component="div"
                              className="evidence-thumb"
                            >
                              <Image src={img} alt="Evidência" fit="cover" height={120} />
                              <Box style={{ position: 'absolute', top: rem(8), right: rem(8), zIndex: 2 }}>
                                 <ThemeIcon size="sm" radius="xl" color="blue" variant="filled">
                                    <IconPhoto size={14} />
                                 </ThemeIcon>
                              </Box>
                            </Paper>
                          ))}
                        </SimpleGrid>
                      ) : (
                        <Paper withBorder p="xl" radius="md" style={{ borderStyle: 'dashed', textAlign: 'center', backgroundColor: 'var(--mantine-color-gray-0)' }}>
                          <Stack align="center" gap="xs">
                            <IconCloudOff size={32} color="var(--mantine-color-gray-4)" />
                            <Text size="xs" fw={700} c="dimmed">Nenhuma evidência visual anexada</Text>
                          </Stack>
                        </Paper>
                      )}
                  </Box>

                  {/* DOCUMENTOS */}
                  <Box>
                      <Text size="xs" fw={900} c="dimmed" mb="md" tt="uppercase">Documentação Técnica</Text>
                      {currentDocuments.length > 0 ? (
                        <Stack gap="xs">
                          {currentDocuments.map((doc: any, idx: number) => (
                            <Paper key={idx} withBorder p="md" radius="md" shadow="none">
                              <Group justify="space-between">
                                <Group gap="md">
                                  <IconFileDescription color={doc.type === 'pdf' ? 'red' : 'blue'} size={28} />
                                  <Box>
                                    <Text size="sm" fw={800}>{doc.name}</Text>
                                    <Text size="xs" c="dimmed">{doc.type?.toUpperCase()} • {doc.size}</Text>
                                  </Box>
                                </Group>
                                <Button variant="subtle" size="xs">Download</Button>
                              </Group>
                            </Paper>
                          ))}
                        </Stack>
                      ) : (
                        <Text size="xs" c="dimmed" fs="italic">Nenhum documento formalizado até o momento.</Text>
                      )}
                  </Box>

                  {/* RASTREABILIDADE */}
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

      <Modal
        opened={openedPreview}
        onClose={closePreview}
        size="auto"
        centered
        padding={rem(40)}
        radius="lg"
        withinPortal={withinPortal}
        withCloseButton={false}
        overlayProps={{
          blur: 10,
          backgroundOpacity: 0.8,
          color: 'black'
        }}
        styles={{
          content: { 
            backgroundColor: 'transparent',
            boxShadow: 'none',
            overflow: 'visible'
          },
          body: {
            padding: 0,
            overflow: 'visible'
          }
        }}
      >
        <Box style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ActionIcon 
            onClick={closePreview} 
            variant="filled" 
            color="dark" 
            radius="xl" 
            size="xl" 
            style={{ position: 'absolute', top: rem(-50), right: rem(-20), zIndex: 100 }}
          >
            <IconX size={24} />
          </ActionIcon>

          {currentImages.length > 1 && (
            <ActionIcon 
              onClick={handlePrev} 
              variant="filled" 
              color="blue" 
              radius="xl" 
              size={rem(50)} 
              style={{ position: 'absolute', left: rem(-70), zIndex: 100, boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}
            >
              <IconChevronLeft size={32} />
            </ActionIcon>
          )}

          <Paper radius="md" p={rem(10)} bg="white" shadow="xl" style={{ border: '4px solid white' }}>
            <Box style={{ maxWidth: '85vw', maxHeight: '80vh', overflow: 'hidden', borderRadius: '4px' }}>
              <Image 
                src={currentImages[activeIndex]} 
                alt="Preview" 
                fit="contain"
                style={{ maxHeight: '80vh' }}
              />
            </Box>
            <Group justify="space-between" mt="md" px="xs">
              <Stack gap={0}>
                <Text fw={900} size="sm" tt="uppercase" c="blue">Evidência {activeIndex + 1} de {currentImages.length}</Text>
                <Text size="xs" c="dimmed" fw={700}>Capturado em 14/02/2026 • 14:15</Text>
              </Stack>
              <Badge variant="dot" color="blue" size="lg">{selectedAction?.title || 'Operacional'}</Badge>
            </Group>
          </Paper>

          {currentImages.length > 1 && (
            <ActionIcon 
              onClick={handleNext} 
              variant="filled" 
              color="blue" 
              radius="xl" 
              size={rem(50)} 
              style={{ position: 'absolute', right: rem(-70), zIndex: 100, boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}
            >
              <IconChevronRight size={32} />
            </ActionIcon>
          )}
        </Box>
      </Modal>
    </>
  );
}
