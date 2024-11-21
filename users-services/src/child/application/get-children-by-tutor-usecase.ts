import { Child } from "../domain/child";
import { ChildRepository } from "../domain/child-repository";

export class GetChildrenByTutorUseCase {
    constructor(private readonly childRepository: ChildRepository) {}

    async execute(tutorId: string): Promise<Child[]> {
        return this.childRepository.getChildrenByTutor(tutorId);
    }
}
