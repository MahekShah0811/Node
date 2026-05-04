import { useState } from "react"; 
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, User, LogOut, Menu, X, Radio } from "lucide-react"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); 
  };

  // Helper to style active links
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/60 border-b border-white/5">
      {/* Top thin glow line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

      <div className="flex justify-between items-center px-6 md:px-12 py-5 text-white relative">
        
        {/* 1. LOGO: Manifest Branding */}
        <div 
          onClick={() => navigate("/home")} 
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="relative">
            <Radio size={22} className="text-indigo-500 group-hover:text-pink-500 transition-colors duration-500" />
            <div className="absolute inset-0 bg-indigo-500/20 blur-lg rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-xl font-black tracking-tighter uppercase leading-none">
            MYSTORE<span className="text-indigo-500 text-xs ml-0.5 font-mono">.SYS</span>
          </h1>
        </div>

        {/* 2. CENTER: Navigation (Desktop) */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-10 items-center">
          {[
            { name: "Home", path: "/home" },
            { name: "Products", path: "/products" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              className={`relative text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 hover:text-indigo-400 ${
                isActive(link.path) ? "text-indigo-400" : "text-gray-400"
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-indigo-500 shadow-[0_0_8px_indigo]"></span>
              )}
            </Link>
          ))}
        </div>

        {/* 3. RIGHT: User Actions (Desktop) */}
        <div className="hidden md:flex gap-8 items-center">
          {user ? (
            <>
              <div className="flex flex-col text-right leading-none">
                <span className="text-[8px] uppercase tracking-[0.2em] text-gray-500 font-mono">
                  Auth_User
                </span>
                <span className="text-[11px] uppercase text-white font-black tracking-widest mt-1">
                  {user.username}
                </span>
              </div>

              <div className="flex items-center gap-5 border-l border-white/10 pl-8">
                <Link to="/cart" title="Cart" className="relative hover:text-indigo-400 transition-all duration-300 hover:-translate-y-0.5">
                  <ShoppingCart size={18} strokeWidth={2.5} />
                </Link>
                
                <Link to="/profile" title="Profile" className="hover:text-indigo-400 transition-all duration-300 hover:-translate-y-0.5">
                  <User size={18} strokeWidth={2.5} />
                </Link>
                
                <button 
                  onClick={logout} 
                  className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  <LogOut size={16} /> 
                </button>
              </div>
            </>
          ) : (
            <Link 
              to="/login" 
              className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-500 shadow-xl shadow-indigo-500/10"
            >
              Initialize Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-3xl border-b border-white/10 flex flex-col p-8 gap-8 text-white animate-in slide-in-from-top duration-500">
          <div className="flex flex-col gap-6">
            {["Home", "Products", "About", "Contact"].map((item) => (
               <Link 
                key={item}
                to={`/${item.toLowerCase()}`} 
                onClick={() => setIsOpen(false)}
                className="text-sm font-black uppercase tracking-[0.2em] border-l-2 border-transparent hover:border-indigo-500 pl-4 transition-all"
               >
                {item}
               </Link>
            ))}
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col gap-6">
            {user ? (
              <>
                <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">Logged In As</span>
                    <span className="text-lg font-black uppercase">{user.username}</span>
                </div>
                
                <Link to="/cart" className="flex items-center gap-4 text-sm font-black uppercase tracking-widest" onClick={() => setIsOpen(false)}>
                  <ShoppingCart size={20} />your Cart
                </Link>
                <Link to="/profile" className="flex items-center gap-4 text-sm font-black uppercase tracking-widest" onClick={() => setIsOpen(false)}>
                  <User size={20} /> User Profile
                </Link>
                <button 
                  onClick={() => { logout(); setIsOpen(false); }} 
                  className="flex items-center text-sm gap-4 text-red-500 font-black uppercase tracking-widest">
                  <LogOut size={20} /> logout
                </button>
              </>
            ) : (
              <Link to="/login" className="py-4 bg-indigo-600 text-center rounded-xl font-black uppercase tracking-widest" onClick={() => setIsOpen(false)}>
                Initialize Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}