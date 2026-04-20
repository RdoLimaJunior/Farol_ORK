import {
  Box,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Badge,
  rem,
  SimpleGrid,
  RingProgress,
  Divider,
  UnstyledButton,
  ScrollArea,
} from '@mantine/core';
import {
  IconTarget,
  IconTrendingUp,
  IconAlertTriangle,
  IconListCheck,
  IconBriefcase,
  IconArrowRight,
  IconShieldCheck,
  IconExclamationMark,
  IconClipboardCheck,
  IconHeartHandshake,
  IconMedal,
} from '@tabler/icons-react';

interface CeremonyDashboardProps {
  enrichedObjectives: any[];
  actions: any[];
  initiatives: any[];
}

const healthColor = (value: number) =>
  value >= 70 ? 'teal' : value >= 40 ? 'orange' : 'red';

export function CeremonyDashboard({ enrichedObjectives, actions, initiatives }: CeremonyDashboardProps) {
  const allKRs = enrichedObjectives.flatMap(o => o.keyResults || []);
  const total = enrichedObjectives.length;

  // ── Objetivos ─────────────────────────────────────────────────────────────
  const objOnTrack  = enrichedObjectives.filter(o => o.status === 'on_track').length;
  const objAtRisk   = enrichedObjectives.filter(o => o.status === 'at_risk').length;
  const objOffTrack = enrichedObjectives.filter(o => o.status === 'off_track').length;
  const avgObjProgress = total > 0
    ? Math.round(enrichedObjectives.reduce((acc, o) => acc + (o.progress || 0), 0) / total)
    : 0;

  // ── Key Results ────────────────────────────────────────────────────────────
  const krOnTrack  = allKRs.filter(k => k.status === 'on_track').length;
  const krAtRisk   = allKRs.filter(k => k.status === 'at_risk').length;
  const krOffTrack = allKRs.filter(k => k.status === 'off_track').length;
  const krCritical = allKRs.filter(k => k.status === 'at_risk' || k.status === 'off_track');
  const krOnTrackPct = allKRs.length > 0 ? Math.round((krOnTrack / allKRs.length) * 100) : 0;
  const krHighConf = allKRs.filter(k => k.confidence === 'alta').length;
  const krLowConf  = allKRs.filter(k => k.confidence === 'baixa').length;

  // ── Projetos ──────────────────────────────────────────────────────────────
  const initiativesActive    = initiatives.filter(i => i.status !== 'completed').length;
  const initiativesCompleted = initiatives.length - initiativesActive;
  const avgInitProgress = initiatives.length > 0
    ? Math.round(initiatives.reduce((acc, i) => acc + (i.progress || 0), 0) / initiatives.length)
    : 0;

  // ── Ações ─────────────────────────────────────────────────────────────────
  const actionsDone    = actions.filter(a => a.status === 'done').length;
  const actionsDoing   = actions.filter(a => a.status === 'doing').length;
  const actionsBlocked = actions.filter(a => a.status === 'blocked').length;
  const actionsRate    = actions.length > 0 ? Math.round((actionsDone / actions.length) * 100) : 0;

  // ── Governança (Metodologia §5.3) ─────────────────────────────────────────
  const avgAdesao = total > 0
    ? Math.round(enrichedObjectives.reduce((acc, o) => acc + (o.adhesionPercentage || 0), 0) / total)
    : 0;

  const climateGreen  = enrichedObjectives.filter(o => o.climateStatus === 'success').length;
  const climateYellow = enrichedObjectives.filter(o => o.climateStatus === 'warning').length;
  const climateRed    = enrichedObjectives.filter(o => o.climateStatus === 'error').length;
  const climatePct    = total > 0 ? Math.round((climateGreen / total) * 100) : 0;
  const climateLabel  = climatePct >= 70 ? 'Saudável' : climatePct >= 40 ? 'Atenção' : 'Crítico';
  const climateColor  = climatePct >= 70 ? 'teal' : climatePct >= 40 ? 'yellow' : 'red';

  const maturityOuro   = enrichedObjectives.filter(o => o.maturityLevel === 'OURO').length;
  const maturityPrata  = enrichedObjectives.filter(o => o.maturityLevel === 'PRATA').length;
  const maturityBronze = enrichedObjectives.filter(o => o.maturityLevel === 'BRONZE').length;
  const maturityScore  = total > 0
    ? Math.round(((maturityOuro * 3 + maturityPrata * 2 + maturityBronze * 1) / (total * 3)) * 100)
    : 0;

  // ── Helpers ────────────────────────────────────────────────────────────────
  const scrollToKR = (krId: string) => {
    const el = document.getElementById(`kr-${krId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getStatusConfig = (status: string) => {
    if (status === 'off_track') return { color: 'red',    label: 'EM RISCO', icon: IconExclamationMark };
    if (status === 'at_risk')   return { color: 'orange', label: 'ATENÇÃO',  icon: IconAlertTriangle };
    return                              { color: 'gray',  label: status,      icon: IconAlertTriangle };
  };

  const ownerLabel = (ownerId: string) => {
    const map: Record<string, string> = {
      'user-lima': 'Lima Junior', 'user-lidia': 'Lidia', 'user-luciana': 'Luciana',
      'user-carlos': 'Carlos', 'user-ana': 'Ana', 'user-roberto': 'Roberto',
      'user-juliana': 'Juliana', 'user-marcos': 'Marcos',
    };
    return map[ownerId] || ownerId;
  };

  return (
    <Box>
      {/* ── CARDS PRINCIPAIS ─────────────────────────────────────────────── */}
      <SimpleGrid cols={{ base: 2, md: 4 }} spacing="sm" mb="sm">

        {/* OBJETIVOS */}
        <Paper withBorder p="md" radius="md" bg="white">
          <Group justify="space-between" wrap="nowrap" mb={rem(8)}>
            <Text size="xs" fw={700} c="dimmed" tt="uppercase" style={{ letterSpacing: '0.05em' }}>
              Objetivos
            </Text>
            <ThemeIcon variant="light" color="blue" size="sm" radius="sm">
              <IconTarget size={14} />
            </ThemeIcon>
          </Group>
          <Group align="center" gap="sm" mb={rem(6)}>
            <Stack gap={0} style={{ flex: 1 }}>
              <Text fw={900} size={rem(30)} c="blue.8" lh={1}>{total}</Text>
              <Text size="xs" c="dimmed" mt={2}>total de objetivos</Text>
            </Stack>
            <RingProgress
              size={62}
              thickness={6}
              roundCaps
              sections={[{ value: avgObjProgress, color: healthColor(avgObjProgress) }]}
              label={<Text fw={800} ta="center" size="10px" c="dark.6">{avgObjProgress}%</Text>}
            />
          </Group>
          <Group gap={4}>
            <Badge size="xs" color="teal"   variant="light">{objOnTrack} on track</Badge>
            <Badge size="xs" color="orange" variant="light">{objAtRisk} atenção</Badge>
            {objOffTrack > 0 && <Badge size="xs" color="red" variant="light">{objOffTrack} risco</Badge>}
          </Group>
        </Paper>

        {/* KEY RESULTS */}
        <Paper withBorder p="md" radius="md" bg="white">
          <Group justify="space-between" wrap="nowrap" mb={rem(8)}>
            <Text size="xs" fw={700} c="dimmed" tt="uppercase" style={{ letterSpacing: '0.05em' }}>
              Key Results
            </Text>
            <ThemeIcon variant="light" color="teal" size="sm" radius="sm">
              <IconTrendingUp size={14} />
            </ThemeIcon>
          </Group>
          <Group align="center" gap="sm" mb={rem(6)}>
            <Stack gap={0} style={{ flex: 1 }}>
              <Text fw={900} size={rem(30)} c="teal.8" lh={1}>{allKRs.length}</Text>
              <Text size="xs" c="dimmed" mt={2}>total de KRs</Text>
            </Stack>
            <RingProgress
              size={62}
              thickness={6}
              roundCaps
              sections={[{ value: krOnTrackPct, color: healthColor(krOnTrackPct) }]}
              label={<Text fw={800} ta="center" size="10px" c="dark.6">{krOnTrackPct}%</Text>}
            />
          </Group>
          <Group gap={4}>
            <Badge size="xs" color="teal"   variant="light">{krOnTrack} ok</Badge>
            <Badge size="xs" color="orange" variant="light">{krAtRisk} atenção</Badge>
            <Badge size="xs" color="red"    variant="light">{krOffTrack} risco</Badge>
          </Group>
          {(krHighConf > 0 || krLowConf > 0) && (
            <Group gap={4} mt={4}>
              <Badge size="xs" color="violet" variant="dot">{krHighConf} conf. alta</Badge>
              {krLowConf > 0 && <Badge size="xs" color="red" variant="dot">{krLowConf} conf. baixa</Badge>}
            </Group>
          )}
        </Paper>

        {/* PROJETOS */}
        <Paper withBorder p="md" radius="md" bg="white">
          <Group justify="space-between" wrap="nowrap" mb={rem(8)}>
            <Text size="xs" fw={700} c="dimmed" tt="uppercase" style={{ letterSpacing: '0.05em' }}>
              Projetos
            </Text>
            <ThemeIcon variant="light" color="indigo" size="sm" radius="sm">
              <IconBriefcase size={14} />
            </ThemeIcon>
          </Group>
          <Group align="center" gap="sm" mb={rem(6)}>
            <Stack gap={0} style={{ flex: 1 }}>
              <Text fw={900} size={rem(30)} c="indigo.8" lh={1}>{initiatives.length}</Text>
              <Text size="xs" c="dimmed" mt={2}>total de projetos</Text>
            </Stack>
            <RingProgress
              size={62}
              thickness={6}
              roundCaps
              sections={[{ value: avgInitProgress, color: healthColor(avgInitProgress) }]}
              label={<Text fw={800} ta="center" size="10px" c="dark.6">{avgInitProgress}%</Text>}
            />
          </Group>
          <Group gap={4}>
            <Badge size="xs" color="indigo" variant="light">{initiativesActive} em andamento</Badge>
            {initiativesCompleted > 0 && (
              <Badge size="xs" color="gray" variant="light">{initiativesCompleted} concluídos</Badge>
            )}
          </Group>
        </Paper>

        {/* AÇÕES */}
        <Paper withBorder p="md" radius="md" bg="white">
          <Group justify="space-between" wrap="nowrap" mb={rem(8)}>
            <Text size="xs" fw={700} c="dimmed" tt="uppercase" style={{ letterSpacing: '0.05em' }}>
              Ações
            </Text>
            <ThemeIcon variant="light" color="orange" size="sm" radius="sm">
              <IconListCheck size={14} />
            </ThemeIcon>
          </Group>
          <Group align="center" gap="sm" mb={rem(6)}>
            <Stack gap={0} style={{ flex: 1 }}>
              <Text fw={900} size={rem(30)} c="orange.8" lh={1}>{actions.length}</Text>
              <Text size="xs" c="dimmed" mt={2}>total de ações</Text>
            </Stack>
            <RingProgress
              size={62}
              thickness={6}
              roundCaps
              sections={[{ value: actionsRate, color: healthColor(actionsRate) }]}
              label={<Text fw={800} ta="center" size="10px" c="dark.6">{actionsRate}%</Text>}
            />
          </Group>
          <Group gap={4}>
            <Badge size="xs" color="teal"   variant="light">{actionsDone} feitas</Badge>
            {actionsDoing > 0 && <Badge size="xs" color="blue" variant="light">{actionsDoing} fazendo</Badge>}
            {actionsBlocked > 0 && <Badge size="xs" color="red" variant="light">{actionsBlocked} bloq.</Badge>}
          </Group>
        </Paper>
      </SimpleGrid>

      {/* ── GOVERNANÇA §5.3 ──────────────────────────────────────────────── */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm" mb="md">

        {/* ADESÃO (IA) */}
        <Paper withBorder p="sm" radius="md" bg="violet.0" style={{ borderColor: 'var(--mantine-color-violet-2)' }}>
          <Group justify="space-between" wrap="nowrap" mb={rem(6)}>
            <Stack gap={0}>
              <Text size="xs" fw={700} c="violet.7" tt="uppercase" style={{ letterSpacing: '0.05em' }}>
                Índice de Adesão
              </Text>
              <Text size="xs" c="dimmed">disciplina nos ritos</Text>
            </Stack>
            <ThemeIcon variant="light" color="violet" size="sm" radius="sm">
              <IconClipboardCheck size={14} />
            </ThemeIcon>
          </Group>
          <Group align="center" gap="sm">
            <RingProgress
              size={56}
              thickness={5}
              roundCaps
              sections={[{ value: avgAdesao, color: healthColor(avgAdesao) }]}
              label={<Text fw={800} ta="center" size="10px" c="dark.6">{avgAdesao}%</Text>}
            />
            <Stack gap={2}>
              <Text fw={900} size={rem(22)} c="violet.8" lh={1}>{avgAdesao}%</Text>
              <Badge
                size="xs"
                color={healthColor(avgAdesao)}
                variant="filled"
                radius="sm"
              >
                {avgAdesao >= 80 ? 'Excelente' : avgAdesao >= 60 ? 'Regular' : 'Crítico'}
              </Badge>
            </Stack>
          </Group>
        </Paper>

        {/* CLIMA (IC) */}
        <Paper withBorder p="sm" radius="md" bg={`${climateColor}.0`} style={{ borderColor: `var(--mantine-color-${climateColor}-2)` }}>
          <Group justify="space-between" wrap="nowrap" mb={rem(6)}>
            <Stack gap={0}>
              <Text size="xs" fw={700} c={`${climateColor}.7`} tt="uppercase" style={{ letterSpacing: '0.05em' }}>
                Índice de Clima
              </Text>
              <Text size="xs" c="dimmed">percepção do time</Text>
            </Stack>
            <ThemeIcon variant="light" color={climateColor} size="sm" radius="sm">
              <IconHeartHandshake size={14} />
            </ThemeIcon>
          </Group>
          <Group align="center" gap="sm">
            <RingProgress
              size={56}
              thickness={5}
              roundCaps
              sections={[
                { value: total > 0 ? (climateGreen  / total) * 100 : 0, color: 'teal'   },
                { value: total > 0 ? (climateYellow / total) * 100 : 0, color: 'yellow' },
                { value: total > 0 ? (climateRed    / total) * 100 : 0, color: 'red'    },
              ]}
              label={<Text fw={800} ta="center" size="10px" c="dark.6">{climatePct}%</Text>}
            />
            <Stack gap={2}>
              <Text fw={900} size={rem(22)} c={`${climateColor}.8`} lh={1}>{climateLabel}</Text>
              <Group gap={4}>
                <Badge size="xs" color="teal"   variant="light">{climateGreen} verde</Badge>
                {climateYellow > 0 && <Badge size="xs" color="yellow" variant="light">{climateYellow} alerta</Badge>}
                {climateRed    > 0 && <Badge size="xs" color="red"    variant="light">{climateRed} crítico</Badge>}
              </Group>
            </Stack>
          </Group>
        </Paper>

        {/* MATURIDADE (AM) */}
        <Paper withBorder p="sm" radius="md" bg="yellow.0" style={{ borderColor: 'var(--mantine-color-yellow-2)' }}>
          <Group justify="space-between" wrap="nowrap" mb={rem(6)}>
            <Stack gap={0}>
              <Text size="xs" fw={700} c="yellow.8" tt="uppercase" style={{ letterSpacing: '0.05em' }}>
                Maturidade OKR
              </Text>
              <Text size="xs" c="dimmed">algoritmo de certificação</Text>
            </Stack>
            <ThemeIcon variant="light" color="yellow" size="sm" radius="sm">
              <IconMedal size={14} />
            </ThemeIcon>
          </Group>
          <Group align="center" gap="sm">
            <RingProgress
              size={56}
              thickness={5}
              roundCaps
              sections={[
                { value: total > 0 ? (maturityOuro   / total) * 100 : 0, color: 'yellow' },
                { value: total > 0 ? (maturityPrata  / total) * 100 : 0, color: 'gray'   },
                { value: total > 0 ? (maturityBronze / total) * 100 : 0, color: 'orange' },
              ]}
              label={<Text fw={800} ta="center" size="10px" c="dark.6">{maturityScore}%</Text>}
            />
            <Stack gap={2}>
              <Text fw={900} size={rem(22)} c="yellow.8" lh={1}>{maturityScore}%</Text>
              <Group gap={4}>
                {maturityOuro   > 0 && <Badge size="xs" color="yellow" variant="filled">{maturityOuro} Ouro</Badge>}
                {maturityPrata  > 0 && <Badge size="xs" color="gray"   variant="filled">{maturityPrata} Prata</Badge>}
                {maturityBronze > 0 && <Badge size="xs" color="orange" variant="light" >{maturityBronze} Bronze</Badge>}
              </Group>
            </Stack>
          </Group>
        </Paper>
      </SimpleGrid>

      {/* ── KRs EM RISCO ─────────────────────────────────────────────────── */}
      <Divider
        mb="xs"
        label={
          <Group gap={6}>
            <IconAlertTriangle size={12} color="var(--mantine-color-orange-6)" />
            <Text size="xs" fw={700} c="orange.7" tt="uppercase">
              KRs que precisam de atenção ({krCritical.length})
            </Text>
          </Group>
        }
      />

      {krCritical.length === 0 ? (
        <Group gap="xs" py="xs">
          <IconShieldCheck size={15} color="var(--mantine-color-teal-6)" />
          <Text size="sm" fw={600} c="teal.8">Todos os Key Results estão On Track.</Text>
        </Group>
      ) : (
        <ScrollArea.Autosize mah={rem(160)}>
          <Stack gap={rem(4)}>
            {krCritical.map(kr => {
              const cfg = getStatusConfig(kr.status);
              const parentObj = enrichedObjectives.find(o => (o.keyResults || []).some((k: any) => k.id === kr.id));
              return (
                <UnstyledButton
                  key={kr.id}
                  onClick={() => scrollToKR(kr.id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    borderRadius: rem(6),
                    border: `1px solid var(--mantine-color-${cfg.color}-2)`,
                    backgroundColor: `var(--mantine-color-${cfg.color}-0)`,
                    padding: `${rem(7)} ${rem(12)}`,
                    transition: 'all 0.15s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = `var(--mantine-color-${cfg.color}-1)`;
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(3px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = `var(--mantine-color-${cfg.color}-0)`;
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                  }}
                >
                  <Group justify="space-between" wrap="nowrap">
                    <Group gap="xs" wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
                      <ThemeIcon variant="light" color={cfg.color} size="xs" radius="sm" style={{ flexShrink: 0 }}>
                        <cfg.icon size={10} />
                      </ThemeIcon>
                      <Stack gap={0} style={{ flex: 1, minWidth: 0 }}>
                        <Text size="xs" fw={700} c="dark.7" lineClamp={1}>{kr.title}</Text>
                        {parentObj && (
                          <Text size="xs" c="dimmed" fw={500} lineClamp={1} style={{ fontSize: rem(10) }}>
                            {parentObj.title} · {ownerLabel(kr.ownerId)}
                          </Text>
                        )}
                      </Stack>
                    </Group>
                    <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
                      <Badge size="xs" color={cfg.color} variant="filled" radius="sm">{cfg.label}</Badge>
                      <Text size="xs" fw={800} c={`${cfg.color}.7`}>{kr.progress}%</Text>
                      <IconArrowRight size={12} color={`var(--mantine-color-${cfg.color}-5)`} />
                    </Group>
                  </Group>
                </UnstyledButton>
              );
            })}
          </Stack>
        </ScrollArea.Autosize>
      )}
    </Box>
  );
}
