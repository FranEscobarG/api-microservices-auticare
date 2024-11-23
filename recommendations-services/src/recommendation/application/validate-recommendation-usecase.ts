import RecommendationRepository from "../domain/recommendation-repository";

class ValidateRecommendationUseCase {
  constructor(private recommendationRepository: RecommendationRepository) {}

  async execute(uuid: string, id_especialista: string): Promise<void> {
    await this.recommendationRepository.updateValidation(uuid, id_especialista);
  }
}

export default ValidateRecommendationUseCase;
