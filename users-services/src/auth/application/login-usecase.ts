import { AuthRepository } from "../domain/auth-repository";
import { TokenService } from "../domain/token-service";

export class LoginUseCase {
  constructor(
    private authRepository: AuthRepository,
    private tokenService: TokenService
  ) { }

  async execute(email: string, password: string): Promise<{
    token: string;
    userUUid: string;
    userId: string;
    email: string;
    userType: string;
  }> {
    // Validación de entrada
    if (!this.isValidEmail(email)) {
      throw new Error("El formato del correo electrónico es inválido");
    }
    if (!this.isValidPassword(password)) {
      throw new Error("La contraseña debe tener al menos 8 caracteres");
    }

    // Validar usuario
    const user = await this.authRepository.validateUser(email, password);
    if (!user) {
      throw new Error("Error. Correo o contraseña incorrectos.");
    }
    if(!user.verificado || user.fecha_verificacion == null){
      throw new Error("Error. Cuenta no verificada");
    }

    // Generar respuesta
    return {
      token: this.tokenService.generateToken(user.id, user.tipo_usuario),
      userId: user.id_usuario,
      userUUid: user.uuid,
      email: user.correo_electronico, 
      userType: user.tipo_usuario,
    };
  }

  // Método para validar formato de correo
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }

  // Método para validar requisitos de contraseña
  private isValidPassword(password: string): boolean {
    return password.length >= 8;
  }
}
