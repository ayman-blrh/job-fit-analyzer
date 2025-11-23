const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.send("Job créé");
});

module.exports = router;
