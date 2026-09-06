"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  CheckCircle2,
  Lock,
  QrCode,
  ShieldCheck,
  ArrowRight,
  Copy,
} from "lucide-react";

export function GuestListSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    genrePreference: "Peak Time & Hard Techno",
    acceptTerms: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [memberId, setMemberId] = useState("");
  const [copiedPass, setCopiedPass] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.whatsapp) return;

    setIsSubmitting(true);
    // Simulate backend registration
    setTimeout(() => {
      const generatedId = `AET-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
      setMemberId(generatedId);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleCopyPass = () => {
    navigator.clipboard.writeText(
      `AETERNUM SOCIETY VIP PASS #${memberId} | Titular: ${formData.fullName}`
    );
    setCopiedPass(true);
    setTimeout(() => setCopiedPass(false), 2000);
  };

  return (
    <section id="guest-list" className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <div className="relative rounded-3xl bg-zinc-950 border border-white/15 p-6 sm:p-12 md:p-16 overflow-hidden shadow-2xl">
        {/* Glow ambient background inside card */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/[0.02] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
              <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
              <span>AETERNUM SOCIETY // ACCESO EXCLUSIVO</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-mono text-white tracking-tight uppercase leading-tight">
              ÚNETE A LA GUEST LIST
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
              Regístrate para recibir las coordenadas de nuestras locaciones secretas, acceso prioritario a la preventa de boletos, sets inéditos y beneficios exclusivos en todos los raves de Medellín.
            </p>

            <ul className="space-y-3 pt-2 text-xs sm:text-sm font-mono text-zinc-400">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Coordenadas GPS enviadas 2 horas antes de cada evento</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Descuento de hasta el 30% en Early Birds</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Acceso a grabaciones privadas y descargas de audio master</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Form or VIP Pass Result */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  onSubmit={handleSubmit}
                  className="space-y-4 bg-black/60 border border-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-md"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Valentina Ríos"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-zinc-900/90 border border-white/10 rounded-xl text-sm font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="tu.correo@ejemplo.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-zinc-900/90 border border-white/10 rounded-xl text-sm font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                      WhatsApp (con código de país) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+57 300 123 4567"
                      value={formData.whatsapp}
                      onChange={(e) =>
                        setFormData({ ...formData, whatsapp: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-zinc-900/90 border border-white/10 rounded-xl text-sm font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                      Subgénero Favorito
                    </label>
                    <select
                      value={formData.genrePreference}
                      onChange={(e) =>
                        setFormData({ ...formData, genrePreference: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-zinc-900/90 border border-white/10 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-white/40 transition-colors"
                    >
                      <option value="Peak Time & Hard Techno">Peak Time & Hard Techno</option>
                      <option value="Industrial & Acid">Industrial & Acid Techno</option>
                      <option value="Melodic & Hypnotic">Melodic & Hypnotic Techno</option>
                      <option value="Modular Live Sets">Modular & Experimental Live</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-xl bg-white text-black font-mono text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-zinc-200 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-white/10"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Generando Membresía...</span>
                        </>
                      ) : (
                        <>
                          <span>Registrarme en Aeternum Society</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-500 text-center">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Tus datos son 100% privados y confidenciales.</span>
                  </div>
                </motion.form>
              ) : (
                /* VIP Pass Card */
                <motion.div
                  key="pass"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-black/90 border border-emerald-500/40 p-6 sm:p-8 rounded-2xl space-y-6 shadow-2xl relative"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                        PASS VERIFICADO // AETERNUM SOCIETY
                      </span>
                      <h3 className="text-lg font-bold font-mono text-white">
                        {formData.fullName}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-white/20 bg-black">
                        <img
                          src="/images/logo.png"
                          alt="Aeternum"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                        <QrCode className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div className="space-y-1">
                      <span className="text-zinc-500 text-[10px]">MEMBER ID</span>
                      <p className="text-white font-bold tracking-wider">{memberId}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-zinc-500 text-[10px]">ESTADO</span>
                      <p className="text-emerald-400 font-bold">GUEST LIST ACTIVA</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-zinc-500 text-[10px]">WHATSAPP</span>
                      <p className="text-zinc-300">{formData.whatsapp}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-zinc-500 text-[10px]">PREFERENCIA</span>
                      <p className="text-zinc-300 truncate">{formData.genrePreference}</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-zinc-300 font-sans leading-relaxed">
                    Te hemos registrado con éxito. Recibirás vía WhatsApp las coordenadas del próximo rave 2 horas antes de la apertura de puertas.
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleCopyPass}
                      className="flex-1 py-3 px-4 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                    >
                      {copiedPass ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Pase Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copiar Mi Pase</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setIsSuccess(false)}
                      className="py-3 px-4 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white font-mono text-xs transition-colors"
                    >
                      Registrar otro
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
