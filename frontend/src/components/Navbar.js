import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out backdrop-blur-md ${
        scrolled
          ? "bg-white/70 shadow-lg animate-fade-in-down"
          : "bg-white/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold text-sky-600 tracking-wide hover:scale-105 transition-transform duration-300">
          🏥 ArogyaAI
        </Link>
        <div className="flex space-x-6 text-base md:text-lg font-semibold">
          <Link
            to="/"
            className={`transition-all duration-200 hover:scale-105 ${
              location.pathname === "/"
                ? "text-sky-600 border-b-2 border-sky-500"
                : "text-gray-700"
            }`}
          >
            Home
          </Link>
          <Link
            to="/predict"
            className={`transition-all duration-200 hover:scale-105 ${
              location.pathname === "/predict"
                ? "text-sky-600 border-b-2 border-sky-500"
                : "text-gray-700"
            }`}
          >
            Predict
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
