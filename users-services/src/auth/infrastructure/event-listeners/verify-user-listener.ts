import { VerifyUserUseCase } from "../../application/verify-user-usecase";
import { RabbitMQEventBusAdapter } from "../../../shared/adapters/rabbitmq-event-bus-adapter";

export class VerifyUserListener {
  constructor(
    private verifyUserUseCase: VerifyUserUseCase,
    private eventBus: RabbitMQEventBusAdapter
  ) {}

  async listen(queue: string): Promise<void> {
    await this.eventBus.consumeEvent(queue, async (message: { userUUid: string }) => {
      try {
        console.log(`Evento recibido: ${JSON.stringify(message)}`);
        const { userUUid } = message;
        await this.verifyUserUseCase.execute(userUUid);
        console.log(`Usuario con UUID ${userUUid} verificado exitosamente.`);
      } catch (error) {
        console.error("Error al procesar el evento:", error);
      }
    });
  }
}
