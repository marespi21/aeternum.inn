import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";

const fontOmniumAlt = Montserrat({
  variable: "--font-omnium-alt",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const fontTitle = localFont({
  src: '../../public/fonts/sloth_rounded.ttf',
  variable: '--font-title',
  display: 'swap',
});

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
import { createClient } from "@/utils/supabase/server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html
      lang="es"
      className={`${fontTitle.variable} ${fontOmniumAlt.variable} dark h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-[#f4f4f5] selection:bg-white selection:text-black">
        <div className="noise-overlay" aria-hidden="true" />
        <Navbar user={user} />
        <main className="flex-1 pb-24 md:pb-20">
          {children}
        </main>
      </body>
    </html>
  );
}
