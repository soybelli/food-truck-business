import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Lead = Database['public']['Tables']['leads']['Row'];

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const { data, error } = await supabase
          .from('leads')
          .select(`
            *,
            listings (
              title,
              id
            )
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setLeads(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch leads'));
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, []);

  return { leads, loading, error };
}