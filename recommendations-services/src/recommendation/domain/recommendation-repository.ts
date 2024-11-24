import { Recommendation } from "./recommendation";

export interface RecommendationRepository {
  save(recommendation: Recommendation): Promise<Recommendation>;
  updateValidation(uuid: string, id_especialista: string): Promise<void>;
  updateFeedback(uuid: string, comentario: string, utilidad: number): Promise<void>;
  getAllNotValidated(): Promise<Recommendation[]>;
  getAllValidated(): Promise<Recommendation[]>;
  getNotValidatedByChildId(uuid_nino: string): Promise<Recommendation[]>;
  getValidatedBySpecialist(uuid_especialista: string): Promise<Recommendation[]>;
  getValidatedByChildId(uuid_nino: string): Promise<Recommendation[]>;
}

export default RecommendationRepository;
