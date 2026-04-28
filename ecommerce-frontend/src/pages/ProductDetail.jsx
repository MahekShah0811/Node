import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/product/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => setProduct(res.data.product));
  }, []);

  return (
    <div className="p-10">
      <img src={product.images?.[0]} className="h-80"/>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <button>Add to Cart</button>
    </div>
  );
}