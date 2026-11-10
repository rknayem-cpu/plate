import React from 'react';
import { ShieldCheck, Award, Truck, Sparkles } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-16 font-kalpurush md:py-24 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-blue-400/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 bg-cyan-400/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> আমাদের বিশেষত্ব
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            কেন আমাদের নম্বর প্লেট সেরা?
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            গুণগত মান এবং নিখুঁত ফিনিশিংয়ের দিক থেকে আমরা দিচ্ছি সেরা নিশ্চয়তা।
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-8">
          
          {/* Card 1 */}
          <div className="group relative bg-white border border-slate-200/80 p-8 rounded-3xl shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-start">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 mb-6 group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl mb-2">১০০% সঠিক পরিমাপ</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              ট্রাফিক আইন ও BRTA স্ট্যান্ডার্ড অনুযায়ী সাইজ ও ফ্রন্ট এলাইনমেন্ট একদম নিখুঁত রেখে তৈরি করা হয়।
            </p>
            <div className="absolute top-6 right-6 text-slate-200 font-black text-3xl group-hover:text-blue-100 transition-colors">
              01
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-white border border-slate-200/80 p-8 rounded-3xl shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-start">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl mb-2">লং-লাস্টিং কোয়ালিটি</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              উচ্চমানের প্রিমিয়াম এলুমিনিয়াম শিট দিয়ে তৈরি। রোদ ও বৃষ্টিতে রঙ নষ্ট বা ফেটে যাওয়ার কোনো ভয় নেই।
            </p>
            <div className="absolute top-6 right-6 text-slate-200 font-black text-3xl group-hover:text-cyan-100 transition-colors">
              02
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-white border border-slate-200/80 p-8 rounded-3xl shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-start">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Truck className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl mb-2">দ্রুত হোম ডেলিভারি</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              অর্ডার কনফার্ম করার পর দ্রুততম সময়ের মধ্যে সুন্দরভাবে প্যাকেজিং করে দেশের যেকোনো প্রান্তে কুরিয়ার করা হয়।
            </p>
            <div className="absolute top-6 right-6 text-slate-200 font-black text-3xl group-hover:text-indigo-100 transition-colors">
              03
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}