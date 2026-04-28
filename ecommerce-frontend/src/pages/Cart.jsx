import { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/cart/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => setCart(res.data.cart.items));
  }, []);

  return (
    <div className="p-10">
      {cart.map(item => (
        <div key={item.productId}>
          <p>{item.productId}</p>
          <p>Qty: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
}