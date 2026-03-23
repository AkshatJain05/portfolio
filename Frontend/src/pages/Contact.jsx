import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaGithub, FaLinkedin, FaEnvelope, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import api from "../utils/axios";

/* ─── Keyframes only (pseudo-element can't be Tailwind) ─── */
const KF = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&family=Fira+Code:wght@500;600&display=swap');
  @keyframes scanline {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  .scanline::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, transparent 50%, rgba(20,184,166,.02) 50%);
    background-size: 100% 4px;
    pointer-events: none;
  }
`;

/* ─── Canvas grid ─── */
function GridCanvas() {
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
      ctx.strokeStyle = "rgba(20,184,166,0.055)"; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += SZ) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = 0; y < H; y += SZ) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
      ctx.fillStyle = "rgba(20,184,166,0.09)";
      for (let x = 0; x < W; x += SZ)
        for (let y = 0; y < H; y += SZ) { ctx.beginPath(); ctx.arc(x,y,1.2,0,Math.PI*2); ctx.fill(); }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full block pointer-events-none" />;
}

/* ─── Social links ─── */
const SOCIALS = [
  { icon: <FaGithub />,   href: "https://github.com/AkshatJain05",       label: "GitHub",   cls: "hover:text-white     hover:border-white/30     hover:bg-white/[.07]"     },
  { icon: <FaLinkedin />, href: "https://linkedin.com/in/akshat-jain-585882383", label: "LinkedIn", cls: "hover:text-sky-400   hover:border-sky-400/40   hover:bg-sky-400/[.07]"   },
  { icon: <SiLeetcode />, href: "https://leetcode.com/u/Akshat695/",     label: "LeetCode", cls: "hover:text-amber-400 hover:border-amber-400/40 hover:bg-amber-400/[.07]" },
];

/* ─── Info chips ─── */
const INFO = [
  { icon: <FaEnvelope />, text: "mr.akshatjain11@gmail.com",       href: "mailto:mr.akshatjain11@gmail.com"       },
  { icon: <FaGithub />,   text: "https://github.com/AkshatJain05",    href: "https://github.com/AkshatJain05"   },
  { icon: <FaLinkedin />, text: "https://linkedin.com/in/akshat-jain-585882383", href: "https://linkedin.com/in/akshat-jain-585882383" },
];

const f = (d = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
});

const inputBase = `
  w-full px-4 py-[13px] rounded-xl text-[.9rem] font-light text-gray-200
  bg-white/[.03] border border-white/[.08]
  placeholder:text-gray-600
  focus:outline-none focus:border-teal-400/60 focus:bg-teal-400/[.04]
  transition-all duration-200
