import express from "express";
import Group from "../models/Group.mjs";

const router = express.Router();

// 🟢 GET - tous les groupes
router.get("/", async (req, res) => {
  try {
    const groups = await Group.find().populate("admins members");
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 GET - un groupe spécifique
router.get("/:id", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate(
      "admins members"
    );
    if (!group) return res.status(404).json({ message: "Groupe introuvable" });
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 POST - créer un groupe
router.post("/", async (req, res) => {
  try {
    const group = new Group(req.body);
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 PUT - modifier un groupe
router.put("/:id", async (req, res) => {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedGroup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 DELETE - supprimer un groupe
router.delete("/:id", async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.id);
    res.json({ message: "Groupe supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
