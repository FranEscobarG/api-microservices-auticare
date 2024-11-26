import express from "express";
import { especialistaController } from "../dependencies";
import rateLimit from "express-rate-limit";

const especialistaRouter = express.Router();

// Configuración del limitador de tasa para las rutas 
const authLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutos
	limit: 50, // Límite de 50 solicitudes por IP cada 10 minutos
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
	message: 'Se ha excedido el límite de solicitudes. Inténtalo de nuevo más tarde.'
});

especialistaRouter.post("/", authLimiter, especialistaController.create.bind(especialistaController));

especialistaRouter.get("/", especialistaController.getAll.bind(especialistaController));
especialistaRouter.get("/:id", especialistaController.getById.bind(especialistaController));
especialistaRouter.put("/:id", authLimiter, especialistaController.update.bind(especialistaController));
especialistaRouter.delete("/:id", especialistaController.delete.bind(especialistaController));

export { especialistaRouter };
