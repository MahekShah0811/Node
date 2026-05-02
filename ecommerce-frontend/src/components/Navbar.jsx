import { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
// Removed 'Heart' from the icon imports
import { ShoppingCart, User, LogOut, Menu, X } from "lucide-react"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); 
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); 
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
      <div className="flex justify-between items-center px-6 md:px-12 py-4 text-white relative">
        
        {/* 1. TOP-LEFT: Logo */}
        <h1 
          onClick={() => navigate("/home")} 
          className="text-2xl font-extrabold tracking-wide cursor-pointer hover:text-indigo-400 transition duration-300"
        >
          MyStore
        </h1>

        {/* 2. CENTER: Navigation Links (Desktop) */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-8 text-sm font-medium">
          <Link to="/home" className="hover:text-indigo-400 text-md font-bold hover:underline transition duration-300">Home</Link>
          <Link to="/products" className="hover:text-indigo-400 text-md font-bold hover:underline transition duration-300">Products</Link>
          <Link to="/about" className="hover:text-indigo-400 text-md font-bold hover:underline transition duration-300">About</Link>
          <Link to="/contact" className="hover:text-indigo-400 text-md font-bold hover:underline transition duration-300">Contact</Link>
        </div>

        {/* 3. TOP-RIGHT: User Actions with Icons (Desktop) */}
        <div className="hidden md:flex gap-6 items-center">
          {user ? (
            <>
              <div className="flex flex-col text-right leading-tight mr-4">
                <span className="text-[10px] uppercase tracking-wider text-indigo-300/80 font-bold">
                  Hello,
                </span>
                <span className="text-sm capitalize text-white font-extrabold">
                  {user.username}
                </span>
              </div>

              {/* Wishlist Link/Icon removed from Desktop */}

              <Link to="/cart" title="Cart" className="hover:text-indigo-400 transition duration-300">
                <ShoppingCart size={20} />
              </Link>
              
              <Link to="/profile" title="Profile" className="hover:text-indigo-400 transition duration-300">
                <User size={20} />
              </Link>
              
              <button 
                onClick={logout} 
                title="Logout"
                className="text-red-400 hover:text-red-500 transition duration-300"
              >
                <LogOut size={20} /> 
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="px-4 py-1 bg-indigo-500 hover:bg-indigo-600 rounded-md text-sm transition duration-300"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="md:hidden text-white hover:text-indigo-400 transition" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 flex flex-col p-6 gap-6 text-white animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            <Link to="/home" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setIsOpen(false)}>Products</Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          </div>
          
          <hr className="border-white/10" />
          
          <div className="flex flex-col gap-5">
            {user ? (
              <>
                <p className="text-indigo-300 font-bold">Hello, {user.username}</p>
                
                {/* Wishlist Link/Icon removed from Mobile */}

                <Link to="/cart" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
                  <ShoppingCart size={20} /> Cart
                </Link>
                <Link to="/profile" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
                  <User size={20} /> Profile
                </Link>
                <button 
                  onClick={() => { logout(); setIsOpen(false); }} 
                  className="flex items-center gap-3 text-red-400 font-bold"
                >
                  <LogOut size={20} /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-indigo-400 font-bold" onClick={() => setIsOpen(false)}>Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}