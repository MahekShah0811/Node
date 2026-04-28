import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 pb-10 px-6 overflow-hidden">
      {/* Subtle Top Divider */}
      <div className="max-w-7xl mx-auto">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent mb-10" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand/Name Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex flex-col items-center md:items-start"
        >
          <p className="text-lg font-black text-slate-900 dark:text-white tracking-tighter">
            MAHEK<span className="text-emerald-500">SHAH</span>
          </p>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-[0.2em] mt-1">
            Full Stack Developer
          </p>
        </motion.div>

        {/* Copyright Section */}
        <div className="text-center md:text-right">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            © {currentYear} All Rights Reserved.
          </p>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">
            Handcrafted with <span className="text-emerald-500">React & Tailwind</span>
          </p>
        </div>
      </div>

      {/* Very subtle background glow to finish the theme */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-emerald-500/5 blur-[80px] -z-10" />
    </footer>
  );
};

export default Footer;