import express from "express";
import ShoppingItem from "../models/ShoppingItem.mjs";

const router = express.Router();

// 🟢 Ajouter un élément à la liste
router.post("/", async (req, res) => {
  try {
    const item = new ShoppingItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 Voir la liste pour un événement
router.get("/:eventId", async (req, res) => {
  try {
    const items = await ShoppingItem.find({
      event: req.params.eventId,
    }).populate("user");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
