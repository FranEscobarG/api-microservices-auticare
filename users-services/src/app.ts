import express, { Application } from 'express';
import morgan from 'morgan';
import { Signale } from "signale";
import cors from 'cors';
import config from './config/config';
import { especialistaRouter } from "./especialista/infrastructure/routes/especialista-router";
import { tutorRouter } from "./tutor/infrastructure/routes/tutor-router";
import { verifyUserListener } from "./auth/infrastructure/auth-dependencies";
import { authRouter } from './auth/infrastructure/routes/auth-router';
import { childRouter } from './child/infrastructure/routes/child-router';

const app: Application = express();
const signale = new Signale();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const port = config.port;
const RABBITMQ_QUEUE = "users.verified";

// Rutas
app.use("/tutors", tutorRouter);
app.use("/childs", childRouter);
app.use("/specialists", especialistaRouter);
app.use("/auth", authRouter);

// Inicialización del servidor HTTP
app.listen(port, () => {
    signale.success(`Users Services running on http://localhost:${port}`);

    // Inicialización del listener de eventos
    verifyUserListener.listen(RABBITMQ_QUEUE)
        .then(() => signale.success("Listener de 'users.verified' inicializado correctamente"))
        .catch((error: any) => signale.error("Error al inicializar el listener:", error));
});
