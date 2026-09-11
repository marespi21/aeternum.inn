"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addGalleryItem(formData: FormData) {
  const supabase = await createClient();
  const url = formData.get("url") as string;
  const itemType = formData.get("type") as string;
  
  if (!url) return { error: "URL es requerida" };

  const { error } = await supabase.from("gallery").insert([
    {
      url,
      type: itemType || "image",
      sort_order: 0,
    }
  ]);

  if (error) {
    console.error("Error inserting gallery item:", error);
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/galeria");
  return { success: true };
}

export async function deleteGalleryItem(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("gallery").delete().eq("id", id);

  if (error) {
    console.error("Error deleting gallery item:", error);
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/galeria");
  return { success: true };
}

export async function updateGalleryOrder(items: { id: string, sort_order: number }[]) {
  const supabase = await createClient();

  // Supabase doesn't have a simple batch update for different values per row without upsert.
  // Since we are only updating sort_order, doing Promise.all is fine for a small gallery.
  const promises = items.map(async (item) => {
    const { error } = await supabase.from("gallery").update({ sort_order: item.sort_order }).eq("id", item.id);
    if (error) {
      console.error("Error updating sort_order for id", item.id, error);
      throw new Error(error.message);
    }
  });

  await Promise.all(promises);

  revalidatePath("/");
  revalidatePath("/admin/galeria");
  return { success: true };
}
