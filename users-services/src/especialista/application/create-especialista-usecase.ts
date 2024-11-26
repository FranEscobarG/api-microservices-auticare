import { Especialista } from "../domain/especialista";
import { EspecialistaRepository } from "../domain/especialista-repository";
import { EventBusPort } from "../../shared/ports/event-bus-port";
import PasswordValidator from 'password-validator';
import { escape } from "html-escaper";

// 9. Uso de librerías y frameworks de validación
const passwordSchema = new PasswordValidator();
  passwordSchema
    .is().min(8)                              // Mínimo 8 caracteres

class CreateEspecialistaUseCase {
  constructor(
    private especialistaRepository: EspecialistaRepository,
    private eventBus: EventBusPort
  ) {}

  async execute(especialistaPayload: Omit<Especialista, "id" | "uuid">): Promise<Especialista> {
    // Validación de entrada
    if (!this.isValidEmail(escape(especialistaPayload.correo.trim()))) {
      throw new Error("El formato del correo electrónico es inválido");
    }
    if (!this.isValidPassword(escape(especialistaPayload.contrasena.trim()))) {
      throw new Error("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número");
    }
    
    const especialista = new Especialista(
      null,
      especialistaPayload.nombre,
      especialistaPayload.apellido_paterno,
      especialistaPayload.apellido_materno,
      especialistaPayload.sexo,
      especialistaPayload.correo,
      especialistaPayload.contrasena,
      especialistaPayload.telefono,
      especialistaPayload.fecha_nacimiento,
      especialistaPayload.tipo_usuario,
      especialistaPayload.titulo_especialidad,
      especialistaPayload.cedula_profesional,
      false
    );

    // b. Validación de consistencia
    if (especialista.tipo_usuario === 'ESPECIALISTA') {
      if (!especialista.titulo_especialidad || !especialista.cedula_profesional) {
        throw new Error("Especialistas deben tener título de especialidad y cédula profesional.");
      }
    }

    // Guardar tutor en el repositorio
    const createdSpecialist = await this.especialistaRepository.create(especialista);

    // Publicar evento
    await this.eventBus.publishEvent('send_notification', {
      uuid: createdSpecialist.uuid,
      recipient: createdSpecialist.telefono,
      // correo: createdSpecialist.correo,
      tipo_usuario: createdSpecialist.tipo_usuario,
      channel: 'WHATSAPP'
    });

    return createdSpecialist;
  }

  // Método para validar formato de correo
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }
  // Método para validar requisitos de contraseña
  private isValidPassword(password: string): boolean | any {
    return passwordSchema.validate(password);
  }

}

export default CreateEspecialistaUseCase;
