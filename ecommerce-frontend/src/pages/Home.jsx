import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { 
  FaSearch, FaFire, FaLaptop, FaTshirt, 
  FaChair, FaHeadphones, FaArrowRight, FaGraduationCap,
  FaUtensils, FaMagic, FaAppleAlt, FaSprayCan, FaCheckCircle, 
  FaExclamationCircle, FaFingerprint, FaGlobe, FaChevronRight, FaBarcode 
} from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [timeLeft, setTimeLeft] = useState(3600 * 5 + 45 * 60);
  const [categorySearch, setCategorySearch] = useState("");
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // 1. Interactive Spotlight Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 2. Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/product/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = res.data.products || [];
        setProducts(data.slice(0, 4));
      } catch (err) {
        console.error("Error fetching featured products:", err);
      }
    };
    fetchProducts();
  }, []);

  // 3. Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const categories = [
    { name: "Electronics", icon: <FaLaptop />, color: "from-indigo-500/20" },
    { name: "Fashion", icon: <FaTshirt />, color: "from-pink-500/20" },
    { name: "Furniture", icon: <FaChair />, color: "from-amber-500/20" },
    { name: "Accessories", icon: <FaHeadphones />, color: "from-indigo-500/20" },
    { name: "Kitchen", icon: <FaUtensils />, color: "from-emerald-500/20" },
    { name: "Beauty", icon: <FaMagic />, color: "from-purple-500/20" },
    { name: "Groceries", icon: <FaAppleAlt />, color: "from-red-500/20" },
    { name: "Fragrances", icon: <FaSprayCan />, color: "from-cyan-500/20" },
  ];

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  return (
    <div 
      className="min-h-screen bg-black text-white overflow-x-hidden relative"
      style={{
        backgroundImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(99, 102, 241, 0.12) 0%, transparent 40%)`
      }}
    >
      {/* Background Aesthetic Glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-1/2 right-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-32 relative z-10">
        
        {/* 1. HERO SECTION: BENTO STYLE */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <FaFingerprint className="text-indigo-400" size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
               Seasonal Sale • Up to 50% Off
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] uppercase">
              HELLO!! <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                SUMMER
              </span> Savings
            </h1>

            <p className="text-gray-400 text-md max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Upgrade your setup with our curated summer collection. High performance meets aesthetic design.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
              <button 
                onClick={() => navigate("/products")}
                className="group relative w-full sm:w-auto px-12 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.3em] rounded-full transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-4"
              >
                Explore Products
                <FaChevronRight className="transition-transform group-hover:translate-x-2" />
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-pink-600 rounded-full blur opacity-20 group-hover:opacity-100 transition duration-700 -z-10"></div>
              </button>
            </div>
          </div>

          {/* Hero Image Container (Matches Bento Grid) */}
          <div className="relative group p-2 bg-white/[0.02] border border-white/10 rounded-[3rem] backdrop-blur-xl">
            <div className="aspect-square lg:aspect-square rounded-[2.5rem] overflow-hidden relative shadow-2xl">
              <img 
                src="https://i.pinimg.com/736x/81/16/90/81169079b17d7072b0bfa620d68e46ee.jpg" 
                alt="Premium Hardware" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
              />
            </div>
          </div>
        </section>

        {/* 2. SEARCH BAR: GLASS VERSION */}
        <section className="max-w-3xl mx-auto">
          <div className="relative group">
            <FaSearch className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="text" 
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
              placeholder="Search categories (e.g. Fashion, Electronics)..."
              className="w-full bg-white/5 border border-white/10 backdrop-blur-3xl rounded-full py-8 pl-16 pr-8 focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-white/20 text-xl font-bold tracking-tight"
            />
          </div>
        </section>

        {/* 3. CATEGORIES: CYBER GRID */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end gap-6 mb-12 border-b border-white/5 pb-8">
            {/* Title Side */}
            <div className="flex items-center gap-4">
              {/* Decorative Accent Line */}
              <div className="h-1 w-12 bg-indigo-500 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic leading-none">
                Browse <span className="text-indigo-400">Categories</span>
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredCategories.map((cat, index) => (
              <div 
                key={index} 
                onClick={() => navigate(`/products?category=${cat.name}`)}
                className="group relative p-[1px] rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-indigo-500/40"></div>
                <div className="relative bg-zinc-900/80 backdrop-blur-xl p-10 flex flex-col items-center gap-4 rounded-[2rem]">
                  <div className="text-5xl text-gray-400 group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-500">
                    {cat.icon}
                  </div>
                  <span className="font-black tracking-[0.2em] uppercase text-[10px] text-gray-500 group-hover:text-white">{cat.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. DEALS: THE DARK PANEL */}
        <section className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-zinc-900/50 border border-white/10 rounded-[2.5rem] p-12 flex flex-col justify-center relative overflow-hidden group shadow-2xl">
            <div className="z-10 space-y-6">
              <span className="text-[10px] font-black tracking-[0.4em] text-indigo-400 uppercase">System Alert: Live Deal</span>
              <h2 className="text-5xl font-black tracking-tighter uppercase italic text-white leading-none">Deal of <br /> the Day</h2>
              <div className="text-6xl font-black text-white font-mono tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                {formatTime(timeLeft)}
              </div>
            </div>
            <FaFire className="absolute right-10 bottom-10 text-white/5 text-[15rem] -rotate-12 pointer-events-none group-hover:text-indigo-500/10 transition-all duration-700" />
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-indigo-950 rounded-[2.5rem] p-12 flex flex-col justify-between group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-20">
                <FaGraduationCap size={80} />
             </div>
             <h2 className="text-3xl font-black uppercase tracking-tighter leading-tight text-white relative z-10">Student <br />Access</h2>
             <div className="space-y-6 relative z-10">
               <p className="text-indigo-200 text-sm font-medium">Verify credentials for exclusive academic pricing protocols.</p>
               <button 
                 onClick={() => setShowStudentModal(true)}
                 className="w-full bg-white text-black font-black uppercase text-[10px] tracking-widest py-5 rounded-2xl hover:bg-black hover:text-white transition-all duration-500"
               >
                 Verify Account
               </button>
             </div>
          </div>
        </section>

        {/* 5. PRODUCTS: THE GALLERY */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/5 pb-8">
            {/* Title Side */}
            <div className="flex items-center gap-4">
              <div className="h-1 w-12 bg-indigo-500 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic leading-none">
                Explore <span className="text-indigo-400">Products</span>
              </h2>
            </div>

            {/* Button Side */}
            <button 
              onClick={() => navigate("/products")}
              className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 hover:text-white transition-all duration-300"
            >
              <span className="relative">
                View All Collections
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
              <FaArrowRight className="text-indigo-500 group-hover:translate-x-2 transition-transform" size={14} />
            </button>
          </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {products.map((p) => (
              <div key={p._id} className="group relative bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-5 backdrop-blur-xl hover:border-indigo-400/50 transition-all duration-700 hover:-translate-y-3 shadow-2xl">
                
                {/* Outer Glow on Hover (Subtle Indigo/Pink) */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem] pointer-events-none"></div>

                {/* Image Container */}
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 bg-zinc-900 shadow-2xl border border-white/5">
                  <img 
                    src={p.images[0] || "https://via.placeholder.com/400"} 
                    alt={p.name}
                    className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Subtle Overlay to make text pop if the image is too bright */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Product Info */}
                <div className="space-y-4 px-2 relative z-10">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-indigo-400 font-black mb-1 block">
                      {p.category}
                    </span>
                    <h3 className="text-white font-bold text-lg truncate uppercase tracking-tight">
                      {p.name}
                    </h3>
                  </div>
                  
                  <div className="flex justify-between items-center border-t border-white/10 pt-4">
                    <div className="flex flex-col">
                      <span className="text-[8px] uppercase tracking-widest text-gray-500 font-bold">Price</span>
                      <span className="text-xl font-black font-mono tracking-tighter text-white">
                        ₹{p.price}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => navigate(`/product/${p._id}`)}
                      className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-500 group/btn"
                    >
                      <FaArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* --- MODALS (UPDATED TO MATCH GLASS THEME) --- */}
      {showStudentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowStudentModal(false)}></div>
          <div className="relative bg-zinc-900 border border-white/10 p-12 rounded-[3rem] max-w-md w-full text-center shadow-[0_0_100px_rgba(99,102,241,0.2)]">
            <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <FaFingerprint className="text-3xl text-indigo-400" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 italic">Verification Required</h2>
            <p className="text-gray-500 mb-8 text-sm font-medium">Please provide your institutional email to initialize student discount protocols.</p>
            <div className="space-y-4">
              <input 
                type="email" 
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                placeholder="Academic Email Address" 
                className={`w-full bg-black border ${emailError ? 'border-red-500' : 'border-white/10'} rounded-2xl p-5 focus:outline-none focus:border-indigo-500 transition placeholder:text-white/10 text-white font-bold`} 
              />
              <button 
                onClick={() => {
                   if(!studentEmail.includes('@')) { setEmailError("Invalid Protocol"); return; }
                   setShowStudentModal(false); setShowSuccessModal(true);
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 rounded-2xl transition duration-500 uppercase tracking-[0.3em] text-[10px]"
              >
                Initialize Verification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- SUCCESS POPUP --- */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 animate-in zoom-in duration-300">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowSuccessModal(false)}></div>
          <div className="relative bg-zinc-900 border border-white/10 p-12 rounded-[3rem] max-w-md w-full text-center">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <FaCheckCircle className="text-4xl text-green-400" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 italic">Access Granted</h2>
            <p className="text-gray-500 mb-8 text-sm font-medium">Your account has been upgraded with student privileges.</p>
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-white text-black font-black py-5 rounded-2xl transition duration-500 uppercase tracking-widest text-[10px]"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;