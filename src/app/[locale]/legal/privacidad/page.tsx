import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: 'Política de Privacidad | AETERNUM',
};

export default function PrivacyPage() {
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
        <Shield className="w-6 h-6" />
        <span className="text-sm font-mono tracking-widest uppercase font-bold">AETERNUM SOCIETY</span>
      </div>

      <h1 className="text-3xl sm:text-5xl font-black font-title uppercase tracking-tight text-white mb-12">
        Política de Privacidad
      </h1>

      <div className="space-y-8 font-sans text-zinc-300 text-sm leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-mono text-white uppercase">1. Recopilación de Información</h2>
          <p>
            En AETERNUM respetamos su privacidad. Recopilamos información personal únicamente cuando usted se registra en nuestra plataforma, adquiere boletos o se suscribe a nuestro boletín. Esta información incluye, pero no se limita a: nombre, correo electrónico, teléfono y datos demográficos básicos.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold font-mono text-white uppercase">2. Uso de los Datos</h2>
          <p>
            La información recopilada es utilizada de manera exclusiva para los siguientes fines:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-400">
            <li>Emisión y envío seguro de sus códigos de acceso (Tickets QR).</li>
            <li>Notificación sobre próximos eventos, promociones y lanzamientos de artistas locales.</li>
            <li>Mejora de la experiencia de usuario dentro de nuestra plataforma web.</li>
            <li>Cumplimiento de normativas legales y fiscales aplicables en Colombia.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold font-mono text-white uppercase">3. Protección y Compartición de Datos</h2>
          <p>
            Sus datos están encriptados y protegidos bajo los más altos estándares de seguridad web. <strong>AETERNUM no vende, alquila ni comercializa su información personal a terceros.</strong>
            Solo compartiremos datos con proveedores de servicios estrictamente necesarios (como pasarelas de pago) que operan bajo acuerdos de confidencialidad.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold font-mono text-white uppercase">4. Sus Derechos</h2>
          <p>
            De acuerdo a la Ley Estatutaria 1581 de 2012 (Protección de Datos Personales en Colombia), usted tiene derecho a conocer, actualizar, rectificar y solicitar la eliminación de sus datos de nuestras bases de datos en cualquier momento contactando a nuestro equipo de soporte.
          </p>
        </section>
        
        <p className="text-xs text-zinc-500 font-mono mt-12 pt-8 border-t border-white/10">
          Última actualización: Septiembre 2026. Medellín, Colombia.
        </p>
      </div>
    </div>
  );
}
