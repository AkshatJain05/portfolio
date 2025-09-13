import { FaJava, FaPython, FaJs, FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiExpress, SiTailwindcss, Si2K } from "react-icons/si";

const MySkill = ({ icon, name }) => (
  <div className="flex flex-col items-center space-y-2 p-6 bg-white/5 rounded-xl border border-gray-500 hover:border-purple-400 hover:scale-105 transform transition duration-300 shadow-md">
    <div className="text-cyan-400">{icon}</div>
    <p className="text-gray-300 font-medium">{name}</p>
  </div>
);
function Skill(){
    return<>
      <section id="skills" className="py-20 px-6 bg-gradient-to-b from-black via-gray-950 to-black">
        <h2 className="text-4xl font-bold mb-12 text-center text-purple-400">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 max-w-5xl mx-auto text-center">
          <MySkill icon={<FaJava size={50} />} name="Java" />
          <MySkill icon={<FaPython size={50} />} name="Python" />
          <MySkill icon={<FaJs size={50} />} name="JavaScript" />
          <MySkill icon={<FaReact size={50} />} name="React" />
          <MySkill icon={<SiExpress size={50} />} name="Express" />
          <MySkill icon={<FaNodeJs size={50} />} name="Node.js" />
          <MySkill icon={<SiMongodb size={50} />} name="MongoDB" />
          <MySkill icon={<SiTailwindcss size={50} />} name="TailwindCSS" />
        </div>
      </section>
    </>
}

export default Skill