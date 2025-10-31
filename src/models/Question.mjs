import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    poll: { type: mongoose.Schema.Types.ObjectId, ref: "Poll", required: true },
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
