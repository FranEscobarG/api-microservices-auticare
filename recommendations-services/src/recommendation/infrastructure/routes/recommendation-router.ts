// recommendation-router.ts
import { Router } from "express";
import { recommendationController } from "../../dependencies";

const recommendationRouter = Router();

// Crear una nueva recomendación
recommendationRouter.post("/", recommendationController.create.bind(recommendationController));

// Validar una recomendación
recommendationRouter.patch("/validate", recommendationController.validate.bind(recommendationController));

// Actualizar feedback de una recomendación
recommendationRouter.patch("/feedback/", recommendationController.updateFeedback.bind(recommendationController));

// Obtener todas las recomendaciones no validadas
recommendationRouter.get("/not-validated", recommendationController.getAllNotValidated.bind(recommendationController));

// Obtener recomendaciones no validadas por ID de niño
recommendationRouter.get("/not-validated/child/:id_nino", recommendationController.getNotValidatedByChildId.bind(recommendationController));

// Obtener todas las recomendaciones no validadas
recommendationRouter.get("/validated", recommendationController.getAllValidated.bind(recommendationController));

// Obtener recomendaciones validadas por especialista
recommendationRouter.get("/validated/specialist/:id_especialista", recommendationController.getValidatedBySpecialist.bind(recommendationController));

// Obtener recomendaciones validadas por ID de niño
recommendationRouter.get("/validated/child/:id_nino", recommendationController.getValidatedByChildId.bind(recommendationController));

// Obtener predicciones de las recomendaciones validadas por ID de niño
recommendationRouter.get("/validated/predictions/:id_nino", recommendationController.getPredictionsByChildId.bind(recommendationController));

export default recommendationRouter;
