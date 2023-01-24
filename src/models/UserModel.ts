import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { CreateUser } from "../interfaces/UserInterface";

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  profile: {
    type: String,
    default: "",
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Favorite",
    },
  ],
  adoptions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Adoption",
    },
  ],
  verified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// UserSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt(Number(process.env.SALT));
//   const passwordHash = await bcrypt.hash(this.password, salt);
//   this.password = passwordHash;
//   next();
// });

UserSchema.methods.isValidPassword = async function (password: any) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

export default model<CreateUser>("User", UserSchema);
