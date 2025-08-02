// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import DiseasePredictor from "./components/DiseasePredictor";
import HeartHealth from "./components/HeartHealth";


function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/predict" element={<DiseasePredictor />} />
            <Route path="/hearthealth" element={<HeartHealth />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;



