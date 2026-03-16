import {
  Container,
  Stack,
  Text,
  Paper,
  Group,
  Button,
  Table,
  Select,
  Avatar,
  ThemeIcon,
  rem,
} from '@mantine/core';
import { IconKey, IconArrowLeft, IconShieldCheck } from '@tabler/icons-react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../infrastructure/supabaseClient';
import { useAuthContext } from '../../application/context/AuthContext';
import { PageHeader } from '../components/common/PageHeader';
import { notifications } from '@mantine/notifications';
import type { MemberProfile } from '../../domain/models/governance';

export default function PermissionsManagement() {
  const navigate = useNavigate();
  const { profile } = useAuthContext();
  const [members, setMembers] = useState<MemberProfile[]>([]);

  const fetchMembers = useCallback(async () => {
    if (!profile) return;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('tenant_id', profile.tenantId)
      .order('full_name', { ascending: true });

    if (!error && data) setMembers(data);
  }, [profile]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId);

    if (error) {
      notifications.show({ title: 'Erro ao atualizar papel', message: error.message, color: 'red' });
    } else {
      notifications.show({ title: 'Permissão atualizada', message: 'O cargo do usuário foi alterado.', color: 'green' });
      fetchMembers();
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
          title="Níveis e"
          highlightedText="Permissões"
          description="Defina quem pode administrar e quem pode apenas visualizar ou editar metas."
          icon={IconKey}
          color="grape"
        />

        <Paper withBorder radius="md">
          <Table verticalSpacing="md" horizontalSpacing="lg">
            <Table.Thead bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))">
              <Table.Tr>
                <Table.Th>Membro</Table.Th>
                <Table.Th>Nível de Acesso</Table.Th>
                <Table.Th>Descrição do Papel</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {members.map((member) => (
                <Table.Tr key={member.id}>
                  <Table.Td>
                    <Group gap="sm">
                      <Avatar color="grape" radius="xl">{member.full_name?.charAt(0)}</Avatar>
                      <Stack gap={0}>
                        <Text size="sm" fw={700}>{member.full_name}</Text>
                        <Text size="xs" c="dimmed">{member.email}</Text>
                      </Stack>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Select
                      data={[
                        { value: 'admin', label: 'Administrador' },
                        { value: 'member', label: 'Colaborador (Padrão)' },
                      ]}
                      value={member.role}
                      onChange={(val) => val && handleRoleChange(member.id, val)}
                      radius="md"
                      size="xs"
                      style={{ width: rem(180) }}
                    />
                  </Table.Td>
                  <Table.Td>
                     <Text size="xs" c="dimmed">
                        {member.role === 'admin' 
                          ? 'Acesso total a configurações e gestão de usuários.' 
                          : 'Pode gerenciar OKRs e realizar check-ins.'}
                     </Text>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>

        <Paper withBorder p="xl" radius="lg" style={{ borderStyle: 'dashed' }}>
           <Group gap="md">
              <ThemeIcon size="lg" radius="md" variant="light" color="grape">
                 <IconShieldCheck size={20} />
              </ThemeIcon>
              <Stack gap={0}>
                 <Text fw={700}>Dica de Governança</Text>
                 <Text size="sm" c="dimmed">
                    Recomendamos ter pelo menos 2 administradores por organização para evitar bloqueios de acesso.
                 </Text>
              </Stack>
           </Group>
        </Paper>
      </Stack>
    </Container>
  );
}
