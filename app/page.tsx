import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import SampleGallery from '@/components/SampleGallery';
import OrderForm from '@/components/OrderForm';

export default function Page() {
  return (
    <div className="min-h-screen font-kalpurush bg-slate-50 text-slate-800 font-sans">
      
      {/* Top Notification Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white text-center py-2 text-sm font-medium px-4">
        ⚡ BRTA নির্দেশিত সরকারি মাপে তৈরি নেম প্লেট • সারাদেশে ক্যাশ অন ডেলিভারি
      </div>

      <Navbar />
      <HeroSection />
      <Features />
      <SampleGallery />
      <OrderForm />

      {/* Footer */}
      <footer className="py-6 text-center text-slate-500 text-xs border-t border-slate-200 bg-white">
        © {new Date().getFullYear()} SBC Plate BD. All rights reserved.
      </footer>

    </div>
  );
}