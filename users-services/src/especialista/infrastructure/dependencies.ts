import config from "../../config/config";
import { RabbitMQEventBusAdapter } from "../../shared/adapters/rabbitmq-event-bus-adapter";
import CreateEspecialistaUseCase from "../application/create-especialista-usecase";
import DeleteEspecialistaUseCase from "../application/delete-especialista-usecase";
import { GetEspecialistaByID } from "../application/get-especialistaById-usecase";
import GetEspecialistaListUseCase from "../application/get-especialistaList-usecase";
import UpdateEspecialistaUseCase from "../application/update-especialista-usecase";
import EspecialistaController from "./controllers/especialista-controller";
import { PostgreSQLEspecialistaRepository } from "./repositories/postgresql-specialist-repository";

const especialistaRepository = new PostgreSQLEspecialistaRepository;
const eventBus = new RabbitMQEventBusAdapter(config.rabbitURL);

export const getEspecialistaListUseCase = new GetEspecialistaListUseCase(
  especialistaRepository
);

export const createEspecialistaUseCase = new CreateEspecialistaUseCase(
  especialistaRepository, eventBus
);

export const getEspecialistaById = new GetEspecialistaByID(
  especialistaRepository
);

export const updateEspecialista = new UpdateEspecialistaUseCase(
  especialistaRepository
);

export const deleteEspecialista = new DeleteEspecialistaUseCase(
  especialistaRepository
);

export const especialistaController = new EspecialistaController(
  getEspecialistaListUseCase,
  createEspecialistaUseCase,
  getEspecialistaById,
  updateEspecialista,
  deleteEspecialista,
);
