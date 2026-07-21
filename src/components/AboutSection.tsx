import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, Quote, Check, Briefcase, Globe } from "lucide-react";
import { 
  MODEL_BIO, 
  MODEL_CATEGORIES, 
  WORK_AVAILABILITY, 
  COLLABORATION_TEXT, 
  TAGLINE_OPTIONS 
} from "../data";

export default function AboutSection() {
  const [activeTaglineIndex, setActiveTaglineIndex] = useState(0);

  return (
    <section id="about" className="py-24 bg-white/20 backdrop-blur-sm border-t border-white/20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Intro Grid: Bio & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          {/* Bio text */}
          <div className="lg:col-span-7">
            <span className="font-mono text-xs uppercase tracking-widest text-stone-500 block mb-2">
              ELEGANT & GRACEFUL
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-normal mb-8">
              About Ankita Sharma
            </h2>
            <p className="font-serif text-lg text-stone-700 leading-relaxed font-light mb-6">
              {MODEL_BIO}
            </p>
            <p className="text-stone-600 text-sm leading-relaxed mb-8 font-sans">
              Born with an inherent fashion sensibility and refined composure, Ankita transcends typical catalog modeling. She brings a modern confidence to commercial reels and runway campaigns, merging cultural depth with high-fashion versatility.
            </p>

            {/* Dynamic tagline display */}
            <div className="bg-stone-50 border border-stone-100 p-8 relative">
              <Quote className="absolute top-4 left-4 w-8 h-8 text-stone-200/60" />
              <div className="min-h-[70px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeTaglineIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="font-serif text-base md:text-lg text-center italic text-stone-800 font-light px-6"
                  >
                    "{TAGLINE_OPTIONS[activeTaglineIndex]}"
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                {TAGLINE_OPTIONS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTaglineIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeTaglineIndex === idx ? "bg-stone-900 w-6" : "bg-stone-300"
                    }`}
                    aria-label={`Tagline ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Luxury visual card */}
          <div className="lg:col-span-5 aspect-[4/5] bg-stone-100 border border-stone-200 p-3 relative shadow-md">
            <div className="w-full h-full overflow-hidden relative">
              <img
                src="https://res.cloudinary.com/rpgo7m2a/image/upload/v1783190210/619134319_122108072361210251_7065457058637743084_n_ag6raq.jpg"
                alt="Ankita Sharma modeling traditional wear"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent p-6 text-white">
                <span className="font-mono text-[9px] tracking-widest uppercase text-stone-300">
                  Featured look
                </span>
                <p className="font-serif text-lg font-light mt-1">
                  Heritage Ensemble Campaign
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Categories Grid */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-stone-500 block mb-2">
              VERSATILE RANGE
            </span>
            <h3 className="font-serif text-3xl text-stone-900 font-normal">
              Modeling Categories
            </h3>
            <div className="h-[1px] w-8 bg-stone-300 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MODEL_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="border border-stone-200 bg-stone-50/50 p-6 hover:bg-stone-900 hover:text-stone-50 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-xs text-stone-400 group-hover:text-stone-500">
                    0{idx + 1}
                  </span>
                  <Sparkles className="w-4 h-4 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h4 className="font-serif text-lg font-light text-stone-900 group-hover:text-stone-50 transition-colors">
                  {cat}
                </h4>
                <p className="text-xs text-stone-500 group-hover:text-stone-300 mt-2 font-sans line-clamp-2">
                  Tailored camera compositions matching top industry design briefs and modern catalog grids.
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Work Availability & Collaboration CTA */}
        <div className="bg-stone-900 text-stone-100 p-8 md:p-16 border border-stone-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Availability Checklist */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="w-5 h-5 text-stone-400" />
                <span className="font-mono text-xs uppercase tracking-widest text-stone-400">
                  WORK AVAILABILITY
                </span>
              </div>
              
              <h3 className="font-serif text-2xl md:text-3xl font-light text-stone-100 mb-6">
                Ready for Brand Integration
              </h3>
              
              <ul className="space-y-3.5">
                {WORK_AVAILABILITY.map((avail) => (
                  <li key={avail} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-stone-300 font-sans">{avail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Collaboration CTA */}
            <div className="lg:border-l lg:border-stone-800 lg:pl-12 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Globe className="w-5 h-5 text-stone-400" />
                  <span className="font-mono text-xs uppercase tracking-widest text-stone-400">
                    COLLABORATION INVITATION
                  </span>
                </div>
                <p className="text-stone-300 text-sm leading-relaxed mb-8 font-sans">
                  {COLLABORATION_TEXT}
                </p>
              </div>

              <a
                href="#booking"
                className="inline-flex items-center gap-3 bg-white text-stone-950 px-6 py-4 text-xs font-mono uppercase tracking-widest hover:bg-stone-200 transition-colors w-fit self-start cursor-pointer"
              >
                Inquire Collaboration <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
