import { Recommendation } from "../domain/recommendation";
import { RecommendationRepository } from "../domain/recommendation-repository";

class GetValidatedUseCase {
  constructor(private recommendationRepository: RecommendationRepository) {}

  async execute(): Promise<Recommendation[]> {
    return await this.recommendationRepository.getAllValidated();
  }
}

export default GetValidatedUseCase;