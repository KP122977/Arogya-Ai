import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      className="bg-sky-100 border-t border-sky-300 mt-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sky-900">
        
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-3 text-sky-800">About ArogyaAI</h3>
          <p className="text-sm leading-relaxed">
            ArogyaAI is an intelligent health assistant system using AI/ML
            to predict diseases and generate smart prescriptions based on symptoms.
          </p>
        </div>

        {/* Team */}
        <div>
          <h3 className="text-xl font-bold mb-3 text-sky-800">Team Members</h3>
          <ul className="text-sm space-y-1">
            <li>Krish Patel</li>
            <li>Member 2</li>
            <li>Member 3</li>
            <li>Member 4</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold mb-3 text-sky-800">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>Email: <a href="mailto:support@arogyaai.com" className="text-sky-700 hover:underline">support@arogyaai.com</a></li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: Ahmedabad, India</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-bold mb-3 text-sky-800">Follow Us</h3>
          <div className="flex gap-4 text-sky-700 text-xl">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-900 transition">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-900 transition">
              <FaLinkedin />
            </a>
            <a href="mailto:support@arogyaai.com" className="hover:text-sky-900 transition">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-sky-300 text-center py-4 bg-sky-200 text-sky-800 text-sm">
        © {new Date().getFullYear()} ArogyaAI. All rights reserved.
      </div>
    </motion.footer>
  );
}

export default Footer;
