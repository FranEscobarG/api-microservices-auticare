// import { EventBusPort } from "../../shared/ports/event-bus-port";
import { Donacion } from "../domain/donacion";
import { DonacionRepository } from "../domain/donacion-repository";

class SaveDonacionUseCase {
  constructor(private tutorRepository: DonacionRepository,
    // private eventBus: EventBusPort
  ) {}

  async execute(
    donacionPayload: Omit<Donacion, "id" | "uuid">
  ): Promise<Donacion> {
    const donacion = new Donacion(
      null, // Usamos el UUID generado
      donacionPayload.id_pago,
      donacionPayload.id_usuario,
      donacionPayload.cantidad,
      donacionPayload.moneda,
      donacionPayload.estado_pago
    );

    const savedDonation = await this.tutorRepository.save(donacion);

    // await this.eventBus.publishEvent('send_notification', {
    //   uuid: savedDonation.uuid,
    //   recipient: savedDonation.id_usuario,
    //   channel: 'EMAIL'
    // });

    return savedDonation;
  }
}

export default SaveDonacionUseCase;
