import { useEffect, useState } from "react";
import axios from "axios";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/wishlist/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data && res.data.wishlist) {
          // Set the array of product objects[cite: 1, 2]
          setWishlist(res.data.wishlist.productIds || []);
        }
      } catch (err) {
        console.error("Fetch Error:", err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/wishlist/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update state: item.productId._id matches the new schema[cite: 1, 2]
      setWishlist(prev => prev.filter(item => item?.productId?._id !== productId));
    } catch (err) {
      alert("Failed to remove item.");
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-indigo-500 font-bold animate-pulse text-xl">Loading Wishlist...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-10 px-6 md:px-12 text-white">
      <div className="flex items-center justify-between mb-10">
        <div>
          <button onClick={() => navigate("/home")} className="flex items-center gap-2 text-indigo-300 hover:text-indigo-400 transition mb-2 text-sm font-bold">
            <ArrowLeft size={16} /> Back to Home
          </button>
          <h1 className="text-4xl font-black tracking-tighter">MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">WISHLIST</span></h1>
        </div>
        <p className="text-white/40 font-medium">{wishlist.length} Items</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
          <Heart size={48} className="mx-auto mb-4 text-white/20" />
          <p className="text-xl font-bold text-white/40">Your wishlist is empty</p>
          <button onClick={() => navigate("/products")} className="mt-6 px-8 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-full font-bold">Explore Products</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => {
            // FIXED: item.productId is where the populated data lives now[cite: 1, 2]
            const product = item?.productId;

            if (!product || !product._id) return null;

            return (
              <div key={product._id} className="group bg-white/[0.03] border border-white/10 p-4 rounded-3xl hover:border-indigo-500/50 transition-all duration-500">
                <div className="relative overflow-hidden rounded-2xl aspect-square mb-4">
                  <img 
                    src={product.images?.[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <button 
                    onClick={() => removeFromWishlist(product._id)}
                    className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-md rounded-full text-red-400 hover:bg-red-500 hover:text-white transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <h2 className="text-white font-bold text-lg truncate">{product.name}</h2>
                <p className="text-indigo-300 font-black mb-4">₹{product.price}</p>
                
                <button className="w-full py-3 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-500 hover:text-white transition-all">
                  <ShoppingCart size={18} /> Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}