import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a name"],
    },
    email: {
      type: String,
      required: [true, "please add an email"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "please add a username"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password needed"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
