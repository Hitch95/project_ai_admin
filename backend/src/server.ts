import http from "http";
import dotenv from "dotenv";
import app from "./main.ts";

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
