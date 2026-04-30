import { useEffect, useState } from "react";
import axios from "axios";
import { Heart } from "lucide-react"; // Added for Wishlist button

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/product/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => setProducts(res.data.products))
    .catch(err => console.error("Error fetching products:", err));
  }, []);

  // Add to Wishlist Function[cite: 1, 2]
    const addToWishlist = async (productId) => {
      try {
        const token = localStorage.getItem("token");
        // Send a clean productId instead of the nested object[cite: 1, 2]
        await axios.post(`${import.meta.env.VITE_BASE_URL}/wishlist/add`, 
          { productId }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Added to Wishlist!");
      } catch (err) {
        alert(err.response?.data?.message || "Failed to add to wishlist");
      }
    };

  return (
    <div className="min-h-screen pt-24 pb-10 px-6 md:px-10 text-white">
      <h1 className="text-4xl font-black mb-10 tracking-tighter">EXPLORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">PRODUCTS</span></h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(p => (
          <div key={p._id} className="group relative bg-white/5 p-4 rounded-3xl border border-white/10 hover:border-indigo-500/50 transition-all duration-300">
            
            {/* Image Container with Wishlist Button */}
            <div className="relative overflow-hidden rounded-2xl aspect-square mb-4">
              <img 
                src={p.images[0]} 
                alt={p.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              {/* Wishlist Icon Button */}
              <button 
                onClick={() => addToWishlist(p._id)}
                className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:text-pink-400 hover:bg-white transition-all"
                title="Add to Wishlist"
              >
                <Heart size={20} />
              </button>
            </div>

            <h2 className="text-white font-bold text-lg truncate">{p.name}</h2>
            <p className="text-indigo-300 font-black">₹{p.price}</p>
            
            <button className="w-full mt-4 py-2 border border-white/10 rounded-xl font-bold hover:bg-white hover:text-black transition-all">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}