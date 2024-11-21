import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

import CreateTutorUseCase from "../../application/create-tutor-usecase";
import DeleteTutorUseCase from "../../application/delete-tutor-usecase";
import { GetTutorByID } from "../../application/get-tutorById-usecase";
import GetTutorListUseCase from "../../application/get-tutorlist-usecase";
import UpdateTutorUseCase from "../../application/update-tutor-usecase";

class TutorController {
  constructor(
    private getTutorListUseCase: GetTutorListUseCase,
    private createTutorUseCase: CreateTutorUseCase,
    private getTutorByID: GetTutorByID,
    private updateTutorUseCase: UpdateTutorUseCase,
    private deleteTutorUseCase: DeleteTutorUseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let userPayload = req.body; // Se obtiene el payload
      const hashedPassword = await bcrypt.hash(userPayload.contrasena, 10); // Cifrar la contraseña

      // Reemplazar la contraseña cifrada y agregar el UUID en el payload
      userPayload = {
        ...userPayload,
        contrasena: hashedPassword,
      };

      const user = await this.createTutorUseCase.execute(userPayload);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log(req)
      const users = await this.getTutorListUseCase.execute();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.getTutorByID.run(req.params.id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.params.id;
      const userPayload = req.body;
      const updatedUser = await this.updateTutorUseCase.execute(
        userId,
        userPayload
      );
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.params.id;
      const result = await this.deleteTutorUseCase.execute(userId);
      res.status(result ? 200 : 404).json({ success: result });
    } catch (error) {
      next(error);
    }
  }
}

export default TutorController;
