import { pool } from "../../../config/db.config";
import { Especialista } from "../../domain/especialista";
import { EspecialistaRepository } from "../../domain/especialista-repository";

export class PostgreSQLEspecialistaRepository implements EspecialistaRepository {
  // Listar todos los especialistas
  async getAll(): Promise<Especialista[]> {
    const sql = `
      SELECT u.*, e.titulo_especialidad, e.cedula_profesional, e.cedula_validada
      FROM Usuarios u
      JOIN Especialistas e ON u.id_usuario = e.id_especialista
    `;

    try {
        const result = await pool.query(sql);
        return result.rows.map((row) => this.mapToEspecialista(row));
      } catch (error: any) {
        console.error('Error ejecutando query:', error.message);
        throw error;
      }
      
  }

  // Crear un nuevo especialista
  async create(especialista: Especialista): Promise<Especialista> {
    // Insertar en Usuarios
    const sqlUsuarios = `
      INSERT INTO Usuarios (uuid, nombre, apellido_paterno, apellido_materno, sexo, correo_electronico, contrasena, numero_telefono, fecha_nacimiento, tipo_usuario)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'Especialista') RETURNING id_usuario
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
    const resultUsuarios = await pool.query(sqlUsuarios, paramsUsuarios);
    const especialistaId = resultUsuarios.rows[0].id_usuario;

    // Insertar en Especialistas
    const sqlEspecialistas = `
      INSERT INTO Especialistas (id_especialista, titulo_especialidad, cedula_profesional, cedula_validada) 
      VALUES ($1, $2, $3, false)
    `;
    const paramsEspecialistas = [
      especialistaId,
      especialista.titulo_especialidad,
      especialista.cedula_profesional,
    ];
    await pool.query(sqlEspecialistas, paramsEspecialistas);

    return especialista;
  }

  // Obtener un especialista por su ID
  async getEspecialistaById(id: string): Promise<Especialista | null> {
    const sql = `
      SELECT u.*, e.titulo_especialidad, e.cedula_profesional, e.cedula_validada
      FROM Usuarios u
      JOIN Especialistas e ON u.id_usuario = e.id_especialista
      WHERE u.uuid = $1
    `;
    const result = await pool.query(sql, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return this.mapToEspecialista(result.rows[0]);
  }

  // Actualizar un especialista
  async updateEspecialista(
    id: string,
    newEspecialista: Partial<Especialista>
  ): Promise<Especialista | null> {
    // Actualizar Usuarios
    const sqlUsuarios = `
      UPDATE Usuarios
      SET nombre=$1, apellido_paterno=$2, apellido_materno=$3, sexo=$4, correo_electronico=$5, numero_telefono=$6, fecha_nacimiento=$7
      WHERE uuid = $8
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
    await pool.query(sqlUsuarios, paramsUsuarios);

    // Actualizar Especialistas
    const sqlEspecialistas = `
      UPDATE Especialistas
      SET titulo_especialidad=$1, cedula_profesional=$2, cedula_validada=$3
      WHERE id_especialista = (SELECT id_usuario FROM Usuarios WHERE uuid = $4)
    `;
    const paramsEspecialistas = [
      newEspecialista.titulo_especialidad,
      newEspecialista.cedula_profesional,
      newEspecialista.cedula_validada,
      id,
    ];
    await pool.query(sqlEspecialistas, paramsEspecialistas);

    return this.getEspecialistaById(id);
  }

  // Eliminar un especialista
  async deleteEspecialista(id: string): Promise<boolean> {
    // Eliminar de Especialistas
    const sqlEspecialistas = `
      DELETE FROM Especialistas
      WHERE id_especialista = (SELECT id_usuario FROM Usuarios WHERE uuid = $1)
    `;
    await pool.query(sqlEspecialistas, [id]);

    // Eliminar de Usuarios
    const sqlUsuarios = `DELETE FROM Usuarios WHERE uuid = $1`;
    const result = await pool.query(sqlUsuarios, [id]);

    return result.rowCount != null && result.rowCount > 0;
  }

  // Helper: Mapear filas de la base de datos a objetos de dominio
  private mapToEspecialista(row: any): Especialista {
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
}
