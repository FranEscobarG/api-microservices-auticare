import { TutorRepository } from "../domain/tutor-repository";

class DeleteTutorUseCase {
  constructor(private tutorRepository: TutorRepository) {}

  async execute(tutorId: string): Promise<boolean> {
    const result = await this.tutorRepository.deleteTutor(tutorId);

    if (!result) {
      throw new Error(`No se pudo eliminar el tutor con id: ${tutorId}`);
    }

    console.log(`Tutor con id: ${tutorId} ha sido eliminado`);
    return result; // Devuelve un booleano
  }
}

export default DeleteTutorUseCase;
