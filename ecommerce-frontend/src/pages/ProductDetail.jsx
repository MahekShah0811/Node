import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { 
  FaShoppingBag, FaArrowLeft, FaShieldAlt, FaTruck, 
  FaUndo, FaCheck, FaFingerprint, FaBarcode, FaCube, 
  FaChevronRight 
} from "react-icons/fa";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [activeImage, setActiveImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(false);
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

  // 2. Fetch Data
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${import.meta.env.VITE_BASE_URL}/product/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProduct(res.data.product))
    .catch(err => console.error("Signal Error:", err));

    if (token) {
      axios.get(`${import.meta.env.VITE_BASE_URL}/cart/all`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const cartItems = res.data.cart?.items || [];
        const alreadyInCart = cartItems.some(item => 
          (item.productId?._id || item.productId) === id
        );
        setIsAdded(alreadyInCart);
      })
      .catch(err => console.error("Cart Sync Error:", err));
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (isAdded) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");
      await axios.post(`${import.meta.env.VITE_BASE_URL}/cart/add`,
        { productId: id, quantity: 1 }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsAdded(true);
    } catch (err) {
      console.error("Transmission Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = () => {
    navigate("/order-confirmation", { state: { product, directBuy: true } });
  };

  if (!product.name) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-indigo-400 font-black animate-pulse uppercase tracking-[0.5em] text-xs">
        Syncing Product...
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-screen bg-black text-white overflow-x-hidden relative"
      style={{
        backgroundImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(99, 102, 241, 0.15) 0%, transparent 40%)`
      }}
    >
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10">
        
        {/* Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-white hover:border-indigo-500/50 transition-all mb-12 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back
        </button>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* MEDIA SECTION */}
          <div className="space-y-8">
            <div className="relative group p-2 bg-white/[0.02] border border-white/10 rounded-[3rem] backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="aspect-square rounded-[2.5rem] overflow-hidden relative">
                <img 
                  src={product.images?.[activeImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                />
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-4 px-2">
              {product.images?.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 rounded-2xl border-2 transition-all duration-500 overflow-hidden bg-zinc-900 shadow-xl ${
                    activeImage === idx 
                    ? 'border-indigo-500 scale-110' 
                    : 'border-white/5 opacity-40 hover:opacity-100 hover:border-white/20'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="Thumbnail" />
                </button>
              ))}
            </div>
          </div>

          {/* CONTENT SECTION */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                <FaFingerprint className="text-indigo-400 text-xs" />
                <span className="text-[9px] font-black uppercase tracking-widest text-indigo-300">Verified Product</span>
              </div>
              
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">{product.brand} // {product.category}</p>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] uppercase italic">
                  {product.name.split(' ')[0]} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                    {product.name.split(' ').slice(1).join(' ')}
                  </span>
                </h1>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <span className="text-4xl font-black font-mono tracking-tighter text-white">₹{product.price}</span>
                <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-black uppercase text-indigo-400 flex items-center gap-2 italic mb-1">
                    <FaCube size={10} /> Status : In_Stock
                  </span>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Protocol : Secure_Delivery</span>
                </div>
              </div>
            </div>

            {/* Description / Data Payload */}
            <div className="p-8 bg-white/[0.02] border border-white/10 rounded-[2rem] backdrop-blur-md space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" /> Description
              </h4>
              <p className="text-gray-400 leading-relaxed font-medium">
                {product.description || "Premium engineered lifestyle equipment. High-performance aesthetic design meets industrial durability. Meticulously curated for the modern professional ecosystem."}
              </p>
            </div>

            {/* Spec Bento */}
            <div className="grid grid-cols-3 gap-1 relative group">
                <div className="absolute inset-0 bg-indigo-500/5 blur-2xl group-hover:bg-indigo-500/10 transition-all"></div>
                {[
                  { icon: FaShieldAlt, label: "Security", sub: "Warranty" },
                  { icon: FaTruck, label: "Express", sub: "Shipping" },
                  { icon: FaUndo, label: "Verified", sub: "Return" }
                ].map((spec, i) => (
                  <div key={i} className="relative z-10 bg-zinc-900/50 border border-white/5 py-8 flex flex-col items-center gap-3 rounded-2xl">
                    <spec.icon className="text-indigo-400 text-lg" />
                    <p className="text-[8px] uppercase font-black text-gray-500 tracking-widest leading-none text-center">
                      {spec.label}<br/>{spec.sub}
                    </p>
                  </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button 
                disabled={loading || product.stock <= 0}
                onClick={handleAddToCart}
                className={`group relative flex-1 py-6 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.3em] transition-all duration-500 overflow-hidden ${
                  isAdded 
                  ? "bg-emerald-600 text-white cursor-default" 
                  : "bg-white text-black hover:bg-indigo-500 hover:text-white"
                }`}
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? "Initializing..." : isAdded ? <><FaCheck />Added</> : <><FaShoppingBag /> Add To Cart</>}
                </div>
                {!isAdded && <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
              </button>

              <button 
                onClick={handleBuyNow}
                className="group px-12 py-6 bg-white/5 border border-white/10 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3"
              >
                Buy Now <FaChevronRight className="transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}