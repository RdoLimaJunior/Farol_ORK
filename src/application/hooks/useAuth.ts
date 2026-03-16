import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../infrastructure/supabaseClient';
import type { User, Session } from '@supabase/supabase-js';
import { notifications } from '@mantine/notifications';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  profile: UserProfile | null;
}

export interface UserProfile {
  id: string;
  tenantId: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  role: 'admin' | 'member';
  jobTitle?: string;
  department?: string;
  managerId?: string;
  isActive: boolean;
  emailVerified: boolean;
  xpPoints: number;
  level: number;
}

const MOCK_USER: User = {
  id: 'dev-user-id',
  email: 'dev@farol.local',
  app_metadata: {},
  user_metadata: { full_name: 'Admin Local' },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
};

const MOCK_PROFILE: UserProfile = {
  id: 'dev-user-id',
  tenantId: 'dev-tenant-id',
  fullName: 'Admin Local',
  email: 'dev@farol.local',
  role: 'admin',
  jobTitle: 'Desenvolvedor Senior',
  department: 'Engenharia',
  isActive: true,
  emailVerified: true,
  xpPoints: 1500,
  level: 12,
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    profile: null,
  });

  // Buscar perfil do usuário na tabela profiles
  const fetchProfile = useCallback(async (userId: string): Promise<UserProfile | null> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      tenantId: data.tenant_id,
      fullName: data.full_name,
      email: data.email,
      avatarUrl: data.avatar_url,
      role: data.role,
      jobTitle: data.job_title,
      department: data.department,
      managerId: data.manager_id,
      isActive: data.is_active ?? true,
      emailVerified: data.email_verified ?? false,
      xpPoints: data.xp_points,
      level: data.level,
    };
  }, []);

  // Listener para mudanças de autenticação
  useEffect(() => {
    const isMock = import.meta.env.VITE_USE_MOCK_AUTH === 'true';
    const mockSession = localStorage.getItem('farol_mock_session');
    
    if (isMock && mockSession) {
      setAuthState({ 
        user: MOCK_USER, 
        session: { access_token: 'mock', user: MOCK_USER } as Session, 
        loading: false, 
        profile: MOCK_PROFILE 
      });
      return;
    } else if (isMock) {
      setAuthState({ user: null, session: null, loading: false, profile: null });
      return;
    }

    // Buscar sessão atual
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        setAuthState({ user: session.user, session, loading: false, profile });
      } else {
        setAuthState({ user: null, session: null, loading: false, profile: null });
      }
    });

    // Escutar mudanças
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const profile = await fetchProfile(session.user.id);
          setAuthState({ user: session.user, session, loading: false, profile });
        } else {
          setAuthState({ user: null, session: null, loading: false, profile: null });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  // Login com email/senha
  const signIn = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, loading: true }));
    
    const isMock = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

    if (isMock) {
      setTimeout(() => {
        if (email === 'admin' && password === 'admin') {
          localStorage.setItem('farol_mock_session', 'true');
          setAuthState({ 
            user: MOCK_USER, 
            session: { access_token: 'mock', user: MOCK_USER } as Session, 
            loading: false, 
            profile: MOCK_PROFILE 
          });
          notifications.show({
            title: 'Login Mockado 🛠',
            message: 'Bem-vindo ao modo de desenvolvimento.',
            color: 'cyan',
          });
        } else {
          setAuthState((prev) => ({ ...prev, loading: false }));
          notifications.show({
            title: 'Erro de Login',
            message: 'No modo Mock, use admin / admin.',
            color: 'red',
          });
        }
      }, 800);
      return { error: email === 'admin' && password === 'admin' ? null : { message: 'Invalid credentials' } };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAuthState((prev) => ({ ...prev, loading: false }));
        notifications.show({
          title: 'Erro no login',
          message: error.message === 'Invalid login credentials' 
            ? 'Email ou senha incorretos. Verifique suas credenciais.' 
            : error.message,
          color: 'red',
        });
        return { error };
      }

      const profile = data.user ? await fetchProfile(data.user.id) : null;
      
      // T004: Verificar se usuário está ativo
      if (profile && profile.isActive === false) {
        await supabase.auth.signOut();
        setAuthState({ user: null, session: null, loading: false, profile: null });
        notifications.show({
          title: 'Conta desativada',
          message: 'Sua conta foi desativada pelo administrador.',
          color: 'red',
        });
        return { error: { message: 'Account deactivated' } };
      }

      setAuthState({ user: data.user, session: data.session, loading: false, profile });
      
      notifications.show({
        title: 'Bem-vindo! 🚀',
        message: `Olá, ${profile?.fullName || data.user?.email}!`,
        color: 'cyan',
      });

      return { error: null };
    } catch (err) {
      console.error('signIn unexpected error:', err);
      setAuthState((prev) => ({ ...prev, loading: false }));
      notifications.show({
        title: 'Erro inesperado',
        message: 'Erro ao processar login. Tente novamente.',
        color: 'red',
      });
      return { error: { message: 'Unexpected error' } };
    }
  };

  // Cadastro com email/senha
  const signUp = async (email: string, password: string, fullName: string) => {
    setAuthState((prev) => ({ ...prev, loading: true }));

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      setAuthState((prev) => ({ ...prev, loading: false }));
      notifications.show({
        title: 'Erro no cadastro',
        message: error.message,
        color: 'red',
      });
      return { error };
    }

    setAuthState((prev) => ({ ...prev, loading: false }));
    notifications.show({
      title: 'Conta criada! ✅',
      message: 'Verifique seu email para confirmar o cadastro.',
      color: 'green',
    });

    return { error: null, user: data.user };
  };

  // Logout
  const signOut = async () => {
    if (import.meta.env.VITE_USE_MOCK_AUTH !== 'true') {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem('farol_mock_session');
    }
    setAuthState({ user: null, session: null, loading: false, profile: null });
    notifications.show({
      title: 'Sessão encerrada',
      message: 'Até a próxima! 👋',
      color: 'blue',
    });
  };

  // Login com Google (OAuth)
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (error) {
      notifications.show({
        title: 'Erro',
        message: error.message,
        color: 'red',
      });
    }
  };

  return {
    user: authState.user,
    session: authState.session,
    profile: authState.profile,
    loading: authState.loading,
    isAuthenticated: !!authState.session,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };
}
