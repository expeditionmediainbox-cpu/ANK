import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Mail, FileText, Check, Copy, Send, Star, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { MODEL_CATEGORIES, BOOKING_MESSAGE_TEMPLATE, CONTACT_TELEGRAM } from "../data";

export default function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    brand: "",
    category: "Fashion Campaigns",
    date: "",
    details: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(BOOKING_MESSAGE_TEMPLATE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.brand) {
      alert("Please fill in all required fields (Name, Email, Brand/Agency).");
      return;
    }
    setIsSubmitting(true);
    // Simulate luxury API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.open("https://razorpay.me/@ankita1170", "_blank");
    }, 1200);
  };

  return (
    <section id="booking" className="py-24 bg-white/20 backdrop-blur-sm border-t border-white/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Info and Template copy column */}
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-widest text-stone-500 block mb-2">
              RESERVE CAMPAIGN DATES
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 font-normal mb-6">
              Booking & Inquiries
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-8">
              To secure Ankita Sharma for your upcoming collection, digital media ads, or designer runways, please submit a formal inquiry. Our coordination team handles domestic campaigns across India and international assignments.
            </p>

            <div className="bg-white border border-stone-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
                <span className="font-mono text-[10px] uppercase tracking-widest text-stone-500 flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-stone-400" />
                  Official Booking Guide
                </span>
                <button
                  onClick={handleCopyTemplate}
                  className="text-[10px] font-mono text-stone-500 hover:text-stone-900 flex items-center gap-1 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-stone-600" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy Guide
                    </>
                  )}
                </button>
              </div>
              <p className="font-sans text-xs text-stone-600 leading-relaxed italic">
                "{BOOKING_MESSAGE_TEMPLATE}"
              </p>
            </div>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4 text-xs font-mono text-stone-500">
                <span className="w-2 h-2 rounded-full bg-stone-800"></span>
                <span>Response Time: Typically &lt; 24 Hours</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-stone-500">
                <span className="w-2 h-2 rounded-full bg-stone-800"></span>
                <span>Represented Region: Worldwide Ingress</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-stone-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="flex items-center gap-1.5">WhatsApp: <a href="https://wa.me/917827484599?text=Hello%20Ankita%20and%20team,%20I'm%20interested%20in%20discussing%20a%20modeling%20project%20with%20you." target="_blank" rel="noopener noreferrer" className="underline text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5 text-emerald-500" /> Chat Now</a></span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-stone-500">
                <span className="w-2 h-2 rounded-full bg-[#229ED9] animate-pulse"></span>
                <span className="flex items-center gap-1.5">Telegram: <a href={`https://t.me/${CONTACT_TELEGRAM.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="underline text-[#229ED9] hover:text-[#1c8cb2] font-semibold flex items-center gap-1"><Send className="w-3.5 h-3.5 text-[#229ED9]" /> {CONTACT_TELEGRAM}</a></span>
              </div>
            </div>
          </div>

          {/* Dynamic Interactive Booking Form */}
          <div className="lg:col-span-7 bg-white border border-stone-200 p-8 md:p-10 shadow-sm relative">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-stone-500 mb-2">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Rachel Green"
                        className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-xs font-sans text-stone-900 focus:outline-none focus:border-stone-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-stone-500 mb-2">
                        Brand / Agency Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.brand}
                        onChange={(e) => setForm({ ...form, brand: e.target.value })}
                        placeholder="e.g. Sabyasachi, Vogue India"
                        className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-xs font-sans text-stone-900 focus:outline-none focus:border-stone-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-stone-500 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="e.g. casting@brand.com"
                        className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-xs font-sans text-stone-900 focus:outline-none focus:border-stone-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-stone-500 mb-2">
                        Tentative Shoot Date
                      </label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-xs font-mono text-stone-900 focus:outline-none focus:border-stone-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-stone-500 mb-2">
                      Campaign Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-xs font-sans text-stone-900 focus:outline-none focus:border-stone-500 transition-colors cursor-pointer"
                    >
                      {MODEL_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-stone-500 mb-2">
                      Brief Campaign Details
                    </label>
                    <textarea
                      rows={4}
                      value={form.details}
                      onChange={(e) => setForm({ ...form, details: e.target.value })}
                      placeholder="Describe the mood board, shoot location, duration, and usage rights."
                      className="w-full bg-stone-50 border border-stone-200 p-4 text-xs font-sans text-stone-900 focus:outline-none focus:border-stone-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-stone-900 text-stone-50 py-4 px-6 text-xs font-mono uppercase tracking-widest hover:bg-stone-800 transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:bg-stone-400"
                  >
                    {isSubmitting ? (
                      "Sending Broadcast..."
                    ) : (
                      <>
                        Submit Booking Request <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="text-center py-12 px-4"
                >
                  <div className="w-16 h-16 bg-stone-900 text-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl text-stone-900 font-light mb-3">
                    Inquiry Transmitted Successfully
                  </h3>
                  <p className="text-stone-500 text-sm max-w-md mx-auto mb-8 font-sans">
                    Thank you, {form.name}. Your booking request for <strong>{form.brand}</strong> regarding <strong>{form.category}</strong> has been logged. Our casting department will inspect your brief and connect shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setForm({
                        name: "",
                        email: "",
                        brand: "",
                        category: "Fashion Campaigns",
                        date: "",
                        details: "",
                      });
                    }}
                    className="border border-stone-300 text-stone-600 px-6 py-2.5 text-xs font-mono uppercase tracking-wider hover:border-stone-900 hover:text-stone-900 transition-colors cursor-pointer"
                  >
                    Submit Another Brief
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
