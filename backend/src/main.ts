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

const corsOptions = {
  // @ts-ignore
  origin: function (origin, callback) {
    console.log('🔍 CORS Check - Origin received:', origin);

    // Liste des origines autorisées
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'https://project-ai-admin.vercel.app',
      // Ajoutez vos autres domaines si nécessaire
    ];

    // Autoriser les requêtes sans origin (Postman, curl, etc.) SEULEMENT en dev
    if (!origin && process.env.NODE_ENV !== 'production') {
      console.log('✅ CORS: No origin (dev mode) - ALLOWED');
      return callback(null, true);
    }

    // Autoriser les requêtes sans origin en production pour certains cas spécifiques
    // (comme les requêtes same-origin ou certains navigateurs)
    if (!origin) {
      console.log(
        '⚠️ CORS: No origin in production - ALLOWED (same-origin assumed)'
      );
      return callback(null, true);
    }

    // Vérifier si l'origin est dans la liste autorisée
    if (allowedOrigins.includes(origin)) {
      console.log('✅ CORS: Origin allowed -', origin);
      return callback(null, true);
    }

    console.log('❌ CORS: Origin not allowed -', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cookie',
  ],
  exposedHeaders: ['Set-Cookie'],
};

app.use(cors(corsOptions));

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
