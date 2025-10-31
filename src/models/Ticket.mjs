import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    ticketType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TicketType",
      required: true,
    },
    buyerName: { type: String, required: true },
    buyerFirstName: { type: String, required: true },
    buyerAddress: { type: String, required: true },
    purchaseDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
