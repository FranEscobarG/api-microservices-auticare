import { Pool } from "pg";
import config from "./config";

export const pool = new Pool({
  user: config.dbUser,
  host: config.dbHost,
  database: config.dbName,
  password: config.dbPassword,
  port: config.dbPort,
  max: 10, // Máximo de conexiones simultáneas
  idleTimeoutMillis: 30000, // Tiempo antes de cerrar una conexión inactiva
  connectionTimeoutMillis: 5000, // Tiempo de espera para obtener una conexión
});
