import {
  Container,
  Stack,
  Text,
  Paper,
  Group,
  Button,
  Table,
  Badge,
  ActionIcon,
  Modal,
  TextInput,
  Select,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { IconPlus, IconTrash, IconCalendar, IconArrowLeft } from '@tabler/icons-react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../infrastructure/supabaseClient';
import { useAuthContext } from '../../application/context/AuthContext';
import { PageHeader } from '../components/common/PageHeader';
import { notifications } from '@mantine/notifications';
import type { Cycle } from '../../domain/models/governance';

export default function CyclesManagement() {
  const navigate = useNavigate();
  const { profile } = useAuthContext();
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);

  const fetchCycles = useCallback(async () => {
    if (!profile) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('cycles')
      .select('*')
      .eq('tenant_id', profile.tenantId)
      .order('start_date', { ascending: false });

    if (!error && data) setCycles(data);
    setLoading(false);
  }, [profile]);

  useEffect(() => {
    fetchCycles();
  }, [fetchCycles]);

  const form = useForm({
    initialValues: {
      name: '',
      start_date: new Date(),
      end_date: new Date(new Date().setMonth(new Date().getMonth() + 3)),
      status: 'planning',
    },
    validate: {
      name: (value) => (value.length < 3 ? 'Nome muito curto' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (!profile) return;
    
    const { error } = await supabase.from('cycles').insert({
      name: values.name,
      start_date: values.start_date.toISOString(),
      end_date: values.end_date.toISOString(),
      status: values.status,
      tenant_id: profile.tenantId,
    });

    if (error) {
      notifications.show({ title: 'Erro', message: error.message, color: 'red' });
    } else {
      notifications.show({ title: 'Sucesso', message: 'Ciclo criado com sucesso', color: 'green' });
      close();
      fetchCycles();
      form.reset();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('cycles').delete().eq('id', id);
    if (!error) {
      notifications.show({ title: 'Ciclo removido', message: 'O ciclo foi excluído.', color: 'blue' });
      fetchCycles();
    }
  };

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Group>
          <Button 
            variant="subtle" 
            color="gray" 
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => navigate('/settings')}
          >
            Voltar para Configurações
          </Button>
        </Group>

        <PageHeader
          title="Ciclos de"
          highlightedText="OKR"
          description="Gerencie os trimestres e anos fiscais da sua organização."
          icon={IconCalendar}
          color="teal"
          rightSection={
            <Button leftSection={<IconPlus size={18} />} onClick={open} color="teal">
              Criar Novo Ciclo
            </Button>
          }
        />

        <Paper withBorder radius="md">
          <Table verticalSpacing="md" horizontalSpacing="lg">
            <Table.Thead bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))">
              <Table.Tr>
                <Table.Th>Nome do Ciclo</Table.Th>
                <Table.Th>Período</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {cycles.length === 0 && !loading ? (
                <Table.Tr>
                  <Table.Td colSpan={4}>
                    <Text ta="center" py="xl" c="dimmed">Nenhum ciclo cadastrado. Comece criando um novo.</Text>
                  </Table.Td>
                </Table.Tr>
              ) : (
                cycles.map((cycle) => (
                  <Table.Tr key={cycle.id}>
                    <Table.Td><Text fw={700}>{cycle.name}</Text></Table.Td>
                    <Table.Td>
                      {new Date(cycle.start_date).toLocaleDateString('pt-BR')} - {new Date(cycle.end_date).toLocaleDateString('pt-BR')}
                    </Table.Td>
                    <Table.Td>
                      <Badge 
                        color={cycle.status === 'active' ? 'green' : cycle.status === 'planning' ? 'blue' : 'gray'}
                        variant="light"
                      >
                        {cycle.status === 'active' ? 'Ativo' : cycle.status === 'planning' ? 'Em Planejamento' : 'Concluído'}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs" justify="flex-end">
                        <ActionIcon variant="subtle" color="red" onClick={() => handleDelete(cycle.id)}>
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        </Paper>
      </Stack>

      <Modal opened={opened} onClose={close} title="Criar Novo Ciclo de OKR" centered radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Nome do Ciclo"
              placeholder="Ex: Q1 2026"
              required
              {...form.getInputProps('name')}
            />
            <Group grow>
              <DateInput
                label="Início"
                placeholder="Selecione data"
                required
                {...form.getInputProps('start_date')}
              />
              <DateInput
                label="Término"
                placeholder="Selecione data"
                required
                {...form.getInputProps('end_date')}
              />
            </Group>
            <Select
              label="Status Inicial"
              data={[
                { value: 'planning', label: 'Em Planejamento' },
                { value: 'active', label: 'Ativo' },
              ]}
              {...form.getInputProps('status')}
            />
            <Button type="submit" mt="md" fullWidth color="teal">
              Confirmar Criação
            </Button>
          </Stack>
        </form>
      </Modal>
    </Container>
  );
}
