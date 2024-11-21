export class LogoutUseCase {
  // Podría estar vacío si no manejas una lista de tokens revocados
  async execute() {
    return;
  }
}

// import { TokenService } from "../domain/token-service";

// export class LogoutUseCase {
//   constructor(private tokenService: TokenService) {}

//   async execute(token: string) {
//     // Invalida el token agregándolo a la lista negra
//     this.tokenService.invalidateToken(token);
//     return;
//   }
// }
