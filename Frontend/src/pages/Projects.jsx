import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FaHome, FaGithub, FaSearch, FaTimes } from "react-icons/fa";
import ProjectCard, { CARD_KF } from "../components/ProjectCard";

/* ── Canvas grid ── */
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

/* ── Skeleton ── */
function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-[#0b091c] border border-white/[.06] animate-pulse">
      <div className="h-48 bg-white/[.04]" />
      <div className="p-6 space-y-3">
        <div className="h-4 w-3/5 rounded-full bg-white/[.06]" />
        <div className="h-3 rounded-full bg-white/[.04]" />
        <div className="h-3 w-4/5 rounded-full bg-white/[.04]" />
        <div className="h-3 w-3/4 rounded-full bg-white/[.04]" />
        <div className="flex gap-2 pt-1">
          {[0,1,2,3].map(i => <div key={i} className="h-5 w-16 rounded-full bg-white/[.04]" />)}
        </div>
        <div className="flex gap-3 pt-2">
          <div className="h-8 w-20 rounded-xl bg-white/[.04]" />
          <div className="h-8 w-24 rounded-xl bg-white/[.04]" />
        </div>
      </div>
    </div>
  );
}

/* ── Filter tab ── */
const ALL = "All";
function FilterTab({ label, active, count, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-[7px] rounded-xl text-[.78rem]
                  font-medium border transition-all duration-200 cursor-pointer whitespace-nowrap
                  ${active
                    ? "text-[#041a12] bg-gradient-to-r from-teal-400 to-emerald-400 border-teal-300/50 shadow-[0_0_18px_rgba(20,184,166,.3)] font-semibold"
                    : "text-gray-500 border-white/[.07] bg-white/[.02] hover:text-teal-300 hover:border-teal-400/30 hover:bg-teal-400/[.05]"
                  }`}
    >
      {label}
      {count !== undefined && (
        <span className={`text-[.62rem] px-[6px] py-[1px] rounded-full font-semibold
                          ${active ? "bg-black/25 text-[#041a12]" : "bg-white/[.07] text-gray-600"}`}>
          {count}
        </span>
      )}
    </button>
  );
}

export default function Projects() {
  const [projects, setProjects]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [activeTag, setActiveTag] = useState(ALL);
  const [search, setSearch]       = useState("");

  const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

  const fetchProjects = () => {
    setLoading(true); setError(null);
    axios.get(`${API}/projects`)
      .then((res) => { setProjects(res?.data?.data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  };
  useEffect(fetchProjects, []);

  /* ── Derive tags from backend data ──
     Backend shape: { title, description, codeLink, projectLink, tags? }
     tags may be absent — treat as empty array
  ── */
const safeProjects = Array.isArray(projects) ? projects : [];

const tagMap = safeProjects.reduce((acc, p) => {
  (p.tags || []).forEach(t => {
    acc[t] = (acc[t] || 0) + 1;
  });
  return acc;
}, {});

const allTags = Object.keys(tagMap).sort();


const filtered = safeProjects.filter((p) => {
  const matchTag = activeTag === ALL || (p.tags || []).includes(activeTag);

  const q = search.toLowerCase();

  const matchSearch =
    !q ||
    p.title?.toLowerCase().includes(q) ||
    p.description?.toLowerCase().includes(q) ||
    (p.tags || []).some((t) => t.toLowerCase().includes(q));

  return matchTag && matchSearch;
});

  /* live count — projectLink present & non-empty */
const liveCount = safeProjects.filter(
  (p) => p?.projectLink && p.projectLink.trim() !== ""
).length;

const hasActiveFilter = activeTag !== ALL || search.length > 0;
  return (
    <div
      className="relative min-h-screen bg-[#06040f] overflow-x-hidden"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <style>{CARD_KF}</style>
      <GridCanvas />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_20%,#06040f_100%)]" />
      <div className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full pointer-events-none blur-[110px]
                      bg-[radial-gradient(circle,rgba(20,184,166,.14)_0%,transparent_70%)]" />
      <div className="absolute -bottom-20 -right-28 w-[420px] h-[420px] rounded-full pointer-events-none blur-[100px]
                      bg-[radial-gradient(circle,rgba(6,182,212,.1)_0%,transparent_70%)]" />
      <div className="absolute top-1/3 left-2/3 w-[300px] h-[300px] rounded-full pointer-events-none blur-[90px]
                      bg-[radial-gradient(circle,rgba(52,211,153,.07)_0%,transparent_70%)]" />

      {/* ── Sticky topbar ── */}
      <div className="sticky top-0 z-30 border-b border-white/[.05] bg-[#06040f]/85 backdrop-blur-2xl px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                       text-gray-400 no-underline bg-white/[.025] border border-white/[.07]
                       hover:text-white hover:border-teal-400/40 hover:bg-teal-400/[.06]
                       transition-all duration-200 flex-shrink-0"
          >
            <FaHome className="text-sm" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <span
            className="text-lg font-semibold bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 bg-clip-text text-transparent"
            style={{ fontFamily: " monospace" }}
          >
            {"<Akshat/>"}
          </span>

          <a
            href="https://github.com/AkshatJain05"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                       text-gray-400 no-underline bg-white/[.025] border border-white/[.07]
                       hover:text-white hover:border-white/25 hover:bg-white/[.06]
                       transition-all duration-200 flex-shrink-0"
          >
            <FaGithub />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>

      {/* ── Hero strip ── */}
      <div className="relative z-10 border-b border-white/[.04] px-6 pt-14 pb-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="flex items-center gap-3 text-[.72rem] font-medium tracking-[.12em] uppercase text-teal-400 mb-3">
              <span className="block w-7 h-px bg-gradient-to-r from-transparent to-teal-400" />
              Portfolio — Akshat Jain
            </p>
            <h1
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#f0eeff] leading-tight mb-4"
              style={{ fontFamily: " sans-serif" }}
            >
              All{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 bg-clip-text text-transparent">
                  Projects
                </span>
                <motion.span
                  className="absolute left-0 right-0 -bottom-1 h-[3px] rounded-sm
                             bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 opacity-55"
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "left" }}
                />
              </span>
            </h1>
            <p className="text-gray-500 text-[.92rem] font-light leading-relaxed max-w-2xl">
              Every project I've built — full-stack MERN applications, RESTful APIs, frontend tools,
              and developer utilities. Each one represents a problem solved, a skill sharpened.
            </p>

            {/* Stat pills — computed from real API data */}
            {!loading && !error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap gap-3 mt-6"
              >
                {[
                  { label: `${projects.length} Projects`,    color: "text-teal-400    border-teal-400/25    bg-teal-400/[.06]"    },
                  { label: `${liveCount} Live`,              color: "text-emerald-400 border-emerald-400/25 bg-emerald-400/[.06]" },
                  { label: `${allTags.length} Technologies`, color: "text-sky-400     border-sky-400/25     bg-sky-400/[.06]"     },
                ].map(({ label, color }) => (
                  <span key={label} className={`px-3 py-1 rounded-full text-[.72rem] font-medium border ${color}`}>
                    {label}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Filters + Search ── */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 px-6 py-5 border-b border-white/[.04] bg-[#06040f]/60 backdrop-blur-sm"
        >
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            {/* Scrollable tag filters — only shown if tags exist */}
            {allTags.length > 0 ? (
              <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                <FilterTab label={ALL} active={activeTag === ALL} count={projects.length} onClick={() => setActiveTag(ALL)} />
                {allTags.map(tag => (
                  <FilterTab key={tag} label={tag} active={activeTag === tag} count={tagMap[tag]} onClick={() => setActiveTag(tag)} />
                ))}
              </div>
            ) : (
              <div className="text-[.75rem] text-gray-700 italic">No tags found — add a <code>tags</code> array to your project documents</div>
            )}

            {/* Search */}
            <div className="relative flex-shrink-0">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-[.72rem] pointer-events-none" />
              <input
                type="text"
                placeholder="Search title or description…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-8 py-[9px] w-full sm:w-64 rounded-xl text-[.82rem]
                           bg-white/[.03] border border-white/[.08] text-gray-300
                           placeholder:text-gray-600 focus:outline-none
                           focus:border-teal-400/50 focus:bg-teal-400/[.04]
                           transition-all duration-200"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors"
                >
                  <FaTimes className="text-[.7rem]" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-5 py-28 text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/[.07] border border-red-500/20
                            flex items-center justify-center text-2xl">⚠️</div>
            <div>
              <p className="text-gray-300 font-medium mb-1">Could not load projects</p>
              <p className="text-gray-600 text-sm font-light">{error}</p>
            </div>
            <button onClick={fetchProjects}
              className="px-6 py-[9px] rounded-xl text-sm font-medium text-teal-400
                         border border-teal-400/30 bg-teal-400/[.06]
                         hover:bg-teal-400/[.12] hover:border-teal-400/50 transition-all duration-200">
              Retry
            </button>
          </motion.div>
        )}

        {!loading && !error && (
          <>
            {/* Result info bar */}
            <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
              <p className="text-[.73rem] text-gray-600 tracking-wide">
                Showing{" "}
                <span className="text-teal-400 font-semibold">{filtered.length}</span>
                {" "}of {projects.length} projects
                {activeTag !== ALL && <> · <span className="text-teal-400">{activeTag}</span></>}
                {search && <> · "<span className="text-teal-400">{search}</span>"</>}
              </p>
              {hasActiveFilter && (
                <button onClick={() => { setActiveTag(ALL); setSearch(""); }}
                  className="inline-flex items-center gap-1 text-[.72rem] text-gray-600
                             hover:text-teal-400 transition-colors duration-200">
                  <FaTimes className="text-[.6rem]" /> Clear all
                </button>
              )}
            </div>

            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((project, i) => (
                  <motion.div
                    key={project._id || project.title}
                    layout
                    initial={{ opacity: 0, scale: 0.94, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full"
                  >
                    {/*
                      Spread the whole project object.
                      ProjectCard normalises:
                        description  → displayDesc
                        codeLink     → githubUrl
                        projectLink  → liveUrl
                    */}
                    <ProjectCard {...project} index={i} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-5 py-28 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/[.03] border border-white/[.07]
                                flex items-center justify-center text-2xl opacity-50">🔍</div>
                <div>
                  <p className="text-gray-400 font-medium mb-1">No projects found</p>
                  <p className="text-gray-600 text-sm font-light">Try a different keyword or remove the active filter.</p>
                </div>
                <button onClick={() => { setActiveTag(ALL); setSearch(""); }}
                  className="px-6 py-2 rounded-xl text-sm font-medium text-teal-400
                             border border-teal-400/30 bg-teal-400/[.06]
                             hover:bg-teal-400/[.12] transition-all duration-200">
                  Reset filters
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}