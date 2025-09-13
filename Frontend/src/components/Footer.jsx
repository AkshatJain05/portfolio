import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-10  border-t border-gray-700">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Left Side: Copyright */}
        <p className="text-center md:text-left text-gray-400 text-sm md:text-base mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Akshat Jain. All rights reserved.
        </p>

        {/* Center: Social Icons */}
        <div className="flex justify-center space-x-6 mb-4 md:mb-0">
          <a
            href="https://github.com/AkshatJain05"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white hover:scale-110 transition-transform duration-300"
          >
            <FaGithub size={28} />
          </a>
          <a
            href="https://www.linkedin.com/in/akshat-jain-585882383?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 hover:scale-110 transition-transform duration-300"
          >
            <FaLinkedin size={28} />
          </a>
        </div>

       
      </div>
    </footer>
  );
};

export default Footer;
