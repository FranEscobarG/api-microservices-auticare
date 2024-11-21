import { v4 as uuidv4 } from "uuid";

export class Child {
    id: number | null;
    uuid: string;
    id_tutor: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    sexo: string;
    fecha_nacimiento: string;
    tipo_autismo: string;
    informacion_medica: string;

    constructor(
        id: number | null,
        id_tutor: string,
        nombre: string,
        apellido_paterno: string,
        apellido_materno: string,
        sexo: string,
        fecha_nacimiento: string,
        tipo_autismo: string,
        informacion_medica: string,
        uuid?: string
    ) {
        this.id = id;
        this.uuid = uuid || uuidv4();
        this.id_tutor = id_tutor;
        this.nombre = nombre;
        this.apellido_paterno = apellido_paterno;
        this.apellido_materno = apellido_materno;
        this.sexo = sexo;
        this.fecha_nacimiento = fecha_nacimiento;
        this.tipo_autismo = tipo_autismo;
        this.informacion_medica = informacion_medica;
    }
}
