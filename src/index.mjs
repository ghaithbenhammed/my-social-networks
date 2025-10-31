import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import userRoutes from "./routes/userRoutes.mjs";
import eventRoutes from "./routes/eventRoutes.mjs";
import groupRoutes from "./routes/groupRoutes.mjs";
import discussionRoutes from "./routes/discussionRoutes.mjs";
import albumRoutes from "./routes/albumRoutes.mjs";
import pollRoutes from "./routes/pollRoutes.mjs";
import ticketRoutes from "./routes/ticketRoutes.mjs";
import shoppingRoutes from "./routes/shoppingRoutes.mjs";
import carpoolRoutes from "./routes/carpoolRoutes.mjs";

const app = express();

// middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.json());

// connexion à MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/socialNetwork")
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.error("❌ Erreur MongoDB :", err));

// route de test
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur My Social Networks API 🚀" });
});

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/discussions", discussionRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/polls", pollRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/shopping", shoppingRoutes);
app.use("/api/carpools", carpoolRoutes);

// lancement du serveur
app.listen(3000, () => {
  console.log("🚀 Serveur lancé sur http://localhost:3000");
});
