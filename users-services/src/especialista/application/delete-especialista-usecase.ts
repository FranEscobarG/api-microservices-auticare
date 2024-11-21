import { EspecialistaRepository } from "../domain/especialista-repository";

class DeleteEspecialistaUseCase {
  constructor(private especialistaRepository: EspecialistaRepository) {}

  async execute(especialistaId: string): Promise<boolean> {
    const result = await this.especialistaRepository.deleteEspecialista(
      especialistaId
    );

    if (!result) {
      throw new Error(
        `No se pudo eliminar el especialista con id: ${especialistaId}`
      );
    }

    console.log(`Especialista con id: ${especialistaId} ha sido eliminado`);
    return result; // Devuelve un booleano
  }
}

export default DeleteEspecialistaUseCase;
