import express from 'express';
import proxy from 'express-http-proxy';
import { config } from './config/config';
import { authMiddleware } from './middleware/authMiddleware';

const router = express.Router();

router.use('/auth', proxy(config.authServiceURL));
router.use('/users', proxy(config.userServiceURL));
router.use('/notifications', proxy(config.notificationServiceURL));
// Rutas protegidas
// router.use(authMiddleware());
router.use('/payments', proxy(config.paymentsServiceURL));

export default router;
