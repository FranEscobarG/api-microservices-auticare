// /infrastructure/repositories/mongo-notification-repository.ts
import { Token } from "../../domain/entities/token";
import { NotificationRepository } from "../../domain/repositories/notification-repository";
import { TokenModel } from "../schemas/token-schema";

export class MongoNotificationRepository implements NotificationRepository {
  // Guardar un nuevo token
  async saveToken(token: Token): Promise<void> {
    const newToken = new TokenModel({
      userId: token.userId,
      code: token.code,
      createdAt: token.createdAt,
      expiresAt: token.expiresAt,
      status: token.status,
      uuid: token.uuid,
    });

    await newToken.save();
  }

  // Buscar token por código
  async findTokenByCode(code: string): Promise<Token | null> {
    const foundToken = await TokenModel.findOne({ code }).exec();

    if (!foundToken) {
      return null;
    }

    return new Token(
      foundToken.id,
      foundToken.code,
      foundToken.createdAt,
      foundToken.expiresAt,
      foundToken.userId,
      foundToken.status,
      foundToken.uuid
    );
  }

  // Buscar token por usuario
  async findTokenByUserId(userId: string): Promise<Token | null> {
    const foundToken = await TokenModel.findOne({ userId, status: "PENDING" })
    .sort({ createdAt: -1 })
    .exec();

    if (!foundToken) {
      return null;
    }

    return new Token(
      foundToken.id,
      foundToken.code,
      foundToken.createdAt,
      foundToken.expiresAt,
      foundToken.userId,
      foundToken.status,
      foundToken.uuid
    );
  }

  // Actualizar el estado de un token
  async updateTokenStatus(tokenId: string, status: string): Promise<void> {
    await TokenModel.updateOne({ _id: tokenId }, { status }).exec();
  }
}
