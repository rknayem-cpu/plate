import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db'; // আপনার db.js ফাইলের সঠিক পাথ দিন
import Order from '@/models/Order'; // আপনার Order model এর সঠিক পাথ দিন

export async function POST(request) {
  try {
    // ডেটাবেস কানেক্ট করা
    await dbConnect();

    const body = await request.json();
    
    const {
      plateType,
      plateNumber,
      customerName,
      phone,
      address,
      quantity,
      unitPrice,
      subtotal,
      discount,
      deliveryCharge,
      totalPrice,
    } = body;

    // সাধারণ ভ্যালিডেশন
    if (!plateNumber || !customerName || !phone || !address) {
      return NextResponse.json(
        { success: false, message: 'সবগুলো প্রয়োজনীয় তথ্য সঠিকভাবে পূরণ করুন।' },
        { status: 400 }
      );
    }

    // MongoDB তে নতুন অর্ডার সেভ করা
    const newOrder = await Order.create({
      plateType,
      plateNumber,
      customerName,
      phone,
      address,
      quantity,
      unitPrice,
      subtotal,
      discount,
      deliveryCharge,
      totalPrice,
    });

    return NextResponse.json(
      { success: true, message: 'অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে!', order: newOrder },
      { status: 201 }
    );

  } catch (error) {
    console.error('Order API Error:', error);
    return NextResponse.json(
      { success: false, message: 'সার্ভারে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।' },
      { status: 500 }
    );
  }
}