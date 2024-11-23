import { Recommendation } from "../domain/recommendation";
import { RecommendationRepository } from "../domain/recommendation-repository";

class GetValidatedBySpecialistUseCase {
  constructor(private recommendationRepository: RecommendationRepository) {}

  async execute(uuid_especialista: string): Promise<Recommendation[]> {
    return await this.recommendationRepository.getValidatedBySpecialist(uuid_especialista);
  }
}

export default GetValidatedBySpecialistUseCase;