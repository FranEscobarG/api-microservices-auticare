import { Request, Response, NextFunction } from "express";
import CreateRecommendationUseCase from "../../application/create-recommendation-usecase";
import ValidateRecommendationUseCase from "../../application/validate-recommendation-usecase";
import UpdateFeedbackUseCase from "../../application/update-feedback-usecase";
import GetNotValidatedUseCase from "../../application/get-notvalidated-usecase";
import GetNotValidatedByChildIdUseCase from "../../application/get-notvalidated-by-child-id-usecase";
import GetValidatedBySpecialistUseCase from "../../application/get-validated-by-specialist-usecase";
import GetValidatedByChildIdUseCase from "../../application/get-validated-by-child-id-usecase";

class RecommendationController {
  constructor(
    private createRecommendationUseCase: CreateRecommendationUseCase,
    private validateRecommendationUseCase: ValidateRecommendationUseCase,
    private updateFeedbackUseCase: UpdateFeedbackUseCase,
    private getNotValidatedUseCase: GetNotValidatedUseCase,
    private getNotValidatedByChildIdUseCase: GetNotValidatedByChildIdUseCase,
    private getValidatedBySpecialistUseCase: GetValidatedBySpecialistUseCase,
    private getValidatedByChildIdUseCase: GetValidatedByChildIdUseCase,
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const recommendation = await this.createRecommendationUseCase.execute(req.body);
      res.status(201).json(recommendation);
    } catch (error) {
      next(error);
    }
  }

  async validate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, id_especialista } = req.body;
      await this.validateRecommendationUseCase.execute(id, id_especialista);
      res.status(200).json({ success: true, message: "Recomendacion validada exitosamente." });
    } catch (error) {
      next(error);
    }
  }

  async updateFeedback(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, comentario, utilidad } = req.body;
      await this.updateFeedbackUseCase.execute(id, comentario, utilidad);
      res.status(200).json({ success: true, message: "Feedback enviado exitosamente." });
    } catch (error) {
      next(error);
    }
  }

  async getAllNotValidated(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        console.log(req.params)
      const recommendations = await this.getNotValidatedUseCase.execute();
      res.json(recommendations);
    } catch (error) {
      next(error);
    }
  }

  async getNotValidatedByChildId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id_nino } = req.params;
      const recommendations = await this.getNotValidatedByChildIdUseCase.execute(id_nino);
      res.json(recommendations);
    } catch (error) {
      next(error);
    }
  }

  async getValidatedBySpecialist(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id_especialista } = req.params;
      const recommendations = await this.getValidatedBySpecialistUseCase.execute(id_especialista);
      res.json(recommendations);
    } catch (error) {
      next(error);
    }
  }

  async getValidatedByChildId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id_nino } = req.params;
      const recommendations = await this.getValidatedByChildIdUseCase.execute(id_nino);
      res.json(recommendations);
    } catch (error) {
      next(error);
    }
  }
}

export default RecommendationController;
