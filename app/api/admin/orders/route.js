import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

// GET: সমস্ত অর্ডার ফেচ করা
export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'অর্ডারগুলো লোড করা যায়নি।' }, { status: 500 });
  }
}

// PUT: অর্ডার স্ট্যাটাস আপডেট করা
export async function PUT(request) {
  try {
    await dbConnect();
    const { orderId, status } = await request.json();

    const updateData = { status };
    const now = new Date();

    if (status === 'Confirmed') updateData.confirmedAt = now;
    if (status === 'Shipped') updateData.shippedAt = now;
    if (status === 'Delivered') updateData.deliveredAt = now;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, { new: true });

    if (!updatedOrder) {
      return NextResponse.json({ success: false, message: 'অর্ডার পাওয়া যায়নি।' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'স্ট্যাটাস ও সময় আপডেট করা হয়েছে!', order: updatedOrder }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'সার্ভার সমস্যা হয়েছে।' }, { status: 500 });
  }
}

// DELETE: নির্দিষ্ট অর্ডার ডিলিট করা
export async function DELETE(request) {
  try {
    await dbConnect();
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json({ success: false, message: 'অর্ডার আইডি পাওয়া যায়নি।' }, { status: 400 });
    }

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return NextResponse.json({ success: false, message: 'অর্ডারটি খুঁজে পাওয়া যায়নি।' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'অর্ডার সফলভাবে ডিলিট করা হয়েছে!' }, { status: 200 });
  } catch (error) {
    console.error('Delete Order Error:', error);
    return NextResponse.json({ success: false, message: 'অর্ডার ডিলিট করতে সার্ভারে সমস্যা হয়েছে।' }, { status: 500 });
  }
}