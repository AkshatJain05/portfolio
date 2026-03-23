import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa";

/* ── Keyframes exported so Projects.jsx can inject them ── */
export const CARD_KF = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&family=Fira+Code:wght@500;600&display=swap');

  @keyframes cardShimmer {
    0%   { transform: translateX(-120%) skewX(-12deg); }
    100% { transform: translateX(260%)  skewX(-12deg); }
  }
  .card-shine { position: relative; overflow: hidden; }
  .card-shine:hover::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.055) 50%, transparent 60%);
    animation: cardShimmer 0.7s ease forwards;
    pointer-events: none; z-index: 20;
  }

  @keyframes livePulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(52,211,153,.5); }
    50%       { box-shadow: 0 0 0 5px rgba(52,211,153,0); }
  }
  .live-dot { animation: livePulse 2s ease-in-out infinite; }
`;

/* ── Per-tag color map ── */
const TAG = {
  "React":       "text-cyan-300    border-cyan-400/25    bg-cyan-400/[.07]",
  "Next.js":     "text-slate-200   border-slate-400/25   bg-slate-400/[.06]",
  "Node.js":     "text-emerald-300 border-emerald-400/25 bg-emerald-400/[.07]",
  "MongoDB":     "text-green-300   border-green-400/25   bg-green-400/[.07]",
  "Express":     "text-slate-300   border-slate-400/25   bg-slate-400/[.06]",
  "TypeScript":  "text-blue-300    border-blue-400/25    bg-blue-400/[.07]",
  "TailwindCSS": "text-teal-300    border-teal-400/25    bg-teal-400/[.07]",
  "Stripe":      "text-violet-300  border-violet-400/25  bg-violet-400/[.07]",
  "JWT":         "text-amber-300   border-amber-400/25   bg-amber-400/[.07]",
  "Redux":       "text-purple-300  border-purple-400/25  bg-purple-400/[.07]",
  "REST API":    "text-sky-300     border-sky-400/25     bg-sky-400/[.07]",
  "jsPDF":       "text-rose-300    border-rose-400/25    bg-rose-400/[.07]",
  "Swagger":     "text-lime-300    border-lime-400/25    bg-lime-400/[.07]",
  "Docker":      "text-sky-300     border-sky-400/25     bg-sky-400/[.07]",
  "PostgreSQL":  "text-blue-300    border-blue-400/25    bg-blue-400/[.07]",
};
const defaultTag = "text-gray-400 border-gray-500/25 bg-gray-500/[.05]";

/* ── Background pattern per card index ── */
const BANNER_GRADIENTS = [
  "from-[#0c1a2e] via-[#091428] to-[#060e1e]",   // deep navy
  "from-[#0e1a14] via-[#091410] to-[#050e08]",   // deep forest
  "from-[#1a0e2e] via-[#120928] to-[#08051e]",   // deep violet
  "from-[#1a0e14] via-[#14080e] to-[#0e0508]",   // deep rose
  "from-[#0e1628] via-[#091220] to-[#050a14]",   // midnight blue
  "from-[#141a0c] via-[#101408] to-[#080e04]",   // moss
];

const CODE_LINES = [
  ["const router = express.Router()",   "text-teal-400/50",    0  ],
  ["router.use(authMiddleware)",         "text-sky-400/40",     16 ],
  ["await Project.findById(id)",         "text-emerald-400/45", 0  ],
  ["res.json({ success: true })",        "text-violet-400/40",  8  ],
];

export default function ProjectCard({
  title = "Untitled Project",
  // support both backend field names and aliased prop names
  description,
  desc,
  tags  = [],
  codeLink,
  github,
  projectLink,
  live,
  image,
  stars,
  index = 0,
}) {
  // normalise backend fields → internal names
  const displayDesc   = desc        || description || "No description provided.";
  const githubUrl     = github      || codeLink    || null;
  const liveUrl       = live        || projectLink || null;
  const grad = BANNER_GRADIENTS[index % BANNER_GRADIENTS.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7, transition: { duration: 0.18 } }}
      className={`card-shine group flex flex-col rounded-2xl overflow-hidden h-full
                  bg-[#0b091c] border border-white/[.07]
                  hover:border-teal-400/50
                  hover:shadow-[0_12px_48px_rgba(20,184,166,.1),0_0_0_1px_rgba(20,184,166,.15)]
                  transition-all duration-300`}
    >
      {/* ─── Banner ─── */}
      <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${grad} flex-shrink-0`}>
        {image ? (
          <img
            src={image} alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-50
                       group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          /* Decorative code snippet */
          <div className="absolute inset-0 flex flex-col justify-center px-7 gap-3 select-none">
            {CODE_LINES.map(([line, color, indent], i) => (
              <span
                key={i}
                className={`text-[.68rem] leading-relaxed ${color}`}
                style={{ fontFamily: "'Fira Code', monospace", paddingLeft: `${indent}px` }}
              >
                {line}
              </span>
            ))}
          </div>
        )}

        {/* Scanline texture */}
        <div
          className="absolute inset-0 opacity-[.035] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,.6) 2px,rgba(255,255,255,.6) 3px)",
            backgroundSize: "100% 3px",
          }}
        />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b091c] via-[#0b091c]/30 to-transparent" />

        {/* ── Overlays ── */}
        {/* Index badge */}
        <div
          className="absolute top-3 left-3 w-9 h-9 flex items-center justify-center
                     rounded-xl bg-black/55 border border-white/[.1] backdrop-blur-sm
                     text-[.7rem] font-semibold text-teal-400"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Stars badge */}
        {stars && (
          <div className="absolute top-3 left-14 flex items-center gap-[5px] px-2 py-1 rounded-full
                          bg-black/50 border border-yellow-400/20 backdrop-blur-sm">
            <FaStar className="text-yellow-400 text-[.6rem]" />
            <span className="text-[.62rem] font-medium text-yellow-300">{stars}</span>
          </div>
        )}

        {/* Live badge */}
        {liveUrl && (
          <div className="absolute top-3 right-3 flex items-center gap-[6px] px-[10px] py-[5px]
                          rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-sm">
            <span className="live-dot w-[5px] h-[5px] rounded-full bg-emerald-400" />
            <span className="text-[.6rem] font-semibold tracking-wider text-emerald-400 uppercase">Live</span>
          </div>
        )}

        {/* Category dot-row (decorative) */}
        <div className="absolute bottom-4 right-4 flex gap-[5px] opacity-40">
          {[...Array(3)].map((_, i) => (
            <span key={i} className={`w-[5px] h-[5px] rounded-full
              ${i === 0 ? "bg-teal-400" : i === 1 ? "bg-emerald-400" : "bg-sky-400"}`} />
          ))}
        </div>
      </div>

      {/* ─── Body ─── */}
      <div className="flex flex-col flex-1 p-6 gap-4">

        {/* Title */}
        <h3
          className="text-[1.05rem] font-bold leading-snug text-[#eeeeff]
                     group-hover:text-teal-300 transition-colors duration-200"
          style={{ fontFamily: " sans-serif" }}
        >
          {title}
        </h3>

        {/* Description — full, readable */}
        <p className="text-[.855rem] font-light text-gray-500 leading-[1.75] flex-1 line-clamp-4 text-justify">
          {displayDesc}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-[6px]">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`px-[10px] py-[3px] rounded-full text-[.65rem] font-medium
                            tracking-wide border ${TAG[tag] || defaultTag}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[.07] to-transparent" />

        {/* ── Action row ── */}
        <div className="flex items-center gap-3">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-[8px] rounded-xl
                         text-[.78rem] font-medium text-gray-400 no-underline
                         bg-white/[.03] border border-white/[.08]
                         hover:text-white hover:border-white/[.22] hover:bg-white/[.07]
                         transition-all duration-200 group/btn"
            >
              <FaGithub className="text-sm group-hover/btn:rotate-12 transition-transform duration-200" />
              Code
            </a>
          )}

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-[8px] rounded-xl
                         text-[.78rem] font-semibold text-[#041a12] no-underline
                         bg-gradient-to-r from-teal-400 to-emerald-400
                         hover:from-teal-300 hover:to-emerald-300
                         shadow-[0_0_20px_rgba(20,184,166,.28)]
                         hover:shadow-[0_0_34px_rgba(20,184,166,.5)]
                         hover:-translate-y-[1px] transition-all duration-200"
            >
              <FaExternalLinkAlt className="text-[.6rem]" />
              Live Demo
            </a>
          )}

          {/* Arrow hint — far right */}
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
            className="ml-auto text-[.85rem] text-gray-700 group-hover:text-teal-500 transition-colors duration-200"
          >
            →
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
}