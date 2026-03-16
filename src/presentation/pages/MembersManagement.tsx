import { 
  Table, Badge, Group, Button, ActionIcon, Text, Stack, Paper, Menu, rem, Avatar, TextInput, Container, ThemeIcon, Skeleton, Box
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconPlus, 
  IconDotsVertical, 
  IconUserOff, 
  IconEdit, 
  IconSearch, 
  IconUsers,
  IconFilter,
  IconUserCheck
} from '@tabler/icons-react';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../infrastructure/supabaseClient';
import { useAuthContext } from '../../application/context/AuthContext';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { InviteMemberModal } from '../../presentation/components/InviteMemberModal';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '../components/common/PageHeader';

interface MemberRow {
  id: string;
  full_name: string;
  email: string;
  job_title: string | null;
  department: string | null;
  role: 'admin' | 'member';
  is_active: boolean;
  created_at: string;
}

export default function MembersManagement() {
  const { profile } = useAuthContext();
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [inviteOpened, { open: openInvite, close: closeInvite }] = useDisclosure(false);

  const fetchMembers = useCallback(async () => {
    if (!profile) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, job_title, department, role, is_active, created_at')
      .eq('tenant_id', profile.tenantId)
      .order('created_at', { ascending: true });

    if (!error && data) setMembers(data);
    setLoading(false);
  }, [profile]);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const handleDeactivate = (member: MemberRow) => {
    modals.openConfirmModal({
      title: 'Desativar Membro',
      children: <Text size="sm">Tem certeza que deseja desativar <b>{member.full_name}</b>? Ele não poderá mais fazer login.</Text>,
      labels: { confirm: 'Desativar', cancel: 'Cancelar' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        const { error } = await supabase.from('profiles').update({ is_active: false }).eq('id', member.id);
        if (!error) {
          notifications.show({ title: 'Membro desativado', message: 'O acesso foi revogado com sucesso.', color: 'blue' });
          fetchMembers();
        }
      }
    });
  };

  const handleReactivate = async (member: MemberRow) => {
    const { error } = await supabase.from('profiles').update({ is_active: true }).eq('id', member.id);
    if (!error) {
      notifications.show({ title: 'Membro reativado ✅', message: `${member.full_name} pode fazer login novamente.`, color: 'green' });
      fetchMembers();
    }
  };

  const filteredMembers = members.filter(m =>
    m.full_name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <PageHeader 
          title="Gestão de"
          highlightedText="Membros"
          description="Gerencie quem tem acesso e as permissões do seu time."
          icon={IconUsers}
          color="cyan"
          rightSection={
            <Button 
              leftSection={<IconPlus size={18} />} 
              size="md" 
              radius="md" 
              color="cyan"
              onClick={openInvite}
              style={{ boxShadow: '0 4px 15px rgba(3, 169, 244, 0.3)' }}
            >
              Convidar Novo Membro
            </Button>
          }
        />

        {/* SEARCH & FILTERS */}
        <Paper withBorder p="md" radius="md">
          <Group justify="space-between">
            <TextInput
              placeholder="Buscar por nome ou email..."
              leftSection={<IconSearch size={16} />}
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              style={{ flex: 1, maxWidth: rem(400) }}
              radius="md"
            />
            <Group>
               <Button variant="light" leftSection={<IconFilter size={16} />} color="gray" radius="md">Filtros</Button>
               <Text size="xs" c="dimmed" fw={500}>{filteredMembers.length} membros encontrados</Text>
            </Group>
          </Group>
        </Paper>

        <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
          <Table verticalSpacing="md" horizontalSpacing="lg" highlightOnHover>
            <Table.Thead bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))">
              <Table.Tr>
                <Table.Th>Membro</Table.Th>
                <Table.Th>Departamento / Cargo</Table.Th>
                <Table.Th>Tipo</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <Table.Tr key={i}>
                    <Table.Td><Skeleton height={40} radius="xl" width={40} /></Table.Td>
                    <Table.Td><Skeleton height={20} width="60%" /></Table.Td>
                    <Table.Td><Skeleton height={20} width="40%" /></Table.Td>
                    <Table.Td><Skeleton height={20} width="30%" /></Table.Td>
                    <Table.Td><Skeleton height={30} width={30} /></Table.Td>
                  </Table.Tr>
                ))
              ) : filteredMembers.map((member) => (
                <Table.Tr key={member.id}>
                  <Table.Td>
                    <Group gap="sm">
                      <Avatar color="cyan" radius="xl">{member.full_name.charAt(0)}</Avatar>
                      <Stack gap={0}>
                        <Text size="sm" fw={700}>{member.full_name}</Text>
                        <Text size="xs" c="dimmed">{member.email}</Text>
                      </Stack>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Stack gap={0}>
                      <Text size="sm" fw={500}>{member.department || '-'}</Text>
                      <Text size="xs" c="dimmed">{member.job_title || '-'}</Text>
                    </Stack>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="light" color={member.role === 'admin' ? 'grape' : 'blue'}>
                       {member.role.toUpperCase()}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="dot" color={member.is_active ? 'green' : 'red'}>
                      {member.is_active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </Table.Td>
                  <Table.Td textAlign="right">
                    <Menu shadow="md" width={200} position="bottom-end">
                      <Menu.Target>
                        <ActionIcon variant="subtle" color="gray">
                          <IconDotsVertical size={18} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Label>Ações</Menu.Label>
                        <Menu.Item leftSection={<IconEdit size={14} />}>Editar Perfil</Menu.Item>
                        <Menu.Divider />
                        {member.is_active ? (
                          <Menu.Item 
                            color="red" 
                            leftSection={<IconUserOff size={14} />}
                            onClick={() => handleDeactivate(member)}
                          >
                            Desativar conta
                          </Menu.Item>
                        ) : (
                          <Menu.Item 
                            color="green" 
                            leftSection={<IconUserCheck size={14} />}
                            onClick={() => handleReactivate(member)}
                          >
                            Reativar conta
                          </Menu.Item>
                        )}
                      </Menu.Dropdown>
                    </Menu>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </Stack>

      <InviteMemberModal opened={inviteOpened} onClose={closeInvite} onInvite={fetchMembers} />
    </Container>
  );
}
