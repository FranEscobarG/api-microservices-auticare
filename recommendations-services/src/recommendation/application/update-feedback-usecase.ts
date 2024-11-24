import { RecommendationRepository } from "../domain/recommendation-repository";
import MiningService from "../infrastructure/adapters/mining-service";

class UpdateFeedbackUseCase {
  constructor(private recommendationRepository: RecommendationRepository) {}

  async execute(uuid: string, comentario: string): Promise<void> {
    // Obtener la polaridad desde el servicio de minería
    const utilidad = await MiningService.analyzeSentiment(comentario);

    if (utilidad == null) {
      throw new Error("Error. Su comentario deberia proporcionar una retroalimentacion de la recomendacion. Ingrese una opinión.");
    }

    // Actualizar el comentario y la utilidad en la base de datos
    await this.recommendationRepository.updateFeedback(uuid, comentario, utilidad);
  }
}

export default UpdateFeedbackUseCase;
