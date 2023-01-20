import { Schema, model } from "mongoose";
import { CreateToken } from "../interfaces/TokenInterface";

const TokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: new Date(Date.now() + 86400000),
  },
});
const Token = model<CreateToken>("Token", TokenSchema);

export default Token;
