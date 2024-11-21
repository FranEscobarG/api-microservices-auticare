import { Tutor } from "./tutor";

export interface TutorRepository {
  getAll(): Promise<Tutor[]>;
  create(tutor: Tutor): Promise<Tutor>;
  getTutorById(tutorId: string): Promise<Tutor | null>;
  updateTutor(tutorId: string, tutor: Partial<Tutor>): Promise<Tutor | null>;
  deleteTutor(tutorId: string): Promise<boolean>;
}

export default TutorRepository;
