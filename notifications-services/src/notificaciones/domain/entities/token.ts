// /domain/entities/token.ts
import { v4 as uuidv4 } from "uuid";

export class Token {
  id: string | null;
  userId: string;
  code: string;
  createdAt: Date;
  expiresAt: Date;
  status: string; // "PENDING" | "USED" | "EXPIRED"
  uuid: string;

  constructor(
    id: string | null,
    code: string,
    createdAt: Date,
    expiresAt: Date,
    userId: string,
    status: string,
    uuid?: string
  ) {
    this.id = id;
    this.code = code;
    this.createdAt = createdAt;
    this.expiresAt = expiresAt;
    this.userId = userId;
    this.status = status;
    this.uuid = uuid || uuidv4();
  }
}
