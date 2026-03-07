import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    sender: {
      type: String,
      ref: "User",
      require: true,
    },
    receiver: {
      type: String,
      ref: "User",
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      default: "",
    },
     status: { 
      type: String,
       default: "active" },
    // hide: {
    //   type: String,
    //   default: 'false'
    // },
    hiddenFor: { type: [String], default: [] },
    // riplay 
    replyTo: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Message",
  default: null,
},
  },
  { timestamps: true },
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
