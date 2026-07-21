import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, ChevronLeft, ChevronRight, Grid } from "lucide-react";
import { PORTFOLIO_IMAGES } from "../data";
import { PortfolioImage } from "../types";

export default function PortfolioGallery() {
  const [filter, setFilter] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Western Wear", "Ethnic Wear", "Beauty & Makeup Shoots", "Lifestyle Campaigns"];

  const filteredImages = filter === "All" 
    ? PORTFOLIO_IMAGES 
    : PORTFOLIO_IMAGES.filter(img => img.category === filter);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-white/20 backdrop-blur-sm border-t border-white/20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-stone-500 block mb-2">
            CURATED VISUAL CATALOG
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-normal mb-4">
            Creative Portfolio
          </h2>
          <div className="h-[1px] w-12 bg-stone-400 mx-auto"></div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setLightboxIndex(null);
              }}
              className={`px-5 py-2 text-xs font-mono uppercase tracking-wider border transition-all duration-300 ${
                (filter === cat || (cat === "Beauty & Makeup Shoots" && filter === "Beauty & Makeup Shoots"))
                  ? "bg-stone-900 text-stone-50 border-stone-900"
                  : "bg-transparent text-stone-600 border-stone-200 hover:border-stone-400 hover:text-stone-900"
              }`}
            >
              {cat === "Beauty & Makeup Shoots" ? "Beauty & Makeup" : cat === "Lifestyle Campaigns" ? "Lifestyle" : cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-6 lg:gap-8 space-y-6 lg:space-y-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, idx) => (
              <motion.div
                layout
                key={image.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid group relative cursor-pointer overflow-hidden border border-stone-100 bg-stone-50 mb-6 lg:mb-8"
                onClick={() => setLightboxIndex(idx)}
              >
                {/* Responsive masonry container */}
                <div className="overflow-hidden w-full h-full relative">
                  <img
                    src={image.url}
                    alt={image.title}
                    referrerPolicy="no-referrer"
                    className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                    <div className="flex justify-end">
                      <div className="bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20">
                        <Maximize2 className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-stone-300">
                        {image.category}
                      </span>
                      <h3 className="font-serif text-lg text-white font-light mt-1">
                        {image.title}
                      </h3>
                      <p className="font-mono text-[10px] text-stone-300 mt-2">
                        Ph: {image.photographer}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-stone-950/95 flex items-center justify-center p-4 md:p-10"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Close Button */}
              <button 
                className="absolute top-6 right-6 text-stone-400 hover:text-white transition-colors p-2 z-50"
                onClick={() => setLightboxIndex(null)}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button 
                className="absolute left-4 md:left-8 text-stone-400 hover:text-white transition-colors p-3 bg-stone-900/50 hover:bg-stone-800 rounded-full z-50"
                onClick={handlePrev}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button 
                className="absolute right-4 md:right-8 text-stone-400 hover:text-white transition-colors p-3 bg-stone-900/50 hover:bg-stone-800 rounded-full z-50"
                onClick={handleNext}
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Content Box */}
              <motion.div 
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ type: "spring", damping: 25 }}
                className="max-w-4xl w-full flex flex-col md:flex-row bg-stone-900 border border-stone-800 shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Photo */}
                <div className="md:w-3/5 bg-black flex items-center justify-center">
                  <img
                    src={filteredImages[lightboxIndex].url}
                    alt={filteredImages[lightboxIndex].title}
                    referrerPolicy="no-referrer"
                    className="max-h-[75vh] md:max-h-[80vh] w-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="md:w-2/5 p-8 flex flex-col justify-between bg-stone-900 text-stone-100 border-t md:border-t-0 md:border-l border-stone-800">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-stone-400">
                      {filteredImages[lightboxIndex].category}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl font-light text-stone-100 mt-2 mb-4">
                      {filteredImages[lightboxIndex].title}
                    </h3>
                    <div className="h-[1px] w-8 bg-stone-600 mb-6"></div>
                    
                    <p className="text-stone-300 text-sm leading-relaxed font-sans">
                      This series illustrates Ankita Sharma's versatility and screen control. Tailored for commercial excellence and fashion editorials.
                    </p>
                  </div>

                  <div className="mt-8 border-t border-stone-800 pt-6">
                    <p className="font-mono text-xs text-stone-400 mb-1">Photographer</p>
                    <p className="font-serif text-lg font-light text-stone-200">
                      {filteredImages[lightboxIndex].photographer}
                    </p>
                    <p className="font-mono text-[10px] text-stone-500 uppercase tracking-widest mt-4">
                      Ankita Sharma Portfolio
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
