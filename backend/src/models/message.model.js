import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: String, required: true }, // Clerk User ID
    receiverId: { type: String, required: true }, // Clerk User ID,
    content: { type: String, required: true }, // Message content
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
