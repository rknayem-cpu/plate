'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, Minus, Phone, MapPin, User, Hash, CheckCircle2, CreditCard, Tag, ChevronDown, Layers } from 'lucide-react';
import Swal from 'sweetalert2';

export default function OrderForm() {
  const [quantity, setQuantity] = useState(1);
  const [plateType, setPlateType] = useState('plain'); // 'plain' অথবা 'letter'
  const [plateNumber, setPlateNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // আলাদা আলাদা দামের ভেরিয়েবল
  const plainUnitPrice = 300;
  const letterUnitPrice = 350;
  const deliveryCharge = 100;

  // সিলেক্ট করা প্লেটের ধরন অনুযায়ী একক দাম নির্ধারণ
  const currentUnitPrice = plateType === 'plain' ? plainUnitPrice : letterUnitPrice;

  // লজিক: ৩ বা তার বেশি কোয়ান্টিটি হলে ১০% ডিসকাউন্ট
  const subtotal = currentUnitPrice * quantity;
  const isDiscountEligible = quantity >= 3;
  const discountAmount = isDiscountEligible ? subtotal * 0.10 : 0;
  const discountedSubtotal = subtotal - discountAmount;
  const totalPrice = discountedSubtotal + deliveryCharge;

  const handleQuantity = (type) => {
    if (type === 'inc') setQuantity((prev) => prev + 1);
    if (type === 'dec' && quantity > 1) setQuantity((prev) => prev - 1);
  };

  // ফর্ম সাবমিট এবং API-তে ডেটা পাঠানোর ফাংশন
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      plateType,
      plateNumber,
      customerName,
      phone,
      address,
      quantity,
      unitPrice: currentUnitPrice,
      subtotal,
      discount: discountAmount,
      deliveryCharge,
      totalPrice
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok) {
        // SweetAlert দিয়ে সাকসেস অ্যালার্ট দেখানো
        Swal.fire({
          title: 'অভিনন্দন! 🎉',
          text: 'আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। খুব শীঘ্রই আমরা আপনার সাথে যোগাযোগ করব।',
          icon: 'success',
          confirmButtonText: 'ঠিক আছে',
          confirmButtonColor: '#2563eb',
          timer: 5000,
          timerProgressBar: true
        });

        // ফর্ম রিসেট করা
        setPlateNumber('');
        setCustomerName('');
        setPhone('');
        setAddress('');
        setQuantity(1);
        setPlateType('plain');
      } else {
        Swal.fire({
          title: 'দুঃখিত!',
          text: result.message || 'অর্ডারটি সাবমিট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।',
          icon: 'error',
          confirmButtonText: 'ঠিক আছে',
          confirmButtonColor: '#dc2626'
        });
      }
    } catch (error) {
      console.error('Order submission error:', error);
      Swal.fire({
        title: 'সংযোগ ত্রুটি!',
        text: 'সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি। ইন্টারনেটের সংযোগ চেক করুন।',
        icon: 'error',
        confirmButtonText: 'ঠিক আছে',
        confirmButtonColor: '#dc2626'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="order-form" className="py-0 md:py-16 font-kalpurush bg-gradient-to-b from-slate-100 via-slate-50 to-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-0 sm:px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-slate-200 md:rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 md:p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">অর্ডার ফর্ম পূরণ করুন</h2>
            <p className="text-blue-100 text-sm mt-1.5">আপনার সঠিক তথ্য দিয়ে নিচের অর্ডারটি সম্পন্ন করুন</p>
          </div>

          <form className="p-6 md:p-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Customer Information Inputs */}
              <div className="lg:col-span-7 space-y-5">
                <h3 className="text-lg font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" /> গ্রাহকের তথ্য
                </h3>

                {/* Plate Type Selection Option */}
                <div>
                  <label className="block text-md font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-600" /> প্লেটের ধরণ নির্বাচন করুন *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPlateType('plain')}
                      className={`p-3.5 rounded-xl border text-left transition font-bold text-md flex flex-col gap-0 ${
                        plateType === 'plain'
                          ? 'border-blue-600 bg-blue-50/70 text-blue-900 shadow-sm ring-2 ring-blue-500/20'
                          : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span>প্লেন প্লেট</span>
                        <span className="text-md bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">৳ {plainUnitPrice}</span>
                      </div>
                      <span className="text-md font-normal text-slate-500 ">স্ট্যান্ডার্ড ফিনিশিং</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPlateType('letter')}
                      className={`p-3.5 rounded-xl border text-left transition font-bold text-md 
                        flex flex-col gap-0 ${
                        plateType === 'letter'
                          ? 'border-blue-600 bg-blue-50/70 text-blue-900 shadow-sm ring-2 ring-blue-500/20'
                          : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full ">
                        <span>লেটার সেট প্লেট</span>
                        <span className="text-md bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">৳ {letterUnitPrice}</span>
                      </div>
                      <span className="text-md font-normal text-slate-500 ">প্রমিনেন্ট রেজেড লেটার</span>
                    </button>
                  </div>

                  {/* Dynamic Description Box */}
                  <div className="mt-2.5 p-3 rounded-xl bg-indigo-50/60 border
                   border-indigo-100 text-md text-indigo-900 leading-relaxed font-medium">
                    {plateType === 'plain' ? (
                      <p>✨ <strong>প্লেন প্লেট সিলেক্ট করা হয়েছে (দাম: ৳{plainUnitPrice}):</strong> এটি স্ট্যান্ডার্ড ও মসৃণ ফিনিশিংয়ের। বাইকের সাইজ অনুযায়ী গ্যারেজ থেকে ছিদ্র করে নিতে হয়।</p>
                    ) : (
                      <p>🔥 <strong>লেটার সেট প্লেট সিলেক্ট করা হয়েছে (দাম: ৳{letterUnitPrice}):</strong> এই প্লেটে প্রিমিয়াম এমবসড বা রেজেড লেটার ব্যবহার করা হয় এবং এতে সাধারণত ছিদ্র করা থাকে।</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-md font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Hash className="w-4 h-4 text-blue-600" /> বাইকের নম্বর (BRTA অনুযায়ী) *
                  </label>
                  <input
                    type="text"
                    placeholder="যেমন: ঢাকা মেট্রো-ল-১১-২২৩৩"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-bold placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-base transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-md font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-blue-600" /> আপনার নাম *
                  </label>
                  <input
                    type="text"
                    placeholder="আপনার নাম লিখুন"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-sm transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-md font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-blue-600" /> মোবাইল নম্বর *
                  </label>
                  <input
                    type="tel"
                    placeholder="১১ ডিজিটের মোবাইল নম্বর"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-sm transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-md font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-blue-600" /> পূর্ণাঙ্গ ঠিকানা *
                  </label>
                  <textarea
                    rows="3"
                    placeholder="জেলা, থানা এবং গ্রামের নাম/রোড নম্বর"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-sm transition"
                    required
                  ></textarea>
                </div>

                {/* বি:দ্র: নোট ও টোগল প্রশ্ন সেকশন */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-6">
                  <p className="text-md text-slate-700 font-kalpurush leading-relaxed">
                    <strong className="text-slate-900">বি:দ্র:</strong>{' '}
                    {plateType === 'plain' ? (
                      <>
                        প্লেন প্লেট হাতে পেয়ে বাইকের সাইজ অনুযায়ী গ্যারেজ থেকে দুটি ছিদ্র করে নাট ফিটিং করুন। <br />
                        <button 
                          type="button"
                          onClick={() => setIsOpen(!isOpen)} 
                          className="text-blue-600 font-bold underline mt-1 inline-flex items-center gap-1 cursor-pointer hover:text-blue-700 transition block"
                        >
                          প্লেন প্লেটে আমরা ছিদ্র করি না কেন? 
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </>
                    ) : (
                      <>লেটার সেট প্লেটে সাধারণত ফিটিংয়ের জন্য প্রয়োজনীয় ছিদ্র করা থাকে, তাই আপনি সরাসরি বাইকে নাট দিয়ে ফিট করতে পারবেন।</>
                    )}
                  </p>

                  {plateType === 'plain' && (
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="text-md text-slate-600 bg-white p-3 rounded-lg border border-blue-200 leading-relaxed shadow-sm">
                            প্লেন প্লেটে একেক মডেলের বাইকের নাট-হোল প্লেসমেন্ট একেক রকম থাকে, তাই নিখুঁত ফিটিংয়ের জন্য আগেই ছিদ্র করা হয় না।
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>

              </div>

              {/* Right Column: Quantity, Calculation & Order Submit */}
              <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
                <h3 className="text-lg font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-blue-600" /> অর্ডার বিবরণী
                </h3>

                <div className="bg-white border border-slate-200 rounded-xl p-3 flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">সিলেক্টেড প্লেট:</span>
                  <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                    {plateType === 'plain' ? `প্লেন প্লেট (৳${plainUnitPrice})` : `লেটার সেট প্লেট (৳${letterUnitPrice})`}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <div>
                    <span className="block font-bold text-slate-800 text-sm">পরিমাণ (Quantity)</span>
                    <span className="text-xs text-slate-500">প্রতি পিস ৳ {currentUnitPrice}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-300 rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => handleQuantity('dec')}
                      className="w-8 h-8 flex items-center justify-center bg-white hover:bg-slate-200 active:scale-95 rounded text-slate-700 font-bold transition shadow-sm"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-slate-900 w-6 text-center text-base">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => handleQuantity('inc')}
                      className="w-8 h-8 flex items-center justify-center bg-white hover:bg-slate-200 active:scale-95 rounded text-slate-700 font-bold transition shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isDiscountEligible && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs flex items-center gap-2 font-semibold">
                    <Tag className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>অভিনন্দন! ৩ বা ততোধিক প্লেট অর্ডারে আপনি ১০% ছাড় পাচ্ছেন।</span>
                  </div>
                )}

                <div className="space-y-3 pt-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>প্লেট মূল্য ({quantity} পিস):</span>
                    <span className={`font-semibold text-slate-800 ${isDiscountEligible ? 'line-through text-slate-400' : ''}`}>
                      ৳ {subtotal}
                    </span>
                  </div>

                  {isDiscountEligible && (
                    <>
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>১০% ডিসকাউন্ট ছাড়:</span>
                        <span>- ৳ {discountAmount}</span>
                      </div>
                      <div className="flex justify-between text-blue-700 font-bold">
                        <span>ছাড়ের পর প্লেট মূল্য:</span>
                        <span>৳ {discountedSubtotal}</span>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between text-slate-600">
                    <span>ডেলিভারি চার্জ:</span>
                    <span className="font-semibold text-slate-800">৳ {deliveryCharge}</span>
                  </div>

                  <div className="flex justify-between items-center font-extrabold text-lg text-slate-900 pt-3 border-t border-slate-200">
                    <span>সর্বমোট প্রদেয়:</span>
                    <span className="text-blue-600 text-xl">৳ {totalPrice}</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-[14px] text-blue-800 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন)</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:scale-[0.99] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 text-base transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <CheckCircle2 className="w-5 h-5" /> 
                  {loading ? 'অর্ডার সাবমিট হচ্ছে...' : `অর্ডার নিশ্চিত করুন (৳ ${totalPrice})`}
                </button>
              </div>

            </div>
          </form>

        </motion.div>

      </div>
    </section>
  );
}