import { useState } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import type { Database } from '../lib/database.types';

type ListingInsert = Database['public']['Tables']['listings']['Insert'];

export function useCreateListing() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createListing = async (data: Omit<ListingInsert, 'id' | 'created_at'>) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('listings')
        .insert([{
          ...data,
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      toast.success('Listing created successfully');
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create listing');
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { createListing, loading, error };
}