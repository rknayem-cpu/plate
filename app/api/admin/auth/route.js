import { NextResponse } from 'next/server';

// POST: লগইন (পাসওয়ার্ড যাচাই ও কুকি সেট করা)
export async function POST(request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!password || password !== adminPassword) {
      return NextResponse.json(
        { success: false, message: 'ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।' },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      { success: true, message: 'লগইন সফল হয়েছে!' },
      { status: 200 }
    );

    // কুকি সেট করা
    response.cookies.set('admin_auth', adminPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // ৭ দিন
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'সার্ভারে সমস্যা হয়েছে।' },
      { status: 500 }
    );
  }
}

// DELETE: লগআউট (কুকি মুছে ফেলা)
export async function DELETE() {
  const response = NextResponse.json(
    { success: true, message: 'লগআউট সফল হয়েছে!' },
    { status: 200 }
  );

  // কুকি এক্সপায়ার করে মুছে ফেলা
  response.cookies.set('admin_auth', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return response;
}