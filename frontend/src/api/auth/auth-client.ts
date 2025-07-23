import { createAuthClient } from 'better-auth/react';

const backendUrl = import.meta.env.VITE_BACKEND_API_URL;

console.log('🔧 Auth Client Configuration:');
console.log('- Backend URL:', backendUrl);
console.log('- Full auth URL:', `${backendUrl}/api/auth`);
console.log('- Mode:', import.meta.env.MODE);

export const authClient = createAuthClient({
  baseURL: `${backendUrl}/api/auth`,
  fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
    console.log('🌐 Auth request:', input);

    const response = await fetch(input, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
      ...init,
    });

    console.log('📡 Auth response status:', response.status);
    console.log('🍪 Response cookies:', response.headers.get('set-cookie'));

    return response;
  },
});
