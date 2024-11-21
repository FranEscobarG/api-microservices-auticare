import { Child } from "../../domain/child";
import { ChildRepository } from "../../domain/child-repository";
import { pool } from "../../../config/db.config";

export class PostgresChildRepository implements ChildRepository {

    async createChild(child: Child): Promise<Child> {
        const sqlChild = `
            INSERT INTO ninos (uuid, id_tutor, nombre, apellido_paterno, apellido_materno, sexo, fecha_nacimiento, tipo_autismo, informacion_medica) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
        `;
        const paramsChild = [
            child.uuid,
            child.id_tutor,
            child.nombre,
            child.apellido_paterno,
            child.apellido_materno,
            child.sexo,
            child.fecha_nacimiento,
            child.tipo_autismo,
            child.informacion_medica,
        ];

        try {
            const result = await pool.query(sqlChild, paramsChild);
            const row = result.rows[0];
            return new Child(
                row.id_nino,
                row.id_tutor,
                row.nombre,
                row.apellido_paterno,
                row.apellido_materno,
                row.sexo,
                row.fecha_nacimiento,
                row.tipo_autismo,
                row.informacion_medica,
                row.uuid,
            );

        } catch (error: any) {
            console.error("Error en la creación del tutor:", error.message);
            throw error;
        }


    }

    async getChildrenByTutor(tutorId: string): Promise<Child[]> {
        const sql = `SELECT * FROM ninos WHERE id_tutor = $1`;
        try {
            const result = await pool.query(sql, [tutorId]);
            return result.rows.map(
                (row) => new Child(
                    row.id_nino,
                    row.id_tutor,
                    row.nombre,
                    row.apellido_paterno,
                    row.apellido_materno,
                    row.sexo,
                    row.fecha_nacimiento,
                    row.tipo_autismo,
                    row.informacion_medica,
                    row.uuid,
                )
            );
        } catch (error: any) {
            console.error("Error ejecutando query:", error.message);
            throw error;
        }
    }

    async getChildDetails(childId: string): Promise<Child | null> {
        const sql = `SELECT * FROM ninos WHERE uuid = $1`;
        try {
            const result = await pool.query(sql, [childId]);
            if (result.rows.length === 0) {
              return null;
            }

            const row = result.rows[0];
            return new Child(
                row.id_nino,
                row.id_tutor,
                row.nombre,
                row.apellido_paterno,
                row.apellido_materno,
                row.sexo,
                row.fecha_nacimiento,
                row.tipo_autismo,
                row.informacion_medica,
                row.uuid,
            );
          } catch (error: any) {
            console.error("Error obteniendo Niño:", error.message);
            throw error;
          }
    }
}
