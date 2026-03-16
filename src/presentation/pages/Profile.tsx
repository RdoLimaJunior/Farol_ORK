import { 
  Paper, TextInput, Button, Title, Stack, Group, Avatar, 
  FileButton, Badge, Divider, Container, ThemeIcon, Text, rem 
} from '@mantine/core';
import { useState } from 'react';
import { IconUser, IconBriefcase, IconBuilding, IconDeviceFloppy } from '@tabler/icons-react';
import { useAuthContext } from '../../application/context/AuthContext';
import { supabase } from '../../infrastructure/supabaseClient';
import { notifications } from '@mantine/notifications';
import { motion } from 'framer-motion';

export default function Profile() {
  const { profile } = useAuthContext();
  const [fullName, setFullName] = useState(profile?.fullName || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(profile?.avatarUrl || '');
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (file: File | null) => {
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!profile) return;
    setLoading(true);

    let avatarUrl = profile.avatarUrl;

    // T013: Upload avatar ao Supabase Storage
    if (avatarFile) {
      const ext = avatarFile.name.split('.').pop();
      const path = `${profile.id}/avatar.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, avatarFile, { upsert: true });

      if (uploadError) {
        notifications.show({ title: 'Erro no upload', message: uploadError.message, color: 'red' });
      } else {
        const { data } = supabase.storage.from('avatars').getPublicUrl(path);
        avatarUrl = data.publicUrl;
      }
    }

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName, avatar_url: avatarUrl })
      .eq('id', profile.id);

    setLoading(false);

    if (error) {
      notifications.show({ title: 'Erro', message: error.message, color: 'red' });
    } else {
      notifications.show({ title: 'Perfil atualizado! ✅', message: 'Suas alterações foram salvas.', color: 'green' });
    }
  };

  if (!profile) return null;

  const initials = profile.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        {/* HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Group justify="space-between" align="flex-end">
            <Stack gap={0}>
              <Group gap="xs">
                <ThemeIcon variant="light" color="cyan" size="xl" radius="md">
                  <IconUser size={24} />
                </ThemeIcon>
                <Title order={1} style={{ fontSize: rem(32), fontWeight: 900 }}>
                  Meu <Text span c="cyan.6" inherit>Perfil</Text>
                </Title>
              </Group>
              <Text c="dimmed" size="lg">Gerencie suas informações pessoais e foto de exibição.</Text>
            </Stack>
          </Group>
        </motion.div>

      <Paper withBorder p="xl" radius="md">
        <Group justify="center" mb="xl">
          <Stack align="center" gap="sm">
            <Avatar src={avatarPreview} size={100} radius={100} color="blue">
              {initials}
            </Avatar>
            <FileButton onChange={handleAvatarChange} accept="image/png,image/jpeg,image/webp">
              {(props) => <Button variant="light" size="xs" {...props}>Alterar foto</Button>}
            </FileButton>
          </Stack>
        </Group>

        <Stack gap="md">
          <TextInput
            label="Nome Completo"
            leftSection={<IconUser size={16} />}
            value={fullName}
            onChange={(e) => setFullName(e.currentTarget.value)}
          />

          <TextInput
            label="E-mail"
            value={profile.email}
            disabled
            description="Para alterar o email, entre em contato com o administrador."
          />

          <Group grow>
            <TextInput
              label="Cargo"
              leftSection={<IconBriefcase size={16} />}
              value={profile.jobTitle || ''}
              disabled
              description="Gerenciado pelo Admin"
            />
            <TextInput
              label="Área / Departamento"
              leftSection={<IconBuilding size={16} />}
              value={profile.department || ''}
              disabled
              description="Gerenciado pelo Admin"
            />
          </Group>

          <Divider my="xs" />

          <Group justify="space-between">
            <Group gap="xs">
              <Badge color="yellow" variant="filled">Nível {profile.level}</Badge>
              <Badge color="blue" variant="light">{profile.xpPoints} XP</Badge>
              <Badge color={profile.role === 'admin' ? 'red' : 'gray'} variant="light">
                {profile.role === 'admin' ? 'Administrador' : 'Membro'}
              </Badge>
            </Group>
          </Group>

          <Button 
            leftSection={<IconDeviceFloppy size={18} />} 
            onClick={handleSave} 
            loading={loading} 
            color="cyan" 
            mt="md"
          >
            Salvar Alterações
          </Button>
        </Stack>
      </Paper>
    </Stack>
  </Container>
);
}

