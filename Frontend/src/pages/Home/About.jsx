
function About(){
    return<>
      <section
  id="about"
  className="py-20 px-6 bg-gradient-to-b from-gray-950 via-black to-gray-950 text-gray-100"
>
  <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
    
    {/* Text Content */}
    <div className="md:w-2/3 text-center md:text-left">
      <h2 className="text-4xl font-bold mb-6 text-blue-400">About Me</h2>
      <p className="text-lg text-gray-300 mb-4 leading-relaxed">
        I am a Computer Science student with a strong passion for technology and development.  
        I specialize in creating efficient, user-friendly applications and enjoy exploring new frameworks, tools, and technologies.
      </p>
      <p className="text-lg text-gray-300 leading-relaxed">
        My focus is to continuously learn, grow, and contribute to innovative projects.  
        I enjoy collaborating with teams, solving challenging problems, and turning ideas into real digital experiences.
      </p>
    </div>

    {/* Decorative Card / Skills Snapshot */}
    <div className="md:w-1/3 bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-500 hover:scale-105 transform transition duration-300 text-center">
      <h3 className="text-2xl font-semibold text-purple-400 mb-4">Programming & Tools</h3>
      <div className="flex flex-wrap justify-center gap-4">
        <span className="px-3 py-1 bg-blue-800/50 rounded-full text-gray-200 font-medium hover:bg-blue-600 transition">
          Java
        </span>
        <span className="px-3 py-1 bg-green-800/50 rounded-full text-gray-200 font-medium hover:bg-green-600 transition">
          Python
        </span>
        <span className="px-3 py-1 bg-yellow-800/50 rounded-full text-gray-200 font-medium hover:bg-yellow-600 transition">
          JavaScript
        </span>
        <span className="px-3 py-1 bg-cyan-800/50 rounded-full text-gray-200 font-medium hover:bg-cyan-600 transition">
          React
        </span>
        <span className="px-3 py-1 bg-purple-800/50 rounded-full text-gray-200 font-medium hover:bg-purple-600 transition">
          Node.js
        </span>
        <span className="px-3 py-1 bg-indigo-800/50 rounded-full text-gray-200 font-medium hover:bg-indigo-600 transition">
          Express
        </span>
        <span className="px-3 py-1 bg-green-900/50 rounded-full text-gray-200 font-medium hover:bg-green-700 transition">
          MongoDB
        </span>
        <span className="px-3 py-1 bg-blue-900/50 rounded-full text-gray-200 font-medium hover:bg-blue-700 transition">
          TailwindCSS
        </span>
      </div>
    </div>
  </div>
</section>
    </>
}


export default About