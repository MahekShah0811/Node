import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaShoppingBag, FaArrowLeft, FaShieldAlt, FaTruck, FaUndo } from "react-icons/fa";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [activeImage, setActiveImage] = useState(0);

  // 1. Fetch Product Architecture from Database
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${import.meta.env.VITE_BASE_URL}/product/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setProduct(res.data.product);
    })
    .catch(err => console.error("Error fetching product details:", err));
  }, [id]);

  if (!product.name) return <div className="min-h-screen flex items-center justify-center text-indigo-400 font-black animate-pulse uppercase tracking-[0.5em]">Syncing Signal...</div>;

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-10 text-white max-w-7xl mx-auto relative">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-40 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Back Navigation */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 uppercase text-[10px] font-black tracking-widest group"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Products
      </button>

      <div className="grid lg:grid-cols-2 gap-16 relative z-10">
        
        {/* --- LEFT: Image Architecture --- */}
        <div className="space-y-6">
          <div className="relative aspect-square bg-indigo-900/10 border border-white/10 rounded-[3rem] overflow-hidden backdrop-blur-xl group shadow-2xl">
            <img 
              src={product.images?.[activeImage]} 
              alt={product.name}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            {product.isNewProduct && (
              <span className="absolute top-8 left-8 bg-indigo-600 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">New Module</span>
            )}
          </div>
          
          {/* Thumbnail Gallery */}
          <div className="flex gap-4">
            {product.images?.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-24 h-24 rounded-2xl border-2 transition-all overflow-hidden bg-zinc-950 ${activeImage === idx ? 'border-indigo-500 scale-105' : 'border-white/5 opacity-50 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="Thumbnail" />
              </button>
            ))}
          </div>
        </div>

        {/* --- RIGHT: Product Specs & Actions --- */}
        <div className="flex flex-col justify-center space-y-10">
          <div className="space-y-4">
            <p className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px]">{product.brand} // {product.category}</p>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight uppercase">
              {product.name}
            </h1>
            <div className="flex items-center gap-6 pt-2">
              <span className="text-4xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
                ₹{product.price}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${product.stock > 0 ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5' : 'border-red-500/30 text-red-400 bg-red-500/5'}`}>
                {product.stock > 0 ? `Signal Stable (${product.stock} units)` : 'Signal Lost (Out of Stock)'}
              </span>
            </div>
          </div>

          <p className="text-gray-400 text-lg leading-relaxed max-w-xl italic">
            "{product.description}"
          </p>

          {/* Quick Specs Cards */}
          <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/5">
            <div className="text-center space-y-2">
              <FaShieldAlt className="mx-auto text-indigo-400" />
              <p className="text-[8px] uppercase font-black text-gray-500 tracking-widest leading-none">Security<br/>Warranty</p>
            </div>
            <div className="text-center space-y-2 border-x border-white/5">
              <FaTruck className="mx-auto text-indigo-400" />
              <p className="text-[8px] uppercase font-black text-gray-500 tracking-widest leading-none">Express<br/>Shipping</p>
            </div>
            <div className="text-center space-y-2">
              <FaUndo className="mx-auto text-indigo-400" />
              <p className="text-[8px] uppercase font-black text-gray-500 tracking-widest leading-none">Verified<br/>Return</p>
            </div>
          </div>

          {/* Action Button: Dark Pink Hover */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-800 py-5 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] hover:bg-pink-800 hover:from-pink-800 hover:to-pink-900 transition-all duration-500 shadow-[0_20px_50px_-15px_rgba(79,70,229,0.3)] active:scale-95 flex items-center justify-center gap-3">
              <FaShoppingBag /> ADD TO CART
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all active:scale-95">
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}