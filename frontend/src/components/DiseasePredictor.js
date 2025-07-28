

// export default DiseasePredictor;
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const symptomsList = [
  'Fever', 'Fatigue', 'Sweating', 'Chills', 'Weight_Loss', 'Weight_Gain',
  'Cough', 'Runny_Nose', 'Sore_Throat', 'Shortness_of_Breath', 'Chest_Congestion',
  'Nausea', 'Vomiting', 'Diarrhea', 'Abdominal_Pain', 'Loss_of_Appetite',
  'Headache', 'Dizziness', 'Sleep_Disturbance', 'Rash', 'Itching', 'Redness',
  'Swelling', 'Joint_Pain', 'Muscle_Pain', 'Back_Pain', 'Frequent_Urination',
  'Increased_Thirst', 'Dry_Mouth', 'Sneezing'
];

const DiseasePredictor = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [prediction, setPrediction] = useState("");
  const [prescription, setPrescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPrescription, setLoadingPrescription] = useState(false);
  const [step, setStep] = useState("symptom"); // 'symptom' or 'result'

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const clearAll = () => {
    setSelectedSymptoms([]);
    setPrediction("");
    setPrescription("");
    setStep("symptom");
  };

  const predictDisease = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/predict/", {
        symptoms: selectedSymptoms,
      });

      if (response.data?.prediction) {
        setPrediction(response.data.prediction);
        setStep("result");
      } else {
        setPrediction("No prediction received.");
      }
    } catch (error) {
      console.error("Prediction error:", error);
      setPrediction("An error occurred during prediction.");
    } finally {
      setLoading(false);
    }
  };

  const generatePrescription = async () => {
    if (!prediction) return;
    setLoadingPrescription(true);
    try {
      const response = await axios.post("http://localhost:8000/prescribe/", {
        disease: prediction,
      });

      if (response.data?.prescription) {
        setPrescription(response.data.prescription);
      } else {
        setPrescription("Could not fetch prescription.");
      }
    } catch (error) {
      console.error("Prescription error:", error);
      setPrescription("An error occurred while generating the prescription.");
    } finally {
      setLoadingPrescription(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center text-blue-700 mb-6"
        >
          MBBS General Physician
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-center text-gray-600 mb-12"
        >
          Arogya AI - Disease Prediction
        </motion.h2>

        {step === "symptom" && (
          <>
            {/* Symptom Selection Step */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {symptomsList.map((symptom, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className={`cursor-pointer rounded-xl p-3 text-sm text-center capitalize font-medium transition ${
                    selectedSymptoms.includes(symptom)
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  }`}
                  onClick={() => toggleSymptom(symptom)}
                >
                  {symptom.replace(/_/g, " ")}
                </motion.div>
              ))}
            </motion.div>

            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={predictDisease}
                disabled={selectedSymptoms.length < 1 || loading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition"
              >
                {loading ? "Predicting..." : "Predict Disease"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={clearAll}
                className="bg-red-100 hover:bg-red-200 text-red-700 px-6 py-2 rounded-xl font-semibold shadow-inner"
              >
                Clear All
              </motion.button>
            </div>
          </>
        )}

        {step === "result" && (
          <>
            {/* Result Step */}
            <motion.div
              className="mt-12 bg-blue-50 border border-blue-300 rounded-xl p-6 text-center shadow-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-2">Predicted Disease</h2>
              <p className="text-3xl font-bold text-blue-900">{prediction}</p>

              {!prescription && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={generatePrescription}
                  disabled={loadingPrescription}
                  className="mt-6 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-semibold shadow-md"
                >
                  {loadingPrescription ? "Loading Prescription..." : "Get Prescription"}
                </motion.button>
              )}
            </motion.div>

            {prescription && (
              <motion.div
                className="mt-6 bg-green-50 border border-green-300 rounded-xl p-6 text-left shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="text-xl font-semibold text-green-700 mb-2">🩺 Prescription</h3>
                <pre className="bg-green-100 text-green-900 p-4 rounded-xl overflow-x-auto whitespace-pre-wrap font-mono">
                  {prescription}
                </pre>
              </motion.div>
            )}

            <div className="flex justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setStep("symptom")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-xl font-semibold shadow-inner"
              >
                🔙 Back to Symptoms
              </motion.button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DiseasePredictor;
