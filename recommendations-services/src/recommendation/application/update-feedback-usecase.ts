// DEJAR ESTA AL FINAL - DEPENDE DEL ANALISIS DE TEXTO (MINERIA)
import { RecommendationRepository } from "../domain/recommendation-repository";

class UpdateFeedbackUseCase {
  constructor(private recommendationRepository: RecommendationRepository) {}

  /* PODRIA RECIBIR TAMBIEN EL ID DEL NIÑO Y HACER UN GET DE RECOMENDACION POR ID DEL NIÑO,
  PARA ASEGURARSE DE QUE ESA RECOMENDACION DEL ID, COINCIDE QUE ES DEL NIÑO A QUIEN SE MANDO SU ID */
  async execute(uuid: string, comentario: string, utilidad: number): Promise<void> {
    await this.recommendationRepository.updateFeedback(uuid, comentario, utilidad);
  }
}

export default UpdateFeedbackUseCase;
