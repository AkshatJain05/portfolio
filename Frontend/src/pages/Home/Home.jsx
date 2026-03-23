import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import Navbar from "../../components/Navbar";
import Hero from "./Hero";
import About from "./About";
import Skill from "./Skill";
import MyProject from "./MyProject";

/* ─── Reusable canvas grid (teal for contact section) ─── */
function GridCanvas({ color = "20,184,166" }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf;
    function resize() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
    resize(); window.addEventListener("resize", resize);
    function draw() {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const SZ = 52;
      ctx.strokeStyle = `rgba(${color},0.055)`; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += SZ) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = 0; y < H; y += SZ) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
      ctx.fillStyle = `rgba(${color},0.09)`;
      for (let x = 0; x < W; x += SZ)
        for (let y = 0; y < H; y += SZ) { ctx.beginPath(); ctx.arc(x,y,1.2,0,Math.PI*2); ctx.fill(); }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full block pointer-events-none" />;
}

const SOCIALS = [
  { icon: <FaGithub />,   href: "https://github.com/AkshatJain05",              label: "GitHub",   cls: "hover:text-white       hover:border-white/30     hover:bg-white/[.07]"       },
  { icon: <FaLinkedin />, href: "https://linkedin.com/in/akshat-jain-585882383",        label: "LinkedIn", cls: "hover:text-sky-400     hover:border-sky-400/40   hover:bg-sky-400/[.07]"     },
  { icon: <SiLeetcode />, href: "https://leetcode.com/u/Akshat695/",            label: "LeetCode", cls: "hover:text-amber-400   hover:border-amber-400/40 hover:bg-amber-400/[.07]"   },

];

const CONTACT_ITEMS = [
  {
    icon: "📧",
    label: "Email",
    value: "mr.akshatjain11@gmail.com",
    href: "mailto:mr.akshatjain11@gmail.com",
    desc: "Best for project inquiries",
  },
  {
    icon:<FaLinkedin/>,
    label: "LinkedIn",
    value: "https://linkedin.com/in/akshat-jain-585882383",
    href: "https://linkedin.com/in/akshat-jain-585882383",
    desc: "Let's connect professionally",
  },
  {
    icon: <FaGithub/>,
    label: "GitHub",
    value: "https://github.com/AkshatJain05",
    href: "https://github.com/AkshatJain05",
    desc: "Browse my open-source work",
  },
];

const f = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.75, delay: d, ease: [0.22, 1, 0.36, 1] },
});

const KF = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&family=Fira+Code:wght@500;600&display=swap');
  @keyframes borderGlow {
    0%,100% { box-shadow: 0 0 0 0 rgba(20,184,166,0); }
    50%      { box-shadow: 0 0 24px 2px rgba(20,184,166,.18); }
  }
  .contact-card-glow:hover { animation: borderGlow 1.8s ease-in-out; }
