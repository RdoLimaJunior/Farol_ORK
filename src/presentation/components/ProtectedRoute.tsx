import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../application/context/AuthContext';
import { Center, Loader, Stack, Text } from '@mantine/core';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return (
      <Center h="100vh">
        <Stack align="center" gap="md">
          <Loader size="xl" color="cyan" type="dots" />
          <Text size="sm" c="dimmed">Carregando sessão...</Text>
        </Stack>
      </Center>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
