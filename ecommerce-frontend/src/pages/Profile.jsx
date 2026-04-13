import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await fetch("http://localhost:3005/user/profile", {
        method: "POST", // Your backend route is router.post("/profile")
        credentials: "include", // Sends the cookie back to the server
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user); // data.user comes from your req.user = user middleware
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };

  fetchProfile();
}, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-3xl blur opacity-25"></div>
        <div className="relative bg-black border border-white/10 rounded-3xl p-12 w-full max-w-md text-white text-center">
          
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
            alt="avatar"
            className="w-24 h-24 rounded-full mx-auto mb-6 border-2 border-indigo-500 p-1"
          />

          <h2 className="text-3xl font-bold mb-1">{user.name}</h2>
          <p className="mb-8 text-indigo-300/60 font-medium">{user.email}</p>

          <button 
            onClick={handleLogout}
            className="w-full bg-white text-black px-6 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}