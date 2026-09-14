"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from "react";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const nextLocale = locale === "es" ? "en" : "es";
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white font-mono text-xs tracking-widest hover:bg-white/10 transition-colors"
    >
      <Globe className="w-3.5 h-3.5" />
      <span>{locale === "es" ? "EN" : "ES"}</span>
    </button>
  );
}
