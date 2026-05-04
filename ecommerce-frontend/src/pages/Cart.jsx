import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  FaTrash, FaPlus, FaMinus, FaArrowLeft, 
  FaShoppingBasket, FaBolt, FaCreditCard, 
  FaFingerprint, FaBarcode, FaBoxOpen 
} from "react-icons/fa";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const navigate = useNavigate();

  // 1. Interactive Spotlight
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(res.data.cart?.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (productId, delta) => {
    const token = localStorage.getItem("token");
    const itemToUpdate = cart.find(item => item.productId?._id === productId);
    if (!itemToUpdate) return;
    const newQty = Math.max(1, itemToUpdate.quantity + delta);
    
    setCart(prevCart => prevCart.map(item => 
      item.productId?._id === productId ? { ...item, quantity: newQty } : item
    ));

    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/cart/update-quantity`, 
        { productId, quantity: newQty }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      fetchCart(); 
      console.log(err);
    }
  };

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/cart/product/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(prev => prev.filter(item => item.productId?._id !== productId));
    } catch (err) {
      alert("Failed to remove item.");
      console.log(err);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + (item.productId?.price * item.quantity), 0);
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-indigo-400 font-black animate-pulse uppercase tracking-[0.5em] text-xs">
        Syncing ...
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-screen bg-black text-white overflow-x-hidden relative"
      style={{
        backgroundImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(99, 102, 241, 0.12) 0%, transparent 40%)`
      }}
    >
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto space-y-16 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="flex items-center gap-4">
            <div className="h-1 w-12 bg-indigo-500 rounded-full"></div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">Manifest</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <FaBoxOpen className="text-indigo-400" size={12} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              Items : {cart.length}
            </span>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="py-40 text-center flex flex-col items-center bg-white/[0.02] border border-dashed border-white/10 rounded-[3rem]">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <FaShoppingBasket className="text-white/10 text-4xl" />
            </div>
            <h3 className="text-xl font-black tracking-[0.4em] uppercase text-white/40 italic">Manifest Empty!!</h3>
            <button 
              onClick={() => navigate("/products")}
              className="mt-8 text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:underline"
            >
              Return To Products
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* ITEM LIST - FULL WIDTH */}
            <div className="space-y-6">
              {cart.map((item) => {
                const product = item.productId;
                if (!product || typeof product === 'string') return null;

                return (
                  <div key={product._id} className="group relative bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-6 md:p-8 backdrop-blur-xl transition-all duration-700 hover:border-indigo-500/40 shadow-2xl">
                    <div className="flex flex-col md:flex-row gap-8">
                      
                      {/* Image Module */}
                      <div className="relative w-full md:w-44 h-44 bg-zinc-950 rounded-[2rem] overflow-hidden shadow-2xl flex-shrink-0 border border-white/5">
                        <img 
                          src={product.images?.[0]} 
                          alt={product.name} 
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                        />
                      </div>

                      {/* Content Module */}
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                          <div>
                            <span className="text-[9px] uppercase tracking-[0.3em] text-indigo-400 font-black mb-1 block">
                              {product.category}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase text-white leading-none">
                              {product.name}
                            </h3>
                            <div className="mt-3 flex items-center gap-2">
                               <span className="text-[12px] font-mono text-gray-500 tracking-widest uppercase">ID : {product._id.slice(-12)}</span>
                            </div>
                          </div>
                          
                          <div className="text-3xl font-black font-mono tracking-tighter text-white">
                            ₹{(product.price * item.quantity).toLocaleString()}
                          </div>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                          {/* Quantity Protocols */}
                          <div className="flex items-center gap-6 bg-black/40 px-6 py-3 rounded-2xl border border-white/5 shadow-inner">
                            <button onClick={() => updateQuantity(product._id, -1)} className="text-gray-500 hover:text-indigo-400 transition-colors">
                              <FaMinus size={10} />
                            </button>
                            <span className="font-mono font-black text-lg w-8 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(product._id, 1)} className="text-gray-500 hover:text-indigo-400 transition-colors">
                              <FaPlus size={10} />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                             <button 
                                onClick={() => navigate("/order-confirmation", { state: { item } })}
                                className="px-6 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all duration-500 flex items-center gap-2"
                             >
                                <FaBolt size={10} /> Buy Now
                             </button>
                             <button 
                                onClick={() => removeItem(product._id)}
                                className="p-4 bg-red-500/10 text-red-500 border border-white/10 rounded-2xl hover:bg-red-600 hover:text-white transition-all group/trash"
                             >
                                <FaTrash size={12} className="group-hover/trash:rotate-12 transition-transform" />
                             </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* BOTTOM COMMON CHECKOUT ACTION */}
            <div className="pt-16 pb-10 flex flex-col items-center space-y-8">
              
              <div className="flex flex-col items-center text-center">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 mb-2 italic">Grand Total</h4>
                 <div className="text-3xl md:text-4xl font-black font-mono tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    ₹{calculateTotal().toLocaleString()}
                 </div>
              </div>

              <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate("/order-confirmation", { state: { cart } })}
                  className="group relative flex-1 px-10 py-7 bg-white text-black rounded-[2.5rem] font-black uppercase text-xs md:text-sm tracking-[0.4em] shadow-[0_0_50px_rgba(99,102,241,0.2)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  <div className="relative z-10 flex items-center justify-center gap-4">
                     <FaCreditCard size={18} /> 
                     <span>Initialize Checkout</span>
                  </div>
                  {/* Hover Gradient Reveal */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </button>
              </div>

              <button 
                onClick={() => navigate("/products")}
                className="flex items-center gap-3 text-gray-500 hover:text-white transition-all uppercase text-[10px] font-black tracking-[0.3em] group"
              >
                <FaArrowLeft className="group-hover:-translate-x-2 transition-transform" /> 
                Add More Products
              </button>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}