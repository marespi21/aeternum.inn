import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeBanner } from "@/components/home/MarqueeBanner";
import { EventsSection } from "@/components/home/EventsSection";
import { VideoSetsWrapper } from "@/components/home/VideoSetsWrapper";
import { GallerySection } from "@/components/home/GallerySection";
import { ArtistsSection } from "@/components/home/ArtistsSection";
import { ManifestoSection } from "@/components/home/ManifestoSection";
import { GuestListSection } from "@/components/home/GuestListSection";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f4f4f5] flex flex-col selection:bg-white selection:text-black">
      {/* Main Sections */}
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <EventsSection />
        <VideoSetsWrapper />
        <ArtistsSection />
        <GallerySection />
        <ManifestoSection />
        <GuestListSection />
      </main>

      {/* Footer & Social Hub */}
      <Footer />
    </div>
  );
}
