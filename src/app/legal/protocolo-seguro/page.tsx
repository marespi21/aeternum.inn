import React from "react";
import Link from "next/link";
import { ArrowLeft, HeartPulse } from "lucide-react";

export const metadata = {
  title: 'Protocolo Rave Seguro | AETERNUM',
};

export default function ProtocolPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f4f4f5] pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        VOLVER AL INICIO
      </Link>

      <div className="flex items-center gap-3 mb-6 text-red-500">
        <HeartPulse className="w-6 h-6" />
        <span className="text-sm font-mono tracking-widest uppercase font-bold">CULTURA RAVE</span>
      </div>

      <h1 className="text-3xl sm:text-5xl font-black font-title uppercase tracking-tight text-white mb-12">
        Protocolo Rave Seguro
      </h1>

      <div className="space-y-8 font-sans text-zinc-300 text-sm leading-relaxed">
        
        <p className="text-base sm:text-lg text-zinc-200 border-l-2 border-emerald-500 pl-4 py-1 italic">
          "El Dancefloor es un espacio sagrado. En Aeternum priorizamos el respeto, la libertad y el bienestar de cada individuo."
        </p>

        <section className="space-y-4">
          <h2 className="text-xl font-bold font-mono text-white uppercase">1. Cero Tolerancia al Acoso</h2>
          <p>
            AETERNUM es un espacio seguro. No toleramos ninguna forma de acoso, discriminación, racismo, homofobia, transfobia o violencia. Si te sientes incómodo, acosado, o ves que alguien necesita ayuda, acércate inmediatamente a nuestro personal de logística o al equipo vestido con camisetas de "STAFF". El agresor será retirado del evento de forma inmediata.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold font-mono text-white uppercase">2. Consumo Responsable y Consciencia</h2>
          <p>
            Baila seguro. Conoce tus límites y cuida tu cuerpo, la prioridad es vivir la música desde la consciencia.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-400">
            <li>Nuestros eventos siempre cuentan con Puntos de Hidratación.</li>
            <li>Recomendamos hacer pausas y salir a respirar a nuestras zonas de chill-out.</li>
            <li>Promovemos un entorno sano y legal. No apoyamos, incentivamos ni avalamos el consumo de sustancias psicoactivas o estupefacientes dentro de nuestras experiencias.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold font-mono text-white uppercase">3. Espacio Sin Celulares en la Pista (Opcional)</h2>
          <p>
            Promovemos vivir el presente. Aunque nuestra productora realiza las filmaciones oficiales, invitamos a nuestra comunidad a desconectarse de las pantallas y conectar con la música. Intenta reducir el uso del flash en la pista para no interrumpir el viaje de los demás ni cegar al artista.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold font-mono text-white uppercase">4. Cuidado del Entorno</h2>
          <p>
            Transformamos espacios patrimoniales y naturales. El respeto al lugar que nos acoge es fundamental. Utiliza los puntos ecológicos y no arrojes colillas o basura al suelo. La cultura techno es una cultura consciente.
          </p>
        </section>
        
        <div className="mt-12 p-6 bg-zinc-900 border border-white/10 rounded-xl text-center space-y-3">
          <h3 className="font-mono text-white uppercase font-bold">Línea de Vida y Soporte</h3>
          <p className="text-xs text-zinc-400">Si en cualquier momento de un evento necesitas apoyo vital, comunícate de inmediato con nuestro personal o acude al punto médico demarcado con una cruz verde brillante.</p>
        </div>

      </div>
    </div>
  );
}
