import { motion } from "framer-motion";
import { Code2, Rocket } from "lucide-react";

const About = () => {
  return (
    // Padding exactly matched to Hero: py-24 (total) and px-6 md:px-20
    <section id="about" className="py-24 px-6 md:px-20 max-w-7xl mx-auto relative">
      
      {/* Section Title */}
      <div className="flex flex-col items-center lg:items-start mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
          About <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">Me</span>
        </h2>
        <div className="h-1.5 w-12 bg-emerald-500 mt-2 rounded-full lg:ml-1" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Bio Card - Your Original Sizes */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 bg-white dark:bg-slate-900/40 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-slate-200/60 dark:border-white/5 shadow-xl shadow-emerald-500/5"
        >
          <Code2 className="text-emerald-500 mb-4" size={32} />
          <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
            <p>
              I am an enthusiastic <span className="text-slate-900 dark:text-white font-semibold underline decoration-emerald-400 decoration-2 underline-offset-4">fresher in web development</span>, 
              eager to kickstart my career. My core stack is built on 
              <span className="text-cyan-500 font-bold"> MERN & MySQL</span>.
            </p>
            <p>
              I specialize in transforming complex requirements into simple, beautiful, and functional web applications. 
              Driven by a constant curiosity for modern frameworks, I focus on writing clean, maintainable code 
              that follows industry best practices. I am ready to bring my energy and technical skills to a 
              professional environment where I can contribute to meaningful, real-world projects.
            </p>
          </div>
        </motion.div>

        {/* Experience Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-emerald-500 dark:bg-emerald-600 p-8 rounded-[2.5rem] text-white flex flex-col justify-center items-center text-center shadow-lg shadow-emerald-500/20"
        >
          <span className="text-7xl font-black">0</span>
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 mt-2">Years of Exp</p>
        </motion.div>

        {/* Projects Built Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-slate-900 dark:bg-white p-8 rounded-[2.5rem] text-white dark:text-slate-900 flex flex-col justify-center items-center text-center"
        >
          <span className="text-5xl font-black">4+</span>
          <p className="text-xs font-bold uppercase tracking-widest opacity-70 mt-2">Projects Built</p>
        </motion.div>

        {/* Eager & Ready Card - Now BLUE as requested */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="md:col-span-2 bg-gradient-to-r from-blue-600 to-cyan-500 p-10 rounded-[2.5rem] flex flex-col sm:flex-row items-center gap-8 shadow-xl shadow-blue-500/20"
        >
          <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl border border-white/30">
            <Rocket className="text-white animate-pulse" size={36} />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-2xl font-black text-white">Eager & Ready</h4>
            <p className="text-blue-50 max-w-md mt-2 text-sm md:text-base leading-relaxed">
              Highly motivated to contribute to real-world projects and grow as a developer under the guidance of experienced mentors.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;