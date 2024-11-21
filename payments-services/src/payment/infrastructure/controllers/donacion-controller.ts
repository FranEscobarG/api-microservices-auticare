import { NextFunction, Request, Response } from "express";
import CreateDonacionUseCase from "../../application/create-donation-usecase";
import GetDonacionListUseCase from "../../application/get-donacionList-usecase";
import SaveDonacionUseCase from "../../application/save-donacion-usecase";
import GetDonacionByUserIdUseCase from "../../application/get-donationByUserId-usecase";

class DonacionController {
  constructor(
    private saveDonacionUseCase: SaveDonacionUseCase,
    private createDonacionUseCase: CreateDonacionUseCase,
    private getDonacionListUseCase: GetDonacionListUseCase,
    private getDonacionByUserIdUseCase: GetDonacionByUserIdUseCase,
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, monto } = req.body;
      const result = await this.createDonacionUseCase.execute(userId, monto);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async save(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { user_id, payment_id, status, amount } = req.query;

      const dataPago = {
        id_pago: payment_id as string,
        id_usuario: user_id as string,
        cantidad: parseFloat(amount as string),
        moneda: "MXN",
        estado_pago: status as string,
      };

      const donacion = await this.saveDonacionUseCase.execute(dataPago);
      res.status(201).json(donacion);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log(req.params)
      const donaciones = await this.getDonacionListUseCase.execute();
      res.json(donaciones);
    } catch (error) {
      next(error);
    }
  }

  async getDonationByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.params.id;
      const donaciones = await this.getDonacionByUserIdUseCase.execute(userId);
      res.json(donaciones);
    } catch (error) {
      next(error);
    }
  }
}

export default DonacionController;
