import { RabbitMQEventBusAdapter } from "../../shared/adapters/rabbitmq-event-bus-adapter";
import CreateTutorUseCase from "../application/create-tutor-usecase";
import DeleteTutorUseCase from "../application/delete-tutor-usecase";
import { GetTutorByID } from "../application/get-tutorById-usecase";
import GetTutorListUseCase from "../application/get-tutorlist-usecase";
import UpdateTutorUseCase from "../application/update-tutor-usecase";
import TutorController from "./controllers/tutor-controller";
import { PostgreSQLTutorRepository } from "./repositories/postgresql-tutor-repository";
import config from "../../config/config";

const tutorRepository = new PostgreSQLTutorRepository();
const eventBus = new RabbitMQEventBusAdapter(config.rabbitURL);

export const getTutorListUseCase = new GetTutorListUseCase(tutorRepository);
export const createTutorUseCase = new CreateTutorUseCase(tutorRepository, eventBus);
export const getTutorById = new GetTutorByID(tutorRepository);
export const updateTutor = new UpdateTutorUseCase(tutorRepository);
export const deleteTutor = new DeleteTutorUseCase(tutorRepository);

export const tutorController = new TutorController(
  getTutorListUseCase,
  createTutorUseCase,
  getTutorById,
  updateTutor,
  deleteTutor
);
