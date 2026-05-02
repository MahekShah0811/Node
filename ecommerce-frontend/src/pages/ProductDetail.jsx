import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaShoppingBag, FaArrowLeft, FaShieldAlt, FaTruck, FaUndo, FaCheck } from "react-icons/fa";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [activeImage, setActiveImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    // 1. Fetch Product Details
    axios.get(`${import.meta.env.VITE_BASE_URL}/product/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setProduct(res.data.product);
    })
    .catch(err => console.error("Error fetching product details:", err));

    // 2. Check if product is already in the cart
    if (token) {
      axios.get(`${import.meta.env.VITE_BASE_URL}/cart/all`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        // Based on your cart backend, items are usually in res.data.cart.items
        const cartItems = res.data.cart?.items || [];
        const alreadyInCart = cartItems.some(item => 
          (item.productId?._id || item.productId) === id
        );
        setIsAdded(alreadyInCart);
      })
      .catch(err => console.error("Error checking cart status:", err));
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (isAdded) return; // Prevent multiple clicks if already added

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        alert("Please login first!");
        return navigate("/login");
      }

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/cart/add`,
        { productId: id, quantity: 1 }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Successfully added to DB, now set permanent local state
      setIsAdded(true); 
      // TIMEOUT REMOVED: Button will now stay "ADDED"

    } catch (err) {
      console.error("Cart Error:", err);
      alert(err.response?.data?.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = () => {
    navigate("/order-confirmation", { state: { product, directBuy: true } });
  };

  if (!product.name) return <div className="min-h-screen flex items-center justify-center text-indigo-400 font-black animate-pulse uppercase tracking-[0.5em]">Syncing Signal...</div>;

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-10 text-white max-w-7xl mx-auto relative">
      <div className="absolute top-40 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 uppercase text-[10px] font-black tracking-widest group"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back 
      </button>

      <div className="grid lg:grid-cols-2 gap-16 relative z-10">
        <div className="space-y-6">
          <div className="relative aspect-square bg-indigo-900/10 border border-white/10 rounded-[3rem] overflow-hidden backdrop-blur-xl group shadow-2xl">
            <img 
              src={product.images?.[activeImage]} 
              alt={product.name}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
          </div>
          
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

        <div className="flex flex-col justify-center space-y-10">
          <div className="space-y-4">
            <p className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px]">{product.brand} // {product.category}</p>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight uppercase">{product.name}</h1>
            <div className="flex items-center gap-6 pt-2">
              <span className="text-4xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
                ₹{product.price}
              </span>
            </div>
          </div>

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

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              disabled={loading || product.stock <= 0}
              onClick={handleAddToCart}
              className={`flex-1 py-5 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] transition-all duration-500 shadow-xl active:scale-95 flex items-center justify-center gap-3 ${
                isAdded 
                ? "bg-emerald-600 text-white cursor-default" 
                : "bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-pink-800 hover:to-pink-900"
              }`}
            >
              {loading ? (
                "Syncing..."
              ) : isAdded ? (
                <><FaCheck /> ADDED</>
              ) : (
                <><FaShoppingBag /> ADD TO CART</>
              )}
            </button>

            <button 
              onClick={handleBuyNow}
              className="px-10 py-5 bg-white/5 border border-white/10 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all active:scale-95"
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}