import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  FaSearch, FaFilter, FaArrowRight, 
  FaFingerprint, FaBarcode, FaChevronDown 
} from "react-icons/fa";

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
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
    const token = localStorage.getItem("token");
    axios.get(`${import.meta.env.VITE_BASE_URL}/product/all`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const data = res.data.products || [];
      setProducts(data);
      setFilteredProducts(data);
    })
    .catch(err => console.error("Error fetching products:", err));
  }, []);

  // 3. Filter & Search Logic
  useEffect(() => {
    let result = products;
    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  const categories = ["All", ...new Set(products.map(p => p.category))];

  return (
    <div 
      className="min-h-screen bg-black text-white overflow-x-hidden relative"
      style={{
        backgroundImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(99, 102, 241, 0.12) 0%, transparent 40%)`
      }}
    >
      {/* Aesthetic Background Glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* 1. HEADER SECTION (Matches Option 1 from Home) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="flex items-center gap-4">
            <div className="h-1 w-12 bg-indigo-500 rounded-full"></div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">Products</span>
            </h1>
          </div>
        </div>

        {/* 2. FILTER & SEARCH AREA */}
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* Category Dropdown (Glass Style) */}
          <div className="relative w-full lg:w-72 group">
            <FaFilter className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-400 z-10" />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-14 pr-10 focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer backdrop-blur-3xl font-black uppercase text-[10px] tracking-widest text-white transition-all"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-zinc-950 text-white">{cat}</option>
              ))}
            </select>
            <FaChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-400 text-xs" />
          </div>

          {/* Search Input (King Style) */}
          <div className="relative flex-1 w-full group">
            <FaSearch className="absolute left-8 top-1/2 -translate-y-1/2 text-pink-400 z-10" />
            <input 
              type="text" 
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 backdrop-blur-3xl rounded-full py-5 pl-16 pr-8 focus:outline-none focus:border-pink-500/50 transition-all placeholder:text-white/10 text-lg font-bold tracking-tight text-white"
            />
          </div>
        </div>

        {/* 3. PRODUCT GRID (Exact Card Match from Home) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(p => (
              <div key={p._id} className="group relative bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-5 backdrop-blur-xl hover:border-indigo-400/50 transition-all duration-700 hover:-translate-y-3 shadow-2xl">
                
                {/* Outer Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem] pointer-events-none"></div>

                {/* Image Container (4:5 Aspect) */}
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 bg-zinc-900 shadow-2xl border border-white/5">
                  <img 
                    src={p.images[0] || "https://via.placeholder.com/400"} 
                    alt={p.name}
                    className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
                  />
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
                      <span className="text-[8px] uppercase tracking-widest text-gray-500 font-bold">Pricing</span>
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
            ))
          ) : (
            /* Empty State: Cyber Style */
            <div className="col-span-full py-40 text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-white/5 border border-dashed border-white/10 rounded-full flex items-center justify-center mb-6">
                <FaSearch className="text-white/20 text-3xl" />
              </div>
              <h3 className="text-xl font-black tracking-[0.4em] uppercase text-white/40 italic">
                Product Not Found!!
              </h3>
              <button 
                onClick={() => {setSearchTerm(""); setSelectedCategory("All")}}
                className="mt-6 text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}