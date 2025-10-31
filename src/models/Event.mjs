import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: String, required: true },
    coverPhoto: { type: String, default: "" },
    isPrivate: { type: Boolean, default: false },
    organizers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
