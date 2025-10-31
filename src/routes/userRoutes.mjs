import express from "express";
import User from "../models/User.mjs";

const router = express.Router();

// créer un nouvel utilisateur
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// obtenir la liste des utilisateurs
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

export default router;
