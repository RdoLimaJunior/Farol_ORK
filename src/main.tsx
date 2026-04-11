import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/charts/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/carousel/styles.css'
import '@mantine/nprogress/styles.css'
import '@mantine/spotlight/styles.css'
import { theme } from './presentation/theme'
import { ModalsProvider } from '@mantine/modals'
import { NavigationProgress } from '@mantine/nprogress'
import { GlobalSearch } from './presentation/components/GlobalSearch'

console.log('Main.tsx disparado!');

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <BrowserRouter>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <ModalsProvider>
          <Notifications />
          <NavigationProgress />
          <GlobalSearch />
          <App />
        </ModalsProvider>
      </MantineProvider>
    </BrowserRouter>
  );
} else {
  console.error('Elemento #root não encontrado!');
}
