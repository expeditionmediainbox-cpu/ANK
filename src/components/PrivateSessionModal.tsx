import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, AlertCircle, CreditCard, MessageCircle, Calendar } from "lucide-react";
import { CONTACT_TELEGRAM } from "../data";

interface PrivateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess?: () => void;
}

type PaymentState = "idle" | "processing" | "success" | "error";

interface Service {
  id: string;
  title: string;
  price: number;
  icon: string;
}

const SERVICES: Service[] = [
  { id: "demo", title: "Demo Call", price: 79, icon: "✨" },
  { id: "vc-5", title: "5 Minutes Video Call", price: 100, icon: "💋" },
  { id: "vc-10", title: "10 Minutes Video Call", price: 149, icon: "💋" },
  { id: "vc-15", title: "15 Minutes Video Call", price: 199, icon: "💋" },
  { id: "vc-20", title: "20 Minutes Video Call", price: 299, icon: "💋" },
  { id: "chat", title: "Chat Available", price: 100, icon: "💗" },
  { id: "other", title: "Other Real Services (Booking)", price: 200, icon: "🔥" },
];

export default function PrivateSessionModal({ isOpen, onClose, onPaymentSuccess }: PrivateSessionModalProps) {
  const [paymentState, setPaymentState] = useState<PaymentState>("idle");

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) { resolve(true); return; }
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async (service: Service) => {
    setPaymentState("processing");

    const scriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!scriptLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      setPaymentState("error");
      return;
    }

    try {
      const options = {
        key: (import.meta as any).env?.VITE_RAZORPAY_KEY_ID || "rzp_live_TFJeatnfXug9T3",
        amount: service.price * 100, // paise
        currency: "INR",
        name: "Ankita Sharma",
        description: service.title,
        handler: function (response: any) {
          if (response.razorpay_payment_id) {
            setPaymentState("success");
            if (onPaymentSuccess) onPaymentSuccess();
          } else {
            setPaymentState("error");
          }
        },
        modal: {
          ondismiss: function () {
            setPaymentState("idle");
          },
        },
        prefill: { name: "", email: "", contact: "" },
        theme: { color: "#9333ea" },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on("payment.failed", () => setPaymentState("error"));
      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentState("error");
    }
  };

  const resetState = () => setPaymentState("idle");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white shadow-2xl border border-stone-200 overflow-hidden z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              {/* RATE CARD */}
              {paymentState === "idle" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex flex-col items-center mb-6 text-center">
                    <h3 className="font-serif text-xl tracking-widest text-stone-900 uppercase">💖 Rate Card 💖</h3>
                    <p className="text-[10px] font-mono text-stone-500 uppercase tracking-widest mt-1">Only Voice Call Confirm</p>
                    <div className="w-12 h-[1px] bg-stone-300 mt-4"></div>
                  </div>

                  <div className="space-y-3 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                    {SERVICES.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => handleRazorpayPayment(service)}
                        className="w-full bg-white border border-stone-200 hover:border-purple-500 transition-all duration-300 p-4 flex items-center justify-between group shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{service.icon}</span>
                          <span className="font-serif text-sm text-stone-700 group-hover:text-stone-900">{service.title}</span>
                        </div>
                        <span className="font-mono text-sm font-semibold text-purple-600 group-hover:text-purple-700">₹{service.price}</span>
                      </button>
                    ))}
                  </div>

                  <div className="bg-stone-50 border border-stone-100 p-4 space-y-1.5 text-[11px] font-mono text-stone-600">
                    <p className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Payment First</p>
                    <p className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Genuine Calls Only</p>
                    <p className="flex items-center gap-2 text-stone-500"><X className="w-3.5 h-3.5 text-red-400" /> No Time Pass 💋😘</p>
                  </div>
                </motion.div>
              )}

              {/* PROCESSING */}
              {paymentState === "processing" && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <div className="w-12 h-12 border-4 border-stone-200 border-t-purple-600 rounded-full animate-spin mb-6"></div>
                  <h3 className="font-serif text-xl text-stone-900 mb-2">Opening Payment...</h3>
                  <p className="text-sm font-sans text-stone-500">Please complete the payment in the Razorpay window.</p>
                </motion.div>
              )}

              {/* SUCCESS */}
              {paymentState === "success" && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center py-4"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl text-stone-900 mb-2">Payment Successful</h3>
                  <p className="text-sm font-sans text-stone-600 mb-8">
                    Thank you! Your booking has been confirmed. You now have access to private channels.
                  </p>
                  <div className="w-full space-y-3">
                    <a
                      href={`https://t.me/${CONTACT_TELEGRAM.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#229ED9] hover:bg-[#1c8cb2] text-white py-3.5 px-6 text-xs font-mono uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" /> Start Private Chat
                    </a>
                    <div className="relative py-2">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-200"></div></div>
                      <div className="relative flex justify-center text-xs">
                        <span className="bg-white px-2 text-stone-500 uppercase font-mono tracking-widest">OR</span>
                      </div>
                    </div>
                    <a
                      href="https://wa.me/917827484599?text=Hello%20Ankita%20and%20team,%20I'm%20interested%20in%20discussing%20a%20modeling%20project%20with%20you."
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="w-full border border-stone-300 hover:border-stone-900 hover:text-stone-900 text-stone-700 py-3.5 px-6 text-xs font-mono uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" /> Book Your Session
                    </a>
                  </div>
                </motion.div>
              )}

              {/* ERROR */}
              {paymentState === "error" && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center py-4"
                >
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl text-stone-900 mb-2">Payment Failed</h3>
                  <p className="text-sm font-sans text-stone-600 mb-8">Your booking could not be completed. Please try again.</p>
                  <button
                    onClick={resetState}
                    className="w-full bg-stone-900 hover:bg-stone-800 text-white py-4 px-6 text-xs font-mono uppercase tracking-widest transition-colors"
                  >
                    Retry Payment
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
