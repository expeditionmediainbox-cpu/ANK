import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { FileText, Mail, Globe, Send, MessageCircle, Lock } from "lucide-react";
import { MODEL_NAME, MODEL_MEASUREMENTS, PROFESSION, NATIONALITY, CONTACT_TELEGRAM } from "../data";

interface CompCardProps {
  paymentUnlocked?: boolean;
  onUnlockClick?: () => void;
}

export default function CompCard({ paymentUnlocked, onUnlockClick }: CompCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePrint = async () => {
    if (!cardRef.current) return;
    try {
      // Temporarily remove rounded corners or shadows if they cause issues (optional)
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // higher resolution
        useCORS: true,
        backgroundColor: "#0c0a09" // bg-stone-950
      });
      
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      
      // Calculate a PDF size that perfectly fits the canvas aspect ratio
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? "landscape" : "portrait",
        unit: "px",
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
      pdf.save("Ankita_Sharma_Z_Card.pdf");
    } catch (error) {
      console.error("Error generating PDF", error);
      // Fallback
      window.print();
    }
  };

  return (
    <section id="comp-card" className="py-20 bg-stone-900 text-stone-100 relative overflow-hidden">
      {/* Background visual detail */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-stone-800/20 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center md:text-left mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-stone-400 block mb-2">
              CASTING DIRECTOR TOOLKIT
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-white">
              Composite Card
            </h2>
            <p className="text-stone-400 text-sm font-sans mt-2">
              Digital Z-Card formatted for casting agencies and production houses.
            </p>
          </div>
          
          <button
            onClick={handlePrint}
            className="self-center md:self-end flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-950 px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            Print / Save Z-Card
          </button>
        </div>

        {/* The Z-Card Container */}
        <div 
          ref={cardRef} 
          className="print:bg-white print:text-black bg-stone-950 border border-stone-800 print:border-none p-6 md:p-10 shadow-2xl relative overflow-hidden max-w-3xl mx-auto"
        >
          {/* Casting Branding Header */}
          <div className="flex justify-between items-center border-b border-stone-800 print:border-stone-200 pb-4 mb-6">
            <div>
              <p className="font-serif text-2xl tracking-widest text-white print:text-black uppercase">
                {MODEL_NAME}
              </p>
              <p className="font-mono text-[9px] uppercase tracking-wider text-stone-400 print:text-stone-600 mt-1">
                {PROFESSION} • {NATIONALITY}
              </p>
            </div>
            <div className="text-right">
              <span className="font-mono text-[9px] border border-stone-700 print:border-stone-300 px-2.5 py-1 text-stone-400 print:text-stone-600 uppercase tracking-widest">
                OFFICIAL Z-CARD
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Front Shot */}
            <div className="md:col-span-5 aspect-[3/4] relative bg-stone-900 border border-stone-800 print:border-stone-200 overflow-hidden">
              <img
                src="https://res.cloudinary.com/dtzyjynai/image/upload/v1784404814/7a1e78a8-1e08-45b8-9941-b7b8368d7c28_htcetm.png"
                alt="Ankita Sharma Portfolio Headshot"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Back Stats */}
            <div className="md:col-span-7 flex flex-col justify-between h-full">
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-stone-400 print:text-stone-600 mb-4 border-b border-stone-800 print:border-stone-200 pb-1.5">
                  Physical Statistics
                </h4>
                
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div className="border-b border-stone-900 print:border-stone-100 pb-1">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-stone-500">Height</p>
                    <p className="font-serif text-sm font-medium text-stone-200 print:text-black">{MODEL_MEASUREMENTS.height} ({MODEL_MEASUREMENTS.heightCm} cm)</p>
                  </div>
                  <div className="border-b border-stone-900 print:border-stone-100 pb-1">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-stone-500">Shoulder</p>
                    <p className="font-serif text-sm font-medium text-stone-200 print:text-black">{MODEL_MEASUREMENTS.shoulder.inches}″ ({MODEL_MEASUREMENTS.shoulder.cm} cm)</p>
                  </div>
                  <div className="border-b border-stone-900 print:border-stone-100 pb-1">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-stone-500">Bust / Upper Bust</p>
                    <p className="font-serif text-sm font-medium text-stone-200 print:text-black">{MODEL_MEASUREMENTS.bust.inches}″ / {MODEL_MEASUREMENTS.upperBust.inches}″</p>
                  </div>
                  <div className="border-b border-stone-900 print:border-stone-100 pb-1">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-stone-500">Waist</p>
                    <p className="font-serif text-sm font-medium text-stone-200 print:text-black">{MODEL_MEASUREMENTS.waist.inches}″ ({MODEL_MEASUREMENTS.waist.cm} cm)</p>
                  </div>
                  <div className="border-b border-stone-900 print:border-stone-100 pb-1">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-stone-500">Hip</p>
                    <p className="font-serif text-sm font-medium text-stone-200 print:text-black">{MODEL_MEASUREMENTS.hip.inches}″ ({MODEL_MEASUREMENTS.hip.cm} cm)</p>
                  </div>
                  <div className="border-b border-stone-900 print:border-stone-100 pb-1">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-stone-500">Arm Around</p>
                    <p className="font-serif text-sm font-medium text-stone-200 print:text-black">{MODEL_MEASUREMENTS.armAround.inches}″ ({MODEL_MEASUREMENTS.armAround.cm} cm)</p>
                  </div>
                  <div className="border-b border-stone-900 print:border-stone-100 pb-1 col-span-2">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-stone-500">Sleeve lengths (Short / Full)</p>
                    <p className="font-serif text-sm font-medium text-stone-200 print:text-black">{MODEL_MEASUREMENTS.shortSleeve.inches}″ / {MODEL_MEASUREMENTS.fullSleeve.inches}″</p>
                  </div>
                  <div className="border-b border-stone-900 print:border-stone-100 pb-1 col-span-2">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-stone-500">Knee / Ankle Lengths (From Shoulder)</p>
                    <p className="font-serif text-sm font-medium text-stone-200 print:text-black">{MODEL_MEASUREMENTS.shoulderToKnee.inches}″ / {MODEL_MEASUREMENTS.shoulderToAnkle.inches}″</p>
                  </div>
                </div>
              </div>

              {/* Management details */}
              <div className="mt-8 border-t border-stone-800 print:border-stone-200 pt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-stone-400 print:text-stone-600" />
                  <span className="font-mono text-[10px] text-stone-300 print:text-stone-700">bookings@ankitasharma.fictional</span>
                </div>
                <div className="flex items-center gap-2">
                  {paymentUnlocked ? (
                    <>
                      <MessageCircle className="w-4 h-4 text-emerald-400 print:text-emerald-600" />
                      <a href={`https://wa.me/917827484599`} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-stone-300 print:text-stone-700 hover:text-white transition-colors">WhatsApp</a>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-stone-400 print:text-stone-600" />
                      <button onClick={onUnlockClick} className="font-mono text-[10px] text-stone-300 print:text-stone-700 hover:text-white transition-colors text-left flex items-center gap-1 cursor-pointer">
                        WhatsApp 🔒
                      </button>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4 text-stone-400 print:text-stone-600" />
                  <a href={`https://t.me/${CONTACT_TELEGRAM.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-stone-300 print:text-stone-700 hover:text-white transition-colors">{CONTACT_TELEGRAM}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-stone-400 print:text-stone-600" />
                  <span className="font-mono text-[10px] text-stone-300 print:text-stone-700">www.ankitasharma.fictional</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Print Styling CSS inject */}
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            body * {
              visibility: hidden;
            }
            #comp-card, #comp-card * {
              visibility: visible;
            }
            #comp-card {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 0;
              background: white !important;
              color: black !important;
            }
            #comp-card button {
              display: none !important;
            }
            .print\\:bg-white {
              background-color: white !important;
            }
            .print\\:text-black {
              color: black !important;
            }
            .print\\:border-stone-200 {
              border-color: #e7e5e4 !important;
            }
            .print\\:border-none {
              border: none !important;
            }
          }
        `}} />
      </div>
    </section>
  );
}
