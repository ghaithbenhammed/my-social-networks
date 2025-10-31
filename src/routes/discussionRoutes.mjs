import express from "express";
import Discussion from "../models/Discussion.mjs";
import Message from "../models/Message.mjs";

const router = express.Router();

// 🟢 Créer une discussion
router.post("/", async (req, res) => {
  try {
    const discussion = new Discussion(req.body);
    await discussion.save();
    res.status(201).json(discussion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 Récupérer toutes les discussions
router.get("/", async (req, res) => {
  try {
    const discussions = await Discussion.find().populate(
      "group event messages"
    );
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Créer un message dans une discussion
router.post("/:id/messages", async (req, res) => {
  try {
    const { content, author } = req.body;
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion)
      return res.status(404).json({ message: "Discussion introuvable" });

    const message = new Message({
      content,
      author,
      discussion: discussion._id,
    });
    await message.save();

    discussion.messages.push(message._id);
    await discussion.save();

    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
