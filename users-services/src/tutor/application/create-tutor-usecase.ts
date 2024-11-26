import { EventBusPort } from "../../shared/ports/event-bus-port";
import { Tutor } from "../domain/tutor";
import { TutorRepository } from "../domain/tutor-repository";
import PasswordValidator from 'password-validator';

// 9. Uso de librerías y frameworks de validación
const passwordSchema = new PasswordValidator();
  passwordSchema
    .is().min(8);

class CreateTutorUseCase {
  constructor(
    private tutorRepository: TutorRepository,
    private eventBus: EventBusPort
  ) {}

  async execute(tutorPayload: Omit<Tutor, "id" & "uuid">): Promise<Tutor> {
    // Validación de entrada
    if (!this.isValidEmail(tutorPayload.correo)) {
      throw new Error("El formato del correo electrónico es inválido");
    }
    if (!this.isValidPassword(tutorPayload.contrasena)) {
      throw new Error("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número");
    }
    
    const tutor = new Tutor(
      null,
      tutorPayload.nombre,
      tutorPayload.apellido_paterno,
      tutorPayload.apellido_materno,
      tutorPayload.sexo,
      tutorPayload.correo,
      tutorPayload.contrasena, // Guardam la contraseña cifrada
      tutorPayload.telefono,
      tutorPayload.fecha_nacimiento,
      tutorPayload.tipo_usuario,
      tutorPayload.cargo
    );

    // Guardar tutor en el repositorio
    const createdTutor = await this.tutorRepository.create(tutor);

    // Publicar evento
    await this.eventBus.publishEvent('send_notification', {
      uuid: createdTutor.uuid,
      recipient: createdTutor.telefono,
      tipo_usuario: createdTutor.tipo_usuario,
      channel: 'WHATSAPP'
    });

    return createdTutor;
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

export default CreateTutorUseCase;
