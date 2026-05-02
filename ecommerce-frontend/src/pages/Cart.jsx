import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus, FaArrowLeft, FaShoppingBasket, FaBolt, FaCreditCard } from "react-icons/fa";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

    setCart(prevCart => 
      prevCart.map(item => 
        item.productId?._id === productId ? { ...item, quantity: newQty } : item
      )
    );

    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/cart/update-quantity`, 
        { productId, quantity: newQty }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Sync failed:", err);
      fetchCart(); 
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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-indigo-400 font-black animate-pulse uppercase tracking-[0.5em] text-center px-6">
      Syncing Manifest...
    </div>
  );

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-20 px-4 md:px-10 text-white max-w-6xl mx-auto relative overflow-x-hidden">
      
      {/* Aesthetic Background Glows */}
      <div className="absolute top-20 left-0 w-64 md:w-96 h-64 md:h-96 bg-indigo-600/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-20 right-0 w-64 md:w-96 h-64 md:h-96 bg-pink-600/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 md:mb-16 relative z-10 gap-6">
        <div>
          <button 
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-2 uppercase text-[10px] font-black tracking-widest"
          >
            <FaArrowLeft /> <span className="hidden sm:inline">View More Products</span><span className="sm:hidden">Back</span>
          </button>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
            YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">MANIFEST</span>
          </h1>
        </div>
        <p className="text-gray-500 font-mono text-xs md:text-sm tracking-widest bg-white/5 px-4 md:px-6 py-2 rounded-full border border-white/10 uppercase self-start md:self-auto">
            {cart.length} Item
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 md:py-32 bg-white/[0.02] border border-white/10 rounded-[2rem] md:rounded-[3rem] backdrop-blur-xl relative z-10 mx-2">
          <FaShoppingBasket className="mx-auto text-4xl md:text-6xl text-white/10 mb-6" />
          <p className="text-gray-500 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-lg md:text-xl">Manifest Empty</p>
        </div>
      ) : (
        <div className="space-y-6 relative z-10">
          {cart.map((item) => {
            const product = item.productId;
            if (!product || typeof product === 'string') return null;

            return (
              <div 
                key={product._id} 
                className="group relative bg-white/[0.03] border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] backdrop-blur-3xl transition-all duration-500 shadow-2xl p-4 md:p-8"
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                  
                  {/* IMAGE */}
                  <div className="relative w-full md:w-44 h-48 md:h-44 bg-zinc-950 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/5 flex-shrink-0">
                    <img 
                      src={product.images?.[0]} 
                      alt={product.name} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 md:group-hover:scale-110"
                    />
                  </div>

                  {/* CONTENT STACK */}
                  <div className="flex-1 flex flex-col justify-between">
                    
                    {/* TOP ROW: Name and Price */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4">
                      <div className="space-y-1">
                        <p className="text-indigo-400 font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px]">{product.category}</p>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tighter uppercase leading-tight">{product.name}</h3>
                        <p className="text-gray-400 font-mono text-[12px] md:text-[14px] tracking-widest uppercase truncate max-w-[200px] md:max-w-none">ID: {product._id}</p>
                      </div>
                      
                      <div className="text-2xl md:text-3xl font-black font-mono mt-5 tracking-tighter text-white whitespace-nowrap pt-2 sm:pt-0">
                        ₹{(product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>

                    {/* BOTTOM ROW: Action Row */}
                    <div className="mt-6 md:mt-8 flex items-center justify-between gap-4">
                      
                      <div className="flex flex-wrap items-center gap-3 md:gap-4 flex-1">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4 md:gap-6 bg-black/60 px-4 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl border border-white/5">
                            <button onClick={() => updateQuantity(product._id, -1)} className="text-gray-500 hover:text-indigo-400 transition-colors">
                                <FaMinus size={10} />
                            </button>
                            <span className="font-mono font-black text-base md:text-lg w-6 md:w-8 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(product._id, 1)} className="text-gray-500 hover:text-indigo-400 transition-colors">
                                <FaPlus size={10} />
                            </button>
                        </div>

                        {/* Buy Now Button */}
                        <button 
                            onClick={() => navigate("/order-confirmation", { state: { item } })}
                            className="flex-1 sm:flex-none py-3 md:py-4 px-4 md:px-8 bg-white text-black rounded-xl md:rounded-2xl font-black uppercase text-[10px] md:text-[11px] tracking-widest hover:bg-indigo-500 hover:text-white transition-all duration-500 shadow-xl flex items-center justify-center gap-2"
                        >
                            <FaBolt size={10} /> <span className="inline">Buy Now</span>
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button 
                        onClick={() => removeItem(product._id)}
                        className="p-3 md:p-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl md:rounded-2xl hover:bg-red-600 hover:text-white transition-all group/trash flex-shrink-0"
                      >
                        <FaTrash size={14} className="group-hover/trash:rotate-12 transition-transform" />
                      </button>

                    </div>

                  </div>
                </div>
              </div>
            );
          })}

          {/* GLOBAL FOOTER */}
          <div className="pt-8 md:pt-12 flex justify-center px-2">
            <button 
              onClick={() => navigate("/order-confirmation", { state: { cart } })}
              className="w-full sm:w-auto group relative px-8 md:px-16 py-5 md:py-6 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-full font-black uppercase text-xs md:text-sm tracking-[0.2em] md:tracking-[0.4em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 overflow-hidden"
            >
              <FaCreditCard /> 
              <span>Checkout All Signals</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}