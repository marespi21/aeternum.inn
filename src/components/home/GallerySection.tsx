import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import AccordionGallery from "@/components/ui/AccordionGallery";

export async function GallerySection() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("gallery")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(5); // The accordion looks best with ~5 items

  const placeholderItems = [
    { id: "1", type: "image", url: "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=800&auto=format&fit=crop" },
    { id: "2", type: "image", url: "https://images.unsplash.com/photo-1558317751-bc3ed6eb6d22?q=80&w=800&auto=format&fit=crop" },
    { id: "3", type: "image", url: "https://images.unsplash.com/photo-1470229722913-7c092bce8e4e?q=80&w=800&auto=format&fit=crop" },
    { id: "4", type: "image", url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop" },
    { id: "5", type: "image", url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop" }
  ];

  const dbItems = items && items.length > 0 ? items : placeholderItems;

  // Map the database/placeholder items to the format expected by AccordionGallery
  const mappedItems = dbItems.map((item, index) => ({
    image: item.url,
    label: `AETERNUM // ${index + 1}`,
    type: item.type
  }));

  return (
    <section id="experiencia" className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
            <Sparkles className="w-4 h-4" />
            NUESTRA ESENCIA // ARCHIVO VISUAL
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-mono uppercase tracking-tight text-white">
            LA EXPERIENCIA
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm font-sans text-zinc-400 leading-relaxed">
          Recuerdos de nuestras ediciones pasadas. La cultura underground viva en cada rincón.
        </p>
      </div>

      {/* Accordion Gallery */}
      <div className="w-full mt-8">
        <AccordionGallery
          items={mappedItems}
          defaultIndex={Math.floor(mappedItems.length / 2)}
          expandRatio={0.52}
          trigger="hover"
          accentColor="#10b981"
          overlayColor="#050505"
          textColor="#ffffff"
          grayscale
          showLabels
          duration={0.5}
          ease="power3.out"
          parallax={0.5}
          tilt={10}
          stagger={0.05}
          height={550}
          gap={12}
          radius={20}
          orientation="horizontal"
        />
      </div>

      {/* View All Button */}
      <div className="mt-16 flex justify-center relative z-10">
        <Link
          href="/galeria"
          className="inline-flex px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-widest hover:border-emerald-400 hover:text-emerald-400 transition-all items-center justify-center gap-2 group"
        >
          <span>Ver toda la galería</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
