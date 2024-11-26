import { AuthRepository } from "../domain/auth-repository";
import { TokenService } from "../domain/token-service";
// f. Uso de Funciones y Librerías Seguras
import { escape } from 'html-escaper';

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
    // 8. Sanitización de entradas:
    // a. Escapado de Caracteres
    // d. Limpieza de Entradas (Input Cleaning) - Trim: Eliminar espacios innecesarios al principio y al final de las cadenas.
    const sanitizedEmail = escape(email.trim());
    const sanitizedPassword = escape(password.trim());

    // 2. Validación de Tipo email y password
    if (!this.isValidEmail(sanitizedEmail)) {
      throw new Error("El formato del correo electrónico es inválido");
    }
    if (!this.isValidPassword(sanitizedPassword)) {
      throw new Error("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número");
    }

    // Validar usuario
    const user = await this.authRepository.validateUser(sanitizedEmail, sanitizedPassword);
    if (!user) {
      //  11. Gestión de Errores Adecuada
      // De manera que no revelan información sensible o que pueda ser explotada
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

  //  5. Validación de patrones y reglas específicas
  // Método para validar formato de correo
  private isValidEmail(email: string): boolean {
    // 8.- b. Filtrado de Entradas: 
    // Whitelisting: Permitir solo ciertos caracteres o patrones.
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }

  // Método para validar requisitos de contraseña
  // 9. Uso de librerías y frameworks de validación
  private isValidPassword(password: string): boolean {
    return password.length >= 8;
  }
}
