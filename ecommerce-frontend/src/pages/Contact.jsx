import React, { useState } from "react";
import { FaInstagram, FaTwitter, FaFacebookF, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email format is invalid";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";
    
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
    <div className="pt-24 pb-16 px-6 text-white max-w-7xl mx-auto space-y-16">
      
      {/* 1. Styled Header Section */}
      <div className="text-center">
        <h1 className="text-5xl font-black mb-10 tracking-tighter uppercase">
          CONTACT <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">US</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Whether you're looking for high-end hardware or have questions about your order, 
          our team is ready to assist you. Let's build your vision together.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* 2. Left Side: Bento Info Cards */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md flex items-center gap-4 group hover:border-indigo-500/50 transition-all duration-500">
            <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400"><FaEnvelope size={22} /></div>
            <div>
                <h3 className="text-indigo-400 font-semibold uppercase tracking-widest text-[10px]">Direct Channel</h3>
                <p className="text-lg font-medium">support@mystore.com</p>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md flex items-center gap-4 group hover:border-indigo-500/50 transition-all duration-500">
            <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400"><FaMapMarkerAlt size={22} /></div>
            <div>
                <h3 className="text-indigo-400 font-semibold uppercase tracking-widest text-[10px]">Headquarters</h3>
                <p className="text-md text-gray-300">Surat, Gujarat, India</p>
            </div>
          </div>

          <div className="bg-indigo-600/10 border border-indigo-500/20 p-8 rounded-3xl backdrop-blur-md text-center relative overflow-hidden group">
            <h3 className="text-indigo-400 font-semibold uppercase tracking-widest text-[10px] mb-6">The #MyStore Community</h3>
            <div className="flex justify-center gap-6 relative z-10">
              <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-300 border border-white/10 shadow-lg"><FaInstagram size={20} /></a>
              <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-300 border border-white/10 shadow-lg"><FaTwitter size={20} /></a>
              <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-300 border border-white/10 shadow-lg"><FaFacebookF size={20} /></a>
            </div>
          </div>
        </div>

        {/* 3. Right Side: The Form */}
        <div className="md:col-span-2 bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Full Name</label>
              <input 
                type="text" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className={`bg-black/40 border ${errors.fullName ? 'border-red-500/50' : 'border-white/10'} rounded-2xl p-4 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-white/30`} 
                placeholder="John Doe"
              />
              {errors.fullName && <span className="text-red-400 text-[10px] ml-1">{errors.fullName}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`bg-black/40 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl p-4 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-white/30`} 
                placeholder="john@example.com"
              />
              {errors.email && <span className="text-red-400 text-[10px] ml-1">{errors.email}</span>}
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Subject</label>
              <input 
                type="text" 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className={`bg-black/40 border ${errors.subject ? 'border-red-500/50' : 'border-white/10'} rounded-2xl p-4 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-white/30`} 
                placeholder="How can we help?"
              />
              {errors.subject && <span className="text-red-400 text-[10px] ml-1">{errors.subject}</span>}
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Your Message</label>
              <textarea 
                rows="4" 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className={`bg-black/40 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-2xl p-4 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-white/30 resize-none`} 
                placeholder="Your vision here..."
              ></textarea>
              {errors.message && <span className="text-red-400 text-[10px] ml-1">{errors.message}</span>}
            </div>

            <button type="submit" className="md:col-span-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-5 rounded-2xl transition duration-500 shadow-xl shadow-indigo-600/20 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
              <FaPaperPlane size={14} /> Transmit Message
            </button>
          </form>
        </div>
      </div>

      {/* --- Success Popup Modal --- */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleCloseModal}></div>
          <div className="relative bg-white/10 border border-white/20 backdrop-blur-2xl p-10 rounded-[2.5rem] max-w-md w-full shadow-2xl text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-400">
              <FaCheckCircle size={40} className="animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold mb-4 italic text-white">Message Sent!</h2>
            <p className="text-gray-300 mb-8 leading-relaxed text-sm">
              Thanks for reaching out. Your signal has been received, and our team will reply to you soon.
            </p>
            <button 
              onClick={handleCloseModal}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition duration-300 active:scale-95 shadow-lg shadow-indigo-600/40"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;