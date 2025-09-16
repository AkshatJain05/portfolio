import ProjectCard from "../components/ProjectCard"
import { Link } from "react-router-dom";
import { FaHome} from "react-icons/fa"; // react-icons
import { useState } from "react";
// import api from "../utils/axios";
import { useEffect } from "react";
import Loading from "../components/Loading";
import axios from "axios";
// Projects Page
const Projects = () => {
  const [projects,setProjects] = useState([]);
  const [loading,setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api"
   
  useEffect(() =>{
    axios.get(`${API}/projects`).then((res) =>{
      setProjects(res.data);
      setLoading(false)
    }).catch((err)=>{
      console.error(Error, err.message);
      setLoading(false)
    }
    )
  },[])

  if(loading){
    return <Loading/>
  }
  return (<>
    {/* HOME BUTTON */}
      <div className="w-full flex justify-center py-2 text-left bg-slate-950">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
        >
          <FaHome /> Home
        </Link>
      </div>
    <section className="min-h-screen  text-gray-100 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
           My Projects 
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default Projects;
