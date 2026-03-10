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
    role: {
      type: String,
      default: "user",
    },
    photoURL: {
      type: String,
      default: "",
    },
    friends: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          enum: ["pending", "accepted","rejected", "blocked"],
          default: "pending",
        },
      },
    ],
    default: "",
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
