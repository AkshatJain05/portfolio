import { Link } from "react-router-dom";
function MyProject(){
    const ProjectCard = ({ title, desc }) => (
  <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-500 hover:border-cyan-400 hover:scale-105 transition-transform duration-300">
    <h3 className="text-2xl font-semibold mb-4 text-purple-400">{title}</h3>
    <p className="text-gray-300 leading-relaxed">{desc}</p>
  </div>
);
    return<>
     <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-cyan-400">Projects</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <ProjectCard
            title="E-Commerce Website"
            desc="Full-stack MERN app for tech accessories with user authentication, product listings, cart, and admin panel."
          />
          <ProjectCard
            title="Resume Builder"
            desc="A web app to create professional resumes with customizable templates and export options."
          />
        </div>
        <div className="text-center mt-10">
          <Link
            to="/projects"
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-gray-950 to-blue-900 text-white font-medium shadow-lg hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-300"
          >
            View More Projects
          </Link>
        </div>
      </section>
    </>
}

export default MyProject;