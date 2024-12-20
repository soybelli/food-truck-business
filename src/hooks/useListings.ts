import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Listing = Database['public']['Tables']['listings']['Row'];

export function useListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .eq('status', 'available')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Ensure all images URLs are valid
        const listingsWithValidImages = data?.map(listing => ({
          ...listing,
          images: listing.images.filter(url => url && url.startsWith('http'))
        })) || [];

        setListings(listingsWithValidImages);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch listings'));
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  return { listings, loading, error };
}