import { MySQLRecommendationRepository } from "./infrastructure/repositories/mysql-recommendation-repository";
import UpdateFeedbackUseCase from "./application/update-feedback-usecase";
import GetNotValidatedUseCase from "./application/get-notvalidated-usecase";
import GetNotValidatedByChildIdUseCase from "./application/get-notvalidated-by-child-id-usecase";
import GetValidatedBySpecialistUseCase from "./application/get-validated-by-specialist-usecase";
import GetValidatedByChildIdUseCase from "./application/get-validated-by-child-id-usecase";
import RecommendationController from "./infrastructure/controllers/recommendation-controller";
import CreateRecommendationUseCase from "./application/create-recommendation-usecase";
import ValidateRecommendationUseCase from "./application/validate-recommendation-usecase";

const recommendationRepository = new MySQLRecommendationRepository();

export const createRecommendationUseCase = new CreateRecommendationUseCase(recommendationRepository);
export const validateRecommendationUseCase = new ValidateRecommendationUseCase(recommendationRepository);
export const updateFeedbackUseCase = new UpdateFeedbackUseCase(recommendationRepository);
export const getNotValidatedUseCase = new GetNotValidatedUseCase(recommendationRepository);
export const getNotValidatedByChildIdUseCase = new GetNotValidatedByChildIdUseCase(recommendationRepository);
export const getValidatedBySpecialistUseCase = new GetValidatedBySpecialistUseCase(recommendationRepository);
export const getValidatedByChildIdUseCase = new GetValidatedByChildIdUseCase(recommendationRepository);

export const recommendationController = new RecommendationController(
    createRecommendationUseCase,
    validateRecommendationUseCase,
    updateFeedbackUseCase,
    getNotValidatedUseCase,
    getNotValidatedByChildIdUseCase,
    getValidatedBySpecialistUseCase,
    getValidatedByChildIdUseCase
)
