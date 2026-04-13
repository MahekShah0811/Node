import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function JoinUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // ✅ added
  const navigate = useNavigate();

  const handleSignup = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3005/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        username: name, // Backend key is username
        email, 
        password 
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Account created in MongoDB!");
      navigate("/login");
    } else {
      alert(data.message || "Signup failed");
    }
  } catch (error) {
    console.error("Connection error:", error);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl rounded-2xl p-8 w-full max-w-md text-white">

        <h2 className="text-3xl font-bold text-center mb-6">
          Join Us 🚀
        </h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={name}
            className="w-full mb-4 p-3 rounded-lg bg-white/20 placeholder-white focus:outline-none"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            className="w-full mb-4 p-3 rounded-lg bg-white/20 placeholder-white focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* 🔐 Password Field */}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            className="w-full mb-6 p-3 rounded-lg bg-white/20 placeholder-white focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-white text-purple-600 font-semibold py-3 rounded-lg hover:scale-105 transition">
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}