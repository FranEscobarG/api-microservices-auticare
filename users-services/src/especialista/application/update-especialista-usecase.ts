import { Especialista } from "../domain/especialista";
import { EspecialistaRepository } from "../domain/especialista-repository";

class UpdateEspecialistaUseCase {
  constructor(private especialistaRepository: EspecialistaRepository) {}

  async execute(
    especialistaId: string,
    especialistaPayload: Partial<Especialista>
  ): Promise<Especialista> {
    const result = await this.especialistaRepository.updateEspecialista(
      especialistaId,
      especialistaPayload
    );

    if (!result) {
      throw new Error(`Id: ${especialistaId} de especialista no encontrada`);
    }

    return result;
  }
}

export default UpdateEspecialistaUseCase;
