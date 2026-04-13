import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3005/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // This allows the browser to save the 'token' cookie sent by your backend
      credentials: "include", 
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store user details for UI (your backend returns checkUser)
      localStorage.setItem("currentUser", JSON.stringify(data.checkUser));
      navigate("/profile");
    } else {
      alert(data.message || "Unauthorized Login");
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl rounded-3xl p-10 w-full max-w-md transition-all duration-500 hover:border-white/20">
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-2xl bg-indigo-500/20 mb-4">
            <span className="text-3xl">✨</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white tracking-tight">Welcome</h2>
          <p className="text-indigo-200/60 mt-2">Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-indigo-300 uppercase tracking-wider ml-1">Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full mt-1 p-4 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-indigo-300 uppercase tracking-wider ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 p-4 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all active:scale-95 mt-4">
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-indigo-200/50 text-sm">
          New here?{" "}
          <Link to="/join" className="text-white hover:text-indigo-400 font-medium underline underline-offset-4 transition-colors">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}