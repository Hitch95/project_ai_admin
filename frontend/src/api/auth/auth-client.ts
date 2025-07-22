import { createAuthClient } from 'better-auth/react';

const backendUrl = import.meta.env.VITE_BACKEND_API_URL;

export const authClient = createAuthClient({
  baseURL: `${backendUrl}/api/auth`, // The base URL of my auth server
});
