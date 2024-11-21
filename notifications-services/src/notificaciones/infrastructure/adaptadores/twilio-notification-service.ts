import { Twilio } from "twilio";
import { IMessagingService } from "../../domain/services/IMessagingService";
import config from "../../../config/config";

export const twilioClient = new Twilio(
  config.TWILIO_ACCOUNT_SID,
  config.TWILIO_AUTH_TOKEN
);


export class TwilioNotificationService implements IMessagingService {
  async sendNotification(
    recipient: string,
    code: string
  ): Promise<void> {
    console.log("Phone "+recipient+" - code: "+code)
    await twilioClient.messages.create({
      body: code,
      from: `whatsapp:${config.TWILIO_PHONE_NUMBER}`,
      to: `whatsapp:+521${recipient}`,
    });
  }
}
