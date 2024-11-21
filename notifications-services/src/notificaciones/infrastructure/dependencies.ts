import config from "../../config/config";
import { RabbitMQEventBusAdapter } from "../../shared/adapters/rabbitmq-event-bus-adapter";
import { SendWhatsAppTokenUseCase } from "../application/send-whatsapp-token-usecase";
import { VerifyTokenUseCase } from "../application/verify-token-usecase";
import { TwilioNotificationService } from "./adaptadores/twilio-notification-service";
import { NotificationController } from "./controllers/notification-controller";
import { SendVerificationListener } from "./event-listeners/verify-user-listener";
import { MongoNotificationRepository } from "./repositories/mongo-notification-repository";

const notificationMongoRepository = new MongoNotificationRepository();
// Instanciar el servicio de mensajería
const messagingTwilioService = new TwilioNotificationService(); 

const eventBus = new RabbitMQEventBusAdapter(config.rabbitURL);

const sendWhatsAppTokenUseCase = new SendWhatsAppTokenUseCase(
  notificationMongoRepository,
  messagingTwilioService
);
const verifyTokenUseCase = new VerifyTokenUseCase(
  notificationMongoRepository, eventBus
);

// Listeners
export const sendVerificationListener = new SendVerificationListener(sendWhatsAppTokenUseCase, eventBus);

// Crear el controlador de verificación
export const notificationController = new NotificationController(
  sendWhatsAppTokenUseCase,
  verifyTokenUseCase
);
