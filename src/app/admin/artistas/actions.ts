"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addArtist(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const image_url = formData.get("image_url") as string;
  const youtube_url = formData.get("youtube_url") as string;
  const soundcloud_url = formData.get("soundcloud_url") as string;
  const instagram_url = formData.get("instagram_url") as string;

  if (!name || !image_url) {
    throw new Error("Nombre e imagen son requeridos");
  }

  const { error } = await supabase.from("artists").insert({
    name,
    bio,
    image_url,
    youtube_url,
    soundcloud_url,
    instagram_url,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin/artistas");
}

export async function deleteArtist(id: string) {
  const supabase = await createClient();

  // artist_gallery will cascade delete automatically due to ON DELETE CASCADE
  const { error } = await supabase.from("artists").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin/artistas");
}

export async function addArtistGalleryImage(artistId: string, url: string, type: 'image' | 'video' = 'image') {
  const supabase = await createClient();

  const { error } = await supabase.from("artist_gallery").insert({
    artist_id: artistId,
    url,
    type,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/artistas/${artistId}`);
  revalidatePath(`/admin/artistas/${artistId}`);
}

export async function deleteArtistGalleryImage(imageId: string, artistId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("artist_gallery").delete().eq("id", imageId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/artistas/${artistId}`);
  revalidatePath(`/admin/artistas/${artistId}`);
}
