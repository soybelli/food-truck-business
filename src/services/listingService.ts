import { supabase } from '../lib/supabase';
import { deleteListingImages } from '../utils/storage';

export async function deleteListingWithLeads(listingId: string) {
  // Start a Supabase transaction
  const { data, error: fetchError } = await supabase
    .from('listings')
    .select('images')
    .eq('id', listingId)
    .single();

  if (fetchError) throw fetchError;

  // First, delete all associated leads
  const { error: leadsError } = await supabase
    .from('leads')
    .delete()
    .eq('listing_id', listingId);

  if (leadsError) throw leadsError;

  // Then, delete the listing
  const { error: listingError } = await supabase
    .from('listings')
    .delete()
    .eq('id', listingId);

  if (listingError) throw listingError;

  // Finally, delete associated images from storage
  if (data?.images?.length) {
    await deleteListingImages(data.images);
  }
}