import React, { useState } from "react";

const Contact = () => {
  // 1. State for Form Data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  // 2. State for Validation & UI
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  // 3. Updated Validation Logic (Now includes all fields)
  const validate = () => {
    let newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 4. Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowModal(true); 
    }
  };

  // 5. Clear Form & Close Modal
  const handleCloseModal = () => {
    setFormData({ fullName: "", email: "", subject: "", message: "" });
    setErrors({});
    setShowModal(false);
  };

  return (
    <div className="pt-24 pb-16 px-6 text-white max-w-7xl mx-auto space-y-16">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tight">
          Connect with <span className="text-indigo-400">My Store</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          From custom hardware architecture to order tracking, our team in Surat 
          is ready to assist you. Let's build something great.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Side: Bento Info Cards */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md group hover:border-indigo-500/50 transition duration-500">
            <h3 className="text-indigo-400 font-semibold uppercase tracking-widest text-[10px] mb-2">Direct Channel</h3>
            <p className="text-xl font-medium">support@mystore.com</p>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md group hover:border-indigo-500/50 transition duration-500">
            <h3 className="text-indigo-400 font-semibold uppercase tracking-widest text-[10px] mb-2">Our Headquarters</h3>
            <p className="text-lg text-gray-300">Navagam Main Road, Surat,<br />Gujarat 394210</p>
          </div>

          <div className="bg-indigo-600/10 border border-indigo-500/20 p-8 rounded-3xl backdrop-blur-md text-center relative overflow-hidden group">
            <h3 className="text-indigo-400 font-semibold uppercase tracking-widest text-[10px] mb-4">The #MyStore Community</h3>
            <div className="flex justify-center gap-8 relative z-10">
              <span className="hover:text-white cursor-pointer transition-all text-sm font-bold">Instagram</span>
              <span className="hover:text-white cursor-pointer transition-all text-sm font-bold">Twitter</span>
            </div>
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-indigo-500/20 blur-3xl rounded-full group-hover:bg-indigo-500/40 transition-all duration-700"></div>
          </div>
        </div>

        {/* Right Side: High-Aesthetic Form */}
        <div className="md:col-span-2 bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Full Name</label>
              <input 
                type="text" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                // Updated Placeholder color for visibility
                className={`bg-black/40 border ${errors.fullName ? 'border-red-500/50' : 'border-white/10'} rounded-2xl p-4 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-white/30`} 
                placeholder="John Doe"
              />
              {errors.fullName && <span className="text-red-400 text-[10px] ml-1">{errors.fullName}</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Email</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`bg-black/40 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl p-4 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-white/30`} 
                placeholder="john@example.com"
              />
              {errors.email && <span className="text-red-400 text-[10px] ml-1">{errors.email}</span>}
            </div>

            {/* Subject (Added Validation Display) */}
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

            {/* Message */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Message</label>
              <textarea 
                rows="4" 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className={`bg-black/40 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-2xl p-4 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-white/30 resize-none`} 
                placeholder="Build your vision with us..."
              ></textarea>
              {errors.message && <span className="text-red-400 text-[10px] ml-1">{errors.message}</span>}
            </div>

            <button type="submit" className="md:col-span-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-5 rounded-2xl transition duration-500 shadow-xl shadow-indigo-600/20 transform hover:-translate-y-1 active:scale-95">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* --- SUCCESS POPUP MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleCloseModal}></div>
          <div className="relative bg-white/10 border border-white/20 backdrop-blur-2xl p-10 rounded-[2.5rem] max-w-md w-full shadow-[0_0_50px_-12px_rgba(99,102,241,0.5)] text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✉️</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 italic">Message Sent!</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Thanks for reaching out. Your message is in our system and our team will reply soon.
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