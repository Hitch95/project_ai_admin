import http from 'http';
import dotenv from 'dotenv';
import app from './main.js';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

const server = http.createServer(app);

server.listen(PORT, (error?: Error) => {
  if (error) {
    console.error('Server failed to start : ', error);
    throw error;
  }
  console.log(`Server is listening on port ${PORT}`);
});
