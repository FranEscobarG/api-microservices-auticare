import { v4 as uuidv4 } from "uuid";

export class Donacion {
  id: number | null;
  uuid: string;
  id_pago: string | undefined; // proporcionado por el sistema de pagos
  id_usuario: string;
  cantidad: number;
  moneda: string;
  estado_pago: string;

  constructor(
    id: number | null,
    id_pago: string | undefined,
    id_usuario: string,
    cantidad: number,
    moneda: string,
    estado_pago: string,
    uuid?: string
  ) {
    this.id = id;
    this.uuid = uuid || uuidv4();
    this.id_pago = id_pago;
    this.id_usuario = id_usuario;
    this.cantidad = cantidad;
    this.moneda = moneda;
    this.estado_pago = estado_pago;
  }
}
