{/* Hero Section */}
import { Link } from "react-router-dom"
import { motion } from "framer-motion";

function Hero(){
    return<>
    <section
  id="hero"
  className="flex flex-col items-center justify-center py-35 px-6 md:px-12 text-center bg-gradient-to-b from-gray-950 via-black to-gray-950"
>
  <div className="max-w-3xl flex flex-col items-center">
    {/* Name / Title */}
    <motion.h1
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
    >
      Hi, I’m{" "}
      <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        Akshat Jain
      </span>
    </motion.h1>

    {/* Sub-heading */}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4 sm:mb-6"
    >
      MERN Stack Developer 
    </motion.h2>

    {/* Description */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4 }}
      className="text-gray-400 text-base sm:text-lg md:text-lg leading-relaxed max-w-xl mb-6 md:mb-8"
    >
      I build modern, scalable, and user-friendly web applications using
      JavaScript, MERN stack, and TailwindCSS. Passionate about crafting
      digital experiences that make an impact.
    </motion.p>

    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
      <Link
        to="/projects"
        className="w-full sm:w-auto px-6 py-3 rounded-3xl bg-gradient-to-r from-gray-950 to-blue-900 text-white font-semibold shadow-lg hover:shadow-cyan-500/40 transform hover:scale-105 transition-all duration-300 text-center"
      >
        View My Work
      </Link>
      <Link
        to="/contact"
        className="w-full sm:w-auto px-6 py-3 rounded-3xl border border-gray-600 text-gray-200 hover:bg-gray-800/70 hover:border-purple-400 transition duration-300 text-center"
      >
        Contact Me
      </Link>
    </div>
  </div>
</section></>


}

export default Hero
