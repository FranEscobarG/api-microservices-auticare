import { query } from "../../../database/mysql";
import { Tutor } from "../../domain/tutor";
import { TutorRepository } from "../../domain/tutor-repository";

export class MySQLTutorRepository implements TutorRepository {
  // Listar todos los tutores
  async getAll(): Promise<Tutor[]> {
    const sql = `
      SELECT u.*, t.cargo 
      FROM Usuarios u
      JOIN Tutores t ON u.id_usuario = t.id_tutor
    `;
    const rows = (await query(sql, [])) as any[];

    return rows.map(
      (row: any) =>
        new Tutor(
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
        )
    );
  }

  // Crear un nuevo tutor
  async create(user: Tutor): Promise<Tutor> {
    const sqlUsuarios = `
      INSERT INTO Usuarios (uuid, nombre, apellido_paterno, apellido_materno, sexo, correo_electronico, contrasena, numero_telefono, fecha_nacimiento, tipo_usuario)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Tutor')
    `;
    const paramsUsuarios = [
      user.uuid,
      user.nombre,
      user.apellido_paterno,
      user.apellido_materno,
      user.sexo,
      user.correo,
      user.contrasena,
      user.telefono,
      user.fecha_nacimiento,
    ];

    try {
      const result: any = await query(sqlUsuarios, paramsUsuarios);
      const tutorId = result.insertId;

      const sqlTutores = `INSERT INTO Tutores (id_tutor, cargo) VALUES (?, ?)`;
      const paramsTutores = [tutorId, user.cargo];
      await query(sqlTutores, paramsTutores);

      return user;
    } catch (error) {
      console.error("Error en la creación del tutor:", error);
      throw error;
    }
  }

  // Obtener un tutor por su ID
  async getTutorById(uuid: string): Promise<Tutor | null> {
    const sql = `
      SELECT u.*, t.cargo 
      FROM Usuarios u
      JOIN Tutores t ON u.id_usuario = t.id_tutor
      WHERE u.uuid = ?
    `;
    const params = [uuid];
    const rows = (await query(sql, params)) as any[];

    if (rows.length === 0) {
      return null;
    }

    const row = rows[0];
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

  // Actualizar un tutor
  async updateTutor(
    id: string,
    newTutor: Partial<Tutor>
  ): Promise<Tutor | null> {
    // Actualizar tabla Usuarios
    const sqlUsuarios = `
      UPDATE Usuarios 
      SET nombre=?, apellido_paterno=?, apellido_materno=?, sexo=?, correo_electronico=?, numero_telefono=?, fecha_nacimiento=?
      WHERE uuid = ?
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
    await query(sqlUsuarios, paramsUsuarios);

    // Actualizar tabla Tutores
    if (newTutor.cargo) {
      const sqlTutores = `
        UPDATE Tutores 
        SET cargo=? 
        WHERE id_tutor = (SELECT id_usuario FROM Usuarios WHERE uuid = ?)
      `;
      const paramsTutores = [newTutor.cargo, id];
      await query(sqlTutores, paramsTutores);
    }

    return await this.getTutorById(id); // Devolver el tutor actualizado
  }

  // Eliminar un tutor
  async deleteTutor(id: string): Promise<boolean> {
    // Eliminar de la tabla Tutores
    const sqlTutores = `
      DELETE FROM Tutores 
      WHERE id_tutor = (SELECT id_usuario FROM Usuarios WHERE uuid = ?)
    `;
    await query(sqlTutores, [id]);

    // Eliminar de la tabla Usuarios
    const sqlUsuarios = `DELETE FROM Usuarios WHERE uuid = ?`;
    const result: any = await query(sqlUsuarios, [id]);

    return result.affectedRows > 0;
  }
}
