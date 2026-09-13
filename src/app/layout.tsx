import type { Metadata } from "next";
import "./globals.css";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
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
    url: "https://aeternum.inn",
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

import { Navbar } from "@/components/layout/Navbar";
import { RadioBar } from "@/components/layout/RadioBar";
import { createClient } from "@/utils/supabase/server";
import { Toaster } from "sonner";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch the latest radio track for persistent playback
  const { data: tracks } = await supabase
    .from("audio_tracks")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  const currentTrack = tracks?.[0] || null;

  return (
    <html
      lang="es"
      className="dark h-full antialiased scroll-smooth"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-[#050505] text-[#f4f4f5] selection:bg-white selection:text-black">
        <div className="noise-overlay" aria-hidden="true" />
        <Navbar user={user} />
        <main className="flex-1 pb-24 md:pb-20">
          {children}
        </main>
        
        {/* Global Persistent Audio Radio Bar */}
        <RadioBar track={currentTrack} />
        
        {/* Global Notifications */}
        <Toaster position="top-center" theme="dark" richColors toastOptions={{
          style: {
            background: '#0a0a0a',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff',
            fontFamily: 'Montserrat, sans-serif'
          }
        }} />
      </body>
    </html>
  );
}
