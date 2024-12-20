import { supabase } from '../lib/supabase';

/**
 * Extracts the file path from a Supabase storage URL
 */
export function getStoragePathFromUrl(url: string): string | null {
  try {
    const storageUrl = new URL(url);
    const pathMatch = storageUrl.pathname.match(/\/storage\/v1\/object\/public\/([^?]+)/);
    return pathMatch ? pathMatch[1] : null;
  } catch {
    return null;
  }
}

/**
 * Deletes multiple images from Supabase storage
 */
export async function deleteListingImages(images: string[]) {
  const deletePromises = images.map(async (url) => {
    const path = getStoragePathFromUrl(url);
    if (path) {
      const { error } = await supabase.storage
        .from('listings')
        .remove([path]);
      
      if (error) {
        console.error(`Failed to delete image ${path}:`, error);
      }
    }
  });

  await Promise.all(deletePromises);
}