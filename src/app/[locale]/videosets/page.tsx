import React from "react";
import { Footer } from "@/components/layout/Footer";
import { VideoSetsWrapper } from "@/components/home/VideoSetsWrapper";

export default function VideoSetsPage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f4f4f5] flex flex-col pt-24 selection:bg-white selection:text-black">
      <main className="flex-1 flex flex-col">
        <VideoSetsWrapper isHomePage={false} />
      </main>
      <Footer />
    </div>
  );
}
