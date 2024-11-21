import { query } from "../../../database/mysql";
import { Especialista } from "../../domain/especialista";
import { EspecialistaRepository } from "../../domain/especialista-repository";

export class MySQLEspecialistaRepository implements EspecialistaRepository {
  // Listar todos los especialistas
  async getAll(): Promise<Especialista[]> {
    const sql = `
      SELECT u.*, e.titulo_especialidad, e.cedula_profesional, e.cedula_validada
      FROM Usuarios u
      JOIN Especialistas e ON u.id_usuario = e.id_especialista
    `;
    const rows = (await query(sql, [])) as any[];

    return rows.map(
      (row: any) =>
        new Especialista(
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
          row.titulo_especialidad,
          row.cedula_profesional,
          row.cedula_validada,
          row.uuid
        )
    );
  }

  // Crear un nuevo especialista
  async create(especialista: Especialista): Promise<Especialista> {
    // Primero, insertar en Usuarios
    const sqlUsuarios = `
      INSERT INTO Usuarios (uuid, nombre, apellido_paterno, apellido_materno, sexo, correo_electronico, contrasena, numero_telefono, fecha_nacimiento, tipo_usuario)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Especialista')
    `;
    const paramsUsuarios = [
      especialista.uuid,
      especialista.nombre,
      especialista.apellido_paterno,
      especialista.apellido_materno,
      especialista.sexo,
      especialista.correo,
      especialista.contrasena,
      especialista.telefono,
      especialista.fecha_nacimiento,
    ];
    const result: any = await query(sqlUsuarios, paramsUsuarios);

    const especialistaId = result.insertId;

    // Luego, insertar en Especialistas
    const sqlEspecialistas = `
      INSERT INTO Especialistas (id_especialista, titulo_especialidad, cedula_profesional, cedula_validada) 
      VALUES (?, ?, ?, ?)
    `;
    const paramsEspecialistas = [
      especialistaId,
      especialista.titulo_especialidad,
      especialista.cedula_profesional,
      especialista.cedula_validada,
    ];

    await query(sqlEspecialistas, paramsEspecialistas);

    return especialista;
  }

  // Obtener un especialista por su ID
  async getEspecialistaById(id: string): Promise<Especialista | null> {
    const sql = `
      SELECT u.*, e.titulo_especialidad, e.cedula_profesional, e.cedula_validada
      FROM Usuarios u
      JOIN Especialistas e ON u.id_usuario = e.id_especialista
      WHERE u.uuid = ?
    `;
    const params = [id];
    const rows = (await query(sql, params)) as any[];

    if (rows.length === 0) {
      return null;
    }

    const row = rows[0];
    return new Especialista(
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
      row.titulo_especialidad,
      row.cedula_profesional,
      row.cedula_validada,
      row.uuid
    );
  }

  // Actualizar un especialista
  async updateEspecialista(
    id: string,
    newEspecialista: Partial<Especialista>
  ): Promise<Especialista | null> {
    // Actualizar tabla Usuarios
    const sqlUsuarios = `
      UPDATE Usuarios 
      SET nombre=?, apellido_paterno=?, apellido_materno=?, sexo=?, correo_electronico=?, numero_telefono=?, fecha_nacimiento=?
      WHERE uuid = ?
    `;
    const paramsUsuarios = [
      newEspecialista.nombre,
      newEspecialista.apellido_paterno,
      newEspecialista.apellido_materno,
      newEspecialista.sexo,
      newEspecialista.correo,
      newEspecialista.telefono,
      newEspecialista.fecha_nacimiento,
      id,
    ];
    await query(sqlUsuarios, paramsUsuarios);

    // Actualizar tabla Especialistas
    if (
      newEspecialista.titulo_especialidad ||
      newEspecialista.cedula_profesional !== undefined ||
      newEspecialista.cedula_validada !== undefined
    ) {
      const sqlEspecialistas = `
        UPDATE Especialistas 
        SET titulo_especialidad=?, cedula_profesional=?, cedula_validada=? 
        WHERE id_especialista = (SELECT id_usuario FROM Usuarios WHERE uuid = ?)
      `;
      const paramsEspecialistas = [
        newEspecialista.titulo_especialidad,
        newEspecialista.cedula_profesional,
        newEspecialista.cedula_validada,
        id,
      ];
      await query(sqlEspecialistas, paramsEspecialistas);
    }

    return await this.getEspecialistaById(id); // Devolver el especialista actualizado
  }

  // Eliminar un especialista
  async deleteEspecialista(id: string): Promise<boolean> {
    // Eliminar de la tabla Especialistas
    const sqlEspecialistas = `
      DELETE FROM Especialistas 
      WHERE id_especialista = (SELECT id_usuario FROM Usuarios WHERE uuid = ?)
    `;
    await query(sqlEspecialistas, [id]);

    // Eliminar de la tabla Usuarios
    const sqlUsuarios = `DELETE FROM Usuarios WHERE uuid = ?`;
    const result: any = await query(sqlUsuarios, [id]);

    return result.affectedRows > 0;
  }
}
