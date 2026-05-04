import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaTerminal, FaFingerprint, FaRocket, FaShieldAlt, FaChevronRight, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function JoinUs() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const navigate = useNavigate();

  // Interactive Cursor Spotlight
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const userdata = { username, email, password };

  const submitForm = async () => {
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/register`, 
        userdata
      );

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        navigate('/login');
      }
      seterror("");
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData?.error) seterror(errorData.error);
      else if (errorData?.message) seterror([{ msg: errorData.message }]);
      else seterror([{ msg: "Protocol Failure: Server Unreachable" }]);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6 bg-black relative overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(79, 70, 229, 0.12) 0%, transparent 40%)`
      }}
    >
      {/* Aesthetic Background Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* Terminal Card */}
        <div className="bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-2xl rounded-[2.5rem] overflow-hidden">
          
          {/* Terminal Header */}
          <div className="bg-white/5 px-8 py-4 border-b border-white/10 flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
               <FaTerminal size={10} className="text-indigo-400" /> Register Now
            </span>
            <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
            </div>
          </div>

          <div className="p-8 md:p-10">
            {/* Header Section */}
            <div className="text-center mb-10">
              <div className="inline-flex p-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
                <FaRocket className="text-3xl text-indigo-400 animate-pulse" />
              </div>
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
                INITIALIZE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">YOURSELF</span>
              </h2>
              <p className="text-gray-500 font-mono text-[9px] tracking-widest mt-4 uppercase">Secure Entry Protocol Active</p>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                submitForm();
              }} 
              className="space-y-5"
            >
              {/* Error Protocol */}
              {error && (
                <div className="space-y-2">
                  {error.map((val, index) => (
                    <p key={index} className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 w-full text-red-400 text-center text-[10px] font-mono uppercase tracking-widest">
                      CRITICAL_FAILURE: {val.msg}
                    </p>
                  ))}
                </div>
              )}

              {/* Full Name Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-black text-gray-500 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                  <FaUser size={8} /> User_Identity
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  placeholder="John Deo"
                  className="w-full p-4 rounded-2xl bg-black/40 border border-white/5 text-white font-mono text-sm placeholder-white/10 focus:outline-none focus:border-indigo-500/50 transition-all"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-black text-gray-500 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                  <FaEnvelope size={8} /> Signal_Endpoint
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="John@gmail.com"
                  className="w-full p-4 rounded-2xl bg-black/40 border border-white/5 text-white font-mono text-sm placeholder-white/10 focus:outline-none focus:border-indigo-500/50 transition-all"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-black text-gray-500 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                  <FaLock size={8} /> Security_Key
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-4 rounded-2xl bg-black/40 border border-white/5 text-white placeholder-white/10 focus:outline-none focus:border-indigo-500/50 transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group relative w-full py-5 bg-white text-black font-black uppercase text-xs tracking-[0.3em] rounded-2xl overflow-hidden hover:bg-indigo-600 hover:text-white transition-all duration-500 shadow-xl active:scale-95 mt-4"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Join US NOW <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </form>

            {/* Footer */}
            <div className="mt-10 flex flex-col items-center gap-4">
               <div className="flex items-center gap-2 text-gray-600">
                  <FaShieldAlt size={12} />
                  <span className="text-[8px] font-black uppercase tracking-[0.2em]">End-to-End Encryption Enabled</span>
               </div>
               
               <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
                Existing Signal?{" "}
                <Link to="/login" className="text-indigo-400 hover:text-pink-400 underline underline-offset-4 transition-colors">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}