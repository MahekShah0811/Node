import { motion } from "framer-motion";

const Hero = () => {
  return (
    // Reduced min-h and pb-10 to pull the About section up
    <section id="home" className="min-h-[85vh] flex items-center justify-center px-6 md:px-20 bg-slate-50 dark:bg-[#050505] pt-24 pb-10 overflow-hidden relative">
      
      {/* Background Blurs */}
      <div className="absolute top-20 left-10 w-48 h-48 md:w-64 md:h-64 bg-emerald-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-60 h-60 md:w-80 md:h-80 bg-cyan-400/10 rounded-full blur-3xl" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center z-10">
        
        {/* Text Content */}
        <motion.div 
          className="order-2 lg:order-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs md:text-sm font-bold tracking-wide uppercase">
            Available for Work
          </span>
          
          <h1 className="mt-4 md:mt-6 text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-tight">
            Hi, I'm <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
              Mahek Shah
            </span>
          </h1>

          <p className="mt-4 text-lg md:text-xl font-medium text-slate-600 dark:text-slate-400">
            Fresher MERN Stack Developer
          </p>
          
          <p className="mt-4 text-slate-500 dark:text-slate-500 max-w-md mx-auto lg:mx-0 text-base md:text-lg leading-relaxed">
            Building elegant, responsive, and dynamic web applications with modern technologies.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            {/* Navigates to Projects Section */}
            <a href="#projects" className="inline-block">
              <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold active:scale-95 transition-all hover:shadow-lg hover:shadow-emerald-500/20">
                View My Work
              </button>
            </a>

            {/* Navigates to Contact Section */}
            <a href="#contact" className="inline-block">
              <button className="w-full sm:w-auto px-8 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 font-bold text-slate-700 dark:text-slate-300 active:scale-95 transition-all hover:bg-slate-100 dark:hover:bg-slate-900">
                Get in Touch
              </button>
            </a>
          </div>
        </motion.div>

        {/* Profile Image */}
        <motion.div 
          className="order-1 lg:order-2 flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative group max-w-[260px] md:max-w-[320px]">
            <div className="relative z-10 overflow-hidden rounded-[2.5rem] border-[6px] md:border-[10px] border-white dark:border-slate-800 shadow-xl">
              <img
                src="https://pixaii.com/files/preview/960x960/11759820975qmxzsuv4b2hri3ckcazglamdz0rs9mmwyjrvxt07bgn67jclqkpxxrykb9imkyucm1xk3f1ocwzu7h7mnevlpbdum7tnrbexmg7y.jpg"
                alt="Mahek"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-16 h-16 bg-cyan-500 rounded-2xl -z-0 rotate-12" />
            <div className="hidden sm:block absolute -top-4 -left-4 w-12 h-12 border-4 border-emerald-400 rounded-full -z-0" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;