`;

const Home = () => {
  return (
    <>
      <style>{KF}</style>
      <div
        className="min-h-screen bg-[#06040f] text-gray-100 overflow-x-hidden"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <Navbar />
        <Hero />
        <About />
        <Skill />
        <MyProject />

        {/* ════════════════════════════════
            CONTACT SECTION
        ════════════════════════════════ */}
        <section
          id="contact"
          className="relative bg-[#06040f] py-28 px-6 overflow-hidden"
        >
          <GridCanvas color="20,184,166" />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_20%,#06040f_100%)]" />

          {/* Blobs */}
          <div className="absolute -top-24 -left-28 w-[420px] h-[420px] rounded-full pointer-events-none blur-[90px]
                          bg-[radial-gradient(circle,rgba(20,184,166,.14)_0%,transparent_70%)]" />
          <div className="absolute -bottom-20 -right-24 w-[380px] h-[380px] rounded-full pointer-events-none blur-[90px]
                          bg-[radial-gradient(circle,rgba(6,182,212,.1)_0%,transparent_70%)]" />

          <div className="relative z-10 max-w-4xl mx-auto">

            {/* Eyebrow + heading */}
            <motion.div {...f(0)} className="text-center mb-16">
              <p className="inline-flex items-center gap-3 text-[.72rem] font-medium tracking-[.12em] uppercase text-teal-400 mb-3">
                <span className="block w-7 h-px bg-gradient-to-r from-transparent to-teal-400" />
                Let's Build Together
                <span className="block w-7 h-px bg-gradient-to-l from-transparent to-teal-400" />
              </p>
              <h2
                className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#f0eeff] leading-tight mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Get in{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 bg-clip-text text-transparent">
                    Touch
                  </span>
                  <motion.span
                    className="absolute left-0 right-0 -bottom-1 h-[3px] rounded-sm bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 opacity-55"
                    initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "center" }}
                  />
                </span>
              </h2>
              <p className="text-gray-500 text-[.95rem] font-light leading-relaxed max-w-xl mx-auto">
                I'm currently open to full-time roles, freelance projects, and exciting collaborations.
                Whether you have an idea to build or just want to say hello — my inbox is always open.
              </p>
            </motion.div>

            {/* Contact info cards */}
            <motion.div {...f(0.1)} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {CONTACT_ITEMS.map(({ icon, label, value, href, desc }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, transition: { duration: 0.18 } }}
                  className="contact-card-glow flex flex-col items-center text-center gap-2 p-6 rounded-2xl
                             bg-white/[.025] border border-white/[.07] no-underline
                             hover:border-teal-400/45 hover:bg-teal-400/[.04]
                             transition-colors duration-200 group"
                >
                  <span className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-200">
                    {icon}
                  </span>
                  <span className="text-[.68rem] font-medium tracking-[.1em] uppercase text-gray-600">
                    {label}
                  </span>
                  <span className="text-[.82rem] font-medium text-gray-300 group-hover:text-teal-300 transition-colors duration-200 break-all">
                    {value}
                  </span>
                  <span className="text-[.72rem] text-gray-600 font-light">{desc}</span>
                </motion.a>
              ))}
            </motion.div>

            {/* Primary CTA */}
            <motion.div {...f(0.2)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-9 py-[14px] rounded-[14px]
                           text-[.9rem] font-semibold text-[#041a12] no-underline
                           bg-gradient-to-r from-teal-400 to-emerald-400
                           hover:from-teal-300 hover:to-emerald-300
                           shadow-[0_0_32px_rgba(20,184,166,.3),inset_0_1px_0_rgba(255,255,255,.2)]
                           hover:shadow-[0_0_52px_rgba(20,184,166,.5)]
                           hover:-translate-y-[3px] transition-all duration-[220ms]"
              >
                <FaEnvelope className="text-sm" />
                Send a Message
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >→</motion.span>
              </Link>

              <a
                href="mailto:mr.akshatjain11@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-[14px] rounded-[14px]
                           text-[.9rem] font-medium text-gray-400 no-underline
                           bg-white/[.025] border border-white/[.08]
                           hover:text-white hover:border-teal-400/40 hover:bg-teal-400/[.06]
                           hover:-translate-y-[3px] transition-all duration-200"
              >
                Direct Email ✉
              </a>
            </motion.div>

            {/* Divider with text */}
            <motion.div {...f(0.3)} className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/[.06]" />
              <span className="text-[.7rem] text-gray-700 tracking-[.1em] uppercase">Also find me on</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/[.06]" />
            </motion.div>

            {/* Social icons */}
            <motion.div {...f(0.35)} className="flex justify-center gap-3 flex-wrap">
              {SOCIALS.map(({ icon, href, label, cls }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -4, scale: 1.08, transition: { duration: 0.16 } }}
                  className={`flex items-center justify-center w-11 h-11 rounded-xl
                              text-[1.1rem] text-gray-500 no-underline
                              bg-white/[.025] border border-white/[.07]
                              ${cls} transition-all duration-200`}
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>

          </div>
        </section>

        {/* ── Footer strip ── */}
        <div className="relative border-t border-white/[.05] bg-[#06040f] px-6 py-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <span
              className="text-base font-semibold bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 bg-clip-text text-transparent"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              {"<Akshat/>"}
            </span>
            <p className="text-[.72rem] text-gray-700">
              © {new Date().getFullYear()} Akshat Jain · Built with{" "}
              <span className="text-teal-500">React</span> &{" "}
              <span className="text-sky-500">TailwindCSS</span>
            </p>
            <div className="flex gap-4">
              {["Home","About","Skills","Projects","Contact"].map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-[.72rem] text-gray-600 hover:text-teal-400 transition-colors duration-200 no-underline"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Home;