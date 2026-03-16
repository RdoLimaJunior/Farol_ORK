import { rem } from '@mantine/core';
import { Spotlight } from '@mantine/spotlight';
import type { SpotlightActionData } from '@mantine/spotlight';
import { 
  IconSearch, 
  IconDashboard, 
  IconTargetArrow, 
  IconTournament,
  IconUserCircle,
  IconPlus,
  IconChartBar,
  IconSettings
} from '@tabler/icons-react';

const navigate = (path: string) => { window.location.href = path; };

const actions: SpotlightActionData[] = [
  // ── CRIAR ─────────────────────────────────────────────────────────────────
  {
    id: 'new-objective-strategic',
    group: 'Criar',
    label: 'Novo OKR Estratégico',
    description: 'Criar um objetivo organizacional',
    onClick: () => navigate('/strategy?criar=true'),
    leftSection: <IconPlus style={{ width: rem(24), height: rem(24) }} color="var(--mantine-color-farol-blue-6)" stroke={1.5} />,
  },
  {
    id: 'new-objective-tactical',
    group: 'Criar',
    label: 'Novo OKR Tático',
    description: 'Criar um objetivo departamental',
    onClick: () => navigate('/tactical?criar=true'),
    leftSection: <IconPlus style={{ width: rem(24), height: rem(24) }} color="var(--mantine-color-teal-6)" stroke={1.5} />,
  },
  {
    id: 'new-objective-individual',
    group: 'Criar',
    label: 'Novo OKR Individual',
    description: 'Criar uma meta pessoal ou de time',
    onClick: () => navigate('/individual?criar=true'),
    leftSection: <IconPlus style={{ width: rem(24), height: rem(24) }} color="var(--mantine-color-violet-6)" stroke={1.5} />,
  },

  // ── NAVEGAR ────────────────────────────────────────────────────────────────
  {
    id: 'dashboard',
    group: 'Navegar',
    label: 'Visão Geral (BI)',
    description: 'Cockpit de KPIs e painel de performance',
    onClick: () => navigate('/overview'),
    leftSection: <IconDashboard style={{ width: rem(24), height: rem(24) }} color="var(--mantine-color-farol-blue-6)" stroke={1.5} />,
  },
  {
    id: 'strategy',
    group: 'Navegar',
    label: 'Objetivos Estratégicos',
    description: 'Visualizar OKRs organizacionais da companhia',
    onClick: () => navigate('/strategy'),
    leftSection: <IconTargetArrow style={{ width: rem(24), height: rem(24) }} color="var(--mantine-color-success-6)" stroke={1.5} />,
  },
  {
    id: 'tactical',
    group: 'Navegar',
    label: 'Objetivos Táticos',
    description: 'Visualizar OKRs departamentais',
    onClick: () => navigate('/tactical'),
    leftSection: <IconTournament style={{ width: rem(24), height: rem(24) }} color="var(--mantine-color-teal-6)" stroke={1.5} />,
  },
  {
    id: 'individual',
    group: 'Navegar',
    label: 'Meus OKRs',
    description: 'Visualizar minhas metas individuais',
    onClick: () => navigate('/individual'),
    leftSection: <IconUserCircle style={{ width: rem(24), height: rem(24) }} color="var(--mantine-color-violet-6)" stroke={1.5} />,
  },
  {
    id: 'execution',
    group: 'Navegar',
    label: 'Execução',
    description: 'Acompanhar check-ins e progresso',
    onClick: () => navigate('/execution'),
    leftSection: <IconChartBar style={{ width: rem(24), height: rem(24) }} color="var(--mantine-color-orange-6)" stroke={1.5} />,
  },
  {
    id: 'settings',
    group: 'Navegar',
    label: 'Configurações',
    description: 'Gerenciar conta e preferências',
    onClick: () => navigate('/settings'),
    leftSection: <IconSettings style={{ width: rem(24), height: rem(24) }} color="var(--mantine-color-gray-6)" stroke={1.5} />,
  },
];


export function GlobalSearch() {
  return (
    <Spotlight
      actions={actions}
      nothingFound="Nenhum resultado encontrado..."
      highlightQuery
      searchProps={{
        leftSection: <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />,
        placeholder: 'Criar OKR, navegar para...',
      }}
    />
  );
}
