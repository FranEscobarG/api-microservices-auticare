export interface AuthRepository {
  validateUser(email: string, password: string): Promise<any>;
  verifyUser(uuid: string, fechaVerificacion: Date): Promise<void>;
}
