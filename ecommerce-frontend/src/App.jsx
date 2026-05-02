import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import JoinUs from "./pages/JoinUs";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrderConfirmation from "./pages/OrderConfirmation";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  return token && user?.role === "admin" ? children : <Navigate to="/home" />;
};

const App = () => {
  const location = useLocation();

  // Pages where we want a "minimal" view without the Navbar
  const hideNavbarPaths = ["/", "/login", "/join"];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        {/* Landing & Authentication */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<JoinUs />} />

        {/* Public Information Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected User Routes */}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/editprofile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
        <Route path="/product/:id" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        
        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />

        <Route path="*" element={<h1 className="text-white text-center mt-20 text-3xl font-bold">404 - Area Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;