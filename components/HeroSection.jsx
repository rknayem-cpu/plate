'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Bike } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative font-['kalpurush']  overflow-hidden py-12 md:py-12 bg-gradient-to-b from-blue-50/70 via-white to-slate-50 text-slate-900 border-b border-slate-200">
      
      {/* Background Soft Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500" /> বিআরটিএ (BRTA) স্ট্যান্ডার্ড সাইজ ও ফন্ট
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-8 text-slate-900">
              আপনার বাইকের সামনের <br />
              <span className="text-transparent mt-4 relative bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600">
                স্টাইলিশ নম্বর প্লেট
              </span> <br />
              এখন ঘরে বসেই অর্ডার করুন!
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              সরকারি মাপ ও নিয়ম মেনে নিখুঁত ফিনিশিংয়ে শক্ত এলুমিনিয়ামের তৈরি। ওয়াটারপ্রুফ, দীর্ঘস্থায়ী রং এবং প্রিমিয়াম লুক যা আপনার বাইকের সৌন্দর্য বাড়িয়ে দেবে বহুগুণ।
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <a
                href="#order-form"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-8 py-4 rounded-xl text-center shadow-lg shadow-blue-500/25 transition text-base flex items-center justify-center gap-2 group"
              >
                <span>সরাসরি অর্ডার করুন</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center justify-center gap-2 text-slate-700 text-sm font-semibold px-4 py-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> ক্যাশ অন ডেলিভারি
              </div>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm text-center">
                <h4 className="font-extrabold text-blue-600 text-sm sm:text-base">১০০% সঠিক</h4>
                <p className="text-xs text-slate-500 mt-0.5">অফিসিয়াল মাপ</p>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm text-center">
                <h4 className="font-extrabold text-blue-600 text-sm sm:text-base">ওয়াটারপ্রুফ</h4>
                <p className="text-xs text-slate-500 mt-0.5">রং নষ্ট হবে না</p>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm text-center">
                <h4 className="font-extrabold text-blue-600 text-sm sm:text-base">সারাদেশে</h4>
                <p className="text-xs text-slate-500 mt-0.5">কুরিয়ার সার্ভিস</p>
              </div>
            </div>

          </div>

          {/* Right Side: Clean Product Image Area */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200/90 p-3 md:p-5 rounded-3xl shadow-2xl
            relative shadow-blue-500/10">
              
              {/* Floating Badge */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-extrabold px-3.5 py-1 rounded-full shadow-lg uppercase tracking-wider">
                🔥 সেরা বিক্রীত পণ্য
              </div>

              {/* Product Image Box */}
              <div className="w-full h-80 sm:h-96 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-200 relative overflow-hidden group shadow-inner">
                
                {/* আসল প্রোডাক্টের ছবি দিতে নিচের কমেন্ট তুলে দিয়ে img বসাবেন */}
               <img src="/img/p1.jpg" alt="Number Plate" className="w-full 
                rounded-2xl" /> 
                
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}