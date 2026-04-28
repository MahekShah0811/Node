import { Routes, Route, Navigate } from "react-router-dom";

// ✅ ADD THIS
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import JoinUs from "./pages/JoinUs";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

// Ecommerce Pages
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Admin from "./pages/Admin";

// 🔐 Protected Route
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

// 🔐 Admin Route
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return token && user?.role === "admin"
    ? children
    : <Navigate to="/" />;
};

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<JoinUs />} />

        {/* Protected */}
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/editprofile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
        <Route path="/product/:id" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />

        {/* Admin */}
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />

        {/* 404 */}
        <Route path="*" element={<h1 className="text-white text-center mt-20">404 - Page Not Found</h1>} />

      </Routes>
    </>
  );
};

export default App;