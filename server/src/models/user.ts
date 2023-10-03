import { CallbackWithoutResultAndOptionalError, Model, Schema, model } from "mongoose";
import { IUser } from "../types";
import { EMAIL_REG_EX } from "../constants";
import { compare, hash } from "bcryptjs";

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name bro!"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email address."],
      validate: {
        validator: function (value: string) {
          return EMAIL_REG_EX.test(value);
        },
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password."],
      minlength: [6, "Password must be at least 6 characters."],
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [{ courseId: String }],
  },
  { timestamps: true },
);

// Hash password before saving
userSchema.pre<IUser>("save", async function (next: CallbackWithoutResultAndOptionalError) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await hash(this.password, 10);
  next();
});

// Compare password when logging in
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return await compare(enteredPassword, this.password);
};

const userModel: Model<IUser> = model("User", userSchema);

export default userModel;
