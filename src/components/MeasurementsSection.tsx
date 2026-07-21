import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Ruler, Sparkles, Check, ChevronDown } from "lucide-react";
import { MODEL_MEASUREMENTS } from "../data";

export default function MeasurementsSection() {
  const [unit, setUnit] = useState<"inches" | "cm">("inches");

  const coreSpecs = [
    { label: "Height", value: unit === "inches" ? MODEL_MEASUREMENTS.height : `${MODEL_MEASUREMENTS.heightCm} cm` },
    { label: "Bust", value: unit === "inches" ? `${MODEL_MEASUREMENTS.bust.inches}″` : `${MODEL_MEASUREMENTS.bust.cm} cm` },
    { label: "Waist", value: unit === "inches" ? `${MODEL_MEASUREMENTS.waist.inches}″` : `${MODEL_MEASUREMENTS.waist.cm} cm` },
    { label: "Hip", value: unit === "inches" ? `${MODEL_MEASUREMENTS.hip.inches}″` : `${MODEL_MEASUREMENTS.hip.cm} cm` },
  ];

  const secondarySpecs = [
    MODEL_MEASUREMENTS.shoulder,
    MODEL_MEASUREMENTS.upperBust,
    MODEL_MEASUREMENTS.armAround,
    MODEL_MEASUREMENTS.shortSleeve,
    MODEL_MEASUREMENTS.fullSleeve,
    MODEL_MEASUREMENTS.shoulderToWaist,
    MODEL_MEASUREMENTS.shoulderToKnee,
    MODEL_MEASUREMENTS.shoulderToAnkle,
  ];

  return (
    <section id="measurements" className="py-20 bg-white/15 backdrop-blur-sm border-t border-white/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-stone-500 block mb-2">
              STATISTICS & SPECIFICATIONS
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 font-normal">
              Modeling Profile
            </h2>
          </div>

          {/* Premium Selector Button */}
          <div className="mt-6 md:mt-0 flex items-center gap-1 bg-stone-200 p-1 rounded-full border border-stone-300">
            <button
              onClick={() => setUnit("inches")}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                unit === "inches"
                  ? "bg-stone-900 text-stone-50 shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit("cm")}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                unit === "cm"
                  ? "bg-stone-900 text-stone-50 shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Metric (cm)
            </button>
          </div>
        </div>

        {/* Core Measurements Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {coreSpecs.map((spec, index) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-stone-900 p-6 text-center border border-stone-800 shadow-sm"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-2">
                {spec.label}
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={spec.value}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="font-serif text-3xl md:text-4xl font-light text-stone-100"
                >
                  {spec.value}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-white border border-stone-200 p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-3 mb-8 border-b border-stone-100 pb-4">
            <Ruler className="w-5 h-5 text-stone-500" />
            <h3 className="font-serif text-xl text-stone-900 font-medium">
              Detailed Tailoring Dimensions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-12">
            {secondarySpecs.map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="flex justify-between items-center border-b border-stone-100 pb-2 group"
              >
                <span className="text-sm text-stone-600 font-sans group-hover:text-stone-900 transition-colors duration-200">
                  {spec.label}
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={unit}
                    initial={{ opacity: 0, x: 5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-sm text-stone-900 font-semibold"
                  >
                    {unit === "inches" ? `${spec.inches}″` : `${spec.cm} cm`}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 bg-stone-50 p-4 border-l-2 border-stone-700 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-stone-700 shrink-0 mt-0.5" />
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              <strong>Professional Standard:</strong> These dimensions represent Ankita's official casting card measurements, regularly certified and updated for seasonal campaigns, luxury lookbooks, and high-fashion tailoring.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
