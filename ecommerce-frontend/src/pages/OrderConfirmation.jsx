import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBolt, FaShieldAlt, FaBox, FaTerminal } from 'react-icons/fa';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { item, cart, product } = location.state || {};

  let orderItems = [];
  if (item) orderItems = [item];
  else if (cart) orderItems = cart;
  else if (product) orderItems = [{ productId: product, quantity: 1 }];

  const subtotal = orderItems.reduce((acc, curr) => {
    const price = curr.productId?.price || 0;
    return acc + (price * curr.quantity);
  }, 0);
  
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  if (orderItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black p-6">
        <p className="text-gray-500 font-black uppercase tracking-[0.3em] md:tracking-[0.5em] mb-8 text-center">No Signal Detected</p>
        <button onClick={() => navigate('/products')} className="px-8 py-4 bg-white text-black font-black uppercase text-xs rounded-2xl">Return to Store</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-20 px-4 md:px-10 text-white max-w-6xl mx-auto relative overflow-x-hidden">
      
      {/* Aesthetic Background Glows */}
      <div className="absolute top-20 left-0 w-64 md:w-96 h-64 md:h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-20 right-0 w-64 md:w-96 h-64 md:h-96 bg-pink-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* 1. Requested Responsive Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 md:mb-16 relative z-10 gap-6">
        <div>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-2 uppercase text-[10px] font-black tracking-widest"
          >
            <FaArrowLeft /> <span className="hidden sm:inline">Cancel Confirmation</span><span className="sm:hidden">Back</span>
          </button>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
            AUTHORIZE <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">MANIFEST</span>
          </h1>
        </div>
        <div className="flex flex-col md:items-end">
            <span className="text-[12px] font-mono text-indigo-400 tracking-[0.3em] uppercase">Status: Awaiting Verification</span>
            <span className="text-[10px] text-gray-400 font-mono tracking-widest">ORDER_REF: {Math.random().toString(36).toUpperCase().substring(2, 10)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 relative z-10">
        
        {/* LEFT: Modules Review */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2">
                <FaBox size={12} className="text-indigo-400" /> Modules in Review
            </h2>
            <span className="text-[10px] font-mono text-gray-400 uppercase">{orderItems.length} Items Detected</span>
          </div>
          
          {orderItems.map((item, idx) => (
            <div key={idx} className="flex flex-row items-center gap-6 bg-white/[0.02] border border-white/10 p-5 rounded-[2rem] backdrop-blur-xl hover:bg-white/[0.04] transition-all">
              <div className="w-30 h-30 bg-zinc-950 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5 shadow-2xl">
                <img src={item.productId?.images?.[0]} alt="" className="w-full h-full object-cover opacity-80" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-sm md:text-base uppercase truncate tracking-tight">{item.productId?.name}</h3>
                <p className="text-[14px] text-gray-400 font-mono mt-1">{item.productId?.category}</p>
                <div className="mt-2 flex items-center gap-3">
                    <span className="text-[12px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-md font-mono border border-indigo-500/20">QTY: {item.quantity}</span>
                    <span className="text-[12px] text-gray-400 font-mono">UNIT: ₹{item.productId?.price.toLocaleString()}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-[19px] font-black mb-14 text-base text-white">₹{(item.productId?.price * item.quantity).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 2. REDESIGNED SUMMARY BOX: Terminal Style */}
        <div className="lg:col-span-2">
          <div className="relative group">
            {/* Animated accent border for the top */}
            <div className="absolute -top-[1px] left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent z-20"></div>
            
            <div className="bg-[#0c0c0c] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] lg:sticky lg:top-24">
              
              {/* Box Header */}
              <div className="bg-white/5 px-8 py-4 border-b border-white/10 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                   <FaTerminal size={10} className="text-indigo-400" /> Protocol Summary
                </span>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                    <div className="w-2 h-2 rounded-full bg-amber-500/20"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500/20"></div>
                </div>
              </div>

              <div className="p-8 space-y-6">
                {/* Data Rows */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[11px] uppercase font-bold tracking-widest text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-mono text-white">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] uppercase font-bold tracking-widest text-gray-500">
                    <span>Protocol Tax (18%)</span>
                    <span className="font-mono text-white">₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] uppercase font-bold tracking-widest text-gray-500">
                    <span>Encryption / Shipping</span>
                    <span className="font-mono text-emerald-400">CREDIT // FREE</span>
                  </div>
                </div>

                {/* Receipt-style dashed line */}
                <div className="border-t border-dashed border-white/20 pt-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">Total Authorized Amount</span>
                    <div className="flex justify-between items-end">
                        <span className="text-4xl font-black font-mono tracking-tighter text-white">
                            ₹{total.toLocaleString()}
                        </span>
                        <span className="text-[14px] font-mono text-gray-400 mb-3">INR</span>
                    </div>
                  </div>
                </div>

                {/* Authorization Action */}
                <div className="pt-4 space-y-4">
                  <button 
                    onClick={() => alert("Verification successful. Signal processing.")}
                    className="w-full py-5 bg-gradient-to-r from-pink-600 to-indigo-600 text-white font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:from-indigo-600 hover:to-indigo-800 transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(79,70,229,0.5)] active:scale-95 flex items-center justify-center gap-3"
                  >
                    <FaBolt /> Checkout Now
                  </button>
                  
                  <div className="flex items-center justify-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <FaShieldAlt className="text-indigo-500" size={14} />
                    <p className="text-[8px] text-gray-500 uppercase font-black tracking-[0.2em] leading-tight">
                        End-to-End Signal Encryption <br /> Secure Handshake Protocol Active
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderConfirmation;