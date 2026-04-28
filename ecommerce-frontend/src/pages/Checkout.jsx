import axios from "axios";

export default function Checkout() {

  const handleOrder = async () => {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/order/add`,
      { items: [] },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }}
    );
    alert("Order Placed!");
  };

  return (
    <div className="p-10">
      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
}