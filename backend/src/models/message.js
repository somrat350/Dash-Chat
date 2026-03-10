import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: {
      type: String,
      ref: "User",
      require: true,
    },
    receiverId: {
      type: String,
      ref: "User",
      require: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      default: "active",
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
  },
  { timestamps: true },
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
