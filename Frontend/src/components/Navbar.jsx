import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KF = `
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@500;600&family=Outfit:wght@400;500&display=swap');
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .nav-slide { animation: slideDown 0.22s ease forwards; }
  .ham-open .bar1 { transform: translateY(7px) rotate(45deg); }
  .ham-open .bar2 { opacity: 0; width: 0 !important; }
  .ham-open .bar3 { transform: translateY(-7px) rotate(-45deg); }
`;

const LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

export default function Navbar() {
  const [isOpen,  setIsOpen]  = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active,  setActive]  = useState("home");

  /* ── scroll detection + active section ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = LINKS.map(l => document.getElementById(l.toLowerCase())).filter(Boolean);
      const hit = sections.find(s => {
        const { top, bottom } = s.getBoundingClientRect();
        return top <= 80 && bottom > 80;
      });
      if (hit) setActive(hit.id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = (link) => {
    setIsOpen(false);
    setActive(link.toLowerCase());
  };

  return (
    <>
      <style>{KF}</style>

      <nav
        className={`fixed w-full bottom-2 top-0 z-50 flex items-center justify-between px-6 md:px-10 h-[64px]
                    transition-all duration-300
                    ${scrolled
                      ? "bg-[#06040f]/88 backdrop-blur-2xl border-b border-white/[.05] shadow-[0_1px_0_rgba(20,184,166,0.1)]"
                      : "bg-transparent"
                    }`}
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {/* ── Logo ── */}
        <motion.span
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-[1.8rem] font-bold tracking-tight bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 bg-clip-text text-transparent select-none italic"
          style={{ fontFamily: " monospace" }}
        >
          {"<Akshat/>"}
        </motion.span>

        {/* ── Desktop links ── */}
        <motion.ul
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:flex items-center gap-1 list-none m-0 p-0"
        >
          {LINKS.map((link, i) => {
            const isActive = active === link.toLowerCase();
            return (
              <motion.li
                key={link}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={() => handleLinkClick(link)}
                  className={`relative px-3 py-[6px] rounded-lg text-sm font-medium no-underline
                              transition-all duration-200 group
                              ${isActive
                                ? "text-teal-300 bg-teal-400/[.08]"
                                : "text-gray-500 hover:text-gray-200 hover:bg-white/[.04]"
                              }`}
                >
                  {link}
                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-full bg-teal-400"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {/* Hover underline */}
                  {!isActive && (
                    <span
                      className="absolute left-3 right-3 -bottom-[2px] h-[2px] w-0 rounded-sm
                                 bg-gradient-to-r from-teal-400 to-emerald-400
                                 group-hover:w-[calc(100%-24px)] transition-all duration-[240ms] ease-in-out"
                    />
                  )}
                </a>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* ── CTA + hamburger row ── */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3"
        >
          {/* Hire me CTA — desktop only */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-4 py-[7px] rounded-xl
                       text-[.8rem] font-semibold text-[#041a12] no-underline
                       bg-gradient-to-r from-teal-400 to-emerald-400
                       hover:from-teal-300 hover:to-emerald-300
                       shadow-[0_0_16px_rgba(20,184,166,.22)]
                       hover:shadow-[0_0_26px_rgba(20,184,166,.4)]
                       hover:-translate-y-[1px] transition-all duration-200"
          >
            Hire Me ✦
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className={`md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1
                        ${isOpen ? "ham-open" : ""}`}
          >
            <span className="bar1 block w-[22px] h-[2px] bg-gray-400 rounded-sm transition-all duration-300 origin-center" />
            <span className="bar2 block w-[22px] h-[2px] bg-gray-400 rounded-sm transition-all duration-300 origin-center" />
            <span className="bar3 block w-[22px] h-[2px] bg-gray-400 rounded-sm transition-all duration-300 origin-center" />
          </button>
        </motion.div>

        {/* ── Mobile dropdown ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              key="mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-[64px] left-0 right-0
                         bg-[#06040f]/97 backdrop-blur-2xl
                         border-b border-teal-400/[.12]
                         flex flex-col py-3 list-none m-0 md:hidden z-40"
            >
              {LINKS.map((link, i) => {
                const isActive = active === link.toLowerCase();
                return (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={`#${link.toLowerCase()}`}
                      onClick={() => handleLinkClick(link)}
                      className={`flex items-center justify-between px-6 py-[11px] text-sm font-medium no-underline
                                  transition-all duration-200
                                  ${isActive
                                    ? "text-teal-300 bg-teal-400/[.07]"
                                    : "text-gray-500 hover:text-gray-200 hover:bg-white/[.04]"
                                  }`}
                    >
                      {link}
                      {isActive && (
                        <span className="w-[5px] h-[5px] rounded-full bg-teal-400 shadow-[0_0_6px_rgba(20,184,166,.7)]" />
                      )}
                    </a>
                  </motion.li>
                );
              })}

              {/* Mobile hire CTA */}
              <li className="px-6 pt-3 pb-2">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 py-[11px] rounded-xl
                             text-sm font-semibold text-[#041a12] no-underline
                             bg-gradient-to-r from-teal-400 to-emerald-400
                             hover:from-teal-300 hover:to-emerald-300
                             shadow-[0_0_16px_rgba(20,184,166,.22)]
                             transition-all duration-200"
                >
                  Hire Me ✦
                </a>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}