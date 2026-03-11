import mongoose, { Schema } from "mongoose";

const callSchema = new Schema(
  {
    caller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["audio", "video"],
      required: true,
    },
    status: {
      type: String,
      enum: ["missed", "received", "scheduled", "rejected"],
      default: "missed",
    },
    duration: {
      type: Number, // seconds 
      default: 0,
    },
    scheduledAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

const Call = mongoose.model("Call", callSchema);
export default Call;
