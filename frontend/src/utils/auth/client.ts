import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  apiUrl: 'http://localhost:3000/auth/', // adapte si besoin
});
