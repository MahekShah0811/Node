import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Added for navigation
import { 
  FaSearch, FaFire, FaLaptop, FaTshirt, 
  FaChair, FaHeadphones, FaArrowRight, FaGraduationCap,
  FaUtensils, FaMagic, FaAppleAlt, FaSprayCan, FaCheckCircle, FaExclamationCircle
} from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [products, setProducts] = useState([]);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [timeLeft, setTimeLeft] = useState(3600 * 5 + 45 * 60);
  // --- NEW STATE FOR SEARCHING CATEGORIES ---
  const [categorySearch, setCategorySearch] = useState("");

  // 1. Fetch First 4 Products (Fixed Data Path)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/product/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Access .products then slice the first 4
        const data = res.data.products || [];
        setProducts(data.slice(0, 4));
      } catch (err) {
        console.error("Error fetching featured products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Timer logic remains the same
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStudentApply = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!studentEmail) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(studentEmail)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
      setShowStudentModal(false);
      setShowSuccessModal(true);
      setStudentEmail("");
    }
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const categories = [
    { name: "Electronics", icon: <FaLaptop />, color: "from-blue-500/20" },
    { name: "Fashion", icon: <FaTshirt />, color: "from-pink-500/20" },
    { name: "Furniture", icon: <FaChair />, color: "from-amber-500/20" },
    { name: "Accessories", icon: <FaHeadphones />, color: "from-indigo-500/20" },
    { name: "Kitchen", icon: <FaUtensils />, color: "from-emerald-500/20" },
    { name: "Beauty", icon: <FaMagic />, color: "from-purple-500/20" },
    { name: "Groceries", icon: <FaAppleAlt />, color: "from-red-500/20" },
    { name: "Fragrances", icon: <FaSprayCan />, color: "from-cyan-500/20" },
  ];

  // --- FILTER CATEGORIES BASED ON SEARCH ---
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  return (
    <div className="pt-24 pb-16 px-6 text-white max-w-7xl mx-auto space-y-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative min-h-[450px] bg-gradient-to-br from-[#0a0a0a] to-indigo-900/20 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row items-center px-12 py-10">
          <div className="md:w-1/2 space-y-6 z-10">
            <div className="inline-block px-4 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold tracking-widest uppercase">
              Seasonal Sale • Up to 50% Off
            </div>
            <h1 className="text-6xl font-black tracking-tighter leading-none">
              HELLO!! <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">SUMMER</span> <br /> SAVINGS
            </h1>
            <p className="text-gray-400 text-lg">
              Upgrade your setup with our curated summer collection. High performance meets aesthetic design.
            </p>
            {/* Navigates to Products Page */}
            <button 
              onClick={() => navigate("/products")}
              className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-indigo-500 hover:text-white transition-all duration-500"
            >
              Shop the Collection
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center mt-12 md:mt-0 relative group">
            <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full"></div>
            <img 
              src="https://i.pinimg.com/736x/a8/1f/06/a81f06924a905fcc1722e5ea28580ac9.jpg" 
              alt="Premium Hardware" 
              className="relative z-10 w-full max-w-md rounded-3xl object-contain drop-shadow-2xl transform group-hover:scale-110 transition duration-700"
            />
          </div>
        </div>
      </section>

      {/* 2. FUNCTIONAL SEARCH BAR */}
      <section className="max-w-3xl mx-auto">
        <div className="relative group">
          <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
          <input 
            type="text" 
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
            placeholder="Search categories (e.g. Fashion, Electronics)..."
            className="w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl py-6 pl-16 pr-6 focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-white/20 text-lg"
          />
        </div>
      </section>

      {/* 3. CATEGORIES SECTION (Updated with Filter) */}
      <section>
        <h1 className="text-4xl font-black mb-10 tracking-tighter uppercase">
          BROWSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">CATEGORIES</span>
        </h1>
        
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center animate-in fade-in duration-500">
            {filteredCategories.map((cat, index) => (
              <div 
                key={index} 
                onClick={() => navigate(`/products?category=${cat.name}`)}
                className={`bg-gradient-to-br ${cat.color} to-transparent border border-white/5 p-8 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center gap-4 hover:border-indigo-500/50 transition-all cursor-pointer group`}
              >
                <div className="text-4xl text-indigo-400 group-hover:scale-110 transition-transform duration-500">
                  {cat.icon}
                </div>
                <span className="font-bold tracking-widest uppercase text-[10px] text-gray-400">{cat.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white/5 rounded-[2.5rem] border border-dashed border-white/10">
            <FaExclamationCircle className="mx-auto text-5xl text-white/20 mb-4" />
            <p className="text-xl font-bold text-white/40 italic">Category "{categorySearch}" does not exist.</p>
            <button 
              onClick={() => setCategorySearch("")} 
              className="mt-4 text-indigo-400 text-xs font-bold uppercase tracking-widest hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>

      {/* 4. DEALS & OFFERS */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-3xl p-10 flex flex-col justify-center relative overflow-hidden group">
          <div className="z-10 space-y-4">
            <h2 className="text-3xl font-black tracking-tighter uppercase italic text-white">Deal of the Day</h2>
            <p className="text-gray-500 max-w-xs font-medium">High-performance RTX builds and accessories are now 20% off.</p>
            <div className="text-5xl font-black text-indigo-400 font-mono tracking-tighter tabular-nums">
              {formatTime(timeLeft)}
            </div>
          </div>
          <FaFire className="absolute right-10 bottom-10 text-indigo-500/5 text-9xl -rotate-12 group-hover:text-indigo-500/10 transition-all" />
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-3xl p-10 flex flex-col justify-between group">
          <h2 className="text-2xl font-black uppercase tracking-tighter leading-tight text-white">Student <br />Discount</h2>
          <div className="space-y-4">
            <p className="text-indigo-200 text-sm">Verify your ID and get an extra 10% off everything at My Store.</p>
            <button 
              onClick={() => setShowStudentModal(true)}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white text-black p-4 rounded-xl transition hover:bg-black hover:text-white"
            >
              Apply Now <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* 5. EXPLORE PRODUCTS (Updated with Premium Card UI) */}
      <section>
        <div className="flex justify-between items-end mb-10">
            <h1 className="text-4xl font-black tracking-tighter uppercase">
              EXPLORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">PRODUCTS</span>
            </h1>
            <button 
                onClick={() => navigate("/products")}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 hover:text-pink-400 transition"
            >
                View All →
            </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {products.map((p) => (
            <div key={p._id} className="group relative bg-gradient-to-br from-indigo-500/5 via-transparent to-pink-500/5 border border-white/10 rounded-[2.5rem] p-5 backdrop-blur-md hover:border-indigo-400/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl">
              
              {/* Outer Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem] pointer-events-none"></div>

              {/* Image Container */}
              <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-6 bg-zinc-900 shadow-2xl">
                <img 
                  src={p.images[0] || "https://via.placeholder.com/400"} 
                  alt={p.name}
                  className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-4 px-2 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="w-full">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-indigo-400 font-black mb-1">{p.category}</p>
                    <div className="flex justify-between items-center gap-2">
                       <h2 className="text-white font-bold text-lg leading-tight truncate flex-1">{p.name}</h2>
                       <span className="text-lg font-black font-mono tracking-tighter text-white">₹{p.price}</span>
                    </div>
                  </div>
                </div>
                
                {/* Navigation Button */}
                <button 
                  onClick={() => navigate(`/product/${p._id}`)}
                  className="w-full mt-2 py-4 bg-gradient-to-r from-indigo-600/10 to-pink-600/10 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-pink-800 hover:from-pink-800 hover:to-pink-900 hover:text-white hover:border-transparent transition-all duration-500 shadow-xl"
                >
                    View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- STUDENT DISCOUNT POPUP --- */}
      {showStudentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowStudentModal(false)}></div>
          <div className="relative bg-white/10 border border-white/20 backdrop-blur-2xl p-10 rounded-[2.5rem] max-w-md w-full shadow-2xl text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaGraduationCap className="text-4xl text-indigo-400" />
            </div>
            <h2 className="text-3xl font-black tracking-tighter uppercase italic text-white mb-4">Student Access</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Unlock exclusive pricing for the My Store tech community. Verify with your academic email.
            </p>
            <div className="space-y-4">
               <div className="text-left">
                  <input 
                    type="email" 
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="University Email" 
                    className={`w-full bg-black/40 border ${emailError ? 'border-red-500' : 'border-white/10'} rounded-xl p-4 focus:outline-none focus:border-indigo-500 transition placeholder:text-white/20 text-white`} 
                  />
                  {emailError && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold italic">{emailError}</p>}
               </div>
               <button 
                onClick={handleStudentApply}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl transition duration-300 uppercase tracking-widest text-xs"
               >
                 Verify & Apply
               </button>
            </div>
          </div>
        </div>
      )}

      {/* --- SUCCESS POPUP --- */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowSuccessModal(false)}></div>
          <div className="relative bg-white/10 border border-white/20 backdrop-blur-2xl p-10 rounded-[2.5rem] max-w-md w-full shadow-2xl text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-4xl text-green-400" />
            </div>
            <h2 className="text-3xl font-black tracking-tighter uppercase italic text-white mb-4">Applied!</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Success! Your student discount has been applied to your My Store account. Enjoy your premium tech.
            </p>
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-4 rounded-2xl transition duration-300 uppercase tracking-widest text-xs"
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;