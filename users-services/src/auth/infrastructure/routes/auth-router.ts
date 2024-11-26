import { Router } from "express";
import rateLimit from "express-rate-limit";
import { authController } from "../auth-dependencies";

const authRouter = Router();

// Configuración del limitador de tasa para las rutas de autenticación
const authLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutos
	limit: 5, // 5 intentos de login por IP cada 5 minutos
	message: 'Demasiados intentos de inicio de sesión. Por favor, inténtalo de nuevo más tarde.',
	headers: true,  // Devuelve información sobre el límite en los headers
});


// Middleware para limitar las solicitudes en determinadas ruta
authRouter.post("/login", authLimiter, authController.login.bind(authController));
authRouter.post("/logout", authLimiter, authController.logout.bind(authController));

export { authRouter };
