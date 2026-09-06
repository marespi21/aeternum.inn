import type { Metadata } from "next";
import { Orbitron, Rajdhani, Chakra_Petch } from "next/font/google";
import "./globals.css";

const fontTitle = Orbitron({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const fontBody = Rajdhani({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const fontMonoTech = Chakra_Petch({
  variable: "--font-mono-tech",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
      "Potenciamos DJs nacionales · Raves en lugares de película · Momentos para la eternidad",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fontTitle.variable} ${fontBody.variable} ${fontMonoTech.variable} dark h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-[#f4f4f5] font-body selection:bg-white selection:text-black">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
