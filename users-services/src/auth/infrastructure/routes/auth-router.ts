import { Router } from "express";
import rateLimit from "express-rate-limit";
import { authController } from "../auth-dependencies";

const authRouter = Router();

// Configuración del limitador de tasa para las rutas de autenticación
const authLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutos
	limit: 50, // Límite de 50 solicitudes por IP cada 10 minutos
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
	message: 'Se ha excedido el límite de solicitudes. Inténtalo de nuevo más tarde.'
});

// Middleware para limitar las solicitudes en determinadas ruta
authRouter.post("/login", authLimiter, authController.login.bind(authController));
authRouter.post("/logout", authLimiter, authController.logout.bind(authController));

export { authRouter };
