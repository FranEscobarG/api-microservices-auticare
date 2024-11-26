import { NotificationRepository } from "../domain/repositories/notification-repository";
import { EventBusPort } from "../../shared/ports/event-bus-port";

export class VerifyTokenUseCase {
  constructor(
    private notificationRepository: NotificationRepository,
    private eventBus: EventBusPort
  ) {}

  async execute(code: string): Promise<boolean> {
    console.log("Codigo: ", code)
    const foundToken = await this.notificationRepository.findTokenByCode(code);
    console.log("Token en proceso: ", foundToken)

    if (!foundToken) {
      return false; // Token no encontrado
    }
    // Verificar si el token es válido y está dentro de su vigencia
    if (foundToken.status === "USED" || foundToken.status === "EXPIRED") {
      return false;
    }
    // 6. Validación cruzada: se valida que la fecha actual no sea mayor que la de expiracion
    if (new Date() > foundToken.expiresAt) {
      await this.notificationRepository.updateTokenStatus(foundToken.id!, "EXPIRED");
      return false;
    }

    // Actualizar el estado del token a "inhabilitado"
    await this.notificationRepository.updateTokenStatus(foundToken.id!, "USED");

    // Actualizar el estado de verificación del usuario (verified_at)
    await this.eventBus.publishEvent('users.verified', {
      userUUid: foundToken.userId,
    });

    return true;
  }
}
