import { Especialista } from "../domain/especialista";
import { EspecialistaRepository } from "../domain/especialista-repository";
import { EventBusPort } from "../../shared/ports/event-bus-port";

class CreateEspecialistaUseCase {
  constructor(
    private especialistaRepository: EspecialistaRepository,
    private eventBus: EventBusPort
  ) {}

  async execute(especialistaPayload: Omit<Especialista, "id" | "uuid">): Promise<Especialista> {
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
}

export default CreateEspecialistaUseCase;
