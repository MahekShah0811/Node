import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/product/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => setProducts(res.data.products));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6 p-10">
      {products.map(p => (
        <div key={p._id} className="bg-white/5 p-4 rounded-xl">
          <img src={p.images[0]} className="h-40 w-full object-cover"/>
          <h2>{p.name}</h2>
          <p>₹{p.price}</p>
        </div>
      ))}
    </div>
  );
}