import mongoose, { Schema } from "mongoose";

const CALL_STATUSES = [
  "ringing",
  "missed",
  "received",
  "scheduled",
  "rejected",
  "completed",
  "cancelled",
  "failed",
];

const CALL_END_REASONS = [
  "missed",
  "rejected",
  "completed",
  "cancelled",
  "connection-lost",
];

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
      enum: CALL_STATUSES,
      default: "ringing",
    },
    duration: {
      type: Number,
      default: 0,
    },
    startedAt: {
      type: Date,
      default: null,
    },
    endedAt: {
      type: Date,
      default: null,
    },
    endReason: {
      type: String,
      enum: CALL_END_REASONS,
      default: null,
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
