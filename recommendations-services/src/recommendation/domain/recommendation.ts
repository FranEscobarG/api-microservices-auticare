import { v4 as uuidv4 } from "uuid";

export class Recommendation {
    id: number | null;
    uuid: string;
    id_nino: string;
    categoria: string;
    consulta: string;
    recomendacion: string;
    validada: boolean;
    id_especialista?: string;
    fecha_validacion?: Date;
    comentario?: string;
    utilidad?: number;

    constructor(
        id: number | null,
        id_nino: string,
        categoria: string,
        consulta: string,
        recomendacion: string,
        validada = false,
        id_especialista?: string,
        fecha_validacion?: Date,
        comentario?: string,
        utilidad?: number,
        uuid?: string
    ) {
        this.id = id;
        this.uuid = uuid || uuidv4();
        this.id_nino = id_nino;
        this.categoria = categoria;
        this.consulta = consulta;
        this.recomendacion = recomendacion;
        this.validada = validada;
        this.id_especialista = id_especialista;
        this.fecha_validacion = fecha_validacion;
        this.comentario = comentario;
        this.utilidad = utilidad;
    }
}
