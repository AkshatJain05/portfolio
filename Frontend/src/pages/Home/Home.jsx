import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Navbar from "../../components/NavBar";
import Hero from "./Hero";
import About from "./About";
import Skill from "./Skill";
import MyProject from "./MyProject";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-gray-100">
      
      {/* NAVBAR */}
      <Navbar/>



{/* Hero Section */}
 <Hero/>

{/* About */}
<About/>


      {/* SKILLS */}
      <Skill/>
    

      {/* PROJECTS */}
     <MyProject/>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-b from-gray-950 via-black to-gray-950 text-center">
        <h2 className="text-4xl font-bold mb-6 text-purple-400">Get in Touch</h2>
        <p className="text-lg text-gray-300 mb-8">
          Interested in collaborating or want to say hello? Let’s connect!
        </p>
        <Link
          to="/contact"
          className="px-8 py-3 rounded-2xl bg-gradient-to-r from-gray-950 to-blue-900 text-white font-medium shadow-lg hover:shadow-cyan-500/40 transform hover:scale-105 transition-all duration-300"
        >
          Contact Me
        </Link>
      </section>
    </div>
  );
};





export default Home;
