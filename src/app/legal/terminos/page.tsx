import React from "react";
import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";

export const metadata = {
  title: 'Términos y Condiciones | AETERNUM',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f4f4f5] pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        VOLVER AL INICIO
      </Link>

      <div className="flex items-center gap-3 mb-6 text-emerald-400">
        <Scale className="w-6 h-6" />
        <span className="text-sm font-mono tracking-widest uppercase font-bold">AETERNUM SOCIETY</span>
      </div>

      <h1 className="text-3xl sm:text-5xl font-black font-title uppercase tracking-tight text-white mb-12">
        Términos y Condiciones
      </h1>

      <div className="space-y-8 font-sans text-zinc-300 text-sm leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-mono text-white uppercase">1. Generalidades</h2>
          <p>
            Al acceder y utilizar la plataforma de AETERNUM, así como al adquirir boletos para nuestros eventos, el usuario acepta de manera expresa los presentes Términos y Condiciones. AETERNUM se reserva el derecho de modificar estos términos en cualquier momento, siendo responsabilidad del usuario revisarlos periódicamente.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold font-mono text-white uppercase">2. Venta de Boletos y Accesos</h2>
          <p>
            Todos los boletos son personales e intransferibles a menos que se indique lo contrario. El código QR emitido al momento de la compra es único y de un solo uso. La reventa de boletos está estrictamente prohibida.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-400">
            <li>No se realizarán devoluciones ni cambios una vez finalizada la compra, salvo por cancelación oficial del evento.</li>
            <li>En caso de reprogramación, el boleto será válido para la nueva fecha asignada.</li>
            <li>Nos reservamos el derecho de admisión y permanencia (NRDA).</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold font-mono text-white uppercase">3. Derechos de Imagen (Filmación y Fotografía)</h2>
          <p>
            Al ingresar a un evento de AETERNUM, usted consiente ser fotografiado, filmado y/o grabado. Estos registros audiovisuales podrán ser utilizados para fines promocionales, comerciales y transmisiones en vivo (como nuestros Video Sets) sin compensación económica para los asistentes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold font-mono text-white uppercase">4. Responsabilidad</h2>
          <p>
            AETERNUM no se hace responsable por la pérdida, robo o daño de objetos personales durante los eventos. El usuario asume los riesgos inherentes a la asistencia a eventos masivos y de entretenimiento nocturno.
          </p>
        </section>
        
        <p className="text-xs text-zinc-500 font-mono mt-12 pt-8 border-t border-white/10">
          Última actualización: Septiembre 2026. Medellín, Colombia.
        </p>
      </div>
    </div>
  );
}
