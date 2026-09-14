"use client";

import { useState } from "react";
import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { ZoomIn, ZoomOut, Download } from "lucide-react";

interface ReceiptViewerProps {
  url?: string;
  isManual?: boolean;
  manualInfo?: string;
}

export function ReceiptViewer({ url, isManual, manualInfo }: ReceiptViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);

  if (isManual) {
    return (
      <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-sm bg-black">
        {manualInfo || "Venta Manual"}
      </div>
    );
  }

  if (!url) {
    return (
      <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-sm bg-black">
        Sin imagen
      </div>
    );
  }

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.5, 1));
  const handleResetZoom = () => setScale(1);

  return (
    <>
      <div
        className="relative w-full h-full bg-black group cursor-pointer overflow-hidden"
        onClick={() => {
          setIsOpen(true);
          setScale(1);
        }}
      >
        <Image
          src={url}
          alt="Comprobante de pago"
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
          <ZoomIn className="text-white w-8 h-8" />
          <span className="text-white font-mono text-xs font-bold uppercase tracking-widest">Ampliar</span>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setTimeout(() => setScale(1), 300);
        }}
        title="Comprobante de Pago"
        maxWidth="max-w-5xl"
      >
        <div className="flex flex-col gap-4">
          {/* Controles */}
          <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                disabled={scale <= 1}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 transition-colors text-white"
                title="Alejar"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="font-mono text-sm text-zinc-400 w-16 text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={scale >= 4}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 transition-colors text-white"
                title="Acercar"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleResetZoom}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-mono text-sm transition-colors"
              >
                Restaurar
              </button>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/20 font-mono text-sm transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Original
              </a>
            </div>
          </div>

          {/* Área de la imagen con zoom manual (scroll para mover) */}
          <div className="relative w-full h-[65vh] bg-black/50 rounded-xl border border-white/10 overflow-auto custom-scrollbar flex items-center justify-center">
            <div 
              className="relative transition-transform duration-200 origin-center"
              style={{
                width: "100%",
                height: "100%",
                transform: \`scale(\${scale})\`,
                cursor: scale > 1 ? "grab" : "default",
              }}
            >
              <Image
                src={url}
                alt="Comprobante Ampliado"
                fill
                className="object-contain"
                unoptimized // Mejor para imágenes originales en modal para no perder calidad si es grande
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
