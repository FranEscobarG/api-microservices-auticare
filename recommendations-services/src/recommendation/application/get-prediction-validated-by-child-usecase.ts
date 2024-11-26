import { Recommendation } from "../domain/recommendation";
import { RecommendationRepository } from "../domain/recommendation-repository";
import MiningService from "../infrastructure/adapters/mining-service";


class GetValidatedPredictionByChildIdUseCase {
  constructor(private recommendationRepository: RecommendationRepository) {}

  async execute(uuid_nino: string): Promise<Recommendation[]> {
    // OBTENEMOS LA DATA QUE SE LE ENVIARA AL SERVICIO DE LA PREDICCIÓN
    const recommendations = await this.recommendationRepository.getValidatedByChildId(uuid_nino);
    
    // Enviar datos al servicio de predicción
    const predictions = await MiningService.predictRecommendations(recommendations);

    // Retornar las predicciones
    return predictions;

  }
}

export default GetValidatedPredictionByChildIdUseCase;