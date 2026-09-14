"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Target,
  Headphones,
  Zap,
  Globe,
  Flame,
  Film,
  Users,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { YoutubeIcon } from "@/components/icons/CustomIcons";
import Link from "next/link";
import { useTranslations } from "next-intl";

type TabKey = "quienes-somos" | "mision-vision" | "objetivos" | "unicos";

export function ManifestoSection() {
  const t = useTranslations("Manifesto");
  const [activeTab, setActiveTab] = useState<TabKey>("quienes-somos");

  const tabs: { key: TabKey; label: string; num: string; icon: React.ReactNode }[] = [
    {
      key: "quienes-somos",
      label: t("tab1"),
      num: "01",
      icon: <Compass className="w-3.5 h-3.5" />,
    },
    {
      key: "mision-vision",
      label: t("tab2"),
      num: "02",
      icon: <Target className="w-3.5 h-3.5" />,
    },
    {
      key: "objetivos",
      label: t("tab3"),
      num: "03",
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
    },
    {
      key: "unicos",
      label: t("tab4"),
      num: "04",
      icon: <Zap className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <section
      id="manifiesto"
      className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-zinc-950/80 border-y border-white/10 overflow-hidden"
    >
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10 space-y-10 sm:space-y-12">
        
        {/* 1. HEADER & HERO QUOTE (Punchy & Minimal) */}
        <div className="space-y-4 text-center max-w-2xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-zinc-400 tracking-widest">
            <Flame className="w-3 h-3 text-white" />
            <span>{t("header_badge")}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-title tracking-wide text-white uppercase leading-tight">
            {t("header_title")}
          </h2>

          <blockquote className="text-base sm:text-xl font-body text-zinc-300 font-normal leading-relaxed">
            {t("quote")}
          </blockquote>
        </div>

        {/* 2. INTERACTIVE SLEEK TAB SELECTOR */}
        <div className="space-y-4">
          {/* Tabs Bar */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-black border border-white/10 overflow-x-auto custom-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs font-title uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeTab === tab.key
                    ? "bg-white text-black font-bold shadow-lg"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="opacity-60 text-[10px] font-mono">{tab.num}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Cards (Animated, Compact, Visual) */}
          <div className="relative min-h-[220px]">
            <AnimatePresence mode="wait">
              {/* TAB 1: ¿QUIÉNES SOMOS? */}
              {activeTab === "quienes-somos" && (
                <motion.div
                  key="quienes-somos"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 sm:p-8 rounded-2xl bg-black/90 border border-white/15 space-y-4 shadow-xl"
                >
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                    <span className="text-xs font-title font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Compass className="w-4 h-4 text-emerald-400" />
                      {t("t1_title")}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">{t("t1_sub")}</span>
                  </div>

                  <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
                    {t("t1_desc")}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] font-mono text-zinc-400">
                    <div className="p-2 rounded-lg bg-zinc-900/60 border border-white/5">{t("t1_tag1")}</div>
                    <div className="p-2 rounded-lg bg-zinc-900/60 border border-white/5">{t("t1_tag2")}</div>
                    <div className="p-2 rounded-lg bg-zinc-900/60 border border-white/5">{t("t1_tag3")}</div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: MISIÓN & VISIÓN */}
              {activeTab === "mision-vision" && (
                <motion.div
                  key="mision-vision"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {/* Misión */}
                  <div className="group relative overflow-hidden p-6 rounded-2xl bg-black/90 border border-white/15 space-y-2.5 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.05)] hover:border-white/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-400/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left z-20" />
                    
                    <div className="relative z-30">
                      <span className="text-xs font-title font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2 mb-2.5">
                      <Target className="w-4 h-4" />
                      {t("mission_title")}
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 font-body leading-relaxed">
                      {t.rich("mission_desc", {
                        span: (chunks) => <span className="text-white font-semibold">{chunks}</span>
                      })}
                    </p>
                    </div>
                  </div>

                  {/* Visión */}
                  <div className="group relative overflow-hidden p-6 rounded-2xl bg-black/90 border border-white/15 space-y-2.5 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.05)] hover:border-white/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-400/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left z-20" />
                    
                    <div className="relative z-30">
                      <span className="text-xs font-title font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-2.5">
                      <Globe className="w-4 h-4" />
                      {t("vision_title")}
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 font-body leading-relaxed">
                      {t.rich("vision_desc", {
                        span: (chunks) => <span className="text-white font-semibold">{chunks}</span>
                      })}
                    </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: OBJETIVOS */}
              {activeTab === "objetivos" && (
                <motion.div
                  key="objetivos"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {[
                    { title: t("obj_title1"), desc: t("obj_desc1") },
                    { title: t("obj_title2"), desc: t("obj_desc2") },
                    { title: t("obj_title3"), desc: t("obj_desc3") },
                    { title: t("obj_title4"), desc: t("obj_desc4") },
                  ].map((obj, idx) => (
                    <div
                      key={idx}
                      className="group relative overflow-hidden p-4 rounded-xl bg-black/90 border border-white/15 flex items-start gap-3 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.05)] hover:border-white/30"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-400/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left z-20" />
                      
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 relative z-30" />
                      <div className="relative z-30">
                        <h4 className="text-xs font-title font-bold text-white uppercase">{obj.title}</h4>
                        <p className="text-xs text-zinc-400 font-body leading-snug">{obj.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* TAB 4: LO QUE NOS HACE ÚNICOS */}
              {activeTab === "unicos" && (
                <motion.div
                  key="unicos"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  {[
                    {
                      icon: <Film className="w-4 h-4 text-white" />,
                      title: t("unique_title1"),
                      desc: t("unique_desc1"),
                    },
                    {
                      icon: <Globe className="w-4 h-4 text-emerald-400" />,
                      title: t("unique_title2"),
                      desc: t("unique_desc2"),
                    },
                    {
                      icon: <Users className="w-4 h-4 text-zinc-300" />,
                      title: t("unique_title3"),
                      desc: t("unique_desc3"),
                    },
                  ].map((u, idx) => (
                    <div
                      key={idx}
                      className="group relative overflow-hidden p-4 rounded-xl bg-black/90 border border-white/15 space-y-2 text-center flex flex-col items-center justify-center transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.05)] hover:border-white/30"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-400/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left z-20" />
                      
                      <div className="relative z-30 p-2 rounded-lg bg-white/5 border border-white/10">{u.icon}</div>
                      <h4 className="relative z-30 text-xs font-title font-bold text-white uppercase">{u.title}</h4>
                      <p className="relative z-30 text-[11px] text-zinc-400 font-body leading-snug">{u.desc}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>


      </div>
    </section>
  );
}
