import express, { Application } from 'express';
import morgan from 'morgan';
import { Signale } from "signale";
import cors from 'cors';
import config from './config/config';
import { notificationRouter } from './notificaciones/infrastructure/routes/notification-routes';
import { sendVerificationListener } from './notificaciones/infrastructure/dependencies';
import { connectWithRetry } from './database/mongoDB';

const app: Application = express();
const signale = new Signale();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const port = config.port;
const RABBITMQ_QUEUE = "send_notification";

app.use('/tokens', notificationRouter);

connectWithRetry(10, 10000, () => {
  app.listen(port, () => {
    signale.success(`Users Services running on http://localhost:${port}`);
    // Inicialización del listener de eventos
    sendVerificationListener.listen(RABBITMQ_QUEUE)
      .then(() => signale.success("Listener de 'send_notification' inicializado correctamente"))
      .catch((error: any) => signale.error("Error al inicializar el listener:", error));
  });
});


