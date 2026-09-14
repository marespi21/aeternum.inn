import type { Metadata } from "next";
import "../globals.css";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  metadataBase: new URL('https://aeternum-inn.com'),
  title: "AETERNUM // Medellín Underground Techno Platform",
  description:
    "Colectivo y plataforma de música electrónica de Medellín, Colombia. Potenciamos DJs nacionales, raves en lugares de película y momentos para la eternidad.",
  keywords: [
    "Aeternum",
    "Techno Medellín",
    "Medellín Underground",
    "Electronic Music Colombia",
    "Raves Medellín",
    "Cercle Colombia",
    "Boiler Room Medellín",
    "MAD Radio",
  ],
  openGraph: {
    title: "AETERNUM // Medellín Underground Techno",
    description:
      "Potenciamos DJs nacionales · Raves en lugares inéditos · Momentos para la eternidad",
    type: "website",
    locale: "es_CO",
    url: "https://aeternum-inn.com",
    siteName: "AETERNUM",
    images: [
      {
        url: "/images/logo.png", // Reemplazar idealmente por un banner 1200x630
        width: 800,
        height: 600,
        alt: "AETERNUM Underground Techno",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AETERNUM // Medellín Underground Techno",
    description: "Potenciamos DJs nacionales · Raves en lugares inéditos · Momentos para la eternidad",
    images: ["/images/logo.png"], // Reemplazar idealmente por un banner 1200x630
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

import { Navbar } from "@/components/layout/Navbar";
import { createClient } from "@/utils/supabase/server";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className="dark h-full antialiased scroll-smooth"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        
        {/* Google Analytics Placeholder */}
        {/* <script async src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        /> */}

        {/* Meta Pixel Placeholder */}
        {/* <script
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
              fbq('init', 'XXXXXXXXXXXXXXXX');
              fbq('track', 'PageView');
            `,
          }}
        /> */}
      </head>
      <body className="min-h-full flex flex-col bg-[#050505] text-[#f4f4f5] selection:bg-white selection:text-black">
        <NextIntlClientProvider messages={messages}>
          <div className="noise-overlay" aria-hidden="true" />
          <Navbar user={user} />
          <main className="flex-1">
            {children}
          </main>
          
          {/* Global Notifications */}
          <Toaster position="top-center" theme="dark" richColors toastOptions={{
            style: {
              background: '#0a0a0a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontFamily: 'Montserrat, sans-serif'
            }
          }} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
