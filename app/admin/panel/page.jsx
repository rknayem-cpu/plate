'use client';

import React, { useState, useEffect } from 'react';
import { Package,LogOut, RefreshCw, Check, Truck, CheckCircle2, User, Phone, MapPin, Hash, Layers, Trash2, Clock, ShoppingCart } from 'lucide-react';
import Swal from 'sweetalert2';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'confirmed', 'shipped', 'delivered'

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (res.ok) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: `অর্ডার ${newStatus} করা হয়েছে!`,
          showConfirmButton: false,
          timer: 2000
        });
        fetchOrders();
      }
    } catch (error) {
      Swal.fire('ত্রুটি!', 'আপডেট করা সম্ভব হয়নি।', 'error');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    const result = await Swal.fire({
      title: 'আপনি কি নিশ্চিত?',
      text: 'এই অর্ডারটি স্থায়ীভাবে মুছে ফেলা হবে!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'হ্যাঁ, ডিলিট করুন',
      cancelButtonText: 'বাতিল'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch('/api/admin/orders', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId }),
        });

        if (res.ok) {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'অর্ডার সফলভাবে ডিলিট করা হয়েছে!',
            showConfirmButton: false,
            timer: 2000
          });
          fetchOrders();
        } else {
          Swal.fire('ত্রুটি!', 'ডিলিট করা যায়নি।', 'error');
        }
      } catch (error) {
        Swal.fire('ত্রুটি!', 'সার্ভার সমস্যা হয়েছে।', 'error');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleString('bn-BD', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDateKey = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-CA');
  };

  const getFriendlyDateHeader = (dateString) => {
    const orderDate = new Date(dateString).toDateString();
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (orderDate === today) return '📅 আজকের অর্ডারসমূহ (Today)';
    if (orderDate === yesterday) return '📅 গতকালের অর্ডারসমূহ (Yesterday)';

    return `📅 ${new Date(dateString).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}`;
  };

  // --- স্ট্যাটিস্টিক্স / কাউন্ট হিসাব ---
  const todayStr = new Date().toDateString();
  const totalOrdersCount = orders.length;
  const todayOrdersCount = orders.filter(o => new Date(o.createdAt).toDateString() === todayStr).length;
  const todayConfirmedCount = orders.filter(o => o.confirmedAt && new Date(o.confirmedAt).toDateString() === todayStr).length;
  const todayShippedCount = orders.filter(o => o.shippedAt && new Date(o.shippedAt).toDateString() === todayStr).length;
  const todayDeliveredCount = orders.filter(o => o.deliveredAt && new Date(o.deliveredAt).toDateString() === todayStr).length;

  // --- ট্যাব অনুযায়ী অর্ডার ফিল্টার ---
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'confirmed') return order.status === 'Confirmed';
    if (activeTab === 'shipped') return order.status === 'Shipped';
    if (activeTab === 'delivered') return order.status === 'Delivered';
    return true; // 'all'
  });

  // তারিখ অনুযায়ী গ্রুপ করা
  const groupedOrders = filteredOrders.reduce((groups, order) => {
    const dateKey = getDateKey(order.createdAt);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(order);
    return groups;
  }, {});



  const handleLogout = async () => {
  const res = await fetch('/api/admin/auth', {
    method: 'DELETE',
  });

  if (res.ok) {
    window.location.href = '/admin/login'; // লগইন পেজে পাঠিয়ে দেবে
  }
};
  return (
    <div className="min-h-screen bg-slate-100 p-2 sm:p-4 md:p-8 font-kalpurush">
      <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6">
        
        {/* Header */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 flex items-center gap-2">
              <Package className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 flex-shrink-0" /> অ্যাডমিন প্যানেল - ড্যাশবোর্ড
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">অর্ডার স্ট্যাটাস, ট্র্যাকিং ও ম্যানেজমেন্ট সিস্টেম</p>
          </div>
          <button
            onClick={fetchOrders}
            className="w-full sm:w-auto relative md:left-72 flex items-center justify-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold px-4 py-2.5 rounded-xl transition text-xs sm:text-sm border border-blue-200 active:scale-95"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> রিফ্রেশ করুন
          </button>

           <button
            onClick={handleLogout}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-50 text-red-400 hover:bg-blue-100 font-bold px-4 py-2.5 rounded-xl transition text-xs sm:text-sm border border-blue-200 active:scale-95"
          >
            <LogOut className="w-4 h-4 text-red-500" /> লগআউট
          </button>
        </div>

        {/* --- ওভারভিউ কাউন্ট কার্ডসমূহ --- */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-2.5 sm:p-3 bg-blue-50 text-blue-600 rounded-xl"><ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" /></div>
            <div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-semibold">মোট অর্ডার</p>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-800">{totalOrdersCount}</h3>
            </div>
          </div>

          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-2.5 sm:p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Clock className="w-5 h-5 sm:w-6 sm:h-6" /></div>
            <div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-semibold">আজকের অর্ডার</p>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-800">{todayOrdersCount}</h3>
            </div>
          </div>

          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-2.5 sm:p-3 bg-sky-50 text-sky-600 rounded-xl"><Check className="w-5 h-5 sm:w-6 sm:h-6" /></div>
            <div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-semibold">আজ Confirmed</p>
              <h3 className="text-lg sm:text-xl font-extrabold text-sky-600">{todayConfirmedCount}</h3>
            </div>
          </div>

          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-2.5 sm:p-3 bg-amber-50 text-amber-600 rounded-xl"><Truck className="w-5 h-5 sm:w-6 sm:h-6" /></div>
            <div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-semibold">আজ Shipped</p>
              <h3 className="text-lg sm:text-xl font-extrabold text-amber-600">{todayShippedCount}</h3>
            </div>
          </div>

          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3 col-span-2 lg:col-span-1">
            <div className="p-2.5 sm:p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" /></div>
            <div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-semibold">আজ Delivered</p>
              <h3 className="text-lg sm:text-xl font-extrabold text-emerald-600">{todayDeliveredCount}</h3>
            </div>
          </div>
        </div>

        {/* --- ট্যাব বাটনসমূহ (All, Confirmed, Shipped, Delivered) --- */}
        <div className="flex gap-2 border-b border-slate-200 pb-3 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 sm:px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition whitespace-nowrap ${
              activeTab === 'all' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            📦 সকল অর্ডার ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('confirmed')}
            className={`px-4 sm:px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition whitespace-nowrap ${
              activeTab === 'confirmed' ? 'bg-sky-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            📋 Confirmed ({orders.filter(o => o.status === 'Confirmed').length})
          </button>
          <button
            onClick={() => setActiveTab('shipped')}
            className={`px-4 sm:px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition whitespace-nowrap ${
              activeTab === 'shipped' ? 'bg-amber-500 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            🚚 Shipped ({orders.filter(o => o.status === 'Shipped').length})
          </button>
          <button
            onClick={() => setActiveTab('delivered')}
            className={`px-4 sm:px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition whitespace-nowrap ${
              activeTab === 'delivered' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            ✅ Delivered ({orders.filter(o => o.status === 'Delivered').length})
          </button>
        </div>

        {/* Orders List / Grouped by Date */}
        {loading ? (
          <div className="text-center py-20 text-slate-500 bg-white rounded-2xl border border-slate-200">লোড হচ্ছে...</div>
        ) : Object.keys(groupedOrders).length === 0 ? (
          <div className="text-center py-20 text-slate-400 bg-white rounded-2xl border border-slate-200">কোনো অর্ডার পাওয়া যায়নি।</div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {Object.keys(groupedOrders).map((dateKey) => (
              <div key={dateKey} className="space-y-3">
                
                {/* Straight Line / Date Divider Header */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex-grow h-px bg-slate-300"></div>
                  <span className="bg-slate-800 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-1.5 rounded-full shadow-sm tracking-wide whitespace-nowrap">
                    {getFriendlyDateHeader(groupedOrders[dateKey][0].createdAt)}
                  </span>
                  <div className="flex-grow h-px bg-slate-300"></div>
                </div>

                {/* Responsive Table / Card Container */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[750px]">
                      <thead>
                        <tr className="bg-slate-50 text-slate-700 text-xs uppercase border-b border-slate-200">
                          <th className="p-3.5 sm:p-4">গ্রাহক তথ্য</th>
                          <th className="p-3.5 sm:p-4">প্লেট বিবরণ</th>
                          <th className="p-3.5 sm:p-4">মূল্য</th>
                          <th className="p-3.5 sm:p-4">সময়</th>
                          <th className="p-3.5 sm:p-4 text-center">অ্যাকশন (স্ট্যাটাস)</th>
                          <th className="p-3.5 sm:p-4 text-center">ডিলিট</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-md">
                        {groupedOrders[dateKey].map((order) => {
                          const isPending = order.status === 'Pending';
                          const isConfirmed = order.status === 'Confirmed';
                          const isShipped = order.status === 'Shipped';
                          const isDelivered = order.status === 'Delivered';

                          return (
                            <tr key={order._id} className="hover:bg-slate-50/60 transition">
                              
                              {/* Customer Info */}
                              <td className="p-3.5 sm:p-4 space-y-1">
                                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                  <User className="w-4 h-4 text-blue-600 flex-shrink-0" /> {order.customerName}
                                </div>
                                <div className="text-md text-slate-600 flex items-center gap-1.5">
                                  <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" /> {order.phone}
                                </div>
                                <div className="text-md text-slate-500 flex items-start gap-1.5 max-w-xs">
                                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" /> 
                                  <span>{order.address}</span>
                                </div>
                              </td>

                              {/* Plate Info */}
                              <td className="p-3.5 sm:p-4 space-y-1">
                                <div className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md text-xs font-bold">
                                  <Layers className="w-3.5 h-3.5" /> 
                                  {order.plateType === 'plain' ? 'প্লেন প্লেট' : 'লেটার সেট প্লেট'}
                                </div>
                                <div className="text-lg font-bold text-slate-700 flex items-center gap-1 pt-1">
                                  <Hash className="w-3.5 h-3.5 text-slate-400 " /> {order.plateNumber}
                                </div>
                              </td>

                              {/* Price */}
                              <td className="p-3.5 sm:p-4">
                                <div className="text-xs text-slate-500">পরিমাণ: {order.quantity} পিস</div>
                                <div className="font-extrabold text-blue-600 text-base">৳{order.totalPrice}</div>
                              </td>

                            {/* Time */}
<td className="p-3.5 sm:p-4 space-y-1 text-xs">
  <div className="text-slate-500">
    অর্ডার: <span className="font-semibold text-slate-700">{formatDate(order.createdAt)}</span>
  </div>
  {order.confirmedAt && (
    <div className="text-sky-600 font-medium">কনফার্মড: {formatDate(order.confirmedAt)}</div>
  )}
  {order.shippedAt && (
    <div className="text-amber-600 font-medium">শিপড: {formatDate(order.shippedAt)}</div>
  )}
  {order.deliveredAt && (
    <div className="text-emerald-600 font-medium">ডেলিভার্ড: {formatDate(order.deliveredAt)}</div>
  )}
</td>

                              {/* Action Buttons Step by Step */}
                              <td className="p-3.5 sm:p-4">
                                <div className="flex items-center justify-center gap-1.5">
                                  
                                  {/* 1. Confirm Button */}
                                  <button
                                    disabled={!isPending}
                                    onClick={() => handleStatusUpdate(order._id, 'Confirmed')}
                                    className={`px-2.5 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 transition ${
                                      isConfirmed || isShipped || isDelivered
                                        ? 'bg-sky-100 text-sky-800 border border-sky-200 opacity-60 cursor-not-allowed'
                                        : isPending
                                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm active:scale-95'
                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    }`}
                                  >
                                    <Check className="w-3 h-3" />
                                    {isConfirmed || isShipped || isDelivered ? 'Confirmed' : 'Confirm'}
                                  </button>

                                  {/* 2. Shipped Button */}
                                  <button
                                    disabled={!isConfirmed}
                                    onClick={() => handleStatusUpdate(order._id, 'Shipped')}
                                    className={`px-2.5 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 transition ${
                                      isShipped || isDelivered
                                        ? 'bg-amber-100 text-amber-800 border border-amber-200 opacity-60 cursor-not-allowed'
                                        : isConfirmed
                                        ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-sm active:scale-95'
                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    }`}
                                  >
                                    <Truck className="w-3 h-3" />
                                    Shipped
                                  </button>

                                  {/* 3. Delivered Button */}
                                  <button
                                    disabled={!isShipped}
                                    onClick={() => handleStatusUpdate(order._id, 'Delivered')}
                                    className={`px-2.5 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 transition ${
                                      isDelivered
                                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                        : isShipped
                                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm active:scale-95'
                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    }`}
                                  >
                                    <CheckCircle2 className="w-3 h-3" />
                                    Delivered
                                  </button>

                                </div>
                              </td>

                              {/* Delete Button */}
                              <td className="p-3.5 sm:p-4 text-center">
                                <button
                                  onClick={() => handleDeleteOrder(order._id)}
                                  className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl transition shadow-sm active:scale-95"
                                  title="অর্ডার ডিলিট করুন"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>

                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}