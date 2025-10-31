import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    photos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Photo" }],
  },
  { timestamps: true }
);

export default mongoose.model("Album", albumSchema);
