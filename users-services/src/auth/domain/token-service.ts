export interface TokenService {
  generateToken(userId: string, type: string): string;
  verifyToken(token: string): any;
  // invalidateToken(token: string): void; // Nueva función para invalidar tokens
}
