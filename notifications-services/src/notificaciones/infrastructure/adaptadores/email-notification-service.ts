import nodemailer from "nodemailer";
import { IMessagingService } from "../../domain/services/IMessagingService";
import config from "../../../config/config";

export const transporter = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: config.EMAIL_PORT,
  // secure: true,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASSWORD,
  },
});

export class EmailNotificationService implements IMessagingService {
  async sendNotification(
    recipient: string,
    message: string
  ): Promise<void> {
    console.log("Email "+recipient+" - Mensaje: "+message)
    await transporter.sendMail({
      from: "auticare.chis@gmail.com",
      to: recipient,
      subject: "Mensaje de Auticare",
      text: message,
    });
  }
}

// "Gracias por tu donativo. Con el ayudas a Auticare crecer"
