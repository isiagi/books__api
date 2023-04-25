import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

const userSchema = new Schema({
  username: String,
  password: {
    type: String,
    required: [true, "Please input password"],
  },
  email: {
    type: String,
    required: [true, "Please input a valid email address"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
  },
  isAdmin: {
    type: "Boolean",
    default: false,
  },
  passwordResetToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedJwtToken = async function () {
  const jk = process.env.JWT_EXPIRATION;

  return JWT.sign(
    { id: this._id, role: this.isAdmin },
    process.env.JWT_SECRET as string,
    {
      expiresIn: 7000,
    }
  );
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
