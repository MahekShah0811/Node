import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const Projects = () => {
  const projectData = [
        {
          title: "E-commerce Platform (MERN)",
          description: "A full-featured shopping experience with a MongoDB backend, user authentication, and a dynamic shopping cart system.",
          tags: ["React", "Node.js", "MongoDB"],
          // A clean online shopping/product showcase image
          image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2000&auto=format&fit=crop",
        },
        {
          title: "User Authentication System",
          description: "A secure gatekeeping system featuring JWT-based authentication, password encryption, and protected routes.",
          tags: ["Express", "React", "Mongo"],
          // A strong, abstract security / lock theme
          image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop",
        },
        {
          title: "Social Media Interface",
          description: "A modern social feed clone focusing on responsive layouts, interactive components, and clean UI/UX design.",
          tags: ["JavaScript", "Tailwind", "HTML"],
          // Modern interaction/connection concept
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop",
        },
        {
          title: "Dynamic Card Generator",
          description: "A backend-focused application that generates custom user cards using server-side logic and database storage.",
          tags: ["Node", "Express", "Mongo"],
          // Dynamic, modern, abstract business card idea
          image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
        },
        {
          title: "Keep-Note Application",
          description: "A productivity tool for managing daily tasks with a focus on React state management and persistent data.",
          tags: ["React", "Tailwind", "JavaScript"],
          // Classic, clean notepad workspace theme
          image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2000&auto=format&fit=crop",
        },
        {
          title: "Vanilla JS E-commerce",
          description: "A lightweight online store built with core JavaScript to demonstrate DOM manipulation and styling efficiency.",
          tags: ["JavaScript", "Tailwind", "HTML"],
          // Minimal retail display idea
          image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2000&auto=format&fit=crop",
        },
      ];

  return (
    <section id="projects" className="py-24 px-6 md:px-20 max-w-7xl mx-auto relative">
      
      {/* Section Heading */}
      <div className="flex flex-col items-center lg:items-start mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
          Featured <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">Projects</span>
        </h2>
        <div className="h-1.5 w-12 bg-emerald-500 mt-2 rounded-full lg:ml-1" />
      </div>

      {/* Projects Grid: 1 on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectData.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-slate-200/50 dark:border-white/10 shadow-xl hover:border-emerald-500/50 transition-all duration-500"
          >
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
            </div>

            {/* Content Area */}
            <div className="p-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-emerald-500 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;