import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeBanner } from "@/components/home/MarqueeBanner";
import { EventsSection } from "@/components/home/EventsSection";
import { VideoSetsWrapper } from "@/components/home/VideoSetsWrapper";
import { ManifestoSection } from "@/components/home/ManifestoSection";
import { GuestListSection } from "@/components/home/GuestListSection";
import { Footer } from "@/components/layout/Footer";
import { RadioBar } from "@/components/layout/RadioBar";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: tracks } = await supabase
    .from("audio_tracks")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  const currentTrack = tracks?.[0];

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f4f4f5] flex flex-col selection:bg-white selection:text-black">
      {/* Top Floating Glassmorphism Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <EventsSection />
        <VideoSetsWrapper />
        <ManifestoSection />
        <GuestListSection />
      </main>

      {/* Footer & Social Hub */}
      <Footer />

      {/* Global Persistent Audio Radio Bar */}
      <RadioBar track={currentTrack} />
    </div>
  );
}
