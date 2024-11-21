// /infrastructure/schemas/token-schema.ts
import mongoose, { Document, Schema } from "mongoose";

interface TokenDocument extends Document {
  userId: string;
  code: string;
  createdAt: Date;
  expiresAt: Date;
  status: string; // "PENDING" | "USED" | "EXPIRED"
  uuid: string;
}

const TokenSchema: Schema = new Schema({
  userId: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  expiresAt: { type: Date, required: true },
  status: { type: String, required: true },
  uuid: { type: String, required: true },
});

export const TokenModel = mongoose.model<TokenDocument>("Tokens", TokenSchema);
