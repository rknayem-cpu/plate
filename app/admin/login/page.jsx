'use client';

import React, { useState } from 'react';
import { Lock, KeyRound, ArrowRight } from 'lucide-react';
import Swal from 'sweetalert2';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password) {
      Swal.fire('সতর্কতা', 'দয়া করে পাসওয়ার্ড দিন।', 'warning');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'লগইন সফল হয়েছে!',
          showConfirmButton: false,
          timer: 1500
        });
        // সফল হলে অ্যাডমিন প্যানেলে রিডাইরেক্ট করবে
        window.location.href = '/admin/panel';
      } else {
        Swal.fire('দুঃখিত!', data.message || 'ভুল পাসওয়ার্ড', 'error');
      }
    } catch (error) {
      Swal.fire('ত্রুটি!', 'সার্ভারে সংযোগ স্থাপন করা যায়নি।', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-kalpurush">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden p-8 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800">অ্যাডমিন লগইন</h1>
          <p className="text-slate-500 text-sm">প্রবেশ করতে আপনার সিক্রেট পাসওয়ার্ডটি দিন</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-blue-600" /> পাসওয়ার্ড *
            </label>
            <input
              type="password"
              placeholder="অ্যাডমিন পাসওয়ার্ড লিখুন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-bold placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-base transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 text-base transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'চেক করা হচ্ছে...' : 'লগইন করুন'} <ArrowRight className="w-5 h-5" />
          </button>
        </form>

      </div>
    </div>
  );
}