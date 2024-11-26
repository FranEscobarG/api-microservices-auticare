import { AuthRepository } from "../domain/auth-repository";
import { isUUID } from "validator";

export class VerifyUserUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(uuid: string): Promise<void> {
    // b. Validación de Consistencia
    if (!isUUID(uuid)) {
      throw new Error("El UUID proporcionado no es válido");
    }

    const fechaVerificacion = new Date(); // Fecha actual
    await this.authRepository.verifyUser(uuid, fechaVerificacion);
  }
}