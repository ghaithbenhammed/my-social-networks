import mongoose from "mongoose";

const pollSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  },
  { timestamps: true }
);

export default mongoose.model("Poll", pollSchema);
