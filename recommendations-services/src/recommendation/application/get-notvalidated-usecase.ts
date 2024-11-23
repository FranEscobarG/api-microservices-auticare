import { Recommendation } from "../domain/recommendation";
import { RecommendationRepository } from "../domain/recommendation-repository";

class GetNotValidatedUseCase {
  constructor(private recommendationRepository: RecommendationRepository) {}

  async execute(): Promise<Recommendation[]> {
    return await this.recommendationRepository.getAllNotValidated();
  }
}

export default GetNotValidatedUseCase;