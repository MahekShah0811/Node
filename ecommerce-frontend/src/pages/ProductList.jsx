import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaSearch, FaFilter, FaCheckCircle } from "react-icons/fa";

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 1. Fetch Products from Database
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

  // 2. Real-time Filter & Search Logic
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

  // 3. Wishlist Logic
  const addToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_BASE_URL}/wishlist/add`, 
        { productId }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Added to Wishlist!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add to wishlist");
    }
  };

  const categories = ["All", ...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-10 text-white max-w-7xl mx-auto relative">
      
      {/* Aesthetic Background Glows */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-40 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* 1. Centered Header */}
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter uppercase">
          EXPLORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">PRODUCTS</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Premium gear meticulously curated for the modern professional. 
          High-performance hardware meets peak aesthetic design.
        </p>
      </div>

      {/* 2. Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-16 relative z-10">
        
        {/* Category Selector */}
        <div className="relative w-full md:w-72 group">
          <FaFilter className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-400 z-10" />
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer backdrop-blur-xl font-bold uppercase text-[10px] tracking-widest text-white"
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-zinc-950 text-white uppercase">{cat}</option>
            ))}
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-400 text-[10px]">▼</div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-[450px] group">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-400 z-10" />
          <input 
            type="text" 
            placeholder="Search premium signals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-pink-500/50 transition-all placeholder:text-white/30 backdrop-blur-xl text-white"
          />
        </div>
      </div>

      {/* 3. Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(p => (
            <div key={p._id} className="group relative bg-gradient-to-br from-indigo-500/5 via-transparent to-pink-500/5 border border-white/10 rounded-[2.5rem] p-5 backdrop-blur-md hover:border-indigo-400/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl">
              
              {/* Outer Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem] pointer-events-none"></div>

              {/* Image Container */}
              <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-6 bg-zinc-900 shadow-2xl">
                <img 
                  src={p.images[0]} 
                  alt={p.name}
                  className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                />
                
                {/* Wishlist Button */}
                <button 
                  onClick={() => addToWishlist(p._id)}
                  className="absolute top-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-full text-white hover:text-pink-400 hover:scale-110 transition-all duration-300 z-20 shadow-lg"
                >
                  <FaHeart size={18} />
                </button>
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
                
                {/* Final Navigation Button with Dark Pink Hover */}
                <button 
                  onClick={() => navigate(`/product/${p._id}`)}
                  className="w-full mt-2 py-4 bg-gradient-to-r from-indigo-600/10 to-pink-600/10 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-pink-800 hover:from-pink-800 hover:to-pink-900 hover:text-white hover:border-transparent transition-all duration-500 shadow-xl"
                >
                   View Product
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-32 text-center">
            <div className="text-indigo-500/20 text-9xl mb-4 flex justify-center"><FaSearch /></div>
            <p className="text-gray-500 text-xl font-black tracking-[0.3em] uppercase">No Signals Found</p>
          </div>
        )}
      </div>
    </div>
  );
}