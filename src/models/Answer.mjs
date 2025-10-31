import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // participants qui ont voté
  },
  { timestamps: true }
);

export default mongoose.model("Answer", answerSchema);
