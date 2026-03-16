import { Table, Badge, ActionIcon, Avatar, Group, Text, ScrollArea, Paper, Title, Stack } from '@mantine/core';
import { IconExternalLink, IconChevronRight } from '@tabler/icons-react';
import type { Initiative } from '../../../application/hooks/useInitiatives';

export function InitiativesTable({ initiatives }: { initiatives: Initiative[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'warning';
      case 'blocked': return 'error';
      default: return 'gray';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'in_progress': return 'Em Andamento';
      case 'blocked': return 'Impedido';
      default: return 'A Iniciar';
    }
  };

  return (
    <Paper withBorder p="xl" radius="lg">
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={4}>Iniciativas & Plano de Ação</Title>
          <Badge color="farol-blue" variant="light">{initiatives.length} Ativas</Badge>
        </Group>
        
        <ScrollArea h={400}>
          <Table verticalSpacing="md" horizontalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Iniciativa / Ação</Table.Th>
                <Table.Th>Responsável</Table.Th>
                <Table.Th>KR Relacionado</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Ações</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {initiatives.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={5} align="center" py="xl">
                    <Text c="dimmed">Nenhuma iniciativa cadastrada no plano de ação.</Text>
                  </Table.Td>
                </Table.Tr>
              ) : (
                initiatives.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      <Stack gap={4}>
                        <Text size="sm" fw={700}>{item.title}</Text>
                        <Text size="xs" c="dimmed" lineClamp={1}>{item.description}</Text>
                      </Stack>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar size="sm" radius="xl" color="farol-blue" variant="light">
                          {item.profiles?.full_name?.substring(0, 2).toUpperCase() || 'U'}
                        </Avatar>
                        <Text size="sm">{item.profiles?.full_name || 'Responsável'}</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Text size="xs" fw={500} lineClamp={1} style={{ maxWidth: 150 }}>
                        {item.key_results?.title || 'Meta do Trimestre'}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge 
                        color={getStatusColor(item.status)} 
                        variant="dot" 
                        size="sm"
                      >
                         {getStatusLabel(item.status)}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Group gap={4}>
                        <ActionIcon variant="subtle" color="gray" size="sm">
                          <IconExternalLink size={14} />
                        </ActionIcon>
                        <ActionIcon variant="subtle" color="gray" size="sm">
                          <IconChevronRight size={14} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Stack>
    </Paper>
  );
}
