import bcrypt from "bcrypt";
import { pool } from "../../../config/db.config";
import { AuthRepository } from "../../domain/auth-repository";

export class PostgreSQLAuthRepository implements AuthRepository {
  async validateUser(correo: string, contrasena: string): Promise<any> {
    const query = "SELECT * FROM Usuarios WHERE correo_electronico = $1";
    const result = await pool.query(query, [correo]);

    if (result.rowCount === 0) return null;

    const usuario = result.rows[0];
    const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
    return isMatch ? usuario : null;
  }

  async verifyUser(uuid: string, fechaVerificacion: Date): Promise<void> {
    const query = `
      UPDATE Usuarios 
      SET verificado = true, fecha_verificacion = $2 
      WHERE uuid = $1
    `;
    await pool.query(query, [uuid, fechaVerificacion]);
  }
}
