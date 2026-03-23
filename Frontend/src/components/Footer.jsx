import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const SOCIALS = [
  { icon: <FaGithub />,   href: "https://github.com/username",              label: "GitHub",   hover: "hover:text-gray-200  hover:border-gray-400/40  hover:bg-gray-400/[.06]"   },
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/akshat-jain",  label: "LinkedIn", hover: "hover:text-sky-400   hover:border-sky-400/40   hover:bg-sky-400/[.06]"    },
  { icon: <SiLeetcode />, href: "https://leetcode.com/username",            label: "LeetCode", hover: "hover:text-orange-400 hover:border-orange-400/40 hover:bg-orange-400/[.06]" },
  { icon: <FaTwitter />,  href: "https://twitter.com/username",             label: "Twitter",  hover: "hover:text-cyan-400  hover:border-cyan-400/40  hover:bg-cyan-400/[.06]"   },
];

const NAV = ["Home", "About", "Skills", "Projects", "Contact"];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Footer() {
  return (
    <footer
      className="relative bg-[#06040f] overflow-hidden border-t border-white/[.05]"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Top gradient line matching Hero/About accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      {/* Ambient blob */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full pointer-events-none blur-[80px] bg-[radial-gradient(circle,rgba(88,28,235,.1)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-14 pb-8">

        {/* ── Top row: brand + nav + socials ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <motion.div {...fadeUp(0)}>
            <span
              className="text-xl font-semibold bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              {"<Akshat/>"}
            </span>
            <p className="mt-3 text-sm font-light text-gray-600 leading-relaxed max-w-[220px]">
              Building modern web experiences with the MERN stack.
            </p>
          </motion.div>

          {/* Quick nav */}
          <motion.div {...fadeUp(0.08)}>
            <p className="text-[.68rem] font-medium tracking-[.1em] uppercase text-gray-600 mb-4">
              Navigate
            </p>
            <ul className="space-y-2">
              {NAV.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-gray-500 hover:text-violet-300 transition-colors duration-200 no-underline"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Socials */}
          <motion.div {...fadeUp(0.16)}>
            <p className="text-[.68rem] font-medium tracking-[.1em] uppercase text-gray-600 mb-4">
              Connect
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIALS.map(({ icon, href, label, hover }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, transition: { duration: 0.16 } }}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl
                              text-[1.1rem] text-gray-500 no-underline
                              bg-white/[.025] border border-white/[.07]
                              ${hover} transition-all duration-200`}
                >
                  {icon}
                </motion.a>
              ))}
            </div>

            {/* Email */}
            <a
              href="mailto:akshat@example.com"
              className="inline-flex items-center gap-2 mt-4 text-sm text-gray-600
                         hover:text-violet-300 transition-colors duration-200 no-underline"
            >
              <span className="text-[.9rem]">✉</span>
              akshat@example.com
            </a>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[.05] to-transparent mb-6" />

        {/* ── Bottom row ── */}
        <motion.div
          {...fadeUp(0.22)}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[.75rem] text-gray-600"
        >
          <p>© {new Date().getFullYear()} Akshat Jain. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with
            <span className="mx-1 text-violet-400">React</span>
            +
            <span className="mx-1 text-sky-400">TailwindCSS</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}