import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ArtistForm } from "./ArtistForm";

export default function NuevoArtistaPage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <Link
          href="/admin/artistas"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-mono text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Artistas</span>
        </Link>
        <h1 className="text-3xl font-black font-mono uppercase tracking-tight text-white mb-2">
          Añadir Nuevo Artista
        </h1>
        <p className="text-zinc-400 font-sans text-sm">
          Completa el perfil del DJ. Luego podrás añadir fotos exclusivas a su galería desde la página de edición.
        </p>
      </div>

      <ArtistForm />
    </div>
  );
}
