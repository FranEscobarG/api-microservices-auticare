import { Recommendation } from "../domain/recommendation";
import RecommendationRepository from "../domain/recommendation-repository";

class CreateRecommendationUseCase {
  constructor(private recommendationRepository: RecommendationRepository) {}

  async execute(payload: Omit<Recommendation, "id" | "validada" | "uuid">): Promise<Recommendation> {
    const recommendation = new Recommendation(
      null,
      payload.id_nino,
      payload.categoria,
      payload.consulta,
      payload.recomendacion
    );

    return await this.recommendationRepository.save(recommendation);
  }
}

export default CreateRecommendationUseCase;
