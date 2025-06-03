import http from 'http';
import dotenv from 'dotenv';
//@ts-expect-error
import app from './main.ts';

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
