import express from "express";
import Event from "../models/Event.mjs";

const router = express.Router();

// 🟢 GET - tous les événements
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("organizers participants");
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 GET - un événement spécifique
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "organizers participants"
    );
    if (!event)
      return res.status(404).json({ message: "Événement introuvable" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 POST - créer un événement
router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 PUT - modifier un événement
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 DELETE - supprimer un événement
router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Événement supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
