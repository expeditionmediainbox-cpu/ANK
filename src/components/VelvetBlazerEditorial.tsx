import React from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface EditorialImage {
  id: string;
  url: string;
  title: string;
  subtitle: string;
}

const EDITORIAL_IMAGES: EditorialImage[] = [
  {
    id: "existing-1",
    url: "https://res.cloudinary.com/rpgo7m2a/image/upload/v1783190209/618085371_122107898403210251_3866902917044980083_n_gwyt0y.jpg",
    title: "SCARLET DESIRE",
    subtitle: "The Original Collection",
  },
  {
    id: "new-1",
    url: "https://res.cloudinary.com/dtzyjynai/image/upload/v1784403943/aifaceswap-d8d58e40daf2d785f7cdaf71711a00a3_wx7hx8.jpg",
    title: "L'OBSCUR VELOURS",
    subtitle: "Velvet Noir",
  },
  {
    id: "new-2",
    url: "https://res.cloudinary.com/dtzyjynai/image/upload/v1784403942/aifaceswap-7843bff965230404515baf4b2ca4c676_fp3ljv.jpg",
    title: "AUTORITÉ CRAMOISIE",
    subtitle: "Crimson Authority",
  },
  {
    id: "existing-2",
    url: "https://res.cloudinary.com/rpgo7m2a/image/upload/v1783190209/616806040_122106091221210251_641187734470826639_n_kc7wc5.jpg",
    title: "AVANT-GARDE CONCEPT",
    subtitle: "The Original Collection",
  },
  {
    id: "new-3",
    url: "https://res.cloudinary.com/dtzyjynai/image/upload/v1784403941/aifaceswap-86cf8976289ea6b2335155383ce497e8_nqcday.jpg",
    title: "LA RÉBELLION DE VELOURS",
    subtitle: "The Velvet Rebellion",
  },
  {
    id: "new-4",
    url: "https://res.cloudinary.com/dtzyjynai/image/upload/v1784403869/aifaceswap-d8d58e40daf2d785f7cdaf71711a00a3_mvyjch.jpg",
    title: "AVANT-GARDE DE MINUIT",
    subtitle: "Midnight Avant-Garde",
  }
];

export default function VelvetBlazerEditorial() {
  return (
    <section className="bg-stone-950 text-stone-50 py-24 md:py-32 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-stone-800 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-stone-400" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-stone-300">
              Exclusive Editorial
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-none uppercase"
          >
            Scarlet <br/>
            <span className="text-stone-500 italic">Desire</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 font-mono text-sm tracking-[0.3em] uppercase text-stone-400"
          >
            Avant-Garde Concept Shoot
          </motion.p>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EDITORIAL_IMAGES.map((image) => {
            return (
              <motion.div 
                key={image.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="group flex flex-col"
              >
                <div className="relative overflow-hidden aspect-[3/4] bg-stone-900 border border-stone-800">
                  <img 
                    src={image.url} 
                    alt={image.title}
                    className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  {/* Overlay vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent opacity-60"></div>
                </div>
                
                <div className="mt-6 flex flex-col items-center text-center">
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-stone-500 mb-1.5">
                    {image.subtitle}
                  </span>
                  <h3 className="font-serif text-lg md:text-xl text-stone-100 tracking-wide uppercase">
                    {image.title}
                  </h3>
                  <div className="w-8 h-[1px] bg-stone-700 mt-4 transition-all duration-500 group-hover:w-16 group-hover:bg-stone-400"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
