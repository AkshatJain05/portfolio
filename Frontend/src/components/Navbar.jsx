import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = ["Home", "About", "Skills", "Projects", "Contact"];

  return (
    <nav className="flex justify-between items-center px-6 py-4 sticky top-0 bg-black/70 backdrop-blur-lg z-50 border-b border-gray-800">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
        {"<Akshat/>"}
      </h1>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-8 text-gray-300 font-medium">
        {links.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className="relative group hover:text-purple-400 transition"
            >
              {link}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all"></span>
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none text-gray-300"
        >
          {isOpen ? (
            <span className="text-2xl">&times;</span>
          ) : (
            <span className="text-2xl">&#9776;</span>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-full left-0 w-full bg-gray-950 text-center flex flex-col gap-4 py-4 md:hidden z-40">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="block text-lg text-gray-200 hover:text-purple-400 transition"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
