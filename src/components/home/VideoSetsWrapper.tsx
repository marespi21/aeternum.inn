import React from "react";
import { createClient } from "@/utils/supabase/server";
import { VideoSetsSection } from "./VideoSetsSection";

export async function VideoSetsWrapper({ isHomePage = true }: { isHomePage?: boolean }) {
  const supabase = await createClient();

  const { data: videos } = await supabase
    .from("videos")
    .select("*")
    .order("created_at", { ascending: false });

  // Si no hay videos, usar array vacío
  const safeVideos = videos || [];

  return <VideoSetsSection initialVideos={safeVideos} isHomePage={isHomePage} />;
}
