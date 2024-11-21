// /domain/repositories/notification-repository.ts
import { Token } from "../entities/token";

export interface NotificationRepository {
  saveToken(token: Token): Promise<void>;
  findTokenByCode(code: string): Promise<Token | null>;
  findTokenByUserId(userId: string): Promise<Token | null>;
  updateTokenStatus(tokenId: string, status: string): Promise<void>;
}
