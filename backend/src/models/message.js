import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
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
  message: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    default: "",
  },
},{timestamps: true});

const Message = mongoose.model("Message", messageSchema);
export default Message;
