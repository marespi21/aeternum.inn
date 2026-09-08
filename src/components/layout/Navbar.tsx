"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "EVENTOS", href: "#eventos" },
    { label: "VIDEO SETS", href: "#video-sets" },
    { label: "ARTISTAS", href: "#artistas" },
    { label: "GALERÍA", href: "#galeria" },
    { label: "SOBRE NOSOTROS", href: "#manifiesto" },
    { label: "COMUNIDAD", href: "#comunidad" },
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
            <a
              href="#"
              className="group flex items-center gap-3 transition-all"
            >
              {/* Official Icon Emblem */}
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden bg-black border border-white/20 p-0.5 group-hover:border-white/50 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all">
                <Image
                  src="/images/logo.png"
                  alt="Aeternum Logo"
                  fill
                  className="object-cover"
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
            </a>


          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-zinc-400">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative hover:text-white transition-colors duration-200 py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-md hover:shadow-white/10"
            >
              <span>Ingresar</span>
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
                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/20">
                  <Image
                    src="/images/logo.png"
                    alt="Aeternum Logo"
                    fill
                    className="object-cover"
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
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-2xl font-mono uppercase font-bold text-zinc-300 hover:text-white tracking-widest border-b border-zinc-900 pb-3"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-black font-mono text-sm font-bold uppercase tracking-widest"
              >
                <Sparkles className="w-4 h-4" />
                Ingresar a mi cuenta
              </Link>
              <div className="text-center text-xs font-mono text-zinc-600">
                MEDELLÍN, COLOMBIA · AETERNUM SOCIETY
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
