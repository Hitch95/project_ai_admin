import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import type { Express, Request, Response, NextFunction } from 'express';
import retry from 'async-retry';
import { toNodeHandler } from 'better-auth/node';

import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swaggerConfig.js';

import db from './models/index.js';
import userRoutes from './routes/user.routes.js';
import LlmRoutes from './routes/llm.route.js';
import LlmModelRoutes from './routes/llm-model.routes.js'; // Ajout des routes des modèles LLM
// import subscriptionRoutes from "./routes/subscription.routes"; // Maybe in the future
import { auth } from './utils/auth.js'; // Import the auth configuration

dotenv.config();

const app: Express = express();

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  ...(process.env.NODE_ENV === 'production'
    ? [
        // Add production URLs here
        'https://your-frontend-vercel-url.vercel.app',
        'https://your-backend-render-url.onrender.com',
      ]
    : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Autoriser les requêtes sans origin (comme Postman) en développement
      if (!origin && process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }

      if (allowedOrigins.indexOf(origin || '') !== -1) {
        callback(null, true);
      } else {
        console.warn(`CORS: Origin ${origin} not allowed`);
        callback(new Error('Not allowed by CORS'));
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
    maxAge: 86400, // 24 heures
  })
);

// app.all('/api/auth/{*any}', toNodeHandler(auth));

// 🔧 Better-Auth with debug middleware combined
app.all(
  '/api/auth/{*any}', // Catch all routes under /api/auth
  (req: Request, res: Response, next: NextFunction): void => {
    console.log('🔍 Middleware intercepted:', req.method, req.originalUrl);
    console.log('🔍 Path:', req.path);
    console.log('🔍 Params:', req.params);
    console.log('📡 Better-Auth manual handler:', req.method, req.originalUrl);

    try {
      const handler = toNodeHandler(auth);
      console.log('toNodeHandler created successfully');
      handler(req, res);
      res.header('Access-Control-Allow-Credentials', 'true');
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

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use('/users', userRoutes);
app.use('/llm', LlmRoutes);
app.use('/llm-model', LlmModelRoutes); // Ajout des routes des modèles LLM
// app.use('/subscriptions', subscriptionRoutes); // Check with Dan if necessary or not

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Node.js and Sequelize project!');
});

const connectToDatabase = async () => {
  await db.sequelize.authenticate();
  console.log('Connection has been established successfully.');
  // await db.sequelize.sync();
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
