import { betterAuth } from 'better-auth';
import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const BACKEND_URL = process.env.BETTER_AUTH_URL || 'http://localhost:3000';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

console.log('🔧 Better-Auth Configuration:');
console.log('- Backend URL:', BACKEND_URL);
console.log('- Frontend URL:', FRONTEND_URL);
console.log('- Production mode:', IS_PRODUCTION);

export const auth = betterAuth({
  database: createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  basePath: '/api/auth',

  emailAndPassword: {
    enabled: true,
  },

  logger: {
    level: IS_PRODUCTION ? 'info' : 'debug',
  },

  session: {
    expiresIn: 60 * 60 * 24, // 24h
    updateAge: 60 * 60, // 1 hour
    cookieName: 'better-auth.session-token',
  },

  user: {
    additionalFields: {
      is_admin: {
        type: 'boolean',
        defaultValue: false,
      },
    },
  },

  advanced: {
    cookies: {
      sessionToken: {
        name: 'better-auth.session-token',
        attributes: {
          sameSite: IS_PRODUCTION ? 'none' : 'lax',
          secure: IS_PRODUCTION,
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 24, // 24h
        },
      },
    },
  },

  trustedOrigins: [
    BACKEND_URL,
    FRONTEND_URL,
    ...(IS_PRODUCTION
      ? [
          'https://your-frontend-vercel-url.vercel.app',
          'https://your-backend-render-url.onrender.com',
        ]
      : []),
  ],
});

console.log('Better-Auth initialized successfully');
