import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   Minimal <style> — only things Tailwind
   genuinely cannot express as utilities
───────────────────────────────────────── */
const KF = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');
  @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.95;transform:scale(.6)} }
  @keyframes caret { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes shimmer { 0%,100%{background-position:0%} 50%{background-position:100%} }
  @keyframes scrollDot { 0%,100%{top:5px;opacity:1} 60%{top:14px;opacity:0} }
  @keyframes floatHint { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(7px)} }
  .kf-blink   { animation: blink 2.2s ease-in-out infinite; }
  .kf-caret   { animation: caret 1s step-end infinite; }
  .kf-shimmer { background-size:200%; animation: shimmer 5s ease-in-out infinite; }
  .kf-float   { animation: floatHint 2.6s ease-in-out infinite; }
  .scroll-mouse::after {
    content:''; position:absolute; top:5px; left:50%; transform:translateX(-50%);
    width:4px; height:4px; border-radius:50%; background:#a78bfa;
    animation: scrollDot 2.4s ease-in-out infinite;
  }
  .btn-glow::after {
    content:''; position:absolute; inset:0; border-radius:inherit;
    background:linear-gradient(135deg,rgba(255,255,255,.13),transparent 55%);
    opacity:0; transition:opacity .22s;
  }
  .btn-glow:hover::after { opacity:1; }
