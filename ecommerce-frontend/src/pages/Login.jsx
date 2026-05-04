import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaFingerprint, FaShieldAlt, FaTerminal, FaChevronRight } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const navigate = useNavigate();

  // Interactive Cursor Spotlight logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const submitForm = async () => {
    const userdata = { email, password };
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        userdata
      );

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.checkUser));
        navigate("/home"); 
        setError([]);
      }
    } catch (e) {
      const backendError = e.response?.data?.error || e.response?.data?.message || "Protocol Failure";
      setError(typeof backendError === "string" ? [{ msg: backendError }] : backendError);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6 bg-black overflow-hidden relative"
      style={{
        backgroundImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(79, 70, 229, 0.15) 0%, transparent 40%)`
      }}
    >
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* The Manifest Terminal Card */}
        <div className="bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-2xl rounded-[2.5rem] overflow-hidden">
          
          {/* Terminal Header */}
          <div className="bg-white/5 px-8 py-4 border-b border-white/10 flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
               <FaTerminal size={10} className="text-indigo-400" /> Login Now
            </span>
            <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
            </div>
          </div>

          <div className="p-8 md:p-10">
            {/* Branding */}
            <div className="text-center mb-10">
              <div className="inline-flex p-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
                <FaFingerprint className="text-3xl text-indigo-400" />
              </div>
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
                Authenticate <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">Yourself</span>
              </h2>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitForm();
              }}
              className="space-y-6"
            >
              {/* Error Protocol */}
              {error.length > 0 && (
                <div className="space-y-2">
                  {error.map((val, index) => (
                    <p key={index} className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 w-full text-red-400 text-center text-[10px] font-mono uppercase tracking-widest">
                      Error: {val.msg}
                    </p>
                  ))}
                </div>
              )}

              {/* Email Entry */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-black text-gray-500 uppercase tracking-[0.3em] ml-1">
                  Identity Provider (Email)
                </label>
                <input
                  type="email"
                  placeholder="John@gmail.com"
                  value={email}
                  className="w-full p-4 rounded-2xl bg-black/40 border border-white/5 text-white font-mono text-sm placeholder-white/10 focus:outline-none focus:border-indigo-500/50 transition-all"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Entry */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-black text-gray-500 uppercase tracking-[0.3em] ml-1">
                  Access Key (Password)
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  className="w-full p-4 rounded-2xl bg-black/40 border border-white/5 text-white placeholder-white/10 focus:outline-none focus:border-indigo-500/50 transition-all"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Handshake Button */}
              <button
                type="submit"
                className="group relative w-full py-5 bg-white text-black font-black uppercase text-xs tracking-[0.3em] rounded-2xl overflow-hidden hover:bg-indigo-600 hover:text-white transition-all duration-500 shadow-xl active:scale-95"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Sign in <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </form>

            {/* Footer Status */}
            <div className="mt-10 flex flex-col items-center gap-4">
               <div className="flex items-center gap-2 text-gray-600">
                  <FaShieldAlt size={12} />
                  <span className="text-[8px] font-black uppercase tracking-[0.2em]">Secure Encryption Protocol Active</span>
               </div>
               
               <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
                New Identity?{" "}
                <Link to="/join" className="text-indigo-400 hover:text-pink-400 underline underline-offset-4 transition-colors">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}