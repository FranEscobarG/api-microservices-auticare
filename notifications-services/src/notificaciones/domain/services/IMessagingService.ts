export interface IMessagingService {
  // Método para enviar el código de verificación a un número de teléfono
  sendNotification(recipient: string, message: string): Promise<void>;
}
