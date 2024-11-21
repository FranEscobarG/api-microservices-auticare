import { v4 as uuidv4 } from "uuid";

export class Especialista {
  id: number | null;
  uuid: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  sexo: string;
  correo: string;
  contrasena: string;
  telefono: string;
  fecha_nacimiento: string;
  tipo_usuario: string;
  titulo_especialidad: string; /* Si es tipo ESPECIALISTA */
  cedula_profesional: string; /* Si es tipo ESPECIALISTA */
  cedula_validada: boolean;

  constructor(
    id: number | null,
    nombre: string,
    apellido_materno: string,
    apellido_paterno: string,
    sexo: string,
    correo: string,
    contrasena: string,
    telefono: string,
    fecha_nacimiento: string,
    tipo_usuario: string,
    titulo_especialidad: string,
    cedula_profesional: string,
    cedula_validada: boolean,
    uuid?: string
  ) {
    this.id = id;
    this.uuid = uuid || uuidv4(); // Si el uuid no se pasa como argumento, se genera uno nuevo
    this.nombre = nombre;
    this.apellido_materno = apellido_materno;
    this.apellido_paterno = apellido_paterno;
    this.sexo = sexo;
    this.correo = correo;
    this.contrasena = contrasena;
    this.telefono = telefono;
    this.fecha_nacimiento = fecha_nacimiento;
    this.tipo_usuario = tipo_usuario;
    this.titulo_especialidad = titulo_especialidad;
    this.cedula_profesional = cedula_profesional;
    this.cedula_validada = cedula_validada;
  }
}
