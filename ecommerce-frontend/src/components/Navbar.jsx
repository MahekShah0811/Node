import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-10 py-4 bg-black text-white border-b border-white/10">
      
      {/* Logo */}
      <h1 className="text-xl font-bold">MyStore</h1>

      {/* Links */}
      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/wishlist">Wishlist</Link>
      </div>

      {/* User */}
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span>{user.username}</span>
            <button onClick={logout} className="text-red-400">Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>

    </div>
  );
}