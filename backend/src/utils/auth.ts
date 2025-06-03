import { betterAuth } from 'better-auth';
import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const auth = betterAuth({
  database: createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  emailAndPassword: {
    enabled: true,
    login: {
      redirectTo: '/admin/dashboard',
    },
  },
  logger: {
    level: 'debug',
  },

  session: {
    expiresIn: 60 * 60 * 24, // 24 hours
    updateAge: 60 * 60, // 1 hour
  },

  user: {
    additionalFields: {
      is_admin: {
        type: 'boolean',
        defaultValue: false,
      },
    },
  },
});

console.log('Better-Auth initialized successfully');