`;

export default function Contact() {
  const [form, setForm]           = useState({ name: "", email: "", message: "" });
  const [loading, setLoading]     = useState(false);
  const [status, setStatus]       = useState(null); // "success" | "error"
  const [touched, setTouched]     = useState({});
  const [charCount, setCharCount] = useState(0);

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    if (field === "message") setCharCount(e.target.value.length);
  };
  const blur = (field) => () => setTouched(t => ({ ...t, [field]: true }));

  const isValid = form.name.trim() && /\S+@\S+\.\S+/.test(form.email) && form.message.trim().length >= 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) { setTouched({ name: true, email: true, message: true }); return; }
    setLoading(true); setStatus(null);
    try {
      await api.post("/contacts", form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setCharCount(0); setTouched({});
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  const err = {
    name:    touched.name    && !form.name.trim(),
    email:   touched.email   && !/\S+@\S+\.\S+/.test(form.email),
    message: touched.message && form.message.trim().length < 10,
  };

  return (
    <>
      <style>{KF}</style>
      <div
        className="scanline relative min-h-screen bg-[#06040f] overflow-x-hidden"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <GridCanvas />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_20%,#06040f_100%)]" />
        <div className="absolute -top-36 -left-36 w-[520px] h-[520px] rounded-full pointer-events-none blur-[110px]
                        bg-[radial-gradient(circle,rgba(20,184,166,.14)_0%,transparent_70%)]" />
        <div className="absolute -bottom-24 -right-28 w-[400px] h-[400px] rounded-full pointer-events-none blur-[100px]
                        bg-[radial-gradient(circle,rgba(6,182,212,.1)_0%,transparent_70%)]" />

        {/* ── Topbar ── */}
        <div className="sticky top-0 z-30 border-b border-white/[.05] bg-[#06040f]/85 backdrop-blur-2xl px-6 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                         text-gray-400 no-underline bg-white/[.025] border border-white/[.07]
                         hover:text-white hover:border-teal-400/40 hover:bg-teal-400/[.06]
                         transition-all duration-200"
            >
              <FaHome className="text-sm" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <span
              className="text-lg font-semibold bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 bg-clip-text text-transparent"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              {"<Akshat/>"}
            </span>

            <div className="flex gap-2">
              {SOCIALS.map(({ icon, href, label, cls }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className={`flex items-center justify-center w-9 h-9 rounded-xl text-sm text-gray-500
                              bg-white/[.025] border border-white/[.07] no-underline
                              ${cls} transition-all duration-200`}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Toast notification ── */}
        <AnimatePresence>
          {status && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3
                          px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl
                          ${status === "success"
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                            : "bg-red-500/10    border-red-500/30    text-red-300"
                          }`}
            >
              {status === "success"
                ? <FaCheckCircle className="text-lg text-emerald-400" />
                : <FaTimesCircle className="text-lg text-red-400" />
              }
              <span className="text-sm font-medium">
                {status === "success"
                  ? "Message delivered! I'll get back to you soon 🎉"
                  : "Couldn't send your message. Please try again."}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Main content ── */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">

          {/* Heading */}
          <motion.div {...f(0)} className="text-center mb-14">
            <p className="inline-flex items-center gap-3 text-[.72rem] font-medium tracking-[.12em] uppercase text-teal-400 mb-3">
              <span className="block w-7 h-px bg-gradient-to-r from-transparent to-teal-400" />
              Let's Work Together
              <span className="block w-7 h-px bg-gradient-to-l from-transparent to-teal-400" />
            </p>
            <h1
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
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "center" }}
                />
              </span>
            </h1>
            <p className="text-gray-500 text-[.95rem] font-light leading-relaxed max-w-xl mx-auto">
              I'm currently open to full-time roles, freelance projects, and exciting collaborations.
              Whether you have an idea or just want to say hello — my inbox is always open.
            </p>
          </motion.div>

          {/* ── Two-column layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 items-start">

            {/* Left: info panel */}
            <motion.div {...f(0.15)} className="space-y-6">
              {/* Availability badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                              border border-emerald-500/30 bg-emerald-500/[.07]
                              text-[.75rem] font-medium text-emerald-400">
                <span className="w-[6px] h-[6px] rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,.8)]" />
                Available for new opportunities
              </div>

              <div>
                <h3
                  className="text-lg font-bold text-[#f0eeff] mb-1"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Let's build something great
                </h3>
                <p className="text-[.88rem] text-gray-600 font-light leading-relaxed">
                  I specialise in full-stack MERN development, RESTful APIs, and clean, responsive UIs.
                  Reach me through the form or directly via any channel below.
                </p>
              </div>

              {/* Info links */}
              <div className="space-y-3">
                {INFO.map(({ icon, text, href }) => (
                  <a
                    key={text}
                    href={href}
                    target={href.startsWith("mailto") ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl no-underline
                               bg-white/[.025] border border-white/[.07]
                               hover:border-teal-400/40 hover:bg-teal-400/[.05]
                               transition-all duration-200 group"
                  >
                    <span className="text-teal-400 text-sm group-hover:scale-110 transition-transform duration-200">
                      {icon}
                    </span>
                    <span className="text-[.82rem] text-gray-400 group-hover:text-teal-300 transition-colors duration-200">
                      {text}
                    </span>
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/[.06] to-transparent" />

              {/* Social icons */}
              <div className="flex gap-3">
                {SOCIALS.map(({ icon, href, label, cls }) => (
                  <motion.a
                    key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    whileHover={{ y: -3, scale: 1.1, transition: { duration: 0.15 } }}
                    className={`flex items-center justify-center w-11 h-11 rounded-xl
                                text-base text-gray-500 no-underline
                                bg-white/[.025] border border-white/[.07]
                                ${cls} transition-all duration-200`}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div {...f(0.2)}>
              <form
                onSubmit={handleSubmit}
                className="bg-[#0c0a1e] border border-white/[.07] rounded-2xl p-8 space-y-5
                           hover:border-teal-400/25 transition-colors duration-300"
              >
                {/* Name */}
                <div>
                  <label className="block text-[.72rem] font-medium tracking-[.08em] uppercase text-gray-600 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Akshat Jain"
                    value={form.name}
                    onChange={set("name")}
                    onBlur={blur("name")}
                    className={`${inputBase} ${err.name ? "border-red-500/50 bg-red-500/[.04]" : ""}`}
                  />
                  {err.name && (
                    <p className="mt-1 text-[.72rem] text-red-400">Please enter your name</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[.72rem] font-medium tracking-[.08em] uppercase text-gray-600 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={set("email")}
                    onBlur={blur("email")}
                    className={`${inputBase} ${err.email ? "border-red-500/50 bg-red-500/[.04]" : ""}`}
                  />
                  {err.email && (
                    <p className="mt-1 text-[.72rem] text-red-400">Please enter a valid email</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-[.72rem] font-medium tracking-[.08em] uppercase text-gray-600">
                      Message
                    </label>
                    <span className={`text-[.68rem] ${charCount < 10 ? "text-gray-700" : "text-teal-500"}`}>
                      {charCount} / 500
                    </span>
                  </div>
                  <textarea
                    rows={5}
                    maxLength={500}
                    placeholder="Tell me about your project, idea, or just say hello…"
                    value={form.message}
                    onChange={set("message")}
                    onBlur={blur("message")}
                    className={`${inputBase} resize-none ${err.message ? "border-red-500/50 bg-red-500/[.04]" : ""}`}
                  />
                  {err.message && (
                    <p className="mt-1 text-[.72rem] text-red-400">Message must be at least 10 characters</p>
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.015, y: -2, transition: { duration: 0.18 } } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  className={`relative w-full py-[14px] rounded-[14px] text-[.9rem] font-semibold
                              overflow-hidden transition-all duration-[220ms]
                              ${loading
                                ? "bg-white/[.05] border border-white/[.08] text-gray-600 cursor-not-allowed"
                                : "text-[#041a12] bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 shadow-[0_0_28px_rgba(20,184,166,.28)] hover:shadow-[0_0_44px_rgba(20,184,166,.45)]"
                              }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Sending…
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <FaEnvelope className="text-sm" />
                      Send Message
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      >→</motion.span>
                    </span>
                  )}
                </motion.button>

                <p className="text-center text-[.7rem] text-gray-700 font-light">
                  I typically respond within 24 hours.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}