const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    skills: [{ type: String }],
    experience: [{ title: String, duration: String, techs: [String] }],
    projects: [{ name: String, description: String }],
});

module.exports = mongoose.model("User", UserSchema);
