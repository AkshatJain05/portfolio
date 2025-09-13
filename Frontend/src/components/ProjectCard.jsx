import { FaGithub, FaExternalLinkAlt} from "react-icons/fa"; // react-icons
// Individual Project Card
const ProjectCard = ({ title, description, codeLink,projectLink }) => {
  return (
      <>

    <div className=" backdrop-blur-md border border-gray-400 rounded-2xl p-6 shadow-sm  shadow-blue-700
                    hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300">
      {/* Title */}
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      
      {/* Description */}
      <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <a
          href={projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-slate-950 to-slate-900 
                     text-white font-medium shadow hover:scale-105 transition border-1 border-white"
        >
          <FaExternalLinkAlt /> Live Demo
        </a>
        <a
          href={codeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-slate-950 to-slate-900 
                     text-white font-medium shadow hover:scale-105 transition border-1 border-white"
        >
          <FaGithub /> Code
        </a>
      </div>
    </div>
    </>
  );
};

export default ProjectCard
