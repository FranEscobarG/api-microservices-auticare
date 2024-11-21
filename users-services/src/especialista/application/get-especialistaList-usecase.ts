import { Especialista } from "../domain/especialista";
import { EspecialistaRepository } from "../domain/especialista-repository";

class GetEspecialistaListUseCase {
  constructor(private especialistaRepository: EspecialistaRepository) {}

  async execute(): Promise<Especialista[]> {
    return this.especialistaRepository.getAll();
  }
}

export default GetEspecialistaListUseCase;
