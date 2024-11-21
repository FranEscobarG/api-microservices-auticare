import { Request, Response } from "express";

import { LoginUseCase } from "../../application/login-usecase";
import { LogoutUseCase } from "../../application/logout-usecase";

export class AuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private logoutUseCase: LogoutUseCase
  ) {}

  async login(req: Request, res: Response): Promise<void> {
    const { correo, contrasena } = req.body;
    try {
      const result = await this.loginUseCase.execute(correo, contrasena);
      res.status(200).json({ success: true, result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async logout(res: Response): Promise<void> {
    try {
      await this.logoutUseCase.execute();
      res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
  }
  }

  // async logout(req: Request, res: Response): Promise<Response> {
  //   const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado Authorization
  //   if (!token) {
  //     return res.status(400).json({ message: "Token not provided" });
  //   }
  //   await this.logoutUseCase.execute(token);
  //   return res.status(200).json({ message: "Logged out successfully" });
  // }
}
