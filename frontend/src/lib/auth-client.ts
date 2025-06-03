import { createAuthClient } from 'better-auth/react';
const { useSession } = createAuthClient();

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3000/auth', // The base URL of my auth server
});

export function User() {
  const { data: session, isPending, error, refetch } = useSession();
  return {
    session,
    isPending,
    error,
    refetch,
  };
}
