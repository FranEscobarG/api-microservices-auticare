import { NextFunction, Request, Response } from "express";
import { SendWhatsAppTokenUseCase } from "../../application/send-whatsapp-token-usecase";
import { VerifyTokenUseCase } from "../../application/verify-token-usecase";

export class NotificationController {
  constructor(
    private sendWhatsAppTokenUseCase: SendWhatsAppTokenUseCase,
    private verifyTokenUseCase: VerifyTokenUseCase
  ) {}

  async sendVerification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId, phoneNumber } = req.body;
      await this.sendWhatsAppTokenUseCase.execute(userId, phoneNumber);
      res.status(200).json({ message: "Token enviado por WhatsApp" });
    } catch (error: any) {
      next(error.message);
    }
  }

  async verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { token } = req.body;
      const isValid = await this.verifyTokenUseCase.execute(token);

      if (!isValid) {
        res.status(400).json({ message: "Token no válido o expirado" });
        return;
      }

      res.status(200).json({ message: "Verificación exitosa" });
    } catch (error) {
      next(error);
    }
  }
}

// FALTA TODA LA LOGICA DE VERIFICACION, RECIBIR EL CODE Y VALIDAR CON LA BUSQUEDA