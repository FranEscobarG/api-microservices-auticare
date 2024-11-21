import jwt from "jsonwebtoken";

import { TokenService } from "../../domain/token-service";

export class JWTTokenService implements TokenService {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  generateToken(userId: string, type: string): string {
    return jwt.sign({ userId, type }, this.secretKey, { expiresIn: "1h" });
  }

  verifyToken(token: string): any {
    return jwt.verify(token, this.secretKey);
  }
}
