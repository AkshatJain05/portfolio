import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

/* ── Same canvas grid as Hero ── */
function GridCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf;
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
      ctx.fillStyle = "rgba(99,71,255,0.10)";
      for (let x = 0; x < W; x += SZ)
        for (let y = 0; y < H; y += SZ) { ctx.beginPath(); ctx.arc(x, y, 1.2, 0, Math.PI * 2); ctx.fill(); }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full block pointer-events-none" />;
}

const SKILLS = [
  { name: "React / Next.js",   pct: 88 },
  { name: "Node.js / Express", pct: 82 },
  { name: "MongoDB",           pct: 78 },
  { name: "TypeScript",        pct: 72 },
  { name: "TailwindCSS",       pct: 90 },
];

const PILLS = [
  "JavaScript", "Java", "Python", "React", "Node.js",
  "Express", "MongoDB", "TailwindCSS", "Git", "REST APIs", "Figma", "Linux",
];

const INFO = [
  { icon: "🎓", label: "Degree",   value: "B.Tech CSE"    },
  { icon: "📍", label: "Location", value: "India"          },
  { icon: "💼", label: "Status",   value: "Open to Work"   },
  { icon: "🌐", label: "Focus",    value: "Full-Stack Dev" },
];

const f = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.75, delay: d, ease: [0.22, 1, 0.36, 1] },
});

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-[#06040f] py-20 px-6 overflow-hidden"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Grid canvas — identical to Hero */}
      <GridCanvas />

      {/* Radial vignette over grid */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_20%,#06040f_100%)]" />

      {/* Ambient blobs — mirrored from Hero */}
      <div className="absolute -top-24 -left-28 w-[420px] h-[420px] rounded-full pointer-events-none blur-[80px] bg-[radial-gradient(circle,rgba(88,28,235,.18)_0%,transparent_70%)]" />
      <div className="absolute -bottom-20 -right-24 w-[360px] h-[360px] rounded-full pointer-events-none blur-[80px] bg-[radial-gradient(circle,rgba(6,182,212,.12)_0%,transparent_70%)]" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Eyebrow + heading */}
        <motion.div {...f(0)} className="mb-14">
          <p className="flex items-center gap-3 text-[0.72rem] font-medium tracking-[.12em] uppercase text-violet-400 mb-3">
            <span className="block w-7 h-px bg-gradient-to-r from-transparent to-violet-400" />
            Who I Am
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#f0eeff] leading-tight"
            style={{ fontFamily: " sans-serif" }}
          >
            About{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
                Me
              </span>
              <span className="absolute left-0 right-0 -bottom-1 h-[3px] rounded-sm bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 opacity-50" />
            </span>
          </h2>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">

          {/* ── LEFT: bio + info cards ── */}
          <motion.div {...f(0.1)}>
          <p className="text-gray-400 text-justify md:text-[1.04rem] font-light leading-[1.85] mb-4">
  I'm a{" "}
  <strong className="text-violet-400 font-medium">Computer Science student</strong>{" "}
  passionate about building modern, user-friendly web applications. I focus on
  creating efficient and scalable solutions while constantly exploring new
  frameworks, tools, and technologies.
</p>

<p className="text-gray-400 text-justify md:text-[1.04rem] font-light leading-[1.85]">
  My goal is to grow as a developer by contributing to{" "}
  <strong className="text-violet-400 font-medium">innovative projects</strong>{" "}
  that create real impact — collaborating with teams, solving complex problems,
  and turning ideas into polished digital experiences.
</p>

            {/* Info cards */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {INFO.map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="bg-white/[.025] border border-white/[.06] rounded-2xl p-4
                             hover:border-violet-500/30 hover:bg-violet-500/[.05]
                             transition-all duration-200 group"
                >
                  <div className="text-base mb-1 opacity-60 group-hover:opacity-90 transition-opacity duration-200">
                    {icon}
                  </div>
                  <div className="text-[.68rem] font-medium tracking-[.08em] uppercase text-gray-600 mb-[3px]">
                    {label}
                  </div>
                  <div className="text-sm font-medium text-gray-400">{value}</div>
                </div>
              ))}
            </div>

            {/* Resume CTA — matching Hero's secondary button */}
            {/* <motion.div {...f(0.25)} className="mt-8">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-[14px] text-sm font-medium
                           text-gray-400 no-underline bg-white/[.02] border border-white/[.08]
                           hover:text-gray-200 hover:border-violet-400/40 hover:bg-violet-400/[.06]
                           hover:-translate-y-[2px] transition-all duration-200"
              >
                Download CV ↓
              </a>
            </motion.div> */}
          </motion.div>

          {/* ── RIGHT: skill bars + pills ── */}
          <motion.div {...f(0.2)}>

            {/* Section mini-label */}
            <p className="text-[.72rem] font-medium tracking-[.1em] uppercase text-gray-600 mb-5">
              Core Skills
            </p>

            {/* Animated skill bars */}
            <div className="space-y-4 mb-10">
              {SKILLS.map(({ name, pct }, i) => (
                <div key={name}>
                  <div className="flex justify-between mb-[6px]">
                    <span className="text-sm font-medium text-gray-400">{name}</span>
                    <span className="text-xs text-gray-600">{pct}%</span>
                  </div>
                  <div className="h-[3px] rounded-full bg-white/[.05] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-violet-700 to-sky-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Tech pills — same style as Hero stack pills */}
            <p className="text-[.72rem] font-medium tracking-[.1em] uppercase text-gray-600 mb-4">
              Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {PILLS.map((p) => (
                <span
                  key={p}
                  className="px-[14px] py-[5px] rounded-full text-[.72rem] font-medium tracking-[.05em]
                             text-gray-500 border border-white/[.06] bg-white/[.02] cursor-default
                             hover:text-violet-300 hover:border-violet-400/35 hover:bg-violet-400/[.07]
                             transition-all duration-[180ms]"
                >
                  {p}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}