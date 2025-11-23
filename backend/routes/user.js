const express = require("express");
const router = express.Router();

// Route POST pour créer un utilisateur
router.post("/", (req, res) => {
  res.send("Utilisateur créé");
});

// ⚠️ Route GET pour tester
router.get("/", (req, res) => {
  res.json({ message: "API Users fonctionne !" });
});

module.exports = router;
