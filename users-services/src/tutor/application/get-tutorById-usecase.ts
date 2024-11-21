import { TutorRepository } from "../domain/tutor-repository";

export class GetTutorByID {
  constructor(private readonly tutorRepository: TutorRepository) {}

  async run(tutorId: string) {
    const tutor = await this.tutorRepository.getTutorById(tutorId);

    if (!tutor) {
      throw new Error(`Id: ${tutorId} de usuario no encontrada`); //Lanza el error
    }
    // En el caso de que exista imprimira el email de este
    console.log(tutor);

    return this.tutorRepository.getTutorById(tutorId);
  }
}
