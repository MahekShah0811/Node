import React, { useState, useEffect } from "react";
import { 
  FaInstagram, FaTwitter, FaFacebookF, FaEnvelope, 
  FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, 
  FaFingerprint, FaChevronRight, FaBarcode 
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
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

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Identifier required";
    if (!formData.email.trim()) {
      newErrors.email = "Signal source required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid signal format";
    }
    if (!formData.subject.trim()) newErrors.subject = "Header required";
    if (!formData.message.trim()) newErrors.message = "Payload cannot be empty";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowModal(true); 
    }
  };

  const handleCloseModal = () => {
    setFormData({ fullName: "", email: "", subject: "", message: "" });
    setErrors({});
    setShowModal(false);
  };

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

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-24 relative z-10">
        
        {/* 1. HERO HEADER */}
        <section className="text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mx-auto">
            <FaFingerprint className="text-indigo-400" size={12} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              Communication
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
            CONTACT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              MY STORE.
            </span>
          </h1>
          
          <p className="text-gray-400 text-md md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Initialize a direct link with our support team. Whether it's high-end hardware 
            or bespoke lifestyle queries, our protocols are ready.
          </p>
        </section>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* 2. LEFT SIDE: BENTO INFO CARDS */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Email Card */}
            <div className="group relative p-1 bg-white/[0.02] border border-white/10 rounded-[2rem] backdrop-blur-xl hover:border-indigo-500/40 transition-all duration-700 shadow-2xl overflow-hidden">
               <div className="p-8 flex items-center gap-5 relative z-10">
                  <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:scale-110 transition-transform">
                    <FaEnvelope size={24} />
                  </div>
                  <div>
                    <h3 className="text-indigo-400 font-black uppercase tracking-widest text-[9px] mb-1">Direct Signal</h3>
                    <p className="text-lg font-bold tracking-tight text-white">support@mystore.com</p>
                  </div>
               </div>
               <FaBarcode className="absolute right-[-10px] bottom-[-5px] text-white/[0.02] text-6xl rotate-12" />
            </div>

            {/* Location Card */}
            <div className="group relative p-1 bg-white/[0.02] border border-white/10 rounded-[2rem] backdrop-blur-xl hover:border-pink-500/40 transition-all duration-700 shadow-2xl">
               <div className="p-8 flex items-center gap-5 relative z-10">
                  <div className="p-4 bg-pink-500/10 rounded-2xl text-pink-400 group-hover:scale-110 transition-transform">
                    <FaMapMarkerAlt size={24} />
                  </div>
                  <div>
                    <h3 className="text-pink-400 font-black uppercase tracking-widest text-[9px] mb-1">Coordinate Origin</h3>
                    <p className="text-lg font-bold tracking-tight text-white">Surat, Gujarat, IN</p>
                  </div>
               </div>
            </div>

            {/* Social Connect Bento */}
            <div className="group relative p-8 bg-zinc-900/50 border border-white/10 rounded-[2.5rem] backdrop-blur-xl text-center shadow-2xl overflow-hidden">
              <h3 className="text-gray-500 font-black uppercase tracking-[0.3em] text-[8px] mb-8">Social_Mesh_Access</h3>
              <div className="flex justify-center gap-6 relative z-10">
                {[FaInstagram, FaTwitter, FaFacebookF].map((Icon, idx) => (
                  <a key={idx} href="#" className="p-5 bg-white/5 rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-500 border border-white/10 group/icon">
                    <Icon size={20} className="group-hover/icon:scale-110" />
                  </a>
                ))}
              </div>
              {/* Decorative background circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/5 blur-3xl -z-10 rounded-full"></div>
            </div>
          </div>

          {/* 3. RIGHT SIDE: THE TRANSMISSION FORM */}
          <div className="lg:col-span-2 relative group p-1 bg-white/[0.02] border border-white/10 rounded-[3rem] backdrop-blur-xl shadow-2xl">
            <form onSubmit={handleSubmit} className="p-10 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              
              <div className="flex flex-col gap-3">
                <label className="text-[9px] uppercase tracking-[0.4em] text-indigo-400 font-black ml-1">Identity Identifier</label>
                <input 
                  type="text" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className={`bg-black border ${errors.fullName ? 'border-red-500' : 'border-white/10'} rounded-2xl p-5 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-white/10 font-bold`} 
                  placeholder="Subject 01"
                />
                {errors.fullName && <span className="text-red-500 text-[8px] font-black uppercase tracking-widest ml-1">{errors.fullName}</span>}
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[9px] uppercase tracking-[0.4em] text-indigo-400 font-black ml-1">Return Signal Path</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`bg-black border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-2xl p-5 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-white/10 font-bold`} 
                  placeholder="user@domain.com"
                />
                {errors.email && <span className="text-red-500 text-[8px] font-black uppercase tracking-widest ml-1">{errors.email}</span>}
              </div>

              <div className="md:col-span-2 flex flex-col gap-3">
                <label className="text-[9px] uppercase tracking-[0.4em] text-indigo-400 font-black ml-1">Payload Header</label>
                <input 
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className={`bg-black border ${errors.subject ? 'border-red-500' : 'border-white/10'} rounded-2xl p-5 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-white/10 font-bold`} 
                  placeholder="Inquiry / Support / Logic"
                />
                {errors.subject && <span className="text-red-500 text-[8px] font-black uppercase tracking-widest ml-1">{errors.subject}</span>}
              </div>

              <div className="md:col-span-2 flex flex-col gap-3">
                <label className="text-[9px] uppercase tracking-[0.4em] text-indigo-400 font-black ml-1">Message Body</label>
                <textarea 
                  rows="5" 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={`bg-black border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-[2rem] p-6 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-white/10 font-bold resize-none`} 
                  placeholder="Enter transmission data..."
                ></textarea>
                {errors.message && <span className="text-red-500 text-[8px] font-black uppercase tracking-widest ml-1">{errors.message}</span>}
              </div>

              <button type="submit" className="md:col-span-2 group relative w-full px-12 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.4em] rounded-2xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-4 overflow-hidden">
                <FaPaperPlane className="transition-transform group-hover:translate-x-2" />
                Send Message
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700 -z-10"></div>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* --- SUCCESS POPUP MODAL (KING STYLE) --- */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={handleCloseModal}></div>
          <div className="relative bg-zinc-900 border border-white/10 p-12 rounded-[3rem] max-w-md w-full text-center shadow-[0_0_100px_rgba(99,102,241,0.2)]">
            <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <FaCheckCircle className="text-4xl text-green-400" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 italic">Message Sent</h2>
            <p className="text-gray-500 mb-8 text-sm font-medium leading-relaxed">
              Transmission successful. Our internal protocols have registered your inquiry. 
              Await a return message at your provided path.
            </p>
            <button 
              onClick={handleCloseModal}
              className="w-full bg-white text-black font-black py-5 rounded-2xl transition duration-500 uppercase tracking-[0.3em] text-[10px] hover:bg-indigo-500 hover:text-white"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;