import express from "express";
import Poll from "../models/Poll.mjs";
import Question from "../models/Question.mjs";
import Answer from "../models/Answer.mjs";

const router = express.Router();

// 🟢 Créer un sondage
router.post("/", async (req, res) => {
  try {
    const poll = new Poll(req.body);
    await poll.save();
    res.status(201).json(poll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 Ajouter une question à un sondage
router.post("/:pollId/questions", async (req, res) => {
  try {
    const question = new Question({ ...req.body, poll: req.params.pollId });
    await question.save();

    await Poll.findByIdAndUpdate(req.params.pollId, {
      $push: { questions: question._id },
    });
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 Ajouter une réponse à une question
router.post("/questions/:questionId/answers", async (req, res) => {
  try {
    const answer = new Answer({ ...req.body, question: req.params.questionId });
    await answer.save();

    await Question.findByIdAndUpdate(req.params.questionId, {
      $push: { answers: answer._id },
    });
    res.status(201).json(answer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 Voter pour une réponse
router.post("/answers/:answerId/vote", async (req, res) => {
  try {
    const { userId } = req.body;
    const answer = await Answer.findById(req.params.answerId);

    if (!answer)
      return res.status(404).json({ message: "Réponse introuvable" });
    if (answer.votes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Utilisateur a déjà voté pour cette réponse" });
    }

    answer.votes.push(userId);
    await answer.save();
    res.json({ message: "Vote enregistré !", answer });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 Voir tous les sondages
router.get("/", async (req, res) => {
  try {
    const polls = await Poll.find().populate({
      path: "questions",
      populate: { path: "answers" },
    });
    res.json(polls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
