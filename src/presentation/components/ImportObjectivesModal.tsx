import { 
  Modal, 
  Stepper, 
  Button, 
  Group, 
  Text, 
  Stack, 
  Paper, 
  Table, 
  Select, 
  ThemeIcon, 
  rem,
  Box,
  LoadingOverlay,
  Badge,
} from '@mantine/core';
import { Dropzone, MS_EXCEL_MIME_TYPE } from '@mantine/dropzone';
import { 
  IconUpload, 
  IconX, 
  IconFileSpreadsheet, 
  IconSparkles, 
  IconCheck,
  IconArrowRight,
  IconAlertCircle
} from '@tabler/icons-react';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { motion } from 'framer-motion';
import { notifications } from '@mantine/notifications';

interface ImportObjectivesModalProps {
  opened: boolean;
  onClose: () => void;
  onImport: (data: any[]) => Promise<void>;
}

export function ImportObjectivesModal({ opened, onClose, onImport }: ImportObjectivesModalProps) {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rawData, setRawData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const [isAiThinking, setIsAiThinking] = useState(false);

  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const handleFileUpload = (files: File[]) => {
    const file = files[0];
    const reader = new FileReader();
    setLoading(true);

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (json.length > 0) {
        const headerRow = json[0] as string[];
        const dataRows = json.slice(1);
        setHeaders(headerRow);
        setRawData(dataRows);
        
        // Trigger AI Mapping after load
        simulateAiMapping(headerRow);
        nextStep();
      }
      setLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  const simulateAiMapping = (fileHeaders: string[]) => {
    setIsAiThinking(true);
    // Simulating IA pattern matching
    setTimeout(() => {
      const newMappings: Record<string, string> = {};
      fileHeaders.forEach(header => {
        const h = header.toLowerCase();
        if (h.includes('objetivo') || h.includes('título') || h.includes('title')) newMappings[header] = 'title';
        if (h.includes('descrição') || h.includes('detalhes') || h.includes('description')) newMappings[header] = 'description';
        if (h.includes('pai') || h.includes('parent') || h.includes('alinhamento')) newMappings[header] = 'parent_id';
      });
      setMappings(newMappings);
      setIsAiThinking(false);
      notifications.show({
        title: 'IA Farol 🔥',
        message: 'Mapeamento de colunas sugerido com sucesso!',
        color: 'cyan',
        icon: <IconSparkles size={16} />
      });
    }, 1500);
  };

  const finalData = rawData.map(row => {
    const obj: any = {};
    headers.forEach((header, index) => {
      const field = mappings[header];
      if (field) obj[field] = row[index];
    });
    return obj;
  }).filter(obj => obj.title);

  const handleFinish = async () => {
    setLoading(true);
    try {
      await onImport(finalData);
      notifications.show({
        title: 'Sucesso!',
        message: `${finalData.length} objetivos importados.`,
        color: 'green'
      });
      handleClose();
    } catch (error) {
       notifications.show({
        title: 'Erro na importação',
        message: 'Ocorreu um erro ao salvar os dados.',
        color: 'red'
      });
    }
    setLoading(false);
  };

  const handleClose = () => {
    setActive(0);
    setRawData([]);
    setHeaders([]);
    setMappings({});
    onClose();
  };

  return (
    <Modal 
      opened={opened} 
      onClose={handleClose} 
      size="xl" 
      title={
        <Group gap="xs">
          <ThemeIcon variant="light" color="cyan" radius="md">
            <IconSparkles size={18} />
          </ThemeIcon>
          <Text fw={700} size="lg">Importar via Planilha (Alpha IA)</Text>
        </Group>
      }
      radius="md"
      overlayProps={{ blur: 3, opacity: 0.55 }}
    >
      <Box pos="relative">
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        
        <Stepper active={active} onStepClick={setActive} color="cyan" allowNextStepsSelect={false}>
          {/* STEP 1: UPLOAD */}
          <Stepper.Step 
            label="Upload" 
            description="Arquivo .xlsx ou .csv" 
            icon={<IconUpload size={rem(18)} />}
          >
            <Stack py="xl">
              <Dropzone
                onDrop={handleFileUpload}
                maxSize={3 * 1024 ** 2}
                accept={[...MS_EXCEL_MIME_TYPE, 'text/csv']}
                radius="md"
              >
                <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                  <Dropzone.Accept>
                    <IconUpload
                      style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                      stroke={1.5}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                      stroke={1.5}
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconFileSpreadsheet
                      style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                      stroke={1.5}
                    />
                  </Dropzone.Idle>

                  <div>
                    <Text size="xl" inline>
                      Arraste sua planilha aqui
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                      O arquivo deve conter colunas para Objetivo e Descrição. Máximo 3MB.
                    </Text>
                  </div>
                </Group>
              </Dropzone>
            </Stack>
          </Stepper.Step>

          {/* STEP 2: MAPPING */}
          <Stepper.Step 
            label="Mapeamento" 
            description="Identificar Colunas" 
            icon={<IconSparkles size={rem(18)} />}
          >
            <Stack py="xl" pos="relative">
              <LoadingOverlay visible={isAiThinking} loaderProps={{ children: <AiLoader /> }} />
              
              <Paper withBorder p="md" radius="md">
                <Text fw={700} mb="md">Mapeamento Inteligente</Text>
                <Stack gap="xs">
                  {headers.map(header => (
                    <Group key={header} justify="space-between">
                      <Text size="sm" fw={500}>{header}</Text>
                      <IconArrowRight size={14} color="var(--mantine-color-gray-4)" />
                      <Select
                        placeholder="Ignorar"
                        data={[
                          { value: 'title', label: 'Título do Objetivo' },
                          { value: 'description', label: 'Descrição' },
                          { value: 'parent_id', label: 'ID do Pai (Cascata)' },
                        ]}
                        value={mappings[header] || null}
                        onChange={(val) => setMappings(prev => ({ ...prev, [header]: val || '' }))}
                        size="xs"
                        style={{ width: 200 }}
                      />
                    </Group>
                  ))}
                </Stack>
              </Paper>
            </Stack>
          </Stepper.Step>

          {/* STEP 3: PREVIEW */}
          <Stepper.Step 
            label="Revisão" 
            description="Validar Dados" 
            icon={<IconCheck size={rem(18)} />}
          >
            <Stack py="xl">
              <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
                <Table.ScrollContainer minWidth={500}>
                  <Table striped highlightOnHover>
                    <Table.Thead bg="gray.1">
                      <Table.Tr>
                        <Table.Th>Objetivo</Table.Th>
                        <Table.Th>Pai</Table.Th>
                        <Table.Th>Status</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {finalData.map((item, i) => (
                        <Table.Tr key={i}>
                          <Table.Td>
                            <Text size="sm" fw={500}>{item.title}</Text>
                            <Text size="xs" c="dimmed" truncate>{item.description}</Text>
                          </Table.Td>
                          <Table.Td><Text size="xs">{item.parent_id || 'Top Level'}</Text></Table.Td>
                          <Table.Td><Badge color="green" size="xs">Válido</Badge></Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Table.ScrollContainer>
              </Paper>
              
              {finalData.length === 0 && (
                <Paper p="md" bg="red.0" withBorder style={{ borderColor: 'var(--mantine-color-red-2)' }}>
                   <Group gap="xs">
                     <IconAlertCircle size={18} color="var(--mantine-color-red-6)" />
                     <Text size="sm" c="red.9">Nenhum dado válido encontrado para importação.</Text>
                   </Group>
                </Paper>
              )}
            </Stack>
          </Stepper.Step>

          <Stepper.Completed>
            <Stack align="center" py="xl">
              <ThemeIcon size={60} radius="xl" color="green" variant="light">
                <IconCheck size={40} />
              </ThemeIcon>
              <Text fw={700} size="xl">Tudo Pronto!</Text>
              <Text c="dimmed">Clique em "Lançar agora" para criar os objetivos.</Text>
            </Stack>
          </Stepper.Completed>
        </Stepper>

        <Group justify="center" mt="xl">
          {active !== 0 && active !== 3 && (
            <Button variant="default" onClick={prevStep}>Voltar</Button>
          )}
          {active === 1 && (
            <Button color="cyan" onClick={nextStep}>Ver Preview</Button>
          )}
          {active === 2 && finalData.length > 0 && (
            <Button color="cyan" onClick={nextStep} rightSection={<IconArrowRight size={16}/>}>Confirmar</Button>
          )}
          {active === 3 && (
            <Button color="cyan" size="lg" onClick={handleFinish} loading={loading}>Lançar agora</Button>
          )}
        </Group>
      </Box>
    </Modal>
  );
}

function AiLoader() {
  return (
    <Stack align="center" gap="sm">
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ThemeIcon size={60} radius="xl" variant="gradient" gradient={{ from: 'cyan', to: 'indigo' }}>
          <IconSparkles size={34} />
        </ThemeIcon>
      </motion.div>
      <Text fw={700} c="cyan.9">IA FAROL Analisando Planilha...</Text>
      <Text size="xs" c="dimmed">Mapeando semântica de colunas</Text>
    </Stack>
  );
}
