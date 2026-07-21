import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, ChevronLeft, ChevronRight, Award } from "lucide-react";
import { TESTIMONIALS } from "../data";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="py-24 bg-stone-900 border-t border-stone-800 text-stone-100 relative">
      <div className="absolute top-1/2 left-10 -translate-y-1/2 opacity-5 pointer-events-none hidden lg:block">
        <Quote className="w-96 h-96" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        {/* Section Title */}
        <div className="flex justify-center mb-8">
          <div className="bg-stone-800/60 p-2.5 rounded-full border border-stone-700">
            <Award className="w-5 h-5 text-stone-300" />
          </div>
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-stone-400 block mb-3">
          INDUSTRY ENDORSEMENTS
        </span>
        <h3 className="font-serif text-3xl font-light text-white mb-12">
          Professional Acclaim
        </h3>

        {/* Carousel Content */}
        <div className="min-h-[220px] md:min-h-[180px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <p className="font-serif text-lg md:text-xl font-light leading-relaxed text-stone-100 italic mb-8">
                "{TESTIMONIALS[current].quote}"
              </p>
              
              <div>
                <p className="font-serif text-base text-stone-100 font-normal">
                  {TESTIMONIALS[current].author}
                </p>
                <p className="font-mono text-[10px] text-stone-500 uppercase tracking-widest mt-1">
                  {TESTIMONIALS[current].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center gap-6 mt-12">
          <button
            onClick={prevTestimonial}
            className="p-3 bg-stone-800/40 hover:bg-stone-800 rounded-full border border-stone-800 hover:border-stone-700 transition-all text-stone-400 hover:text-white cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  current === idx ? "bg-stone-100 w-4" : "bg-stone-700"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-3 bg-stone-800/40 hover:bg-stone-800 rounded-full border border-stone-800 hover:border-stone-700 transition-all text-stone-400 hover:text-white cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
