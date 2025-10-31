import mongoose from "mongoose";

const discussionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      default: null,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      default: null,
    },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);

// Vérification : une discussion ne peut pas avoir à la fois un groupe ET un événement
discussionSchema.pre("save", function (next) {
  if (this.group && this.event) {
    return next(
      new Error(
        "Une discussion ne peut pas appartenir à un groupe ET à un événement."
      )
    );
  }
  next();
});

export default mongoose.model("Discussion", discussionSchema);
