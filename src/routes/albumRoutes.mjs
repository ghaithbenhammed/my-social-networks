import express from "express";
import Album from "../models/Album.mjs";
import Photo from "../models/Photo.mjs";
import Comment from "../models/Comment.mjs";

const router = express.Router();

// 🟢 Ajouter un commentaire à une photo
router.post("/photos/:photoId/comments", async (req, res) => {
  try {
    const comment = new Comment({ ...req.body, photo: req.params.photoId });
    await comment.save();

    await Photo.findByIdAndUpdate(req.params.photoId, {
      $push: { comments: comment._id },
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// 🟢 Créer un album pour un événement
router.post("/", async (req, res) => {
  try {
    const album = new Album(req.body);
    await album.save();
    res.status(201).json(album);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 Ajouter une photo dans un album
router.post("/:albumId/photos", async (req, res) => {
  try {
    const photo = new Photo({ ...req.body, album: req.params.albumId });
    await photo.save();

    await Album.findByIdAndUpdate(req.params.albumId, {
      $push: { photos: photo._id },
    });
    res.status(201).json(photo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 Voir tous les albums
router.get("/", async (req, res) => {
  try {
    const albums = await Album.find().populate({
      path: "photos",
      populate: { path: "comments author", select: "name email" },
    });
    res.json(albums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
