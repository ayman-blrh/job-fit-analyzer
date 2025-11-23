import React, { useState } from "react";
import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
PieChart,
Pie,
Cell,
LineChart,
Line,
Legend,
} from "recharts";
import { FaUsers, FaChartLine, FaBriefcase, FaTasks } from "react-icons/fa";
import "./index.css";

function App() {
const [users, setUsers] = useState([]);
const [activeTab, setActiveTab] = useState("Dashboard");
const [showForm, setShowForm] = useState(false);
const [filterJob, setFilterJob] = useState("");

const tabs = [
{ name: "Dashboard", icon: <FaChartLine /> },
{ name: "Candidates", icon: <FaUsers /> },
{ name: "Skills Match", icon: <FaTasks /> },
{ name: "Analytics", icon: <FaBriefcase /> },
];

const skillsOptions = [
"Communication",
"Teamwork",
"Problem Solving",
"Adaptability",
"Leadership",
"React",
"Node.js",
"Python",
"Java",
"C++",
"UI/UX Design",
"Creativity",
"Time Management",
"Agile Methodology",
"SQL",
"NoSQL",
"Docker",
"AWS",
"Git",
"Testing",
];

const jobSkillsRequirements = {
"Frontend Developer at Technopolis Rabat": ["React", "Communication", "Teamwork", "UI/UX Design", "Git", "Testing"],
"Backend Developer at Technopolis Rabat": ["Node.js", "Problem Solving", "Adaptability", "SQL", "NoSQL", "Docker"],
"UI/UX Designer at Technopolis Rabat": ["Creativity", "Communication", "Teamwork", "UI/UX Design", "Time Management"],
"Full Stack Developer at Technopolis Rabat": ["React", "Node.js", "Problem Solving", "SQL", "UI/UX Design", "Git"],
"Data Scientist at Technopolis Rabat": ["Python", "SQL", "Problem Solving", "Machine Learning", "Data Visualization"],
};

const [formData, setFormData] = useState({
name: "",
desiredJob: "",
skills: [],
});

const handleInputChange = (e) => {
const { name, value } = e.target;
setFormData({ ...formData, [name]: value });
};

const handleSkillChange = (skill) => {
setFormData({
...formData,
skills: formData.skills.includes(skill)
? formData.skills.filter((s) => s !== skill)
: [...formData.skills, skill],
});
};

const handleAddCandidate = (e) => {
e.preventDefault();
if (!formData.name || !formData.desiredJob) return;
setUsers([...users, formData]);
setFormData({ name: "", desiredJob: "", skills: [] });
setShowForm(false);
};

const calculateMatchScore = (user) => {
const jobKey = Object.keys(jobSkillsRequirements).find(
(key) => key.toLowerCase() === user.desiredJob.toLowerCase()
);
const requiredSkills = jobKey ? jobSkillsRequirements[jobKey] : user.skills;
if (requiredSkills.length === 0) return 0;
const matched = user.skills.filter((s) => requiredSkills.includes(s)).length;
return Math.round((matched / requiredSkills.length) * 100);
};

const calculateMissingSkills = (user) => {
const jobKey = Object.keys(jobSkillsRequirements).find(
(key) => key.toLowerCase() === user.desiredJob.toLowerCase()
);
const requiredSkills = jobKey ? jobSkillsRequirements[jobKey] : [];
return requiredSkills.filter((s) => !user.skills.includes(s));
};

const analyticsData = users.map((user) => ({
name: user.name,
match: calculateMatchScore(user),
missing: calculateMissingSkills(user),
}));

const skillCount = {};
users.forEach((user) => {
user.skills.forEach((skill) => {
skillCount[skill] = (skillCount[skill] || 0) + 1;
});
});
const skillData = Object.entries(skillCount).map(([name, value]) => ({ name, value }));

let cumulative = 0;
const cumulativeData = users.map((u) => {
cumulative += calculateMatchScore(u);
return { name: u.name, cumulativeScore: cumulative };
});

const COLORS = ["#FBBF24", "#F97316", "#FDBA74", "#F59E0B", "#FCD34D", "#EA580C"];

return ( <div className="flex bg-gradient-to-r from-yellow-50 to-orange-100 h-screen w-full">
{/* Sidebar */} <aside className="w-64 bg-white/80 backdrop-blur-xl shadow-xl p-6 flex flex-col"> <h1 className="text-3xl font-bold text-orange-600 mb-10 text-center">
JobFit<span className="text-yellow-700">AI</span> </h1> <nav className="flex flex-col gap-4">
{tabs.map((tab) => (
<button
key={tab.name}
className={`flex items-center gap-3 text-left text-lg p-2 rounded-lg transition-all duration-300 ${
                activeTab === tab.name
                  ? "bg-orange-200/40 text-orange-600 font-semibold"
                  : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"
              }`}
onClick={() => setActiveTab(tab.name)}
>
{tab.icon} {tab.name} </button>
))} </nav> </aside>

```
  {/* Main */}
  <main className="flex-1 p-8 overflow-y-scroll">
    {/* Header */}
    <div className="backdrop-blur-md bg-white/40 p-4 rounded-2xl shadow-md mb-8 flex justify-between items-center">
      <h2 className="text-2xl font-semibold text-orange-700">{activeTab}</h2>
      {activeTab === "Candidates" && (
        <button
          className="px-4 py-2 bg-orange-600 text-white rounded-xl shadow hover:bg-orange-700 transition-transform transform hover:scale-105"
          onClick={() => setShowForm(true)}
        >
          Add Candidate
        </button>
      )}
    </div>

    {/* Dashboard */}
    {activeTab === "Dashboard" && (
      <div className="grid grid-cols-3 gap-6">
        {/* Total Candidates */}
        <div className="bg-yellow-50 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
          <FaUsers className="text-4xl text-orange-500 mb-2" />
          <h3 className="text-orange-600">Total Candidates</h3>
          <p className="text-3xl font-bold mt-2">{users.length}</p>
          <div className="w-full bg-orange-100 h-2 rounded-full mt-3">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${users.length > 0 ? 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Average Match Score */}
        <div className="bg-yellow-50 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
          <FaTasks className="text-4xl text-orange-400 mb-2" />
          <h3 className="text-orange-600">Average Match Score</h3>
          <p className="text-3xl font-bold mt-2">
            {users.length > 0
              ? Math.round(users.reduce((acc, u) => acc + calculateMatchScore(u), 0) / users.length)
              : 0}
            %
          </p>
          <div className="w-full bg-orange-100 h-2 rounded-full mt-3">
            <div
              className="bg-orange-400 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${
                  users.length > 0
                    ? Math.round(users.reduce((acc, u) => acc + calculateMatchScore(u), 0) / users.length)
                    : 0
                }%`,
              }}
            />
          </div>
        </div>

        {/* AI Accuracy */}
        <div className="bg-yellow-50 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
          <FaChartLine className="text-4xl text-orange-500 mb-2" />
          <h3 className="text-orange-600">AI Accuracy</h3>
          <p className="text-3xl font-bold mt-2">92%</p>
          <div className="w-full bg-orange-100 h-2 rounded-full mt-3">
            <div className="bg-orange-500 h-2 rounded-full w-11/12 transition-all duration-500" />
          </div>
        </div>
      </div>
    )}

    {/* Add Candidate Modal */}
    {showForm && activeTab === "Candidates" && (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-yellow-50/90 p-8 rounded-3xl shadow-2xl w-[450px] border border-orange-200">
          <h3 className="text-2xl font-bold mb-6 text-orange-700 text-center">Add New Candidate</h3>
          <form onSubmit={handleAddCandidate} className="flex flex-col gap-5">
            <div>
              <label className="font-semibold text-orange-700">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g., Ayman Sekkatos"
                value={formData.name}
                onChange={handleInputChange}
                className="p-3 mt-2 w-full border border-orange-300 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-orange-700">Select Job</label>
              <select
                name="desiredJob"
                value={formData.desiredJob}
                onChange={handleInputChange}
                className="p-3 mt-2 w-full border border-orange-300 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 outline-none transition"
                required
              >
                <option value="">-- Choose a Job --</option>
                {Object.keys(jobSkillsRequirements).map((job) => (
                  <option key={job} value={job}>{job}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-orange-700">Skills</label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {skillsOptions.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center gap-2 bg-yellow-50 border border-orange-200 rounded-xl px-3 py-2 shadow-sm cursor-pointer hover:bg-orange-100 transition"
                  >
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-orange-200 text-orange-700 shadow hover:bg-orange-300 transition"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2 bg-orange-600 text-white rounded-xl shadow hover:bg-orange-700 transition-transform transform hover:scale-105"
              >
                Add Candidate
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* Candidates List */}
    {activeTab === "Candidates" && (
      <div className="bg-yellow-50 p-6 rounded-2xl shadow mb-10">
        <h3 className="text-xl font-semibold mb-4 text-orange-700">Candidates:</h3>
        <ul className="list-disc pl-5">
          {users.map((user, idx) => (
            <li key={idx}>
              <strong>{user.name}</strong> – Job: {user.desiredJob} – Skills: {user.skills.join(", ")} – Match Score: {calculateMatchScore(user)}%
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Skills Match */}
    {activeTab === "Skills Match" && (
      <div className="bg-yellow-50 p-8 rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-4 text-orange-700">Skills Match Analysis</h3>
        {users.length === 0 ? (
          <p>No candidates yet.</p>
        ) : (
          <>
            <div className="mb-4">
              <label className="font-semibold mr-2 text-orange-700">Filter by Job:</label>
              <select
                onChange={(e) => setFilterJob(e.target.value)}
                className="p-2 border border-orange-300 rounded-xl"
              >
                <option value="">All Jobs</option>
                {Object.keys(jobSkillsRequirements).map((job) => (
                  <option key={job} value={job}>{job}</option>
                ))}
              </select>
            </div>

            <div className="space-y-6">
              {users
                .filter((user) => !filterJob || user.desiredJob === filterJob)
                .map((user, idx) => {
                  const match = calculateMatchScore(user);
                  const missingSkills = calculateMissingSkills(user);
                  const barColor =
                    match >= 80 ? "bg-orange-600" : match >= 50 ? "bg-orange-400" : "bg-orange-300";
                  return (
                    <div key={idx} className="p-4 border border-orange-200 rounded-xl shadow hover:shadow-lg transition">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-orange-700">{user.name} ({user.desiredJob})</h4>
                        <span className="font-bold text-orange-600">{match}% match</span>
                      </div>
                      <div className="w-full bg-orange-100 h-4 rounded-full mb-2">
                        <div className={`${barColor} h-4 rounded-full`} style={{ width: `${match}%` }} />
                      </div>
                      {missingSkills.length > 0 ? (
                        <p className="text-sm text-orange-700">Missing skills: {missingSkills.join(", ")}</p>
                      ) : (
                        <p className="text-sm text-orange-900">All required skills acquired ✅</p>
                      )}
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
    )}

    {/* Analytics */}
    {activeTab === "Analytics" && (
      <div className="bg-yellow-50 p-8 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4 text-orange-700">Analytics Dashboard</h3>
        {users.length === 0 ? (
          <p>No data yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={analyticsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="match" fill="#F97316" barSize={30} />
              </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={skillData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {skillData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={cumulativeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cumulativeScore" stroke="#F97316" />
              </LineChart>
            </ResponsiveContainer>

            <div className="p-4 border border-orange-200 rounded-xl shadow">
              <h4 className="font-semibold mb-2 text-orange-700">Top Skills</h4>
              <ul className="list-disc pl-5">
                {skillData
                  .sort((a, b) => b.value - a.value)
                  .map((s, i) => (
                    <li key={i}>{s.name} ({s.value})</li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    )}
  </main>
</div>


);
}

export default App;
