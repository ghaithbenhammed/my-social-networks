import mongoose from "mongoose";

const shoppingItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    arrivalTime: { type: String },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Empêcher les doublons par événement
shoppingItemSchema.index({ name: 1, event: 1 }, { unique: true });

export default mongoose.model("ShoppingItem", shoppingItemSchema);
