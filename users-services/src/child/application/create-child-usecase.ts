import { Child } from "../domain/child";
import { ChildRepository } from "../domain/child-repository";

export class CreateChildUseCase {
    constructor(private childRepository: ChildRepository) {}

    async execute(childPayload: Omit<Child, "id" & "uuid">): Promise<Child> {
        const child = new Child(
            null, 
            childPayload.id_tutor, 
            childPayload.nombre, 
            childPayload.apellido_paterno,
            childPayload.apellido_materno,
            childPayload.sexo,
            childPayload.fecha_nacimiento, 
            childPayload.tipo_autismo,
            childPayload.informacion_medica,
        );
        const createdChild = await this.childRepository.createChild(child);

        return createdChild;
    }
}
