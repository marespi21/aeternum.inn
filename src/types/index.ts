export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  fullDate: string;
  time: string;
  location: string;
  locationDetails: string;
  lineup: string[];
  flyerUrl: string;
  price: string;
  status: "ACTIVO" | "SOLD_OUT" | "GUESTLIST_ABIERTA" | "ULTIMOS_CUPOS";
  genres: string[];
  description: string;
  whatsappMessage: string;
  capacity: string;
}

export interface VideoSetItem {
  id: string;
  title: string;
  dj: string;
  location: string;
  locationType: string;
  duration: string;
  releaseDate: string;
  views: string;
  coverUrl: string;
  youtubeId: string;
  youtubeUrl: string;
  soundcloudUrl?: string;
  description: string;
  bpm: number;
  genres: string[];
  category: "CAPITULOS" | "BOSQUE" | "LIVE_SETS";
  chapterNumber?: number;
}

export interface RadioTrackItem {
  id: string;
  title: string;
  dj: string;
  location: string;
  duration: string;
  audioUrl?: string;
  isLive: boolean;
  listenersCount: number;
}

export interface GuestListSubmission {
  fullName: string;
  email: string;
  whatsapp: string;
  genrePreference?: string;
  acceptTerms: boolean;
}
