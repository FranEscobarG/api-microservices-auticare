import { pool } from "../config/db.config";

export async function connectWithRetry(retries: number, delay: number): Promise<void> {
  for (let i = 0; i < retries; i++) {
    try {
      await pool.connect();
      console.log("✅ Conexión exitosa a PostgreSQL");
      return;
    } catch (error) {
      console.error(`❌ Error al conectar (Intento ${i + 1} de ${retries}):`, error);
      if (i < retries - 1) {
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }
  console.error("❌ No se pudo conectar a PostgreSQL después de varios intentos.");
  process.exit(1);
}
