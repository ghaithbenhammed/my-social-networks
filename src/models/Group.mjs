import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    icon: { type: String, default: "" },
    coverPhoto: { type: String, default: "" },
    type: {
      type: String,
      enum: ["public", "private", "secret"],
      default: "public",
    },
    canMembersPost: { type: Boolean, default: true },
    canMembersCreateEvents: { type: Boolean, default: true },
    admins: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Group", groupSchema);
