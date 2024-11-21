import { SendWhatsAppTokenUseCase } from "../../application/send-whatsapp-token-usecase";
import { RabbitMQEventBusAdapter } from "../../../shared/adapters/rabbitmq-event-bus-adapter";

export class SendVerificationListener {
  constructor(
    private sendWhatsAppTokenUseCase: SendWhatsAppTokenUseCase,
    private eventBus: RabbitMQEventBusAdapter
  ) {}

  async listen(queue: string): Promise<void> {
    await this.eventBus.consumeEvent(queue, async (message: { uuid: string, recipient: string, channel: string }) => {
      try {
        console.log(`Evento recibido: ${JSON.stringify(message)}`);
        const { uuid, recipient, channel } = message;
        // Verificar si el canal es EMAIL o WHATSAPP
        if (channel === 'WHATSAPP') {
          await this.sendWhatsAppTokenUseCase.execute(uuid, recipient);
          console.log(`WhastApp enviado con exito`);
        } else if (channel === 'EMAIL') {
          // await this.sendWhatsAppTokenUseCase.execute(uuid, recipient);
          console.log(`Email enviado con exito`);
        } else {
          throw new Error("Channel not supported");
        }
      } catch (error) {
        console.error("Error al procesar el evento:", error);
      }
    });
  }
}
