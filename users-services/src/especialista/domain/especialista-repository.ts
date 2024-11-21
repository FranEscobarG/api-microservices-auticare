import { Especialista } from "./especialista";

export interface EspecialistaRepository {
  getAll(): Promise<Especialista[]>;
  create(especialista: Especialista): Promise<Especialista>;
  getEspecialistaById(especialistaId: string): Promise<Especialista | null>;
  updateEspecialista(especialistaId: string, especialista: Partial<Especialista>): Promise<Especialista | null>;
  deleteEspecialista(especialistaId: string): Promise<boolean>;
}

export default EspecialistaRepository;
