import React, { useState, useEffect } from "react";
import UsersList from "./Pages/UsersList";
import axios from "axios";
import "./index.css";

function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [users, setUsers] = useState([]);

  // Charger les utilisateurs depuis le backend au démarrage
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddCandidate = async () => {
    const name = prompt("Enter candidate name:");
    if (name) {
      try {
        const res = await axios.post("http://localhost:3000/api/users", { name });
        setUsers([...users, res.data]);
      } catch (err) {
        console.error("Error adding user:", err);
      }
    }
  };

  const tabs = ["Dashboard", "Candidates", "Skills Match", "Analytics"];

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-2xl p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-blue-600 mb-10">
          JobFit<span className="text-gray-800">AI</span>
        </h1>

        <nav className="flex flex-col gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`text-lg text-gray-700 hover:text-blue-600 transition text-left ${
                activeTab === tab ? "font-bold text-blue-600" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 p-4 bg-white/60 backdrop-blur-md rounded-2xl shadow">
          <h2 className="text-2xl font-semibold">{activeTab}</h2>
          {activeTab === "Candidates" && (
            <button
              onClick={handleAddCandidate}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
            >
              Add Candidate
            </button>
          )}
        </div>

        {/* Conditional Tabs Content */}
        {activeTab === "Dashboard" && (
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
              <h3 className="text-gray-600">Total Candidates</h3>
              <p className="text-3xl font-bold mt-2">{users.length}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
              <h3 className="text-gray-600">Matches Today</h3>
              <p className="text-3xl font-bold mt-2">34</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
              <h3 className="text-gray-600">AI Accuracy</h3>
              <p className="text-3xl font-bold mt-2">92%</p>
            </div>
          </div>
        )}

        {activeTab === "Candidates" && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-4">Users from API / Mock:</h3>
            <UsersList users={users} />
          </div>
        )}

        {activeTab === "Skills Match" && (
          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-4">Skill Match Graph</h3>
            <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-600">
              Chart Coming Soon...
            </div>
          </div>
        )}

        {activeTab === "Analytics" && (
          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-4">Analytics Dashboard</h3>
            <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-600">
              Analytics Coming Soon...
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
