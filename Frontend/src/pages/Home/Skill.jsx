import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaJava, FaPython, FaJs, FaReact, FaNodeJs, FaGitAlt, FaDocker ,FaGithub} from "react-icons/fa";
import { IoLogoVercel } from "react-icons/io5";
import { BiLogoRedux } from "react-icons/bi";
import { SiMongodb, SiExpress, SiTailwindcss, SiTypescript, SiNextdotjs, SiPostman, SiMysql  } from "react-icons/si";

/* ─── Same canvas grid used in Hero & About ─── */
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
        for (let y = 0; y < H; y += SZ) { ctx.beginPath(); ctx.arc(x, y, 1.3, 0, Math.PI * 2); ctx.fill(); }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full block pointer-events-none" />;
}

/* ─── Skill categories ─── */
const CATEGORIES = [
  {
    label: "Languages",
    skills: [
      { icon: <FaJava />,       name: "Java",       color: "text-orange-400" },
      { icon: <FaPython />,     name: "Python",     color: "text-sky-400" },
      { icon: <FaJs />,         name: "JavaScript", color: "text-yellow-400" },
      { icon: <SiTypescript />, name: "TypeScript", color: "text-blue-400" },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { icon: <FaReact />,        name: "React",      color: "text-cyan-400" },
      { icon: <SiNextdotjs />,    name: "Next.js",    color: "text-gray-300" },
      { icon: <SiTailwindcss />,  name: "Tailwind",   color: "text-teal-400" },
       { icon: <BiLogoRedux />,  name: "Redux Toolkit",   color: "text-purple-400" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { icon: <FaNodeJs />,   name: "Node.js",  color: "text-green-400" },
      { icon: <SiExpress />,  name: "Express",  color: "text-gray-400" },
      { icon: <SiMongodb />,  name: "MongoDB",  color: "text-emerald-400" },
      { icon: <SiMysql />,  name: "MYSQL",  color: "text-blue-400" },
    ],
  },
  {
    label: "Tools",
    skills: [
      { icon: <FaGitAlt />,    name: "Git",     color: "text-rose-400" },
       { icon: <FaGithub />,    name: "GitHub",     color: "text-black-400" },
      { icon: <SiPostman />,   name: "Postman", color: "text-orange-400" },
      { icon: <IoLogoVercel />,    name: "Vercel",  color: "text-gray-100" },
    ],
  },
];

/* ─── Animation helpers ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
});

const cardVariants = {
  initial: { opacity: 0, y: 28, scale: 0.95 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
};

export default function Skill() {
  return (
    <section
      id="skills"
      className="relative bg-[#06040f] py-18 px-6 overflow-hidden"
      style={{ fontFamily: "sans-serif" }}
    >
      {/* ── Background ── */}
      <GridCanvas />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_20%,#06040f_100%)]" />

      {/* Blobs */}
      <div className="absolute -top-24 -right-32 w-[420px] h-[420px] rounded-full pointer-events-none blur-[90px] bg-[radial-gradient(circle,rgba(88,28,235,.16)_0%,transparent_70%)]" />
      <div className="absolute -bottom-20 -left-28 w-[360px] h-[360px] rounded-full pointer-events-none blur-[90px] bg-[radial-gradient(circle,rgba(6,182,212,.11)_0%,transparent_70%)]" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Eyebrow + heading */}
        <motion.div {...fadeUp(0)} className="mb-16">
          <p className="flex items-center gap-3 text-[0.72rem] font-medium tracking-[.12em] uppercase text-violet-400 mb-3">
            <span className="block w-7 h-px bg-gradient-to-r from-transparent to-violet-400" />
            What I Know
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#f0eeff] leading-tight"
            style={{ fontFamily: " sans-serif" }}
          >
            My{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
                Skills
              </span>
              <span className="absolute left-0 right-0 -bottom-1 h-[3px] rounded-sm bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 opacity-50" />
            </span>
          </h2>
        </motion.div>

        {/* Category sections */}
        <div className="space-y-14">
          {CATEGORIES.map(({ label, skills }, ci) => (
            <motion.div key={label} {...fadeUp(0.1 + ci * 0.08)}>
              {/* Category label */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[.7rem] font-medium tracking-[.1em] uppercase text-gray-600">
                  {label}
                </span>
                <span className="flex-1 h-px bg-white/[.05]" />
              </div>

              {/* Skill cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {skills.map(({ icon, name, color }, si) => (
                  <motion.div
                    key={name}
                    variants={cardVariants}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.55, delay: 0.1 + si * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -5, scale: 1.03, transition: { duration: 0.18 } }}
                    className="group flex flex-col items-center gap-3 p-6
                               bg-white/[.035] border border-white/[.06] rounded-2xl
                               hover:border-violet-500/35 hover:bg-violet-500/[.05]
                               transition-colors duration-200 cursor-default"
                  >
                    {/* Icon */}
                    <span
                      className={`text-[2.4rem] leading-none ${color}
                                  group-hover:scale-110 transition-transform duration-200`}
                    >
                      {icon}
                    </span>

                    {/* Name */}
                    <span className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors duration-200">
                      {name}
                    </span>

                    {/* Glow dot */}
                    <span className="w-1 h-1 rounded-full bg-violet-400/40 group-hover:bg-violet-400 group-hover:shadow-[0_0_8px_rgba(167,139,250,.7)] transition-all duration-200" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}