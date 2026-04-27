import { motion } from "framer-motion";
import { BookOpen, Zap, Database, Layout } from "lucide-react";

const Blog = () => {
  const articles = [
    {
      date: "APRIL 25, 2026",
      title: "Getting Started with React Hooks",
      description: "A beginner's guide to React Hooks - useState, useEffect, and custom hooks. Learn how to write modern React components without classes.",
      icon: <Layout className="text-cyan-500" size={28} />,
      gradient: "from-cyan-500/10 to-blue-500/10",
    },
    {
      date: "APRIL 20, 2026",
      title: "Building REST APIs in Node.js",
      description: "Step-by-step guide to creating REST APIs using Node.js and Express.js. Learn routing, middleware, and error handling basics.",
      icon: <Zap className="text-emerald-500" size={28} />,
      gradient: "from-emerald-500/10 to-cyan-500/10",
    },
    {
      date: "APRIL 15, 2026",
      title: "Mastering Tailwind CSS v4",
      description: "Explore the new features of Tailwind CSS v4, including the native engine and enhanced utility classes for faster styling.",
      icon: <BookOpen className="text-purple-500" size={28} />,
      gradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      date: "APRIL 10, 2026",
      title: "MongoDB Schema Design",
      description: "Best practices for designing scalable MongoDB schemas. Understand embedding vs referencing for high-performance apps.",
      icon: <Database className="text-blue-500" size={28} />,
      gradient: "from-blue-500/10 to-indigo-500/10",
    }
  ];

  const handleLinkClick = (e) => {
    e.preventDefault();
    alert("Full article coming soon!");
  };

  return (
    <section id="blog" className="py-24 px-6 md:px-20 max-w-7xl mx-auto relative transition-colors duration-500">
      
      {/* Background Glows */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] -z-10" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-500/5 blur-[120px] -z-10" />

      {/* Heading */}
      <div className="flex flex-col items-center lg:items-start mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
          Latest <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">Articles</span>
        </h2>
        <div className="h-1.5 w-12 bg-emerald-500 mt-2 rounded-full lg:ml-1" />
      </div>

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
        {articles.map((article, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="group relative flex flex-col md:flex-row items-center gap-8 bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl p-8 md:p-10 rounded-[3rem] border border-slate-200/50 dark:border-white/10 hover:border-emerald-500/50 transition-all duration-500 shadow-xl dark:shadow-none"
          >
            {/* Subtle Gradient Accent */}
            <div className={`absolute inset-0 bg-gradient-to-br ${article.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[3rem] -z-10`} />

            {/* Left Side: Icon container */}
            <div className="shrink-0 p-6 bg-white/80 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/10 shadow-sm group-hover:scale-110 transition-transform duration-500">
              {article.icon}
            </div>

            {/* Right Side: Content */}
            <div className="flex-1">
              <span className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] block mb-3">
                {article.date}
              </span>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-3 leading-tight group-hover:text-emerald-500 transition-colors">
                {article.title}
              </h3>
              <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                {article.description}
              </p>

              {/* Interaction Link */}
              <button 
                onClick={handleLinkClick}
                className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-emerald-500 dark:text-emerald-400 group/btn"
              >
                Read More
                <div className="w-8 h-px bg-emerald-500 group-hover/btn:w-12 transition-all duration-300" />
              </button>
            </div>

            {/* Glass Shine */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/20 to-transparent" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Blog;