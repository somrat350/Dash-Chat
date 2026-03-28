import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    messageType: {
      type: String,
      enum: ["text", "call"],
      default: "text",
    },
    status: {
      type: String,
      default: "active",
    },
    deliveryStatus: {
      type: String,
      enum: ["sent", "delivered", "seen"],
      default: "sent",
    },
    deliveredAt: {
      type: Date,
      default: null,
    },
    seenAt: {
      type: Date,
      default: null,
    },
    hiddenFor: { type: [String], default: [] },
    // riplay
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    // forword
    forwarded: {
      type: Boolean,
      default: false,
    },
    originalSender: {
      type: String,
      default: "",
    },
    reaction: {
      type: String,
    },
    reactionBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    callData: {
      callType: {
        type: String,
        enum: ["audio", "video"],
        default: null,
      },
      status: {
        type: String,
        enum: ["completed", "missed", "rejected"],
        default: null,
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
    },
  },
  { timestamps: true },
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
