import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaFingerprint, FaGlobe, FaBarcode } from 'react-icons/fa';

const Dashboard = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20 pb-10"
      style={{
        // Interactive Cursor Spotlight
        backgroundImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(29, 143, 236, 0.15) 0%, transparent 40%)`
      }}
    >
      {/* Aesthetic Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
        
        {/* ========================================= */}
        {/* LEFT SIDE: TYPOGRAPHY & CTA               */}
        {/* ========================================= */}
        <div className="space-y-8 text-center lg:text-left order-2 lg:order-1 pt-10 lg:pt-0">
          
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <FaFingerprint className="text-indigo-400" size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
              System Initialized
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[0.9] tracking-tighter uppercase">
            THE COLLECTION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              YOU DESERVE.
            </span>
          </h1>

          <p className="text-gray-400 text-sm lg:text-md max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
            Luxury tech, runway fashion, and daily essentials.
            Curated for those who settle for nothing less than perfection.
            Elevating the digital landscape through precision-engineered lifestyle protocols.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
            <Link to="/products" className="group relative w-full sm:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-pink-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-700"></div>
              <button className="relative w-full sm:w-auto px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.3em] rounded-full transition-all duration-300 transform group-hover:-translate-y-1 flex items-center justify-center gap-4">
                Explore Shop
                <FaChevronRight className="transition-transform group-hover:translate-x-2" />
              </button>
            </Link>
            
            <div className="flex items-center gap-3 text-gray-500">
              <FaGlobe size={18} className="text-indigo-400" />
              <div className="flex flex-col text-left">
                <span className="text-[8px] font-black uppercase tracking-widest text-white">Global Access</span>
                <span className="text-[8px] font-mono uppercase tracking-widest">Protocol Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* RIGHT SIDE: BENTO GRID ARCHITECTURE       */}
        {/* ========================================= */}
        <div className="order-1 lg:order-2 grid grid-cols-2 gap-4 md:gap-6 relative">
          
          {/* Card 1: Main Tall Feature */}
          <div className="col-span-1 row-span-2 relative group p-2 bg-white/[0.02] border border-white/10 rounded-[2.5rem] backdrop-blur-xl hover:border-indigo-500/40 transition-all duration-700 translate-y-8 md:translate-y-12 shadow-2xl">
            <div className="w-full h-[250px] sm:h-[350px] md:h-[450px] rounded-[2rem] overflow-hidden relative">
              <img 
                src="https://i.pinimg.com/1200x/1e/07/7a/1e077ac62c6032d3b19f5ada41bbecf1.jpg" 
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" 
                alt="Tech" 
              />
            </div>
          </div>

          {/* Card 2: Top Right */}
          <div className="col-span-1 relative group p-2 bg-white/[0.02] border border-white/10 rounded-[2.5rem] backdrop-blur-xl hover:border-pink-500/40 transition-all duration-700 shadow-2xl">
            <div className="w-full h-[120px] sm:h-[160px] md:h-[210px] rounded-[2rem] overflow-hidden relative">
              <img 
                src="https://i.pinimg.com/736x/77/89/87/778987bfb07ee30e1e1f572887bafa78.jpg" 
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" 
                alt="Fashion" 
              />
            </div>
          </div>

          {/* Card 3: Bottom Right (Electronics) */}
          <div className="col-span-1 relative group p-2 bg-white/[0.02] border border-white/10 rounded-[2.5rem] backdrop-blur-xl hover:border-indigo-500/40 transition-all duration-700 shadow-2xl">
            <div className="w-full h-[120px] sm:h-[160px] md:h-[210px] rounded-[2rem] overflow-hidden relative bg-zinc-900">
              <img 
                src="https://i.pinimg.com/736x/a9/7e/e8/a97ee8a369c418765a507ee2adc231af.jpg" 
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110 mix-blend-luminosity group-hover:mix-blend-normal" 
                alt="Electronics" 
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;