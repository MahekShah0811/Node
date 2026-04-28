import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [showPopup, setShowPopup] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle the form submission locally
  const onSubmit = (data) => {
    console.log("Form Data:", data); // You can see the data in the console
    setShowPopup(true); // Show the animated popup
  };

  const closePopup = () => {
    setShowPopup(false);
    reset(); // Clear the form after clicking OK
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-20 max-w-7xl mx-auto relative">
      
      {/* Heading */}
      <div className="flex flex-col items-center lg:items-start mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
          Get In <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">Touch</span>
        </h2>
        <div className="h-1.5 w-12 bg-emerald-500 mt-2 rounded-full lg:ml-1" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-slate-200/50 dark:border-white/10 shadow-xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Name</label>
              <input
                {...register("from_name", { required: "Name is required" })}
                placeholder="John Doe"
                className={`w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border ${errors.from_name ? 'border-red-400' : 'border-slate-200 dark:border-slate-800'} outline-none focus:border-emerald-400 transition-all`}
              />
              {errors.from_name && <p className="text-red-500 text-xs ml-2">{errors.from_name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Email</label>
              <input
                {...register("from_email", { 
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                })}
                placeholder="john@example.com"
                className={`w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border ${errors.from_email ? 'border-red-400' : 'border-slate-200 dark:border-slate-800'} outline-none focus:border-emerald-400 transition-all`}
              />
              {errors.from_email && <p className="text-red-500 text-xs ml-2">{errors.from_email.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Subject</label>
            <input
              {...register("subject", { required: "Subject is required" })}
              placeholder="Project Inquiry"
              className={`w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border ${errors.subject ? 'border-red-400' : 'border-slate-200 dark:border-slate-800'} outline-none focus:border-emerald-400 transition-all`}
            />
            {errors.subject && <p className="text-red-500 text-xs ml-2">{errors.subject.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Message</label>
            <textarea
              {...register("message", { required: "Message cannot be empty" })}
              placeholder="Hello, I'd like to work with you on..."
              rows="5"
              className={`w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border ${errors.message ? 'border-red-400' : 'border-slate-200 dark:border-slate-800'} outline-none focus:border-emerald-400 transition-all resize-none`}
            />
            {errors.message && <p className="text-red-500 text-xs ml-2">{errors.message.message}</p>}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4 w-full">
            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              SEND MESSAGE
            </button>

            <a 
              href="https://github.com/MahekShah0811" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-500 hover:text-emerald-500 transition-colors font-bold uppercase tracking-widest text-sm"
            >
              Check Out My GitHub →
            </a>
          </div>
        </form>
      </motion.div>

      {/* SUCCESS POPUP ANIMATION */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Card */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="relative bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/20 max-w-sm w-full text-center"
            >
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Sent Successfully!</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8">Your message has been received. I will get back to you soon.</p>
              
              <button 
                onClick={closePopup}
                className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-black rounded-2xl active:scale-95 transition-all"
              >
                OK
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;