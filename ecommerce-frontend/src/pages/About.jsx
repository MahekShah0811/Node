import React, { useState, useEffect } from "react";
import { FaFingerprint, FaHistory, FaShieldAlt, FaTruck, FaGlobe, FaChevronRight, FaRocket } from "react-icons/fa";

const About = () => {
  const [showModal, setShowModal] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // 1. Interactive Spotlight Logic
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
      className="min-h-screen bg-black text-white overflow-x-hidden relative"
      style={{
        backgroundImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(99, 102, 241, 0.12) 0%, transparent 40%)`
      }}
    >
      {/* Aesthetic Background Glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-32 relative z-10">
        
        {/* 1. HERO SECTION */}
        <section className="text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mx-auto">
            <FaFingerprint className="text-indigo-400" size={12} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              Identity / Core_Values
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
            ABOUT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              MY STORE.
            </span>
          </h1>
          
          <p className="text-gray-400 text-md md:text-lg max-w-3xl mx-auto leading-relaxed font-medium">
            Based in Gujarat, My Store is a curated digital marketplace 
            engineered to deliver premium tech and lifestyle essentials to the 
            modern professional.
          </p>

          <div className="relative group p-2 bg-white/[0.02] border border-white/10 rounded-[3rem] backdrop-blur-xl mt-12">
            <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden relative shadow-2xl">
              <img 
                src="https://i.pinimg.com/1200x/52/0e/93/520e93ac41f76b27312ccf1dcfd09794.jpg" 
                alt="Team" 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
              />
            </div>
          </div>
        </section>

        {/* 2. OUR JOURNEY (Bento Grid Style) */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative group p-2 bg-white/[0.02] border border-white/10 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
            <div className="aspect-square rounded-[2rem] overflow-hidden">
                <img 
                  src="https://i.pinimg.com/736x/b9/bd/7a/b9bd7ae332b68bf56ba28fd1573ed462.jpg" 
                  alt="Story" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
                />
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="flex items-center gap-4">
              <div className="h-1 w-12 bg-indigo-500 rounded-full"></div>
              <h2 className="text-4xl font-black tracking-tighter uppercase italic">
                Our <span className="text-indigo-400">Journey</span>
              </h2>
            </div>
            <h3 className="text-xl font-bold text-white/80 tracking-tight uppercase">Transforming commerce since 2025.</h3>
            <p className="text-gray-400 leading-relaxed text-lg font-medium">
              What started as a specialized project in Surat has blossomed into a premier 
              e-commerce destination. We spent our inaugural year perfecting the equilibrium 
              between high-end aesthetic appeal and industrial-grade performance.
            </p>
            <div className="flex items-center gap-6">
                <div className="flex flex-col">
                    <span className="text-2xl font-black text-white">01</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Founded</span>
                </div>
                <div className="h-8 w-[1px] bg-white/10"></div>
                <div className="flex flex-col">
                    <span className="text-2xl font-black text-white">2M+</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Users</span>
                </div>
            </div>
          </div>
        </section>

        {/* 3. WHY US (Inverted Bento) */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-1 w-12 bg-pink-500 rounded-full"></div>
              <h2 className="text-4xl font-black tracking-tighter uppercase italic">
                Why <span className="text-pink-400">Us?</span>
              </h2>
            </div>
            <h3 className="text-xl font-bold text-white/80 tracking-tight uppercase">Built for the digital-first generation.</h3>
            <p className="text-gray-400 leading-relaxed text-lg font-medium">
              We view the marketplace as a curated gallery rather than a warehouse. 
              We stand firmly for <span className="text-white">quality over quantity</span>, ensuring every purchase is a lasting investment in your lifestyle.
            </p>
            <button 
              onClick={() => setShowModal(true)}
              className="group relative px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.3em] rounded-full transition-all duration-300 hover:-translate-y-1 flex items-center gap-4"
            >
              Join the Community
              <FaChevronRight className="transition-transform group-hover:translate-x-2" />
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-pink-600 rounded-full blur opacity-20 group-hover:opacity-100 transition duration-700 -z-10"></div>
            </button>
          </div>

          <div className="relative group p-2 bg-white/[0.02] border border-white/10 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden">
                <img 
                  src="https://i.pinimg.com/1200x/81/3c/e2/813ce28e56127eb755106a214546c0c2.jpg" 
                  alt="Gallery" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
                />
            </div>
          </div>
        </section>

        {/* 4. FEATURES (Bento Grid Modules) */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
            <div className="flex items-center gap-4">
              <div className="h-1 w-12 bg-indigo-500 rounded-full"></div>
              <h2 className="text-4xl font-black tracking-tighter uppercase italic">
                The <span className="text-indigo-400">Experience</span>
              </h2>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">System / Utility / Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            {/* Express Delivery */}
            <div className="md:col-span-2 group relative p-[1px] rounded-3xl overflow-hidden transition-all duration-500">
               <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-indigo-500/40"></div>
               <div className="relative h-full bg-zinc-900/80 backdrop-blur-xl p-10 flex flex-col justify-center gap-4 rounded-3xl">
                  <FaTruck className="text-indigo-400 text-3xl" />
                  <h4 className="text-2xl font-black uppercase tracking-tighter text-white">Express Delivery</h4>
                  <p className="text-gray-500 font-medium leading-relaxed max-w-sm">
                    Fast, secure shipping across all major cities in India. Optimized routing.
                  </p>
               </div>
            </div>

            {/* 24/7 Support */}
            <div className="bg-indigo-600 rounded-3xl p-10 flex flex-col justify-center items-center text-center shadow-2xl shadow-indigo-900/20 group hover:-translate-y-2 transition-all">
               <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-2">Availability</span>
               <h4 className="text-6xl font-black text-white mb-2 italic">24/7</h4>
               <p className="text-indigo-100 font-black uppercase tracking-tighter text-xs">Expert Support</p>
            </div>

            {/* Verified Quality */}
            <div className="group relative p-[1px] rounded-3xl overflow-hidden transition-all duration-500">
               <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-pink-500/40"></div>
               <div className="relative h-full bg-zinc-900/80 backdrop-blur-xl p-10 flex flex-col justify-center gap-4 rounded-3xl text-center items-center">
                  <FaShieldAlt className="text-pink-400 text-3xl" />
                  <h4 className="text-xl font-black uppercase tracking-tighter text-white">Verified Quality</h4>
                  <p className="text-gray-500 font-medium text-sm">Hand-inspected for perfection.</p>
               </div>
            </div>

            {/* Secure Checkout */}
            <div className="md:col-span-2 group relative p-[1px] rounded-3xl overflow-hidden transition-all duration-500">
               <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-indigo-500/40"></div>
               <div className="relative h-full bg-zinc-900/80 backdrop-blur-xl p-10 flex items-center justify-between rounded-3xl">
                  <div className="space-y-4">
                    <h4 className="text-2xl font-black uppercase tracking-tighter text-white">Secure Checkout</h4>
                    <p className="text-gray-500 font-medium">Industry-standard encryption protocols.</p>
                  </div>
                  <FaGlobe size={60} className="text-white/5 group-hover:text-indigo-500/10 transition-colors" />
               </div>
            </div>
          </div>
        </section>
      </div>

      {/* --- COMMUNITY MODAL (KING STYLE) --- */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-zinc-900 border border-white/10 p-12 rounded-[3rem] max-w-md w-full text-center shadow-[0_0_100px_rgba(99,102,241,0.2)]">
            <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <FaRocket className="text-3xl text-indigo-400" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 italic">Protocol Initiated</h2>
            <p className="text-gray-500 mb-8 text-sm font-medium">
              Welcome to the inner circle. We have received your request and will initialize your access shortly.
            </p>
            <button 
              onClick={() => setShowModal(false)}
              className="w-full bg-white text-black font-black py-5 rounded-2xl transition duration-500 uppercase tracking-widest text-[10px] hover:bg-indigo-500 hover:text-white"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;