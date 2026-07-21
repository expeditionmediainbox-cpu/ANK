import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight, Instagram, Mail, Globe, MapPin, Sparkles, Star, MessageCircle, Send, CreditCard, Lock, Calendar } from "lucide-react";
import { MODEL_NAME, PROFESSION, NATIONALITY, STYLE, CONTACT_TELEGRAM } from "./data";

// Component imports
import AboutSection from "./components/AboutSection";
import MeasurementsSection from "./components/MeasurementsSection";
import PortfolioGallery from "./components/PortfolioGallery";
import VelvetBlazerEditorial from "./components/VelvetBlazerEditorial";
import CompCard from "./components/CompCard";
import TestimonialsSection from "./components/TestimonialsSection";
import CommentBook from "./components/CommentBook";
import BookingForm from "./components/BookingForm";
import PrivateSessionModal from "./components/PrivateSessionModal";

const BACKGROUND_IMAGES = [
  "https://res.cloudinary.com/dtzyjynai/image/upload/v1784409315/aifaceswap-9ee15745593e4aba68e8cfc614e9f817_zsrwt6.jpg",
  "https://res.cloudinary.com/dtzyjynai/image/upload/v1784408609/4_emazhp.jpg",
  "https://res.cloudinary.com/dtzyjynai/image/upload/v1784408608/5_wt50dy.jpg",
  "https://res.cloudinary.com/dtzyjynai/image/upload/v1784403869/aifaceswap-7843bff965230404515baf4b2ca4c676_dtj03o.jpg",
  "https://res.cloudinary.com/dtzyjynai/image/upload/v1784408609/3_p3lldf.jpg",
  "https://res.cloudinary.com/dtzyjynai/image/upload/v1784408609/1_kugbdd.jpg"
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [paymentUnlocked, setPaymentUnlocked] = useState<boolean>(() => {
    return localStorage.getItem("payment_unlocked") === "true";
  });

  const handlePaymentSuccess = () => {
    localStorage.setItem("payment_unlocked", "true");
    setPaymentUnlocked(true);
  };

  // Auto-rotate background images every 5 seconds
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000);
    return () => clearInterval(bgTimer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Measurements", href: "#measurements" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Comp Card", href: "#comp-card" },
    { name: "Guestbook", href: "#guestbook" },
    { name: "Booking", href: "#booking" }
  ];

  return (
    <div className="min-h-screen text-stone-900 font-sans selection:bg-stone-900 selection:text-white overflow-x-hidden relative">
      
      {/* Global Photo Grid Background Layer (Larger Photo Cards, 1px Blur) */}
      <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-stone-900/10">
        <div className="absolute inset-0 p-6 md:p-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 opacity-90 filter blur-[1px]">
          {[...BACKGROUND_IMAGES, ...BACKGROUND_IMAGES].map((imgUrl, idx) => (
            <div 
              key={idx} 
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-white/50 bg-stone-200/50"
            >
              <img 
                src={imgUrl} 
                alt={`Model Background Photo ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          ))}
        </div>
        {/* Soft contrast overlay for text readability */}
        <div className="absolute inset-0 bg-stone-950/20" />
      </div>

      {/* Premium Elegant Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled 
            ? "bg-white/90 backdrop-blur-lg border-b border-stone-200/60 py-3.5 shadow-sm" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Name */}
          <a href="#" className="group flex flex-col">
            <span className="font-serif text-lg md:text-xl font-normal tracking-widest uppercase text-stone-950 group-hover:opacity-80 transition-opacity">
              {MODEL_NAME}
            </span>
            <span className="font-mono text-[9px] text-stone-500 uppercase tracking-widest mt-0.5">
              Ankita Portfolio
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-[10px] uppercase tracking-wider text-stone-600 hover:text-stone-950 hover:underline hover:underline-offset-4 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Call to Action */}
          <div className="hidden md:flex items-center gap-4">
            {paymentUnlocked ? (
              <a
                href="https://wa.me/917827484599?text=Hello%20Ankita%20and%20team,%20I'm%20interested%20in%20discussing%20a%20modeling%20project%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-[10px] font-mono uppercase tracking-widest transition-colors duration-300 flex items-center gap-1.5 shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-stone-400 text-white px-4 py-2.5 text-[10px] font-mono uppercase tracking-widest transition-colors duration-300 flex items-center gap-1.5 shadow-sm cursor-pointer hover:bg-stone-500"
                title="Pay ₹100 to unlock WhatsApp"
              >
                <Lock className="w-3.5 h-3.5" /> WhatsApp 🔒
              </button>
            )}
            <a
              href={`https://t.me/${CONTACT_TELEGRAM.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#229ED9] hover:bg-[#1c8cb2] text-white px-4 py-2.5 text-[10px] font-mono uppercase tracking-widest transition-colors duration-300 flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" /> Telegram
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-stone-950 text-stone-50 px-5 py-2.5 text-[10px] font-mono uppercase tracking-widest hover:bg-stone-800 transition-colors duration-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3 h-3" /> Book Private Session
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 text-[10px] font-mono uppercase tracking-widest transition-colors duration-300 flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" /> Pay Now
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-stone-950 focus:outline-none p-1.5"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[64px] left-0 right-0 bg-white border-b border-stone-200 z-30 shadow-lg md:hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-xs uppercase tracking-widest text-stone-700 hover:text-stone-950 border-b border-stone-100 pb-2"
                >
                  {link.name}
                </a>
              ))}
              {paymentUnlocked ? (
                <a
                  href="https://wa.me/917827484599?text=Hello%20Ankita%20and%20team,%20I'm%20interested%20in%20discussing%20a%20modeling%20project%20with%20you."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-center text-xs font-mono uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </a>
              ) : (
                <button
                  onClick={() => { setMobileMenuOpen(false); setIsModalOpen(true); }}
                  className="bg-stone-400 hover:bg-stone-500 text-white py-3 text-center text-xs font-mono uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 w-full"
                >
                  <Lock className="w-4 h-4" /> WhatsApp 🔒 (Pay ₹100 to unlock)
                </button>
              )}
              <a
                href={`https://t.me/${CONTACT_TELEGRAM.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[#229ED9] hover:bg-[#1c8cb2] text-white py-3 text-center text-xs font-mono uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4" /> Chat on Telegram
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="bg-stone-900 text-stone-50 py-3.5 w-full text-center text-xs font-mono uppercase tracking-widest hover:bg-stone-800 transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" /> Book Private Session
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white py-3 text-center text-xs font-mono uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm w-full cursor-pointer"
              >
                <CreditCard className="w-4 h-4" /> Pay via Razorpay
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Master Hero Editorial Cover */}
      <section className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center pt-24 pb-16 bg-white/10 backdrop-blur-sm border-b border-white/10 overflow-hidden">
        {/* Abstract background details */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,162,158,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-stone-200/50 rounded-full blur-2xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Typography Showcase */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-stone-200/60 rounded-full w-fit mx-auto lg:mx-0 mb-6 border border-stone-300/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-stone-600" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-stone-700 font-semibold">
                Fashion & Commercial Face
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-stone-950 leading-[0.9] font-normal"
            >
              {MODEL_NAME}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-mono text-xs uppercase tracking-widest text-stone-500 mt-4 mb-6"
            >
              {PROFESSION} • {NATIONALITY}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-[1px] w-16 bg-stone-400 mx-auto lg:mx-0 my-6"
            ></motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-serif text-lg md:text-xl text-stone-700 font-light leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10"
            >
              "An embodiment of traditional grace meeting global attitude. Creating striking compositions for editorial spreads and commercial video ads."
            </motion.p>

            {/* Micro details bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-wrap justify-center lg:justify-start gap-y-3 gap-x-8 text-stone-500 font-sans text-xs mb-10 border-t border-b border-stone-200/60 py-4"
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-stone-400" />
                <span>Mumbai, India • Global Availability</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-stone-400" />
                <span>5’6” • {STYLE.split(", ")[0]}</span>
              </div>
            </motion.div>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start items-center gap-4 w-full"
            >
              <a
                href="#portfolio"
                className="w-full sm:w-auto text-center bg-stone-900 text-white px-8 py-4 text-xs font-mono uppercase tracking-widest hover:bg-stone-800 transition-colors flex items-center justify-center gap-3 cursor-pointer"
              >
                View Catalog <ArrowRight className="w-4 h-4" />
              </a>
              {paymentUnlocked ? (
                <a
                  href="https://wa.me/917827484599?text=Hello%20Ankita%20and%20team,%20I'm%20interested%20in%20discussing%20a%20modeling%20project%20with%20you."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-xs font-mono uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Chat
                </a>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto text-center bg-stone-400 hover:bg-stone-500 text-white px-8 py-4 text-xs font-mono uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Lock className="w-4 h-4" /> WhatsApp 🔒
                </button>
              )}
              <a
                href={`https://t.me/${CONTACT_TELEGRAM.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center bg-[#229ED9] hover:bg-[#1c8cb2] text-white px-8 py-4 text-xs font-mono uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" /> Telegram Chat
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto text-center border border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-900 px-8 py-4 text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" /> Book Private Session
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto text-center bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-xs font-mono uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <CreditCard className="w-4 h-4" /> Pay via Razorpay
              </button>
            </motion.div>
          </div>

          {/* Main Hero Portrait Frame */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="aspect-[3/4] bg-stone-200 border border-stone-300 p-2.5 relative shadow-2xl overflow-hidden max-w-sm md:max-w-md mx-auto"
            >
              <div className="w-full h-full relative overflow-hidden group">
                <img
                  src="https://res.cloudinary.com/rpgo7m2a/image/upload/v1783190209/618268554_122106091341210251_5734798594108872789_n_ntsw6w.jpg"
                  alt="Ankita Sharma Portfolio Editorial Shot"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-0 transition-transform duration-[4000ms] group-hover:scale-105"
                />
                
                {/* Physical overlay tags */}
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1.5 border border-white/20 text-white flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></div>
                  <span className="font-mono text-[9px] uppercase tracking-widest">Represented</span>
                </div>

                <div className="absolute bottom-4 right-4 bg-stone-950/80 backdrop-blur-sm px-4 py-2 border border-stone-800 text-stone-100 text-right">
                  <p className="font-mono text-[8px] uppercase tracking-widest text-stone-400">Featured In</p>
                  <p className="font-serif text-xs font-light tracking-wide">Elite Couture Lookbook</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Secondary Modular Page Content */}
      <main>
        <AboutSection />
        <MeasurementsSection />
        <PortfolioGallery />
        <VelvetBlazerEditorial />
        <CompCard paymentUnlocked={paymentUnlocked} onUnlockClick={() => setIsModalOpen(true)} />
        <TestimonialsSection />
        <CommentBook />
        <BookingForm />
      </main>

      {/* Elegant Editorial Footer */}
      <footer className="bg-stone-950 text-stone-100 py-16 border-t border-stone-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Branding */}
            <div className="md:col-span-2">
              <span className="font-serif text-2xl tracking-widest text-white uppercase block mb-3">
                {MODEL_NAME}
              </span>
              <p className="font-mono text-[10px] text-stone-500 uppercase tracking-widest mb-6">
                {PROFESSION} • {NATIONALITY}
              </p>
              <p className="text-stone-400 text-xs leading-relaxed max-w-sm font-sans">
                A high-fashion professional lookbook and representation hub. Represented fictional identity for luxury designers, campaigns, digital reels, and global advertisements.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-4">
                Directory
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-xs text-stone-400 hover:text-white transition-colors font-sans"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Representation */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-4">
                Representation
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed font-sans mb-4">
                Available for worldwide travel, brand promotions, and commercial campaigns.
              </p>
              <div className="flex items-center gap-3">
                <a 
                  href="#booking" 
                  className="p-2 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white rounded-full transition-all border border-stone-800"
                  aria-label="Casting Mail"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="p-2 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white rounded-full transition-all border border-stone-800"
                  aria-label="Casting Web"
                >
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          <div className="border-t border-stone-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-[10px] font-mono text-stone-600">
              © {new Date().getFullYear()} {MODEL_NAME}. All rights reserved. This is a fictional profile.
            </p>
            <p className="text-[10px] font-mono text-stone-600">
              Designed for luxury fashion campaigns & global casting agencies.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Telegram Button */}
      <motion.a
        href={`https://t.me/${CONTACT_TELEGRAM.replace('@', '')}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.15, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-[92px] right-6 z-50 bg-[#229ED9] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#1c8cb2] hover:scale-105 active:scale-95 transition-all duration-300 group"
        id="telegram-floating-button"
        aria-label="Contact on Telegram"
      >
        <Send className="w-6 h-6 stroke-[2.2] -ml-0.5 mt-0.5" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-out font-mono text-[10px] font-bold tracking-wider uppercase whitespace-nowrap">
          Chat on Telegram
        </span>
      </motion.a>

      {/* Floating WhatsApp Button — locked until payment */}
      {paymentUnlocked ? (
        <motion.a
          href="https://wa.me/917827484599?text=Hello%20Ankita%20and%20team,%20I'm%20interested%20in%20discussing%20a%20modeling%20project%20with%20you."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all duration-300 group"
          id="whatsapp-floating-button"
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 stroke-[2.5]" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-out font-mono text-[10px] font-bold tracking-wider uppercase whitespace-nowrap">
            Chat on WhatsApp
          </span>
        </motion.a>
      ) : (
        <motion.button
          onClick={() => setIsModalOpen(true)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 bg-stone-700 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center hover:bg-stone-800 hover:scale-105 active:scale-95 transition-all duration-300 group"
          id="whatsapp-floating-button"
          aria-label="Pay to unlock WhatsApp"
        >
          <Lock className="w-6 h-6 stroke-[2.5]" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-out font-mono text-[10px] font-bold tracking-wider uppercase whitespace-nowrap">
            Pay to unlock WhatsApp
          </span>
        </motion.button>
      )}

      {/* Floating Background Image Selector Pills */}
      <div className="fixed bottom-6 left-6 z-40 bg-stone-950/70 backdrop-blur-md px-3 py-2 rounded-full border border-white/20 flex items-center gap-1.5 shadow-2xl">
        <span className="font-mono text-[9px] uppercase tracking-widest text-stone-300 mr-1 hidden sm:inline">
          BG
        </span>
        {BACKGROUND_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentBgIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentBgIndex 
                ? "w-6 bg-white shadow-md" 
                : "w-2 bg-stone-500/60 hover:bg-stone-300"
            }`}
            title={`Switch to background ${idx + 1}`}
            aria-label={`Switch to background ${idx + 1}`}
          />
        ))}
      </div>

      <PrivateSessionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onPaymentSuccess={handlePaymentSuccess} />
    </div>
  );
}
