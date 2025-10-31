import express from "express";
import TicketType from "../models/TicketType.mjs";
import Ticket from "../models/Ticket.mjs";

const router = express.Router();

// 🟢 Créer un type de billet pour un événement
router.post("/types", async (req, res) => {
  try {
    const ticketType = new TicketType(req.body);
    await ticketType.save();
    res.status(201).json(ticketType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 Voir tous les types de billets d’un événement
router.get("/types/:eventId", async (req, res) => {
  try {
    const tickets = await TicketType.find({ event: req.params.eventId });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Acheter un billet
router.post("/buy", async (req, res) => {
  try {
    const { ticketType, buyerName, buyerFirstName, buyerAddress } = req.body;
    const ticketTypeDoc = await TicketType.findById(ticketType);

    if (!ticketTypeDoc) {
      return res.status(404).json({ message: "Type de billet introuvable" });
    }

    // Vérifier s'il reste des billets
    const ticketCount = await Ticket.countDocuments({ ticketType });
    if (ticketCount >= ticketTypeDoc.quantity) {
      return res.status(400).json({ message: "Plus de billets disponibles" });
    }

    const ticket = new Ticket({
      ticketType,
      buyerName,
      buyerFirstName,
      buyerAddress,
    });
    await ticket.save();

    res.status(201).json({ message: "Billet acheté avec succès 🎟️", ticket });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 Voir tous les billets vendus
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("ticketType");
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
