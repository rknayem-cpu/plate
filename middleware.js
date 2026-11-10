import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;

  // যদি রুটটি /admin দিয়ে শুরু হয়
  if (url.pathname.startsWith('/admin')) {
    // লগইন পেজ নিজেই /admin হলে মিডলওয়্যার চেক করার দরকার নেই, যাতে লুপ না হয়
    if (url.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // কুকি থেকে অ্যাডমিন পাসওয়ার্ড চেক করা
    const adminAuthCookie = request.cookies.get('admin_auth');
    const correctPassword = process.env.ADMIN_PASSWORD;

    // যদি কুকি না থাকে অথবা পাসওয়ার্ড মিলে না যায়, তবে হোমপেজে (/ ) রিডাইরেক্ট করুন
    if (!adminAuthCookie || adminAuthCookie.value !== correctPassword) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// কোন কোন রুটে এই মিডলওয়্যার কাজ করবে তা নির্ধারণ করা
export const config = {
  matcher: '/admin/:path*',
};