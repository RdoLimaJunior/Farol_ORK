import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './presentation/pages/Home';
import Overview from './presentation/pages/Overview';
import OkrLevelPage from './presentation/pages/OkrLevelPage';
import Execution from './presentation/pages/Execution';
import Login from './presentation/pages/Login';
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
import { IconTrophy, IconTournament, IconUserCircle } from '@tabler/icons-react';
import { CopilotProvider } from './application/context/CopilotContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CopilotProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
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
                  title="Objetivos Táticos" 
                  icon={IconTournament} 
                  color="farol-blue" 
                  description="Desdobramento por áreas e departamentos." 
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
              <Route path="/execution" element={<Execution />} />
              <Route path="/engagement" element={<Engagement />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/members" element={<MembersManagement />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/design-system" element={<DesignSystem />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </CopilotProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
