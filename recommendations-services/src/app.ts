import express, { Application } from 'express';
import morgan from 'morgan';
import { Signale } from "signale";
import cors from 'cors';
import config from './config/config';
import recommendationRouter from './recommendation/infrastructure/routes/recommendation-router';

const app: Application = express();
const signale = new Signale();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const port = config.port;

app.use('/', recommendationRouter);

app.listen(port, () => {
  signale.success(`Recommendations Services running on http://localhost:${port}`);
});
