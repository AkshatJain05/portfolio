import { useEffect, useState } from "react";
import api from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", description: "", codeLink: "", projectLink: "" });
  const [dataLoading, setDataLoading] = useState(true);

  const { user, loading, setUser } = useAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setDataLoading(true);
      const resProjects = await api.get("/projects");
      setProjects(resProjects.data);

      const resContacts = await api.get("/contacts");
      setContacts(resContacts.data);
    } catch (err) {
      console.error(err);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && !user) navigate("/admin/login");
    if (user) fetchData();
  }, [user, loading]);

  const addProject = async (e) => {
    e.preventDefault();
    await api.post("/projects/add-project", newProject);
    setNewProject({ title: "", description: "", codeLink: "", projectLink: "" });
    fetchData();
  };

  const deleteProject = async (id) => {
    await api.delete(`/projects/delete/${id}`);
    fetchData();
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    navigate("/admin/login");
  };

  if (dataLoading) return <Loading />;  // ⬅️ Show loader while fetching

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">⚙️ Admin Dashboard</h1>
        <button onClick={logout} className="bg-red-600 px-4 py-2 rounded cursor-pointer">Logout</button>
      </div>

      {/* Add Project */}
      <form onSubmit={addProject} className="bg-gray-800 p-6 mt-6 rounded-xl flex flex-col gap-3 max-w-lg">
        <input className="p-3 rounded bg-gray-700" placeholder="Title"
          value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
        <textarea className="p-3 rounded bg-gray-700" placeholder="Description"
          value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} />
        <input className="p-3 rounded bg-gray-700" placeholder="Code Link"
          value={newProject.codeLink} onChange={(e) => setNewProject({ ...newProject, codeLink: e.target.value })} />
        <input className="p-3 rounded bg-gray-700" placeholder="Project Link"
          value={newProject.projectLink} onChange={(e) => setNewProject({ ...newProject, projectLink: e.target.value })} />
        <button className="bg-green-600 hover:bg-green-700 p-3 rounded cursor-pointer">Add Project</button>
      </form>

      {/* Projects */}
      <h2 className="text-2xl font-semibold mt-8">📂 Projects</h2>
      <ul className="grid gap-3 mt-4">
        {projects.map(p => (
          <li key={p._id} className="bg-gray-800 p-4 rounded-lg flex justify-between">
            <span>{p.title}</span>
            <button onClick={() => deleteProject(p._id)} className="bg-red-500 px-3 py-1 rounded cursor-pointer">Delete</button>
          </li>
        ))}
      </ul>

      {/* Contacts */}
      <h2 className="text-2xl font-semibold mt-8">📨 Contact Messages</h2>
      <ul className="grid gap-3 mt-4">
        {contacts.map(c => (
          <li key={c._id} className="bg-gray-800 p-4 rounded-lg">
            <strong>{c.name}</strong> ({c.email}): {c.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
