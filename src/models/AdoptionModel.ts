import { Schema, model } from "mongoose";
import { AdoptionInterface } from "../interfaces/AdoptionInterface";
const AdoptionRegister = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    petId: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    imageBase64: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    kind: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      requierd: true,
    },
    size: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<AdoptionInterface>("Adoption", AdoptionRegister);
