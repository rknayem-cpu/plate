import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="bg-white font-kalpurush border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
           
          <span className="text-2xl flex gap-1 justify-center font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
             <img src="/img/sbc.png" alt="logo" className='w-16' /> <span className='relative top-[1.5px]'>প্লেট বিডি</span>
          </span>
        </div>
        <a
          href="#order-form"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-5 py-2 rounded-lg text-sm flex items-center gap-2 shadow-md transition"
        >
          <ShoppingBag className="w-4 h-4" /> অর্ডার করুন
        </a>
      </div>
    </header>
  );
}