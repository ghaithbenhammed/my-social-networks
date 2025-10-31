import mongoose from "mongoose";

const carpoolSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    departurePlace: { type: String, required: true },
    departureTime: { type: String, required: true },
    price: { type: Number, required: true },
    seats: { type: Number, required: true },
    maxDelay: { type: Number, default: 0 }, // en minutes
  },
  { timestamps: true }
);

export default mongoose.model("Carpool", carpoolSchema);