`;

/* ── Animated grid canvas ── */
function GridCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf;
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00013,
      vy: (Math.random() - 0.5) * 0.00013,
      r: Math.random() * 1.4 + 0.3,
      o: Math.random() * 0.38 + 0.08,
    }));
    function resize() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
    resize();
    window.addEventListener("resize", resize);
    function draw() {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const SZ = 52;
      ctx.strokeStyle = "rgba(99,71,255,0.07)"; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += SZ) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += SZ) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      ctx.fillStyle = "rgba(99,71,255,0.12)";
      for (let x = 0; x < W; x += SZ)
        for (let y = 0; y < H; y += SZ) { ctx.beginPath(); ctx.arc(x, y, 1.3, 0, Math.PI * 2); ctx.fill(); }
      particles.forEach(p => {
        p.x = (p.x + p.vx + 1) % 1; p.y = (p.y + p.vy + 1) % 1;
        ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(130,100,255,${p.o})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full block pointer-events-none" />;
}

/* ── Typewriter ── */
const ROLES = ["MERN Stack Developer", "Full-Stack Engineer", "React Specialist", "Node.js Developer"];
function Typewriter() {
  const ref = useRef(null);
  useEffect(() => {
    let ri = 0, ci = 0, del = false, t;
    function tick() {
      const w = ROLES[ri];
      if (!del) {
        ci++; if (ref.current) ref.current.textContent = w.slice(0, ci);
        if (ci === w.length) { del = true; t = setTimeout(tick, 2000); return; }
      } else {
        ci--; if (ref.current) ref.current.textContent = w.slice(0, ci);
        if (ci === 0) { del = false; ri = (ri + 1) % ROLES.length; }
      }
      t = setTimeout(tick, del ? 42 : 78);
    }
    tick(); return () => clearTimeout(t);
  }, []);
  return <span ref={ref} className="text-violet-400" />;
}

const STACK = ["MongoDB", "Express.js", "React", "Node.js", "TypeScript", "TailwindCSS", "REST APIs", "Git"];
const STATS = [
  { num: "8+", lbl: "Projects" },
  { num: "8.5+", lbl: "CGPA (B.Tech CSE)" },
  // { num: "Fresher",  lbl: "Years Exp." },
  { num: "12+",  lbl: "Technologies" },
  { num: "100%",lbl: "Passion" },
];

/* Shared animation factory */
const fadeUp = (delay = 0, duration = 0.75) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
});

/* Stagger container */
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      <style>{KF}</style>

      <section
        ref={sectionRef}
        id="hero"
        className="relative min-h-screen bg-[#06040f] overflow-hidden flex flex-col items-center justify-center px-6 pt-24 pb-20"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {/* ── Background layers ── */}
        <GridCanvas />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_20%,#06040f_90%)]" />

        {/* Ambient blobs */}
        <div className="absolute w-[620px] h-[620px] -top-52 -left-48 rounded-full pointer-events-none blur-[100px] bg-[radial-gradient(circle,rgba(88,28,235,.2)_0%,transparent_70%)]" />
        <div className="absolute w-[500px] h-[500px] -bottom-40 -right-40 rounded-full pointer-events-none blur-[100px] bg-[radial-gradient(circle,rgba(6,182,212,.13)_0%,transparent_70%)]" />
        <div className="absolute w-[300px] h-[300px] top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none blur-[80px] bg-[radial-gradient(circle,rgba(236,72,153,.09)_0%,transparent_70%)]" />

        {/* ── Main content with parallax ── */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 max-w-[840px] w-full text-center flex flex-col items-center"
        >

          {/* Status badge */}
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 px-5 py-[7px] rounded-full
                             border border-violet-400/25 bg-violet-400/[.06]
                             text-[.72rem] font-medium tracking-[.1em] uppercase text-violet-300 mb-8">
              <span className="w-[7px] h-[7px] rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,.8)] kf-blink" />
              Open to new opportunities
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            {...fadeUp(0.1)}
            className="text-[clamp(2.8rem,8vw,4.2rem)] font-bold leading-[1.35] tracking-[-0.035em] text-[#f0eeff] italic mb-3"
            style={{ fontFamily: "sans-serif" }}
          >
            Hi, I'm{" "}
            <span className="relative inline-block">
              <span className="kf-shimmer bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent italic">
                Akshat Jain
              </span>
              {/* underline bar */}
              <motion.span
                className="absolute left-0 right-0 -bottom-[5px] h-[3px] rounded-sm bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 opacity-50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "left" }}
              />
            </span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.p
            {...fadeUp(0.18)}
            className="text-[clamp(1rem,2.5vw,1.4rem)] font-light text-gray-500 mt-5 mb-1 min-h-[2em]"
          >
            <Typewriter />
            <span className="kf-caret inline-block w-[2px] h-[1.15em] bg-violet-400 align-middle ml-[3px]" />
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="w-12 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent my-2"
          />

          {/* Description */}
        <motion.p
  {...fadeUp(0.3)}
  className="text-[clamp(.9rem,1.8vw,1.05rem)] font-light text-gray-400 leading-[1.85] max-w-[580px] mx-auto mb-10"
>
  I build{" "}
  <strong className="text-gray-100 font-semibold">modern, scalable</strong> web applications
  using the MERN stack, focusing on clean architecture and intuitive user experiences.
  My goal is to create digital products that are high-performing, reliable, and{" "}
  <strong className="text-gray-100 font-medium">truly enjoyable to use</strong>.
</motion.p>

          {/* CTA buttons */}
          <motion.div
            {...fadeUp(0.38)}
            className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto mb-14"
          >
            <Link
              to="/projects"
              className="btn-glow relative overflow-hidden inline-flex items-center justify-center gap-2
                         px-8 py-[13px] rounded-[14px] text-[.9rem] font-medium text-white no-underline
                         bg-gradient-to-br from-violet-700 to-indigo-600
                         border border-violet-400/30
                         shadow-[0_0_28px_rgba(109,40,217,.22),inset_0_1px_0_rgba(255,255,255,.1)]
                         hover:-translate-y-[3px] hover:shadow-[0_0_48px_rgba(109,40,217,.4),inset_0_1px_0_rgba(255,255,255,.12)]
                         transition-all duration-[220ms]"
            >
              View My Work
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-[13px]
                         rounded-[14px] text-[.9rem] font-medium text-gray-400 no-underline
                         bg-white/[.02] border border-white/[.08]
                         hover:text-gray-200 hover:border-violet-400/40 hover:bg-violet-400/[.06]
                         hover:-translate-y-[3px] transition-all duration-200"
            >
              Let's Connect ✉
            </Link>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            {...fadeUp(0.46)}
            className="flex justify-center mb-12 rounded-2xl overflow-hidden border border-white/[.05]
                       w-full max-w-[360px] sm:max-w-none sm:w-auto flex-col sm:flex-row"
          >
            {STATS.map(({ num, lbl }, i) => (
              <motion.div
                key={lbl}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col items-center px-7 py-4 bg-white/[.02]
                            border-white/[.05]
                            ${i < STATS.length - 1 ? "border-b sm:border-b-0 sm:border-r" : ""}`}
              >
                <span
                  className="text-[1.7rem] font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {num}
                </span>
                <span className="text-[.68rem] text-gray-600 font-normal tracking-[.08em] uppercase mt-[2px]">
                  {lbl}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech stack pills — stagger entrance */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-wrap gap-2 justify-center"
          >
            {STACK.map((s) => (
              <motion.span
                key={s}
                variants={staggerItem}
                whileHover={{ scale: 1.06, transition: { duration: 0.15 } }}
                className="px-[14px] py-[5px] rounded-full text-[.72rem] font-medium tracking-[.05em]
                           text-gray-500 border border-white/[.06] bg-white/[.02] cursor-default
                           hover:text-violet-300 hover:border-violet-400/35 hover:bg-violet-400/[.07]
                           transition-colors duration-[180ms]"
              >
                {s}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="kf-float absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-[7px] z-10"
        >
          <div className="scroll-mouse w-[18px] h-[28px] border border-violet-400/40 rounded-[9px] relative" />
          <span
            className="text-[.62rem] tracking-[.12em] uppercase text-gray-500"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            scroll
          </span>
        </motion.div>
      </section>
    </>
  );
}