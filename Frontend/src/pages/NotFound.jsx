import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white px-6">
      
      <div className="text-center max-w-xl">
        
        {/* Animated 404 */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-8xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg text-gray-300"
        >
          Oops! The page you're looking for doesn't exist.
        </motion.p>

        {/* Decorative line */}
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full" />

        {/* Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/"
            className="mt-8 inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 font-semibold"
          >
             Go Back Home
          </Link>
        </motion.div>

        {/* Optional hint */}
        <p className="mt-6 text-sm text-gray-500">
          or check the URL for mistakes
        </p>
      </div>
    </section>
  );
}