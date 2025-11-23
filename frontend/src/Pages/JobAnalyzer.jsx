import React, { useState } from "react";

export default function JobAnalyzer() {
  const [loading, setLoading] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFile = (e) => {
    setCvFile(e.target.files[0]);
  };

  const analyze = () => {
    setLoading(true);

    // Fake timeout to simulate API
    setTimeout(() => {
      setResult({
        jobTitle: "Full-Stack Developer",
        score: 87,
        strengths: ["React", "Node.js", "REST APIs", "Problem Solving"],
        missing: ["Docker", "CI/CD", "Unit Testing"],
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Job Analyzer
      </h1>

      {/* Card */}
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-3xl">

        {/* Upload */}
        <label className="block mb-6">
          <span className="text-gray-600 font-medium">Upload your CV</span>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFile}
            className="mt-2 block w-full rounded-xl border border-gray-300 p-3"
          />
        </label>

        {/* Button */}
        <button
          onClick={analyze}
          disabled={!cvFile || loading}
          className="w-full py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Analyzing..." : "Analyze CV"}
        </button>

        {/* Result */}
        {result && (
          <div className="mt-10">

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Match Result
            </h2>

            <div className="bg-blue-100 p-5 rounded-xl mb-6">
              <p className="text-lg">
                Job Match Score:
                <span className="font-bold text-blue-600 ml-2">
                  {result.score}%
                </span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-green-50 p-5 rounded-xl shadow">
                <h3 className="font-bold text-green-700 mb-3">Strengths</h3>
                <ul className="list-disc ml-6 text-gray-700">
                  {result.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              {/* Missing */}
              <div className="bg-red-50 p-5 rounded-xl shadow">
                <h3 className="font-bold text-red-700 mb-3">Missing Skills</h3>
                <ul className="list-disc ml-6 text-gray-700">
                  {result.missing.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
