import express from "express";
import Carpool from "../models/Carpool.mjs";

const router = express.Router();

// 🟢 Créer un trajet
router.post("/", async (req, res) => {
  try {
    const carpool = new Carpool(req.body);
    await carpool.save();
    res.status(201).json(carpool);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 Voir les trajets d’un événement
router.get("/:eventId", async (req, res) => {
  try {
    const carpools = await Carpool.find({ event: req.params.eventId }).populate(
      "driver"
    );
    res.json(carpools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
