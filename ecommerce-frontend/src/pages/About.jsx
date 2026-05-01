import React, { useState } from "react";

const About = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative pt-24 pb-16 px-6 text-white max-w-7xl mx-auto space-y-32">
      
      {/* 1. Styled Header Section */}
      <section className="text-center">
        <h1 className="text-5xl font-black mb-10 tracking-tighter uppercase">
          ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">US</span>
        </h1>
        <div className="space-y-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, we are <span className="text-indigo-400">My Store</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Based in the heart of Gujarat, My Store is a curated digital marketplace 
            dedicated to bringing premium tech and lifestyle essentials to the 
            modern professional.
          </p>
        </div>
        
        <div className="mt-12 w-full aspect-[21/9] bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md relative shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000" 
            alt="My Store Team" 
            className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition duration-700"
          />
        </div>
      </section>

      {/* 2. Our Journey */}
      <section className="grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <div className="aspect-square bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" 
              alt="Our Story" 
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
        <div className="space-y-6 order-1 md:order-2">
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-500 w-fit pb-2 text-indigo-400">Our Journey</h2>
          <h3 className="text-xl font-medium italic">Transforming commerce since 2025.</h3>
          <p className="text-gray-400 leading-relaxed">
            What started as a specialized project in Surat has blossomed into a premier 
            e-commerce destination, driven by a passion for architectural precision and 
            modern design. We spent our inaugural year in a state of constant 
            refinement, perfecting the equilibrium between high-end aesthetic appeal 
            and industrial-grade functional performance. At My Store, we don't 
            just ship products; we deliver an engineered shopping experience that 
            values your time and your taste.
          </p>
        </div>
      </section>

      {/* 3. Why Us */}
      <section className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-500 w-fit pb-2 text-indigo-400">Why Us?</h2>
          <h3 className="text-xl font-medium italic">Built for the digital-first generation.</h3>
          <p className="text-gray-400 leading-relaxed">
            At My Store, we view the marketplace as a curated gallery of experiences rather than 
            a warehouse of goods. We believe that every object you bring into your life should 
            serve a purpose and inspire excellence. When you shop with us, you are a vital part 
            of a global community that rejects the noise of mass production in favor of the signal of 
            true craftsmanship. We stand firmly for **quality over quantity**, ensuring 
            every purchase is a lasting investment in your lifestyle.
          </p>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-3 rounded-full transition-all backdrop-blur-md font-semibold cursor-pointer active:scale-95"
          >
            Join the Community
          </button>
        </div>
        <div>
          <div className="aspect-[4/5] bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800" 
              alt="Why My Store" 
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </section>

      {/* 4. Features Section */}
      <section className="space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold tracking-tight text-white">The #MyStore Experience</h2>
          <div className="w-16 h-1 bg-indigo-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px]">
          <div className="md:col-span-2 bg-[#0a0a0a] border-t-2 border-indigo-500 rounded-2xl p-8 flex flex-col justify-center transition-all duration-300 hover:bg-[#111] hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)]">
            <h4 className="text-2xl font-bold mb-2 text-white">Express Delivery</h4>
            <p className="text-gray-500 font-medium leading-relaxed">
              Fast, secure shipping across all major cities in India.
            </p>
          </div>

          <div className="bg-indigo-600 rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-lg shadow-indigo-900/20 transform hover:-translate-y-1 transition">
            <h4 className="text-5xl font-black text-white mb-2 italic">24/7</h4>
            <p className="text-indigo-100 font-bold uppercase tracking-tighter text-sm">Expert Support</p>
          </div>

          <div className="bg-transparent border-2 border-zinc-800 rounded-2xl p-8 flex flex-col justify-center group hover:border-indigo-400 transition-colors">
            <h4 className="text-xl font-bold mb-2 text-indigo-400 group-hover:text-white">Verified Quality</h4>
            <p className="text-gray-500 group-hover:text-gray-400">
              Every item is hand-inspected for quality before shipping.
            </p>
          </div>

          <div className="md:col-span-2 bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl p-8 flex items-center justify-between relative overflow-hidden group">
            <div className="z-10">
              <h4 className="text-2xl font-bold mb-2 text-white">Secure Checkout</h4>
              <p className="text-gray-500 font-medium">Industry-standard encryption for all payments.</p>
            </div>
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-indigo-600/10 rotate-45 translate-x-10 translate-y-10 group-hover:bg-indigo-600/20 transition-all duration-500"></div>
          </div>
        </div>
      </section>

      {/* --- Community Popup Box --- */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white/10 border border-white/20 backdrop-blur-2xl p-10 rounded-[2.5rem] max-w-md w-full shadow-2xl text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🚀</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">You are joined!</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Welcome to the inner circle. We've received your request and we reply soon.
            </p>
            <button 
              onClick={() => setShowModal(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition duration-300 shadow-lg shadow-indigo-600/30 active:scale-95"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;