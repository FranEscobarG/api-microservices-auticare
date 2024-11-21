import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import CreateEspecialistaUseCase from "../../application/create-especialista-usecase";
import DeleteEspecialistaUseCase from "../../application/delete-especialista-usecase";
import { GetEspecialistaByID } from "../../application/get-especialistaById-usecase";
import GetEspecialistaListUseCase from "../../application/get-especialistaList-usecase";
import UpdateEspecialistaUseCase from "../../application/update-especialista-usecase";

class EspecialistaController {
  constructor(
    private getEspecialistaListUseCase: GetEspecialistaListUseCase,
    private createEspecialistaUseCase: CreateEspecialistaUseCase,
    private getEspecialistaByID: GetEspecialistaByID,
    private updateEspecialistaUseCase: UpdateEspecialistaUseCase,
    private deleteEspecialistaUseCase: DeleteEspecialistaUseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let especialistaPayload = req.body;
      // Validación de entrada
    if (!this.isValidEmail(especialistaPayload.correo)) {
      throw new Error("El formato del correo electrónico es inválido");
    }
    if (!this.isValidPassword(especialistaPayload.contrasena)) {
      throw new Error("La contraseña debe tener al menos 8 caracteres");
    }
      const hashedPassword = await bcrypt.hash(especialistaPayload.contrasena, 10); // Cifrar la contraseña

      // Reemplazar la contraseña cifrada
      especialistaPayload = {
        ...especialistaPayload,
        contrasena: hashedPassword,
      };

      const especialista = await this.createEspecialistaUseCase.execute(
        especialistaPayload
      );
      res.status(201).json(especialista);
    } catch (error) {
      next(error);
    }
  }

  // Método para validar formato de correo
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }
  // Método para validar requisitos de contraseña
  private isValidPassword(password: string): boolean {
    return password.length >= 8;
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log(req.accepted)
      const especialista = await this.getEspecialistaListUseCase.execute();
      res.json(especialista);
    } catch (error) {
      next(error);
    }
  }

  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const especialista = await this.getEspecialistaByID.run(req.params.id);
      res.json(especialista);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const especialistaId = req.params.id;
      const especialistaPayload = req.body;
      const updatedEspecialista = await this.updateEspecialistaUseCase.execute(
        especialistaId,
        especialistaPayload
      );
      res.json(updatedEspecialista);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const especialistaId = req.params.id;
      const result = await this.deleteEspecialistaUseCase.execute(
        especialistaId
      );
      res.status(result ? 200 : 404).json({ success: result });
    } catch (error) {
      next(error);
    }
  }
}

export default EspecialistaController;
