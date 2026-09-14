"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Menu, X, ArrowUpRight, User } from "lucide-react";

export function Navbar({ user }: { user: any }) {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: t("eventos"), href: `/${locale}/#eventos`, isHash: true },
    { label: t("video_sets"), href: "/videosets", isHash: false },
    { label: t("artistas"), href: "/artistas", isHash: false },
    { label: t("galeria"), href: "/galeria", isHash: false },
    { label: t("sobre_nosotros"), href: `/${locale}/#manifiesto`, isHash: true },
    { label: t("comunidad"), href: `/${locale}/#comunidad`, isHash: true },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & On Air Badge */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/"
              className="group flex items-center gap-3 transition-all"
            >
              {/* Official Icon Emblem */}
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 overflow-hidden group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all rounded-sm">
                <Image
                  src="/images/logo.png"
                  alt="Aeternum Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black tracking-[0.25em] text-white font-title uppercase group-hover:text-zinc-200 transition-colors">
                  AETERNUM
                </span>
                <span className="text-[10px] tracking-widest text-zinc-500 font-mono hidden sm:inline">
                  MDE
                </span>
              </div>
            </Link>


          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-zinc-400">
            {navLinks.map((link) => 
              link.isHash ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative hover:text-white transition-colors duration-200 py-1 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300" />
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href as any}
                  className="relative hover:text-white transition-colors duration-200 py-1 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300" />
                </Link>
              )
            )}
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            
            <Link
              href={user ? "/perfil" : "/login"}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-md hover:shadow-white/10"
            >
              <span>{user ? t("mi_perfil") : t("ingresar")}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-300 hover:text-white bg-zinc-900 border border-white/10"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pt-24 px-6 md:hidden flex flex-col justify-between pb-28"
          >
            <div className="space-y-6">
              {/* Mobile Brand Emblem */}
              <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
                <div className="relative w-12 h-12 overflow-hidden rounded-sm">
                  <Image
                    src="/images/logo.png"
                    alt="Aeternum Logo"
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-lg font-bold font-title text-white tracking-widest">
                    AETERNUM
                  </div>

                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-4 pt-2">
                {navLinks.map((link) => 
                  link.isHash ? (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-2xl font-mono uppercase font-bold text-zinc-300 hover:text-white tracking-widest border-b border-zinc-900 pb-3"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href as any}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-2xl font-mono uppercase font-bold text-zinc-300 hover:text-white tracking-widest border-b border-zinc-900 pb-3"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <Link
                href={user ? "/perfil" : "/login"}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-black font-mono text-sm font-bold uppercase tracking-widest"
              >
                <User className="w-4 h-4" />
                {user ? t("ir_a_mi_perfil") : t("ingresar_a_mi_cuenta")}
              </Link>
              
              {user && (
                <form action="/auth/signout" method="post" className="w-full">
                  <button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 font-mono text-sm font-bold uppercase tracking-widest">
                    {t("cerrar_sesion")}
                  </button>
                </form>
              )}

              <div className="text-center text-xs font-mono text-zinc-600 mt-4">
                MEDELLÍN, COLOMBIA · AETERNUM SOCIETY
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
