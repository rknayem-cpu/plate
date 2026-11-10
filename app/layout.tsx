import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SBC নেইম প্লেট',
  description: 'নেইম প্লেট কিনুন ক্যাশ অন ডেলিভারীতে',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const FB_PIXEL_ID = '28764304303210133';

  return (
    <html lang="en">

      <head>
        {/* Facebook Pixel Script */}
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt="fb-pixel"
          />
        </noscript>
      </head>

      <body className={inter.className}>
        
        {children}
        </body>
    </html>
  )
}
