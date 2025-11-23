const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    requiredSkills: [{ type: String }],
    description: { type: String },
});

module.exports = mongoose.model("Job", JobSchema);
