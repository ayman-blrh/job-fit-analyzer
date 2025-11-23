const Job = require("../models/Job");
const User = require("../models/User");

const calculateMatch = async (req, res) => {
    try {
        const { userId, jobId } = req.body;
        const user = await User.findById(userId);
        const job = await Job.findById(jobId);

        if (!user || !job) return res.status(404).json({ error: "User or Job not found" });

        const matchedSkills = user.skills.filter(skill => job.requiredSkills.includes(skill));
        const score = (matchedSkills.length / job.requiredSkills.length) * 100;

        res.json({ score, matchedSkills, missingSkills: job.requiredSkills.filter(skill => !matchedSkills.includes(skill)) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { calculateMatch };
