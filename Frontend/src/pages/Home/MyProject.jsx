import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProjectCard, { CARD_KF } from "../../components/ProjectCard";

/* ── Shared canvas grid (teal variant) ── */
function GridCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf;
    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);
    function draw() {
      const W = canvas.width,
        H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const SZ = 52;
      ctx.strokeStyle = "rgba(20,184,166,0.055)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += SZ) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += SZ) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(20,184,166,0.09)";
      for (let x = 0; x < W; x += SZ)
        for (let y = 0; y < H; y += SZ) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full block pointer-events-none"
    />
  );
}

const FEATURED = [
  {
    title: "Easyway Pro (AI-Powered E-Learning Platform)",
    desc: "Built a full-stack MERN platform for students featuring tools like notes, resume builder, AI chatbot, code analyzer, and task planner in one unified system. Implemented secure role-based authentication, RESTful APIs, and an admin dashboard for efficient user and content management.",
    tags: ["React", "Node.js", "MongoDB", "Redux Toolkit", "Express.js"],
    github: "https://github.com/AkshatJain05/easywaypro",
    live: "https://easywaypro.onrender.com/",
  },
  {
    title: "Tech Gadgets Gallery (E-Commerce Website) ",
    desc: "Developed a full-stack MERN e-commerce platform for tech gadgets with product catalog, search, cart, secure checkout, and Razorpay payment integration. Built RESTful APIs and an admin dashboard for efficient product and order management.",
    tags: ["React", "Node.js", "MongoDB", "Razorpay", "Express.js"],
    github: "https://github.com/AkshatJain05/Tech-Gadget-Gallery-Project",
    live: "https://tech-gadget-gallery-project-frontend.onrender.com/",
  },
  {
    title: "Resume Builder",
    desc: "Built a responsive Resume Builder using React and Tailwind CSS that allows users to create, edit, and preview professional resumes in real time. Implemented dynamic form handling, customizable templates, and instant PDF download for a seamless user experience.",
    tags: ["React", "Tailwind CSS"],
    github: "https://github.com/AkshatJain05/resume-builder",
    live: "https://resume-builder-sage-two.vercel.app/",
  },
];

const STATS = [
  { num: "8+", lbl: "Projects Shipped" },
  { num: "8+", lbl: "Live Products" },
  { num: "16+", lbl: "Tech Stack" },
];

const f = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.75, delay: d, ease: [0.22, 1, 0.36, 1] },
});

export default function MyProject() {
  return (
    <section
      id="projects"
      className="relative bg-[#06040f] py-18 px-6 overflow-hidden"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <style>{CARD_KF}</style>
      <GridCanvas />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_20%,#06040f_100%)]" />

      {/* Teal/emerald blobs */}
      <div
        className="absolute -top-32 -right-36 w-[480px] h-[480px] rounded-full pointer-events-none blur-[110px]
                      bg-[radial-gradient(circle,rgba(20,184,166,.13)_0%,transparent_70%)]"
      />
      <div
        className="absolute -bottom-24 -left-32 w-[420px] h-[420px] rounded-full pointer-events-none blur-[100px]
                      bg-[radial-gradient(circle,rgba(52,211,153,.1)_0%,transparent_70%)]"
      />
      <div
        className="absolute top-1/2 right-1/4 w-[260px] h-[260px] rounded-full pointer-events-none blur-[80px]
                      bg-[radial-gradient(circle,rgba(6,182,212,.08)_0%,transparent_70%)]"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ── Header row ── */}
        <motion.div
          {...f(0)}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
        >
          <div>
            <p className="flex items-center gap-3 text-[.72rem] font-medium tracking-[.12em] uppercase text-teal-400 mb-3">
              <span className="block w-7 h-px bg-gradient-to-r from-transparent to-teal-400" />
              What I've Built
            </p>
            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#f0eeff] leading-tight"
              style={{ fontFamily: " sans-serif" }}
            >
              Featured{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 bg-clip-text text-transparent">
                  Projects
                </span>
                <motion.span
                  className="absolute left-0 right-0 -bottom-1 h-[3px] rounded-sm bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 opacity-55"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ transformOrigin: "left" }}
                />
              </span>
            </h2>
          </div>

          {/* Mini stats */}
          <div className="flex gap-0 rounded-2xl overflow-hidden border border-white/[.06] self-start md:self-auto">
            {STATS.map(({ num, lbl }, i) => (
              <div
                key={lbl}
                className={`flex flex-col items-center px-6 py-4 bg-white/[.02]
                                         ${i < STATS.length - 1 ? "border-r border-white/[.05]" : ""}`}
              >
                <span
                  className="text-xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {num}
                </span>
                <span className="text-[.65rem] text-gray-600 tracking-[.07em] uppercase mt-[2px]">
                  {lbl}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {FEATURED.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          {...f(0.4)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-[13px] rounded-[14px]
                       text-[.9rem] font-semibold text-[#04111a] no-underline
                       bg-gradient-to-r from-teal-400 to-emerald-400
                       hover:from-teal-300 hover:to-emerald-300
                       shadow-[0_0_32px_rgba(20,184,166,.3),inset_0_1px_0_rgba(255,255,255,.2)]
                       hover:shadow-[0_0_48px_rgba(20,184,166,.5)]
                       hover:-translate-y-[3px] transition-all duration-[220ms]"
          >
            View All Projects
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              →
            </motion.span>
          </Link>

          <a
            href="https://github.com/akshatjain05"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-[13px] rounded-[14px]
                       text-[.9rem] font-medium text-gray-400 no-underline
                       bg-white/[.025] border border-white/[.08]
                       hover:text-white hover:border-teal-400/40 hover:bg-teal-400/[.06]
                       hover:-translate-y-[3px] transition-all duration-200"
          >
            GitHub Profile ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
