import { query } from "../../../database/mysql";
import { Recommendation } from "../../domain/recommendation";
import RecommendationRepository from "../../domain/recommendation-repository";

export class MySQLRecommendationRepository implements RecommendationRepository {
    async save(recommendation: Recommendation): Promise<Recommendation> {
        const sql = `
        INSERT INTO recomendaciones (uuid, id_nino, categoria, consulta, recomendacion, validada)
        VALUES (?, ?, ?, ?, ?, ?)
        `;
        const params = [
            recommendation.uuid,
            recommendation.id_nino,
            recommendation.categoria,
            recommendation.consulta,
            recommendation.recomendacion,
            recommendation.validada,
        ];

        try {
            const result: any = await query(sql, params);

            return new Recommendation(
                result.insertId,
                recommendation.id_nino,
                recommendation.categoria,
                recommendation.consulta,
                recommendation.recomendacion, 
            );
        } catch (error: any) {
            console.error("Error al guardar recomendación: ", error.message);
            throw error;
        }

    }

    async updateValidation(uuid: string, id_especialista: string): Promise<void> {
        const sql = `
            UPDATE recomendaciones
            SET validada = TRUE, id_especialista = ?, fecha_validacion = NOW()
            WHERE uuid = ?
        `;

        try {
            await query(sql, [id_especialista, uuid]);
        } catch (error: any) {
            console.error("Error al actualizar validacion de recomendación: ", error.message);
            throw error;
        }
        
    }

    async updateFeedback(uuid: string, comentario: string, utilidad: number): Promise<void> {
        const sql = `UPDATE recomendaciones SET comentario = ?, utilidad = ? WHERE uuid = ?`;
        const params = [comentario, utilidad, uuid];

        try {
            await query(sql, params);
        } catch (error: any) {
            console.error("Error al actualizar feedback de recomendación: ", error.message);
            throw error;
        }
    }

    async getAllNotValidated(): Promise<Recommendation[]> {
        const sql = `SELECT * FROM recomendaciones WHERE validada = FALSE`;

        try {
            const [rows] = (await query(sql, [])) as any[];
            return rows.map((row: any) => this.mapToRecommendation(row));
        } catch (error: any) {
            console.error("Error al obtener recomendaciones no validadas: ", error.message);
            throw error;
        }
    }

    async getNotValidatedByChildId(uuid_nino: string): Promise<Recommendation[]> {
        const sql = `SELECT * FROM recomendaciones WHERE validada = FALSE AND id_nino = ?`;
        const params = [uuid_nino];

        try {
            const [rows] = (await query(sql, params)) as any[];
            return rows.map((row: any) => this.mapToRecommendation(row));
        } catch (error: any) {
            console.error("Error al obtener recomendaciones no validadas por 'id_nino': ", error.message);
            throw error;
        }
    }

    async getValidatedBySpecialist(uuid_especialista: string): Promise<Recommendation[]> {
        const sql = `SELECT * FROM recomendaciones WHERE validada = TRUE AND id_especialista = ?`;
        const params = [uuid_especialista];

        try {
            const [rows] = (await query(sql, params)) as any[];
            return rows.map((row: any) => this.mapToRecommendation(row));
        } catch (error: any) {
            console.error("Error al obtener recomendaciones validadas por 'id_especialista': ", error.message);
            throw error;
        }
    }

    async getValidatedByChildId(uuid_nino: string): Promise<Recommendation[]> {
        const sql = `SELECT * FROM recomendaciones WHERE validada = TRUE AND id_nino = ?`;
        const params = [uuid_nino];

        try {
            const [rows] = (await query(sql, params)) as any[];
            return rows.map((row: any) => this.mapToRecommendation(row));
        } catch (error: any) {
            console.error("Error al obtener recomendaciones validadas por 'id_nino': ", error.message);
            throw error;
        }
    }


    // Helper: Mapear filas de la base de datos a objetos de dominio
    private mapToRecommendation(row: any): Recommendation {
        return new Recommendation(
            row.id,
            row.id_nino,
            row.categoria,
            row.consulta,
            row.recomendacion,
            row.validada,
            row.id_especialista,
            row.fecha_validacion,
            row.comentario,
            row.utilidad,
            row.uuid
        );
    }
}
