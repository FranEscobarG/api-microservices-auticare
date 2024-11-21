import { LoginUseCase } from "../application/login-usecase";
import { LogoutUseCase } from "../application/logout-usecase";
import { AuthController } from "../infrastructure/controllers/auth-controller";
import { JWTTokenService } from "./repositories/jwt-token-service";
import { PostgreSQLAuthRepository } from "./repositories/postgres-auth-repository";
import { RabbitMQEventBusAdapter } from "../../shared/adapters/rabbitmq-event-bus-adapter";
import { VerifyUserUseCase } from "../application/verify-user-usecase";
import { VerifyUserListener } from "./event-listeners/verify-user-listener";
import config from "../../config/config";

const secretKey = process.env.JWT_SECRET || "supersecretkey";

const authRepository = new PostgreSQLAuthRepository(); 
const tokenService = new JWTTokenService(secretKey);
const eventBus = new RabbitMQEventBusAdapter(config.rabbitURL);

const loginUseCase = new LoginUseCase(authRepository, tokenService);
const logoutUseCase = new LogoutUseCase();
const verifyUserUseCase = new VerifyUserUseCase(authRepository);

// Listeners
const verifyUserListener = new VerifyUserListener(verifyUserUseCase, eventBus);

const authController = new AuthController(loginUseCase, logoutUseCase);

export { authController, verifyUserListener };
