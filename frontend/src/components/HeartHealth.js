
import React, { useState, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import docImage from "../assets/body.png";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";

function HeartHealth() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
  });

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please upload a CSV file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/heart-health-analyzer/", formData);
      setResult(response.data);
      setError(null);
    } catch (err) {
      setError("An error occurred while analyzing the file.");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900 p-6 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mt-10 mb-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        <motion.div
          className="text-center lg:text-left"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">
            🫀 AI-Powered <br /> Heart Health Analyzer
          </h1>
          <p className="text-blue-200 mt-2 text-lg max-w-md mx-auto lg:mx-0">
            Upload your health CSV data and get an instant heart health analysis with predictive insights.
          </p>
        </motion.div>

        <motion.img
          src={docImage}
          alt="Body Analysis"
          className="w-32 md:w-52 lg:w-56 xl:w-72"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        />
      </div>

      {/* Upload Section */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragActive ? "border-blue-400 bg-blue-950" : "border-blue-700 bg-blue-900"
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <input {...getInputProps()} />
          {file ? (
            <p className="text-lg text-green-400">{file.name}</p>
          ) : (
            <p className="text-blue-200">
              Drag and drop a CSV file here, or click to select one.
            </p>
          )}
        </motion.div>

        {error && <p className="text-red-400 mt-4">{error}</p>}

        <motion.button
          onClick={handleAnalyze}
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Analyze Heart Health
        </motion.button>

        {/* Result Dashboard */}
        {result && (
          <motion.div
            className="mt-10 p-6 rounded-xl bg-blue-800/60 shadow-xl backdrop-blur-lg"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">
              🔍 Analysis Results
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-8">
              {[
                {
                  title: "Heart Disease",
                  value: result.heart_disease === 1 ? "Detected 🩺" : "No Disease ✅",
                  color: "text-green-300",
                },
                {
                  title: "Blockage Chances %",
                  value: `${result.blockage_percent?.toFixed(2)}%`,
                  color: "text-yellow-300",
                },
                {
                  title: "Health Score",
                  value: `${result.heart_health_score?.toFixed(2)} / 100`,
                  color: "text-blue-300",
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  className="bg-blue-900 p-4 rounded-xl shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className={`text-xl font-bold ${card.color}`}>{card.title}</h3>
                  <p className="text-3xl mt-2">{card.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Graphs Section */}
            {result.average_features && (
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                {/* Heart Rate */}
                <motion.div
                  className="bg-blue-800/50 rounded-xl p-4 shadow"
                  whileHover={{ scale: 1.03 }}
                >
                  <h3 className="text-center mb-2 text-blue-100 font-semibold">Heart Rate (Thalach)</h3>
                  <ResponsiveContainer width="100%" height={120}>
                    <BarChart data={[...Array(20)].map((_, i) => ({
                      time: i,
                      bpm: Math.round(result.average_features.thalach + Math.sin(i) * 10),
                    }))}>
                      <Bar dataKey="bpm" fill="#22c55e" radius={[5, 5, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Blood Pressure */}
                <motion.div
                  className="bg-blue-800/50 rounded-xl p-4 shadow"
                  whileHover={{ scale: 1.03 }}
                >
                  <h3 className="text-center mb-2 text-blue-100 font-semibold">Blood Pressure (Trestbps)</h3>
                  <ResponsiveContainer width="100%" height={120}>
                    <LineChart data={[...Array(20)].map((_, i) => ({
                      time: i,
                      bp: Math.round(result.average_features.trestbps + Math.cos(i / 2) * 5),
                    }))}>
                      <Line type="monotone" dataKey="bp" stroke="#facc15" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Cholesterol */}
                <motion.div
                  className="bg-blue-800/50 rounded-xl p-4 shadow"
                  whileHover={{ scale: 1.03 }}
                >
                  <h3 className="text-center mb-2 text-blue-100 font-semibold">Cholesterol (Chol)</h3>
                  <ResponsiveContainer width="100%" height={120}>
                    <LineChart data={[...Array(20)].map((_, i) => ({
                      time: i,
                      chol: Math.round(result.average_features.chol + Math.sin(i / 2) * 8),
                    }))}>
                      <Line type="monotone" dataKey="chol" stroke="#3b82f6" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default HeartHealth;
