import {
  Container, Stack, Text, Paper, Group, ThemeIcon,
  rem, Title, Button, SimpleGrid, Table, Badge, Box
} from '@mantine/core';
import {
  IconFileExport, IconFileTypePdf, IconFileTypeXls,
  IconChartBar, IconTrendingUp, IconCalendar, IconUsers
} from '@tabler/icons-react';
import { PageHeader } from '../components/common/PageHeader';
import { motion } from 'framer-motion';
import { notifications } from '@mantine/notifications';

const REPORT_TYPES = [
  {
    id: 'okr_summary',
    title: 'Resumo de OKRs',
    description: 'Visão consolidada de todos os objetivos e Key Results do ciclo atual.',
    icon: IconChartBar,
    color: 'farol-blue',
    format: 'PDF + Excel',
  },
  {
    id: 'progress_history',
    title: 'Histórico de Progresso',
    description: 'Evolução temporal dos check-ins e variações de performance por período.',
    icon: IconTrendingUp,
    color: 'teal',
    format: 'Excel',
  },
  {
    id: 'cycle_report',
    title: 'Relatório de Ciclo',
    description: 'Encerramento formal do trimestre com scores, análises e lições aprendidas.',
    icon: IconCalendar,
    color: 'violet',
    format: 'PDF',
  },
  {
    id: 'team_report',
    title: 'Performance por Time',
    description: 'Comparativo de execução entre equipes, departamentos e responsáveis.',
    icon: IconUsers,
    color: 'orange',
    format: 'PDF + Excel',
  },
];

const SCHEDULED_REPORTS = [
  { name: 'OKR Weekly Digest',    frequency: 'Toda Segunda',   lastGenerated: '10/03/2025', status: 'Ativo' },
  { name: 'Fechamento Q1 2025',   frequency: 'Mensal',         lastGenerated: '01/03/2025', status: 'Ativo' },
  { name: 'Radar de Riscos',       frequency: 'Toda Sexta',     lastGenerated: '14/03/2025', status: 'Pausado' },
];

export default function Reports() {
  const handleExport = (id: string, format: string) => {
    notifications.show({
      title: 'Exportação Iniciada',
      message: `O relatório está sendo gerado no formato ${format}.`,
      color: 'farol-blue',
      icon: <IconFileExport size={18} />,
    });
  };

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <PageHeader
          title="Relatórios"
          highlightedText="& Exportações"
          description="Dados consolidados para tomada de decisão e prestação de contas"
          icon={IconFileExport}
          color="violet"
        />

        {/* Report cards */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            {REPORT_TYPES.map((report, i) => {
              const Icon = report.icon;
              return (
                <motion.div key={report.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Paper
                    withBorder
                    p="xl"
                    radius="lg"
                    h="100%"
                    style={{ transition: 'box-shadow 0.2s ease', cursor: 'default' }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.08)')}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
                  >
                    <Stack gap="md" h="100%">
                      <Group gap="md">
                        <ThemeIcon size="xl" color={report.color} variant="light" radius="md">
                          <Icon size={24} />
                        </ThemeIcon>
                        <Stack gap={0} style={{ flex: 1 }}>
                          <Text fw={800} size="md">{report.title}</Text>
                          <Badge size="xs" color={report.color} variant="light">{report.format}</Badge>
                        </Stack>
                      </Group>
                      <Text size="sm" c="dimmed" style={{ flex: 1 }}>{report.description}</Text>
                      <Group gap="xs">
                        <Button
                          size="xs"
                          variant="light"
                          color={report.color}
                          radius="md"
                          leftSection={<IconFileTypePdf size={14} />}
                          onClick={() => handleExport(report.id, 'PDF')}
                        >
                          PDF
                        </Button>
                        {report.format.includes('Excel') && (
                          <Button
                            size="xs"
                            variant="light"
                            color="green"
                            radius="md"
                            leftSection={<IconFileTypeXls size={14} />}
                            onClick={() => handleExport(report.id, 'Excel')}
                          >
                            Excel
                          </Button>
                        )}
                      </Group>
                    </Stack>
                  </Paper>
                </motion.div>
              );
            })}
          </SimpleGrid>
        </motion.div>

        {/* Scheduled reports */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Paper withBorder p="xl" radius="lg">
            <Stack gap="md">
              <Group justify="space-between">
                <Text fw={800} size="md">Relatórios Agendados</Text>
                <Badge color="violet" variant="light">{SCHEDULED_REPORTS.length} agendados</Badge>
              </Group>
              <Table verticalSpacing="sm" horizontalSpacing="md">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Nome</Table.Th>
                    <Table.Th>Frequência</Table.Th>
                    <Table.Th>Último Gerado</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th></Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {SCHEDULED_REPORTS.map(r => (
                    <Table.Tr key={r.name}>
                      <Table.Td><Text size="sm" fw={600}>{r.name}</Text></Table.Td>
                      <Table.Td><Text size="sm" c="dimmed">{r.frequency}</Text></Table.Td>
                      <Table.Td><Text size="sm" c="dimmed">{r.lastGenerated}</Text></Table.Td>
                      <Table.Td>
                        <Badge
                          size="sm"
                          color={r.status === 'Ativo' ? 'green' : 'gray'}
                          variant="dot"
                        >
                          {r.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Button size="xs" variant="subtle" color="gray" radius="md" leftSection={<IconFileExport size={12} />}>
                            Baixar
                          </Button>
                        </Box>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Stack>
          </Paper>
        </motion.div>
      </Stack>
    </Container>
  );
}
