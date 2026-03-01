import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
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
    firebaseUid: {
      type: String,
      require: true,
      unique: true,
    },
    role: {
      type: String,
      default: "user",
    },
    photoURL: {
      type: String,
      default: "",
    },
    
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
