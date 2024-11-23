import { Recommendation } from "../domain/recommendation";
import { RecommendationRepository } from "../domain/recommendation-repository";

class GetValidatedByChildIdUseCase {
  constructor(private recommendationRepository: RecommendationRepository) {}

  async execute(uuid_nino: string): Promise<Recommendation[]> {
    return await this.recommendationRepository.getValidatedByChildId(uuid_nino);
  }
}

export default GetValidatedByChildIdUseCase;