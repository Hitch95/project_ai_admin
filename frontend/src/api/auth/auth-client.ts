import { createAuthClient } from 'better-auth/react';

const backendUrl = import.meta.env.VITE_BACKEND_API_URL;

console.log('🔧 Auth Client Configuration:');
console.log('- Backend URL:', backendUrl);
console.log('- Full auth URL:', `${backendUrl}/api/auth`);

export const authClient = createAuthClient({
  baseURL: `${backendUrl}/api/auth`,
  fetchOptions: {
    credentials: 'include',
  },
});
