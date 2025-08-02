import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import docImage from "../assets/hero_home.png";

// Animation config
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, type: "spring" },
  }),
};

function HomePage() {
  const navigate = useNavigate();

  const cards = [
    {
      icon: "🧠",
      title: "MBBS General Physician",
      desc: "Common illness diagnosis & general treatment",
      color: "from-sky-100 to-sky-200",
      border: "border-sky-300",
      route: "/predict",
    },
    {
      icon: "❤️",
      title: "Heart Specialist",
      desc: "Heart disease risk analysis and care insights",
      color: "from-red-100 to-red-200",
      border: "border-red-300",
      route: "/hearthealth",
    },
    {
      icon: "🧬",
      title: "Cancer Oncologist",
      desc: "Cancer symptom evaluation & guidance",
      color: "from-purple-100 to-purple-200",
      border: "border-purple-300",
      route: "/cancer",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100 px-4 pb-16 font-sans overflow-hidden">

      {/* DNA SVG background */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-20">
        <svg
          viewBox="0 0 800 800"
          className="w-full h-full animate-spin-slow"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          {[...Array(30)].map((_, i) => {
            const angle = (i / 30) * 2 * Math.PI;
            const x1 = 400 + 100 * Math.cos(angle);
            const y1 = 400 + 100 * Math.sin(angle);
            const x2 = 400 + 100 * Math.cos(angle + Math.PI);
            const y2 = 400 + 100 * Math.sin(angle + Math.PI);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#dnaGradient)"
                strokeWidth="2"
              />
            );
          })}
        </svg>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-grid-white/[0.1] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />

      {/* Hero Section */}
      <motion.div
        className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto py-12 px-4 md:px-8"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-sky-700 mb-6">
            Welcome to ArogyaAI 🩺
          </h1>
          <p className="text-lg text-gray-700 mb-6 max-w-xl">
            India's Smart Health Assistant powered by AI. Get instant health insights, predictive diagnosis, and professional recommendations.
          </p>
          <motion.button
            onClick={() => navigate("/predict")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-sky-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-sky-700 transition-all"
          >
            Get Started
          </motion.button>
        </div>

        <motion.img
          src={docImage}
          alt="Doctor Illustration"
          className="w-72 md:w-96 mb-10 md:mb-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>

      {/* Cards Section */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto mt-12 px-4">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            onClick={() => navigate(card.route)}
            className="relative overflow-hidden rounded-3xl p-8 h-66 cursor-pointer border border-gray-200 backdrop-blur-md bg-white/60 hover:bg-white/80 shadow-xl hover:shadow-2xl transition-all duration-300 group"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={i}
            whileTap={{ scale: 0.97 }}
          >
            {/* Gradient Ring around Icon */}
            <div className="flex items-center justify-center mb-5">
              <div className="bg-gradient-to-br from-sky-400 to-sky-600 p-1 rounded-full">
                <div className="bg-white text-4xl p-4 rounded-full shadow-sm group-hover:scale-105 transition-transform duration-300">
                  {card.icon}
                </div>
              </div>
            </div>

            {/* Title & Description */}
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-sky-800 mb-3 group-hover:text-sky-600 transition-colors">
                {card.title}
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">
                {card.desc}
              </p>
            </div>

            {/* Bottom Glow Effect */}
            <div
              className={`absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br ${card.color} blur-lg z-[-1]`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
