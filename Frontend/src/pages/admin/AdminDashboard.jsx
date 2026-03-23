import { useEffect, useState } from "react";
import api from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiLogOut,
  FiFolder,
  FiMail,
  FiSearch,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiEdit,
  FiX,
  FiPlus,
  FiCode,
  FiLink,
  FiTag,
} from "react-icons/fi";

// ── Animation variants ──────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.32, ease: "easeOut" },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 14 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.22, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.94, y: 14, transition: { duration: 0.16 } },
};

// ── Shared field component ──────────────────────────────────────────────────
function Field({ icon: Icon, placeholder, value, onChange, as: As = "input" }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon
          size={13}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
        />
      )}
      <As
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={[
          "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm",
          "text-slate-200 placeholder-slate-600 transition-all duration-200",
          "focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06]",
          Icon ? "pl-9 pr-3 py-2.5" : "px-3 py-2.5",
          As === "textarea" ? "resize-none h-24" : "",
        ].join(" ")}
      />
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [newProject, setNewProject] = useState({
    title: "", description: "", codeLink: "", projectLink: "", tags: "",
  });
  const [editOpen, setEditOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  const { user, loading, setUser } = useAuth();
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setDataLoading(true);
      const res = await api.get(`/projects?search=${search}&tag=${tagFilter}&page=${page}&limit=6`);
      setProjects(res.data.data);
      setPages(res.data.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setDataLoading(false);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await api.get("/contacts");
      setContacts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!loading && !user) navigate("/admin/login");
    if (user) { fetchProjects(); fetchContacts(); }
  }, [user, loading, page, search, tagFilter]);

  const addProject = async (e) => {
    e.preventDefault();
    await api.post("/projects/add-project", newProject);
    setNewProject({ title: "", description: "", codeLink: "", projectLink: "", tags: "" });
    setPage(1);
    setActiveTab("projects");
    fetchProjects();
  };

 const deleteProject = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this project?");
  
  if (!confirmDelete) return; //  if user clicks NO

  try {
    await api.delete(`/projects/delete/${id}`);
    fetchProjects();
  } catch (err) {
    console.error(err);
  }
};

  const updateProject = async (e) => {
    e.preventDefault();
    await api.put(`/projects/update/${editProject._id}`, editProject);
    setEditOpen(false);
    fetchProjects();
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    navigate("/admin/login");
  };

  if (dataLoading && activeTab === "projects") return <Loading />;

  const tabs = [
    { id: "projects", label: "Projects", icon: FiFolder },
    { id: "add",      label: "Add Project", icon: FiPlus },
    { id: "contacts", label: "Contacts",    icon: FiMail },
  ];

  return (
    <div
      className="min-h-screen bg-[#07080f] text-slate-200"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4
        bg-[#07080f]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ boxShadow: ["0 0 6px #6366f1aa", "0 0 14px #6366f1cc", "0 0 6px #6366f1aa"] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="w-2 h-2 rounded-full bg-indigo-400"
          />
          <div>
            <p className="text-[15px] font-semibold text-slate-100 leading-none">Admin Dashboard</p>
            <p className="text-[10px] text-slate-600 uppercase tracking-widest mt-0.5">Control Panel</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-slate-400">
              <span className="text-slate-200 font-semibold">{projects.length}</span> Projects
            </span>
            <span className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-slate-400">
              <span className="text-slate-200 font-semibold">{contacts.length}</span> Messages
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium
              bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/15 transition-colors"
          >
            <FiLogOut size={13} /> Logout
          </motion.button>
        </div>
      </header>

      {/* ── Body ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Tab bar */}
        <div className="flex gap-1 p-1 mb-8 w-fit rounded-xl bg-white/[0.03] border border-white/[0.06]">
          {tabs.map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              onClick={() => setActiveTab(id)}
              whileTap={{ scale: 0.96 }}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-[8px] text-[13px] font-medium transition-colors duration-200
                ${activeTab === id ? "text-indigo-300" : "text-slate-500 hover:text-slate-300"}`}
            >
              {activeTab === id && (
                <motion.span
                  layoutId="tab-active"
                  className="absolute inset-0 bg-indigo-500/15 rounded-[8px] border border-indigo-500/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.38 }}
                />
              )}
              <Icon size={13} className="relative z-10" />
              <span className="relative z-10">{label}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ── ADD PROJECT ── */}
          {activeTab === "add" && (
            <motion.div
              key="add"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="max-w-lg mx-auto"
            >
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7">
                <div className="h-px bg-gradient-to-r from-indigo-500/60 via-sky-400/40 to-transparent mb-6 rounded-full" />
                <h2 className="text-[17px] font-semibold text-slate-100 mb-5">New Project</h2>

                <form onSubmit={addProject} className="space-y-3">
                  <Field icon={FiFolder}  placeholder="Project title"       value={newProject.title}       onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
                  <Field                  placeholder="Description"          value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} as="textarea" />
                  <Field icon={FiCode}    placeholder="Code link (GitHub)"   value={newProject.codeLink}    onChange={(e) => setNewProject({ ...newProject, codeLink: e.target.value })} />
                  <Field icon={FiLink}    placeholder="Live project link"    value={newProject.projectLink} onChange={(e) => setNewProject({ ...newProject, projectLink: e.target.value })} />
                  <Field icon={FiTag}     placeholder="Tags — react, mern"   value={newProject.tags}        onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })} />

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-2.5 mt-1 rounded-lg text-sm font-semibold text-white
                      bg-gradient-to-r from-indigo-600 to-indigo-500
                      hover:from-indigo-500 hover:to-sky-500
                      shadow-[0_4px_20px_rgba(99,102,241,0.3)] transition-all duration-200"
                  >
                    Add Project
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}

          {/* ── PROJECTS ── */}
          {activeTab === "projects" && (
            <motion.div key="projects" initial="hidden" animate="show" variants={stagger}>

              {/* Search row */}
              {/* <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <FiSearch size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                  <input
                    placeholder="Search projects…"
                    value={search}
                    onChange={(e) => { setPage(1); setSearch(e.target.value); }}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-9 pr-3 py-2.5
                      text-sm text-slate-200 placeholder-slate-600
                      focus:outline-none focus:border-indigo-500/50 transition-all"
                  />
                </div>
                <div className="relative sm:w-44">
                  <FiTag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                  <input
                    placeholder="Filter by tag"
                    value={tagFilter}
                    onChange={(e) => { setPage(1); setTagFilter(e.target.value); }}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-9 pr-3 py-2.5
                      text-sm text-slate-200 placeholder-slate-600
                      focus:outline-none focus:border-indigo-500/50 transition-all"
                  />
                </div>
              </motion.div> */}

              {/* Project cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((p, i) => (
                  <motion.div
                    key={p._id}
                    variants={fadeUp}
                    custom={i}
                    whileHover={{ y: -3, borderColor: "rgba(99,102,241,0.28)" }}
                    className="group relative flex flex-col gap-3 bg-white/[0.025] border border-white/[0.07]
                      rounded-xl p-5 overflow-hidden transition-colors duration-200"
                  >
                    {/* Top accent */}
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-indigo-500/70 via-sky-400/50 to-transparent" />

                    <div>
                      <h3 className="text-[15px] font-semibold text-slate-100">{p.title}</h3>
                      <p className="text-[13px] text-slate-500 mt-1 leading-relaxed line-clamp-2">{p.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {p.tags?.map((t, j) => (
                        <span key={j} className="text-[11px] font-medium px-2 py-0.5 rounded-full
                          bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-white/[0.05]">
                      <motion.button
                        whileTap={{ scale: 0.93 }}
                        onClick={() => { setEditProject({ ...p, tags: p.tags.join(", ") }); setEditOpen(true); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium
                          bg-amber-500/8 border border-amber-500/20 text-amber-400
                          hover:bg-amber-500/15 transition-colors"
                      >
                        <FiEdit size={11} /> Edit
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.93 }}
                        onClick={() => deleteProject(p._id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium
                          bg-red-500/8 border border-red-500/20 text-red-400
                          hover:bg-red-500/15 transition-colors"
                      >
                        <FiTrash2 size={11} /> Delete
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mt-8">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg
                    bg-white/[0.04] border border-white/[0.08] text-slate-400
                    hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <FiChevronLeft size={15} />
                </motion.button>
                <span className="text-sm text-slate-500 tabular-nums">
                  <span className="text-slate-200 font-semibold">{page}</span>
                  <span className="mx-2 text-slate-700">/</span>
                  {pages}
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  disabled={page === pages}
                  onClick={() => setPage(page + 1)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg
                    bg-white/[0.04] border border-white/[0.08] text-slate-400
                    hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <FiChevronRight size={15} />
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* ── CONTACTS ── */}
          {activeTab === "contacts" && (
            <motion.div key="contacts" initial="hidden" animate="show" variants={stagger} className="space-y-3">
              {contacts.length === 0 && (
                <motion.p variants={fadeUp} className="text-sm text-slate-600 text-center py-16">
                  No messages yet.
                </motion.p>
              )}
              {contacts.map((c, i) => (
                <motion.div
                  key={c._id}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ borderColor: "rgba(255,255,255,0.12)" }}
                  className="relative flex items-start gap-4 bg-white/[0.025] border border-white/[0.07]
                    rounded-xl p-5 overflow-hidden transition-colors"
                >
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-sky-400/60 to-indigo-500/40" />

                  <div className="w-9 h-9 rounded-full bg-sky-500/10 border border-sky-500/20
                    flex items-center justify-center shrink-0 text-sky-400 ml-2">
                    <FiMail size={14} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-slate-200">{c.name}</p>
                    <p className="text-[12px] text-indigo-400/70 mt-0.5">{c.email}</p>
                    <p className="text-[13px] text-slate-400 mt-2 leading-relaxed">{c.message}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── EDIT MODAL ── */}
      <AnimatePresence>
        {editOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            onClick={() => setEditOpen(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#0d0f1e] border border-white/[0.1] rounded-2xl p-7 shadow-2xl"
            >
              <div className="h-px bg-gradient-to-r from-indigo-500/60 via-sky-400/40 to-transparent mb-6 rounded-full" />

              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[17px] font-semibold text-slate-100">Edit Project</h2>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setEditOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg
                    bg-white/[0.05] border border-white/[0.08] text-slate-400
                    hover:text-slate-200 transition-colors"
                >
                  <FiX size={14} />
                </motion.button>
              </div>

              <form onSubmit={updateProject} className="space-y-3">
                <Field icon={FiFolder}  placeholder="Project title"    value={editProject.title || ""}       onChange={(e) => setEditProject({ ...editProject, title: e.target.value })} />
                <Field                  placeholder="Description"       value={editProject.description || ""} onChange={(e) => setEditProject({ ...editProject, description: e.target.value })} as="textarea" />
                <Field icon={FiCode}    placeholder="Code link"         value={editProject.codeLink || ""}    onChange={(e) => setEditProject({ ...editProject, codeLink: e.target.value })} />
                <Field icon={FiLink}    placeholder="Project link"      value={editProject.projectLink || ""} onChange={(e) => setEditProject({ ...editProject, projectLink: e.target.value })} />
                <Field icon={FiTag}     placeholder="Tags — react, mern" value={editProject.tags || ""}       onChange={(e) => setEditProject({ ...editProject, tags: e.target.value })} />

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-2.5 mt-1 rounded-lg text-sm font-semibold text-white
                    bg-gradient-to-r from-indigo-600 to-indigo-500
                    hover:from-indigo-500 hover:to-sky-500
                    shadow-[0_4px_20px_rgba(99,102,241,0.3)] transition-all duration-200"
                >
                  Save Changes
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}