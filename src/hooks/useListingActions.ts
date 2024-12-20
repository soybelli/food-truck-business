import { useState } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import type { Database } from '../lib/database.types';
import { deleteListingImages } from '../utils/storage';
import { deleteListingWithLeads } from '../services/listingService';

type Listing = Database['public']['Tables']['listings']['Row'];
type ListingUpdate = Database['public']['Tables']['listings']['Update'];

export function useListingActions() {
  const [loading, setLoading] = useState(false);

  const deleteListing = async (id: string) => {
    setLoading(true);
    try {
      await deleteListingWithLeads(id);
      toast.success('Listing deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast.error('Failed to delete listing');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateListing = async (id: string, data: ListingUpdate) => {
    setLoading(true);
    try {
      // Get the current listing to compare images
      const { data: currentListing, error: fetchError } = await supabase
        .from('listings')
        .select('images')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // Find images that were removed
      const removedImages = currentListing?.images?.filter(
        img => !data.images?.includes(img)
      ) || [];

      // Update the listing
      const { error: updateError } = await supabase
        .from('listings')
        .update(data)
        .eq('id', id);

      if (updateError) throw updateError;

      // Delete removed images from storage
      if (removedImages.length) {
        await deleteListingImages(removedImages);
      }

      toast.success('Listing updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating listing:', error);
      toast.error('Failed to update listing');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteListing,
    updateListing,
    loading
  };
}