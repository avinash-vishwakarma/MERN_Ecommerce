import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    pic: {
      type: String,
      require: false,
    },
    validatedAt: {
      type: Date,
      require: false,
    },
    validation: {
      otp: {
        type: Number,
      },
      genratedTime: {
        type: Date,
      },
      forgotpassword: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);

UserSchema.methods.matchPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model("User", UserSchema);
export default User;
