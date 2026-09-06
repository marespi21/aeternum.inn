import { RadioTrackItem } from "@/types";

export const RADIO_TRACKS_DATA: RadioTrackItem[] = [
  {
    id: "stream-01",
    title: "Live Set #04 · Industrial Warehouse (Medellín)",
    dj: "Aeternum Radio Core",
    location: "Itagüí Underground, Colombia",
    duration: "LIVE",
    isLive: true,
    listenersCount: 342,
    audioUrl: "https://stream.zeno.fm/f3wvbbqmdg8uv", // Sample live techno radio stream
  },
  {
    id: "stream-02",
    title: "Deep Frequency Session #12",
    dj: "Julianna (Medellín)",
    location: "Studio Medellín",
    duration: "1:24:10",
    isLive: false,
    listenersCount: 180,
  },
  {
    id: "stream-03",
    title: "Hypnotic Rhythms Vol. 8",
    dj: "Retrograde",
    location: "Helipuerto Live",
    duration: "58:45",
    isLive: false,
    listenersCount: 215,
  },
];
