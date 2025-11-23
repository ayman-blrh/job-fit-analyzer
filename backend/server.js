const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let users = [{ name: "Alice" }, { name: "Bob" }];

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });
  const newUser = { name };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
