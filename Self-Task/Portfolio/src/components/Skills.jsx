import { motion } from "framer-motion";
import { Monitor, Server, Database, Code2 } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Monitor size={24} className="text-emerald-500" />,
      color: "from-emerald-400 to-cyan-500",
      skills: [
        { name: "HTML & CSS", level: "95%" },
        { name: "Bootstrap", level: "75%" },
        { name: "Tailwind CSS", level: "92%" },
        { name: "JavaScript", level: "90%" },
        { name: "React.js", level: "85%" },
      ],
    },
    {
      title: "Programming",
      icon: <Code2 size={24} className="text-purple-500" />,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "C Language", level: "85%" },
        { name: "C++ (Basic)", level: "70%" },
        { name: "Python (Basic)", level: "65%" },
      ],
    },
    {
      title: "Backend",
      icon: <Server size={24} className="text-blue-500" />,
      color: "from-blue-500 to-indigo-600",
      skills: [
        { name: "Node.js", level: "80%" },
        { name: "Express.js", level: "78%" },
      ],
    },
    {
      title: "Database",
      icon: <Database size={24} className="text-cyan-500" />,
      color: "from-cyan-400 to-blue-500",
      skills: [
        { name: "MongoDB", level: "82%" },
        { name: "MySQL", level: "88%" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 px-6 md:px-20 max-w-7xl mx-auto relative overflow-hidden transition-colors duration-500">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[100px] -z-10" />

      {/* Heading Section */}
      <div className="flex flex-col items-center lg:items-start mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
          My <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">Skills</span>
        </h2>
        <div className="h-1.5 w-12 bg-emerald-500 mt-2 rounded-full lg:ml-1" />
      </div>

      {/* Bento Grid: 1 column on mobile, 2 on tablet/desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="relative group overflow-hidden 
                       bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl 
                       p-8 md:p-10 rounded-[2.5rem] 
                       border border-slate-200/50 dark:border-white/10 
                       shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-none
                       hover:border-emerald-400/50 dark:hover:border-emerald-500/30 
                       transition-all duration-500"
          >
            {/* Glass Shine Highlight */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/20 to-transparent" />

            {/* Header Area */}
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-white/80 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm">
                {category.icon}
              </div>
              <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-widest">
                {category.title}
              </h3>
            </div>

            {/* Skill Bars */}
            <div className="space-y-7">
              {category.skills.map((skill, sIdx) => (
                <div key={sIdx} className="w-full">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[15px] font-bold text-slate-700 dark:text-slate-300">
                      {skill.name}
                    </span>
                    <span className="text-xs font-black text-slate-400 dark:text-slate-500">
                      {skill.level}
                    </span>
                  </div>
                  
                  {/* Outer Bar */}
                  <div className="h-2.5 w-full bg-slate-200/50 dark:bg-white/5 rounded-full overflow-hidden p-[1.5px]">
                    {/* Animated Progress Fill */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: skill.level }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      viewport={{ once: true }}
                      className={`h-full rounded-full bg-gradient-to-r ${category.color} 
                                 shadow-[0_0_15px_-3px_rgba(52,211,153,0.5)]`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;