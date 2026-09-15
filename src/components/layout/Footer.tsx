"use client";

import React from "react";
import { MessageCircle, ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  InstagramIcon,
  SoundcloudIcon,
  TiktokIcon,
  YoutubeIcon,
} from "@/components/icons/CustomIcons";

export function Footer() {
  const t = useTranslations("Footer");
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socials = [
    {
      name: "YouTube",
      handle: "@aeternum-inn",
      url: "https://www.youtube.com/@aeternum-inn",
      icon: <YoutubeIcon className="w-5 h-5 text-red-500" />,
    },
    {
      name: "Instagram",
      handle: "@aeternum.inn",
      url: "https://instagram.com/aeternum.inn",
      icon: <InstagramIcon className="w-5 h-5" />,
    },
    {
      name: "SoundCloud",
      handle: "Aeternum Radio",
      url: "https://soundcloud.com/aeternum-inn",
      icon: <SoundcloudIcon className="w-5 h-5" />,
    },
    {
      name: "TikTok",
      handle: "@aeternum.mde",
      url: "https://www.tiktok.com/@aeternum.inn",
      icon: <TiktokIcon className="w-5 h-5" />,
    },
    {
      name: "WhatsApp",
      handle: "Línea Directa",
      url: "https://wa.me/573007626350",
      icon: <MessageCircle className="w-5 h-5" />,
    },
  ];

  return (
    <footer className="relative bg-black border-t border-white/10 pt-16 pb-28 sm:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/footer-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-12">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#"
              className="flex items-center gap-3 group inline-flex"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 overflow-hidden group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all rounded-sm">
                <img
                  src="/images/logo.png"
                  alt="Aeternum Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg sm:text-xl font-black font-title tracking-[0.25em] text-white uppercase inline-block group-hover:text-zinc-200 transition-colors">
                AETERNUM
              </span>
            </a>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed max-w-sm">
              {t("mission")}
            </p>
            <div className="text-xs font-mono text-zinc-500 flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{t("broadcasting")}</span>
            </div>
          </div>

          {/* Social Hub Links */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              {t("community")}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-950 border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-all group"
                >
                  <span className="text-zinc-400 group-hover:text-white transition-colors">
                    {social.icon}
                  </span>
                  <div className="truncate">
                    <span className="block text-xs font-mono font-semibold">
                      {social.name}
                    </span>
                    <span className="block text-[10px] text-zinc-500 font-mono truncate">
                      {social.handle}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Direct Navigation & Location */}
          <div className="md:col-span-3 space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white mb-3">
                {t("location_title")}
              </h4>
              <p 
                className="text-xs font-mono text-zinc-400 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t("location_desc") }}
              />
            </div>

            <div>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/30 text-xs font-mono text-zinc-300 hover:text-white transition-all"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>{t("back_to_top")}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
          <div>
            {t("rights", { year: new Date().getFullYear() })}
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-4 sm:mt-0">
            <a href="/legal/terminos" className="hover:text-zinc-300 transition-colors">{t("terms")}</a>
            <a href="/legal/privacidad" className="hover:text-zinc-300 transition-colors">{t("privacy")}</a>
            <a href="/legal/protocolo-seguro" className="hover:text-zinc-300 transition-colors">{t("safety")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
