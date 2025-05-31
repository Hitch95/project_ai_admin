import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import type { Express, Request, Response } from 'express';

import db from './models/index.ts';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swaggerConfig.ts';
import retry from 'async-retry';

import userRoutes from './routes/user.routes.ts';
import authRoutes from './routes/auth.routes.ts';
// import LlmRoutes from "./routes/llm.routes.ts"; // I will create this route later
// import subscriptionRoutes from "./routes/subscription.routes"; // Maybe in the future

dotenv.config();

const app: Express = express();

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
app.use('/auth', authRoutes);
// app.use('/llm', LlmRoutes); // I will create this route later
// app.use('/subscriptions', subscriptionRoutes);

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
      console.error('Unable to connect to the database:', err);
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
  .then(() => {})
  .catch((err) => {
    console.error(
      'Could not connect to the database after several attempts : ',
      err
    );
  });

export default app;
