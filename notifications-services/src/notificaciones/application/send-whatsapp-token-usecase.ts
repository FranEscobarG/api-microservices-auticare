// /application/send-whatsapp-token-usecase.ts
import { Token } from "../domain/entities/token";
import { NotificationRepository } from "../domain/repositories/notification-repository";
import { IMessagingService } from "../domain/services/IMessagingService";

export class SendWhatsAppTokenUseCase {
  constructor(
    private notificationRepository: NotificationRepository,
    private messagingService: IMessagingService
  ) {}

  async execute(userId: string, recipient: string): Promise<void> {
    const activeToken = await this.notificationRepository.findTokenByUserId(userId);
    if (activeToken && activeToken.status === "PENDING") {
      activeToken.status = "EXPIRED";
      await this.notificationRepository.saveToken(activeToken);
    }

    const code = this.generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const newToken = new Token(null, code, new Date(), expiresAt, userId, "PENDING");

    await this.notificationRepository.saveToken(newToken);
    await this.messagingService.sendNotification(recipient, code);
  }

  private generateCode(): string {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }
}
