import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import type { Express, Request, Response, NextFunction } from 'express';
import retry from 'async-retry';
import { toNodeHandler } from 'better-auth/node';

import swaggerUi from 'swagger-ui-express';
//@ts-expect-error
import swaggerSpecs from './swaggerConfig.ts';

//@ts-expect-error
import db from './models/index.ts';
//@ts-expect-error
import userRoutes from './routes/user.routes.ts';
// import LlmRoutes from "./routes/llm.routes.ts"; // I will create this route later
// import subscriptionRoutes from "./routes/subscription.routes"; // Maybe in the future
//@ts-expect-error
import { auth } from './utils/auth.ts'; // Import the auth configuration

dotenv.config();

const app: Express = express();

// app.all('/api/auth/{*any}', toNodeHandler(auth));
// Better-Auth avec debug détaillé
// 🔧 TEST 1: Route de test simple pour vérifier le routage
app.get('/api/auth/test-route', (req: Request, res: Response) => {
  console.log('✅ Test route intercepted');
  res.json({
    message: 'Routing works!',
    timestamp: new Date().toISOString(),
  });
});

// 🔧 Better-Auth with debug middleware combined
app.all(
  '/api/auth/{*any}', // Catch all routes under /api/auth
  (req: Request, res: Response, next: NextFunction): void => {
    console.log('🔍 Middleware intercepted:', req.method, req.originalUrl);
    console.log('🔍 Path:', req.path);
    console.log('🔍 Params:', req.params);
    console.log('📡 Better-Auth manual handler:', req.method, req.originalUrl);

    // Test si Better-Auth est bien initialisé
    if (typeof auth === 'undefined') {
      console.error('❌ Auth object is undefined!');
      res.status(500).json({ error: 'Auth not initialized' });
      return;
    }

    try {
      const handler = toNodeHandler(auth);
      console.log('✅ toNodeHandler created');
      handler(req, res);
    } catch (error) {
      console.error('❌ Better-Auth error:', error);
      res.status(500).json({
        error: 'Auth handler error',
        details: (error as Error).message,
      });
    }
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use('/users', userRoutes);
// app.use('/llm', LlmRoutes); // I will create this route
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
