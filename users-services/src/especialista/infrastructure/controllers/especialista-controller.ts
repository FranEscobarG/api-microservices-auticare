import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import CreateEspecialistaUseCase from "../../application/create-especialista-usecase";
import DeleteEspecialistaUseCase from "../../application/delete-especialista-usecase";
import { GetEspecialistaByID } from "../../application/get-especialistaById-usecase";
import GetEspecialistaListUseCase from "../../application/get-especialistaList-usecase";
import UpdateEspecialistaUseCase from "../../application/update-especialista-usecase";
import Joi from "joi";

const especialistaSchema = Joi.object({
  nombre: Joi.string().required(),
  apellido_paterno: Joi.string().required(),
  apellido_materno: Joi.string().required(),
  sexo: Joi.string().valid("Masculino", "Femenino").required(),
  correo: Joi.string().email().required(),
  contrasena: Joi.string().min(8).max(20).required(),
  telefono: Joi.string().pattern(/^\d{10}$/).required(),
  fecha_nacimiento: Joi.date().iso().required(),
  titulo_especialidad: Joi.string().optional(),
  cedula_profesional: Joi.string().optional(),
});


class EspecialistaController {
  constructor(
    private getEspecialistaListUseCase: GetEspecialistaListUseCase,
    private createEspecialistaUseCase: CreateEspecialistaUseCase,
    private getEspecialistaByID: GetEspecialistaByID,
    private updateEspecialistaUseCase: UpdateEspecialistaUseCase,
    private deleteEspecialistaUseCase: DeleteEspecialistaUseCase
  ) { }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let especialistaPayload = req.body;
      // 2. Validación de tipo
      const { error } = especialistaSchema.validate(especialistaPayload);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return 
      }


      // e. Codificación de Entradas (Input Encoding) - Base64
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
