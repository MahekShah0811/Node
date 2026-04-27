import { useState } from "react";
import { Menu, X } from "lucide-react"; // Install lucide-react if you haven't
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed w-full bg-white/70 backdrop-blur-xl dark:bg-[#050505]/70 z-50 border-b border-slate-200/50 dark:border-white/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8 py-4">
        
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-black tracking-tighter bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
          Portfolio
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8 text-[13px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-emerald-500 transition-colors">{link.name}</a>
              </li>
            ))}
          </ul>
          <div className="pl-6 border-l border-slate-200 dark:border-slate-800">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-300">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-[#0b0b0b] border-b border-slate-200 dark:border-slate-800 p-6 space-y-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="block text-sm font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:text-emerald-500"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;