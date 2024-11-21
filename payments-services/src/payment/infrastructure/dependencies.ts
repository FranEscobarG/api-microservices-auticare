import CreateDonacionUseCase from "../application/create-donation-usecase";
import GetDonacionListUseCase from "../application/get-donacionList-usecase";
import SaveDonacionUseCase from "../application/save-donacion-usecase";
import DonacionController from "./controllers/donacion-controller";
import { MercadoPagoServiceImpl } from "./adapters/mercadopago-service-impl";
import { MySQLDonacionRepository } from "./repositories/mysql-donacion-repository";
import GetDonacionByUserIdUseCase from "../application/get-donationByUserId-usecase";
// import { RabbitMQEventBusAdapter } from "../../shared/adapters/rabbitmq-event-bus-adapter";
// import config from "../../config/config";

const donationMySQLRepository = new MySQLDonacionRepository();
// const eventBus = new RabbitMQEventBusAdapter(config.rabbitURL);

const mercadoPagoService = new MercadoPagoServiceImpl();

export const saveDonacionUseCase = new SaveDonacionUseCase(donationMySQLRepository, /*eventBus*/);

const createDonacionUseCase = new CreateDonacionUseCase(mercadoPagoService);

export const getDonacionListUseCase = new GetDonacionListUseCase(donationMySQLRepository);

export const getDonacionByUserId = new GetDonacionByUserIdUseCase(donationMySQLRepository);

export const donacionController = new DonacionController(
  saveDonacionUseCase,
  createDonacionUseCase,
  getDonacionListUseCase,
  getDonacionByUserId
);
