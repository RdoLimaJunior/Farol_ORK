import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './presentation/pages/Home';
import Overview from './presentation/pages/Overview';
import OkrLevelPage from './presentation/pages/OkrLevelPage';
import Execution from './presentation/pages/Execution';
import Login from './presentation/pages/Login';
import Register from './presentation/pages/Register';
import DesignSystem from './presentation/pages/DesignSystem';
import Engagement from './presentation/pages/Engagement';
import { AppLayout } from './presentation/layouts/AppLayout';
import OkrDetails from './presentation/pages/OkrDetails';
import { AuthProvider } from './application/context/AuthContext';
import { ProtectedRoute } from './presentation/components/ProtectedRoute';
import ForgotPassword from './presentation/pages/ForgotPassword';
import ResetPassword from './presentation/pages/ResetPassword';
import Profile from './presentation/pages/Profile';
import MembersManagement from './presentation/pages/MembersManagement';
import SetPassword from './presentation/pages/SetPassword';
import Settings from './presentation/pages/Settings';
import Reports from './presentation/pages/Reports';
import Checkins from './presentation/pages/Checkins';
import Analytics from './presentation/pages/Analytics';
import ActionPlans from './presentation/pages/ActionPlans';
import CyclesManagement from './presentation/pages/CyclesManagement';
import PermissionsManagement from './presentation/pages/PermissionsManagement';
import { IconTrophy, IconTournament, IconUserCircle } from '@tabler/icons-react';
import { CopilotProvider } from './application/context/CopilotContext';
import CeremonyHub from './presentation/pages/CeremonyHub';
import CheckinFlow from './presentation/pages/CheckinFlow';

function App() {
  return (
    <AuthProvider>
      <CopilotProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/set-password" element={<SetPassword />} />
          
          <Route element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route path="/" element={<Home />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/objective/:id" element={<OkrDetails />} />
            <Route path="/strategy" element={
              <OkrLevelPage 
                level="organizational" 
                title="Objetivos Estratégicos" 
                icon={IconTrophy} 
                color="farol-blue" 
                description="Visão de longo prazo e moonshots da companhia." 
              />
            } />
            <Route path="/tactical" element={
              <OkrLevelPage 
                level="departmental" 
                title="Key Results" 
                icon={IconTournament} 
                color="farol-blue" 
                description="Gestão de resultados-chave e métricas táticas da companhia." 
              />
            } />

            <Route path="/individual" element={
              <OkrLevelPage 
                level="individual" 
                title="Meus OKRs" 
                icon={IconUserCircle} 
                color="farol-blue" 
                description="Contribuições individuais e metas táticas." 
              />
            } />
            <Route path="/execution" element={<ActionPlans />} />
            <Route path="/execution-overview" element={<Execution />} />
            <Route path="/checkins" element={<Checkins />} />
            <Route path="/feedbacks" element={<Analytics />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/engagement" element={<Engagement />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/members" element={<MembersManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/cycles" element={<CyclesManagement />} />
            <Route path="/settings/permissions" element={<PermissionsManagement />} />
            <Route path="/settings/structure" element={<Execution />} />
            <Route path="/design-system" element={<DesignSystem />} />
            <Route path="/ceremony" element={<CeremonyHub />} />
            <Route path="/ceremony/checkin" element={<CheckinFlow />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </CopilotProvider>
    </AuthProvider>
  );
}

export default App;
