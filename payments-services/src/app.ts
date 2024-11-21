import express, { Application } from 'express';
import morgan from 'morgan';
import { Signale } from "signale";
import cors from 'cors';
import config from './config/config';
import { donationRouter } from './payment/infrastructure/routes/donacion-router';

const app: Application = express();
const signale = new Signale();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const port = config.port;

app.use("/", donationRouter);

app.listen(port, () => {
  signale.success(`Donations Services running on http://localhost:${port}`);
});
