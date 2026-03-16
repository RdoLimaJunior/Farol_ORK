import {
  Container, Stack, Text, Paper, Group, ThemeIcon,
  Skeleton, rem, Title, Textarea, Select, Button,
  Badge, Avatar, Divider
} from '@mantine/core';
import {
  IconMessageCircle, IconStarFilled, IconStar, IconPlus,
  IconHeartHandshake, IconTrophy, IconBrain
} from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { motion } from 'framer-motion';
import { useMembers } from '../../application/hooks/useMembers';
import { notifications } from '@mantine/notifications';

const CFR_TYPES = [
  { value: 'conversa', label: '💬 Conversa (Check-in 1:1)', icon: IconMessageCircle, color: 'blue' },
  { value: 'feedback', label: '⭐ Feedback Construtivo',    icon: IconStarFilled,    color: 'yellow' },
  { value: 'reconhecimento', label: '🏆 Reconhecimento',   icon: IconTrophy,        color: 'orange' },
];

const MOCK_ENTRIES = [
  { id: '1', type: 'reconhecimento', from: 'Ana Paula', to: 'Carlos Mendes', text: 'Excelente entrega no sprint! A qualidade do KR de produto subiu 12% graças ao seu trabalho.', date: '2025-03-15', stars: 5 },
  { id: '2', type: 'feedback', from: 'CEO', to: 'Time de Vendas', text: 'Precisamos melhorar o ritmo de check-ins. A última semana ficou abaixo da meta.', date: '2025-03-14', stars: 3 },
  { id: '3', type: 'conversa', from: 'Maria Silva', to: 'João Costa', text: '1:1 realizado. Discutimos bloqueios no KR de talentos e próximas ações definidas.', date: '2025-03-13', stars: 0 },
];

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <Group gap={4}>
      {[1, 2, 3, 4, 5].map(n => (
        <ThemeIcon
          key={n}
          variant="subtle"
          color={n <= value ? 'yellow' : 'gray'}
          size="md"
          style={{ cursor: 'pointer' }}
          onClick={() => onChange(n)}
        >
          {n <= value ? <IconStarFilled size={18} /> : <IconStar size={18} />}
        </ThemeIcon>
      ))}
    </Group>
  );
}

export default function Analytics() {
  const { members, fetchMembers } = useMembers();
  const [cfrType, setCfrType] = useState<string | null>('feedback');
  const [recipient, setRecipient] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [stars, setStars] = useState(3);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const memberOptions = members.map(m => ({ value: m.id, label: m.fullName }));

  const handleSubmit = () => {
    if (!text.trim() || !recipient) {
      notifications.show({ message: 'Preencha todos os campos', color: 'red' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      notifications.show({ title: 'CFR Registrado!', message: 'Seu registro foi salvo com sucesso.', color: 'green' });
      setText('');
      setLoading(false);
    }, 800);
  };

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <PageHeader
          title="Análises"
          highlightedText="& Feedbacks"
          description="Registros CFR — Conversas, Feedbacks e Reconhecimentos"
          icon={IconHeartHandshake}
          color="pink"
        />

        {/* Form: Novo CFR */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Paper withBorder p="xl" radius="lg">
            <Stack gap="md">
              <Group gap="xs">
                <ThemeIcon size="sm" color="pink" variant="light" radius="md">
                  <IconBrain size={14} />
                </ThemeIcon>
                <Text size="sm" fw={800} tt="uppercase" c="dimmed" style={{ letterSpacing: rem(0.5) }}>
                  Novo Registro CFR
                </Text>
              </Group>

              <Group grow>
                <Select
                  label="Tipo de Registro"
                  placeholder="Selecione..."
                  data={CFR_TYPES.map(t => ({ value: t.value, label: t.label }))}
                  value={cfrType}
                  onChange={setCfrType}
                  radius="md"
                />
                <Select
                  label="Para quem?"
                  placeholder="Selecione um membro"
                  data={memberOptions}
                  value={recipient}
                  onChange={setRecipient}
                  searchable
                  radius="md"
                />
              </Group>

              <Textarea
                label="Mensagem"
                placeholder="Descreva o contexto, o comportamento observado e o impacto nos resultados..."
                rows={4}
                radius="md"
                value={text}
                onChange={e => setText(e.target.value)}
              />

              {cfrType === 'feedback' || cfrType === 'reconhecimento' ? (
                <Stack gap={4}>
                  <Text size="sm" fw={500}>Avaliação</Text>
                  <StarRating value={stars} onChange={setStars} />
                </Stack>
              ) : null}

              <Group justify="flex-end">
                <Button
                  leftSection={<IconPlus size={16} />}
                  color="pink"
                  radius="md"
                  loading={loading}
                  onClick={handleSubmit}
                >
                  Registrar CFR
                </Button>
              </Group>
            </Stack>
          </Paper>
        </motion.div>

        {/* Feed de CFRs */}
        <Divider label="Histórico de Registros" labelPosition="left" />
        <Stack gap="md">
          {MOCK_ENTRIES.map((entry, i) => {
            const typeCfg = CFR_TYPES.find(t => t.value === entry.type);
            const Icon = typeCfg?.icon ?? IconMessageCircle;
            return (
              <motion.div key={entry.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                <Paper withBorder p="lg" radius="lg">
                  <Group justify="space-between" align="flex-start" wrap="nowrap">
                    <Group gap="md" align="flex-start" style={{ flex: 1 }}>
                      <ThemeIcon size="lg" color={typeCfg?.color ?? 'gray'} variant="light" radius="md">
                        <Icon size={20} />
                      </ThemeIcon>
                      <Stack gap={4} style={{ flex: 1 }}>
                        <Group justify="space-between">
                          <Group gap="xs">
                            <Avatar size="xs" radius="xl" color="farol-blue" variant="light">
                              {entry.from.substring(0, 2).toUpperCase()}
                            </Avatar>
                            <Text size="sm" fw={700}>{entry.from}</Text>
                            <Text size="sm" c="dimmed">→</Text>
                            <Badge color={typeCfg?.color ?? 'gray'} size="xs" variant="light">{entry.to}</Badge>
                          </Group>
                          <Text size="xs" c="dimmed">{new Date(entry.date).toLocaleDateString('pt-BR')}</Text>
                        </Group>
                        <Text size="sm" c="dimmed" style={{ fontStyle: 'italic' }}>"{entry.text}"</Text>
                        {entry.stars > 0 && (
                          <Group gap={2} mt={4}>
                            {[...Array(5)].map((_, n) => (
                              <ThemeIcon key={n} size="xs" variant="subtle" color={n < entry.stars ? 'yellow' : 'gray'}>
                                {n < entry.stars ? <IconStarFilled size={12} /> : <IconStar size={12} />}
                              </ThemeIcon>
                            ))}
                          </Group>
                        )}
                      </Stack>
                    </Group>
                  </Group>
                </Paper>
              </motion.div>
            );
          })}
        </Stack>
      </Stack>
    </Container>
  );
}
