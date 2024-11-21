import { pool } from "../../../config/db.config";
import { Tutor } from "../../domain/tutor";
import { TutorRepository } from "../../domain/tutor-repository";

export class PostgreSQLTutorRepository implements TutorRepository {
  // Listar todos los tutores
  async getAll(): Promise<Tutor[]> {
    const sql = `
      SELECT u.*, t.cargo 
      FROM Usuarios u
      JOIN Tutores t ON u.id_usuario = t.id_tutor
    `;

    try {
      const result = await pool.query(sql);
      return result.rows.map((row) => this.mapToTutor(row));
    } catch (error: any) {
      console.error("Error ejecutando query:", error.message);
      throw error;
    }
  }

  // Crear un nuevo tutor
  async create(tutor: Tutor): Promise<Tutor> {
    const sqlUsuarios = `
      INSERT INTO Usuarios (uuid, nombre, apellido_paterno, apellido_materno, sexo, correo_electronico, contrasena, numero_telefono, fecha_nacimiento, tipo_usuario)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'Tutor') RETURNING id_usuario
    `;
    const paramsUsuarios = [
      tutor.uuid,
      tutor.nombre,
      tutor.apellido_paterno,
      tutor.apellido_materno,
      tutor.sexo,
      tutor.correo,
      tutor.contrasena,
      tutor.telefono,
      tutor.fecha_nacimiento,
    ];

    try {
      const resultUsuarios = await pool.query(sqlUsuarios, paramsUsuarios);
      const tutorId = resultUsuarios.rows[0].id_usuario;

      const sqlTutores = `
        INSERT INTO Tutores (id_tutor, cargo) 
        VALUES ($1, $2)
      `;
      const paramsTutores = [tutorId, tutor.cargo];
      await pool.query(sqlTutores, paramsTutores);

      return tutor;
    } catch (error: any) {
      console.error("Error en la creación del tutor:", error.message);
      throw error;
    }
  }

  // Obtener un tutor por su ID
  async getTutorById(uuid: string): Promise<Tutor | null> {
    const sql = `
      SELECT u.*, t.cargo 
      FROM Usuarios u
      JOIN Tutores t ON u.id_usuario = t.id_tutor
      WHERE u.uuid = $1
    `;
    try {
      const result = await pool.query(sql, [uuid]);
      if (result.rows.length === 0) {
        return null;
      }
      return this.mapToTutor(result.rows[0]);
    } catch (error: any) {
      console.error("Error obteniendo tutor:", error.message);
      throw error;
    }
  }

  // Actualizar un tutor
  async updateTutor(
    id: string,
    newTutor: Partial<Tutor>
  ): Promise<Tutor | null> {
    const sqlUsuarios = `
      UPDATE Usuarios 
      SET nombre=$1, apellido_paterno=$2, apellido_materno=$3, sexo=$4, correo_electronico=$5, numero_telefono=$6, fecha_nacimiento=$7
      WHERE uuid = $8
    `;
    const paramsUsuarios = [
      newTutor.nombre,
      newTutor.apellido_paterno,
      newTutor.apellido_materno,
      newTutor.sexo,
      newTutor.correo,
      newTutor.telefono,
      newTutor.fecha_nacimiento,
      id,
    ];

    try {
      await pool.query(sqlUsuarios, paramsUsuarios);

      if (newTutor.cargo) {
        const sqlTutores = `
          UPDATE Tutores 
          SET cargo=$1 
          WHERE id_tutor = (SELECT id_usuario FROM Usuarios WHERE uuid = $2)
        `;
        const paramsTutores = [newTutor.cargo, id];
        await pool.query(sqlTutores, paramsTutores);
      }

      return await this.getTutorById(id);
    } catch (error: any) {
      console.error("Error actualizando tutor:", error.message);
      throw error;
    }
  }

  // Eliminar un tutor
  async deleteTutor(id: string): Promise<boolean> {
    const sqlTutores = `
      DELETE FROM Tutores 
      WHERE id_tutor = (SELECT id_usuario FROM Usuarios WHERE uuid = $1)
    `;
    const sqlUsuarios = `DELETE FROM Usuarios WHERE uuid = $1`;

    try {
      await pool.query(sqlTutores, [id]);
      const result = await pool.query(sqlUsuarios, [id]);
      return result.rowCount != null && result.rowCount > 0;
    } catch (error: any) {
      console.error("Error eliminando tutor:", error.message);
      throw error;
    }
  }

  // Helper: Mapear filas de la base de datos a objetos de dominio
  private mapToTutor(row: any): Tutor {
    return new Tutor(
      row.id_usuario,
      row.nombre,
      row.apellido_paterno,
      row.apellido_materno,
      row.sexo,
      row.correo_electronico,
      row.contrasena,
      row.numero_telefono,
      row.fecha_nacimiento,
      row.tipo_usuario,
      row.cargo,
      row.uuid
    );
  }
}
