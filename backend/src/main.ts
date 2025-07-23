import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import type { Express, Request, Response, NextFunction } from 'express';
import retry from 'async-retry';
import { toNodeHandler } from 'better-auth/node';

import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swaggerConfig.js';

import db from './models/index.js';
import { auth } from './utils/auth.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.routes.js';
import LlmRoutes from './routes/llm.route.js';
import LlmModelRoutes from './routes/llm-model.routes.js';

dotenv.config();

const app: Express = express();

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  process.env.BETTER_AUTH_URL || 'http://localhost:3000',
];

// console.log('🌐 CORS allowed origins:', allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      // Authorize requests without origin (like Postman) in development
      if (!origin && process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }

      if (allowedOrigins.indexOf(origin || '') !== -1) {
        callback(null, true);
      } else {
        console.warn(`❌ CORS: Origin ${origin} not allowed`);
        console.warn('Allowed origins:', allowedOrigins);
        callback(null, false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cookie',
      'X-Requested-With',
      'Accept',
      'Origin',
    ],
    exposedHeaders: ['Set-Cookie'],
  })
);

// app.all('/api/auth/{*any}', toNodeHandler(auth));

// 🔧 Better-Auth with debug middleware combined
app.all(
  '/api/auth/{*any}', // Catch all routes under /api/auth
  (req: Request, res: Response, next: NextFunction): void => {
    // console.log('🔍 Middleware intercepted:', req.method, req.originalUrl);
    // console.log('🔍 Path:', req.path);
    // console.log('🔍 Params:', req.params);
    // console.log('📡 Better-Auth manual handler:', req.method, req.originalUrl);

    try {
      const handler = toNodeHandler(auth);
      // console.log('toNodeHandler created successfully');
      handler(req, res);
    } catch (error) {
      console.error('Better-Auth error : ', error);
      res.status(500).json({
        error: 'Auth handler error',
        details: (error as Error).message,
      });
    }
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use('/api/login', authRoutes);
app.use('/users', userRoutes);
app.use('/llm', LlmRoutes);
app.use('/llm-model', LlmModelRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('ProjectAI is successfully deployed!');
});

const connectToDatabase = async () => {
  await db.sequelize.authenticate();
  // console.log('Connection has been established successfully.');
};

retry(
  async (bail) => {
    try {
      await connectToDatabase();
    } catch (err) {
      console.error('Unable to connect to the database : ', err);
      if (err instanceof db.Sequelize.ConnectionError) {
        throw err;
      } else {
        bail(err);
      }
    }
  },
  {
    retries: 20,
    minTimeout: 1000,
    maxTimeout: 5000,
  }
)
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((err) => {
    console.error(
      'Could not connect to the database after several attempts : ',
      err
    );
  });

export default app;
