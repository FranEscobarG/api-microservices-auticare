import { Recommendation } from "../domain/recommendation";
import { RecommendationRepository } from "../domain/recommendation-repository";

class GetNotValidatedByChildIdUseCase {
  constructor(private recommendationRepository: RecommendationRepository) {}

  async execute(uuid_nino: string): Promise<Recommendation[]> {
    return await this.recommendationRepository.getNotValidatedByChildId(uuid_nino);
  }
}

export default GetNotValidatedByChildIdUseCase;