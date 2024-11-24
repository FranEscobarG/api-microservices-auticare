import express, { Application } from 'express';
import proxy from 'express-http-proxy';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { Signale } from "signale";
import { config } from './config/config';
import { authMiddleware } from './middleware/authMiddleware';

const app: Application = express();
const signale = new Signale();

app.use(morgan('dev'));
app.use(cors());
dotenv.config();

const PORT = config.port;

app.use('/api/v1/users', proxy(config.userServiceURL));
app.use('/api/v1/notifications', proxy(config.notificationServiceURL));
app.use('/api/v1/mining', authMiddleware, proxy(config.miningServiceURL)); // servicio de uso interno
// Rutas protegidas
app.use('/api/v1/payments', authMiddleware, proxy(config.paymentsServiceURL));
app.use('/api/v1/recommendations', authMiddleware, proxy(config.recommendationsServiceURL));


app.listen(PORT, () => {
    signale.success(`API Gateway corriendo en http://localhost:${PORT}`);
});
