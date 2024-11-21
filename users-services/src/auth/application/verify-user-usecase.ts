import { AuthRepository } from "../domain/auth-repository";

export class VerifyUserUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(uuid: string): Promise<void> {
    const fechaVerificacion = new Date(); // Fecha actual
    await this.authRepository.verifyUser(uuid, fechaVerificacion);
  }
}
