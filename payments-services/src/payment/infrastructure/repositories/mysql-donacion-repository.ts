import { query } from "../../../database/mysql"
import { Donacion } from "../../domain/donacion";
import { DonacionRepository } from "../../domain/donacion-repository";

export class MySQLDonacionRepository implements DonacionRepository {
  async save(donacion: Donacion): Promise<Donacion> {
    const sql = `
      INSERT INTO Donaciones (uuid, id_pago, id_usuario, cantidad, moneda, estado_pago)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      donacion.uuid,
      donacion.id_pago,
      donacion.id_usuario,
      donacion.cantidad,
      donacion.moneda,
      donacion.estado_pago,
    ];
    const result: any = await query(sql, params);

    const donacionId = result.insertId;

    return new Donacion(
      donacionId,
      donacion.id_pago,
      donacion.id_usuario,
      donacion.cantidad,
      donacion.moneda,
      donacion.estado_pago,
      donacion.uuid
    );
  }

  async getAll(): Promise<Donacion[]> {
    const sql = `SELECT * FROM Donaciones`;
    const [rows] = (await query(sql, [])) as any[];
    console.log(rows)

    return rows.map(
      (row: any) =>
        new Donacion(
          null,
          row.id_pago,
          row.id_usuario,
          row.cantidad,
          row.moneda,
          row.estado_pago,
          row.uuid
        )
    );
  }

  async getDonationByUserId(uuid: string): Promise<Donacion[] | null> {
    const sql = `
      SELECT * FROM Donaciones
      WHERE id_usuario = ?
    `;
    
    const params = [uuid];
    const [rows] = (await query(sql, params)) as any[];

    return rows.map((row: any) => new Donacion(
        null,
        row.id_pago,
        row.id_usuario,
        row.cantidad,
        row.moneda,
        row.estado_pago,
        row.uuid
      )
    );
  }

}
