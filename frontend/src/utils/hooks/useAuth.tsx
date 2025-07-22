import { authClient } from '@/api/auth/auth-client';
import { useCallback } from 'react';

const useAuth = () => {
  const {
    data: session,
    isPending,
    error: sessionError,
    refetch: refetchSession,
  } = authClient.useSession();

  const getSession = useCallback(async () => {
    try {
      const { data, error } = await authClient.getSession();
      if (error) {
        console.error('Error fetching session imperatively : ', error);
      }
      return { data, error };
    } catch (e) {
      console.error('Exception fetching session imperatively : ', e);
      return { data: null, error: e as Error };
    }
  }, []);

  // Sign out function
  const signOut = useCallback(async () => {
    try {
      await authClient.signOut();
      console.log('User signed out successfully');
      // don't forget to add router.push('/login') in client components if needed;
    } catch (e) {
      console.error('Sign out error : ', e);
    }
  }, []);

  return {
    // Reactive session data from useSession hook
    session,
    user: session?.user,
    isAuthenticated: !!session?.user,
    isPending,
    sessionError,
    refetchSession,

    // Imperative methods
    getSession, // Function to imperatively fetch the current session
    signOut,
  };
};

export default useAuth;
