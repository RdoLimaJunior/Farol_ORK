import { createTheme, type MantineColorsTuple } from '@mantine/core';

const farolBlue: MantineColorsTuple = [
  '#E1F5FE',
  '#B3E5FC',
  '#81D4FA',
  '#4FC3F7',
  '#29B6F6',
  '#03A9F4',
  '#039BE5',
  '#0288D1',
  '#0277BD',
  '#01579B',
];

const successGreen: MantineColorsTuple = [
  '#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50', '#43A047', '#388E3C', '#2E7D32', '#1B5E20'
];

const warningOrange: MantineColorsTuple = [
  '#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FB8C00', '#F57C00', '#EF6C00', '#E65100'
];

const errorRed: MantineColorsTuple = [
  '#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C'
];

export const theme = createTheme({
  primaryColor: 'farol-blue',
  colors: {
    'farol-blue': farolBlue,
    'success': successGreen,
    'warning': warningOrange,
    'error': errorRed,
  },
  fontFamily: 'Inter, sans-serif',
  headings: {
    fontFamily: 'Ubuntu, sans-serif',
    fontWeight: '700',
  },
  shadows: {
    md: '0 4px 12px rgba(0, 0, 0, 0.05)',
    xl: '0 8px 24px rgba(0, 0, 0, 0.1)',
  },
  components: {
    AppShell: {
      styles: {
        main: {
          backgroundColor: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))',
        },
      },
    },
    Paper: {
      defaultProps: {
        radius: 'lg',
        withBorder: true,
      },
      styles: {
        root: {
          backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-7))',
          borderColor: 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))',
        },
      },
    },
    Card: {
      defaultProps: {
        radius: 'lg',
        withBorder: true,
        shadow: 'md',
      },
      styles: {
        root: {
          backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-7))',
          borderColor: 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))',
        },
      },
    },
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Badge: {
      defaultProps: {
        radius: 'sm',
        variant: 'light',
      },
    },
  },

  other: {
    gradients: {
      blueMain: 'linear-gradient(135deg, #1DA5DE 0%, #01579B 100%)',
      blueDeep: 'linear-gradient(135deg, #1B88A7 0%, #00394D 100%)',
      techGreen: 'linear-gradient(135deg, #1BDBAD 0%, #3192D0 100%)',
      techPurple: 'linear-gradient(135deg, #7E57C2 0%, #3192D0 100%)',
      formationWarm: 'linear-gradient(135deg, #ECC625 0%, #D66D31 100%)',
      formationDeep: 'linear-gradient(135deg, #6C2A0D 0%, #D66D31 100%)',
      managementNeutral: 'linear-gradient(135deg, #C4B388 0%, #A47E56 100%)',
      engineeringGray: 'linear-gradient(135deg, #E3E3E2 0%, #585857 100%)',
    }
  }
});


