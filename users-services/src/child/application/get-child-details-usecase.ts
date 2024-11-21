import { ChildRepository } from "../domain/child-repository";

export class GetChildDetailsUseCase {
    constructor(private readonly childRepository: ChildRepository) { }

    async execute(childId: string) {
        const child = await this.childRepository.getChildDetails(childId);

        if (!child) {
            throw new Error(`Niño ID: ${child} no encontrado`);
        }
        console.log(child);

        return child;
    }
}
