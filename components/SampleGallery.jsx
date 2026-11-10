"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ডেমো ডেটা (আপনার প্রয়োজন অনুযায়ী ছবি এবং বিবরণ যোগ করুন)
const samples = [
  { id: 1, title: "নেম প্লেট", image: "/img/p1.jpg" },
  { id: 2, title: "লেটার সেট নেম প্লেট", image: "/img/p2.png" },
  { id: 3, title: "নেম প্লেট", image: "/img/p1.jpg" },
  { id: 4, title: "লেটার সেট নেম প্লেট", image: "/img/p2.png" },
];

export default function SampleGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // অটো-স্ক্রোল লজিক (মাউস হভার থাকলে অটো-স্ক্রোল বন্ধ থাকবে)
  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % samples.length);
    }, 3500); // প্রতি ৩.৫ সেকেন্ড পর পর চেঞ্জ হবে

    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section className="py-16 bg-slate-50/50 font-kalpurush overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* হেডার 섹শন */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold text-slate-900 tracking-tight"
          >
            আমাদের তৈরি প্লেটের নমুনা
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-base mt-2"
          >
            বাস্তব প্রোডাক্টের নিখুঁত ফিনিশিং ও কোয়ালিটি দেখে নিন
          </motion.p>
        </div>

        {/* স্লাইডার কন্টেইনার */}
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* অটো স্ক্রোল Hero-style ক্যারোজেল */}
          <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-200">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* ইমেজ প্লেসহোল্ডার / ইমেজ tag */}
                <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-tr from-slate-800 to-slate-700">
                  {/* আসল ছবির জন্য কমেন্ট আন-কমেন্ট করুন */}
                  <img 
                    src={samples[currentIndex].image} 
                    alt={samples[currentIndex].title} 
                    className="w-full "
                  /> 
                  
                 
                </div>

                {/* কন্টেন্ট ওভারলে (Glassmorphism look) */}
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-[2px] text-white flex justify-between items-end">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Featured Sample</span>
                    <h3 className="text-xl font-bold mt-1">{samples[currentIndex].title}</h3>
                  </div>
                  <span className="text-sm font-medium text-slate-300">
                    0{currentIndex + 1} / 0{samples.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* অটোপ্লে প্রোগ্রেস বার (Hero Progress Bar) */}
            <div className="absolute top-0 inset-x-0 h-1 bg-white/20 z-10">
              <motion.div 
                key={currentIndex}
                initial={{ width: "0%" }}
                animate={{ width: isHovered ? "0%" : "100%" }}
                transition={{ duration: 3.5, ease: "linear" }}
                className="h-full bg-amber-500"
              />
            </div>
          </div>

          {/* নেভিগেশন ডট / ইন্ডিকেটর */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {samples.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'w-8 bg-amber-500' 
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ছোট প্রিভিউ গ্রিড (নিচে থাম্বনেইল হিসেবে) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
          {samples.map((item, index) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentIndex(index)}
              className={`cursor-pointer h-24 rounded-xl border flex items-center justify-center text-xs font-medium transition-all shadow-sm ${
                currentIndex === index 
                  ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/30 text-amber-900 font-bold' 
                  : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
              }`}
            >
              নমুনা {item.id} প্রিভিউ
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}