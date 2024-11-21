import { Tutor } from "../domain/tutor";
import { TutorRepository } from "../domain/tutor-repository";

class GetTutorListUseCase {
  constructor(private tutorRepository: TutorRepository) {}

  async execute(): Promise<Tutor[]> {
    return this.tutorRepository.getAll();
  }
}

export default GetTutorListUseCase;
