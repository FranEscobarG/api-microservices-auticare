import express from "express";
import { tutorController } from "../dependencies";
import rateLimit from "express-rate-limit";

const tutorRouter = express.Router();

const authLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutos
	limit: 50, // Límite de 50 solicitudes por IP cada 10 minutos
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
	message: 'Se ha excedido el límite de solicitudes. Inténtalo de nuevo más tarde.'
});

tutorRouter.post("/", authLimiter, tutorController.create.bind(tutorController));

tutorRouter.get("/", tutorController.getAll.bind(tutorController));
tutorRouter.get("/:id", tutorController.getById.bind(tutorController));
tutorRouter.put("/:id", authLimiter, tutorController.update.bind(tutorController));
tutorRouter.delete("/:id", tutorController.delete.bind(tutorController));

export { tutorRouter };
