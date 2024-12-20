import { supabase } from '../lib/supabase';
import type { LeadFormData } from '../types/lead';

export async function createLead(data: LeadFormData) {
  const leadData = {
    full_name: data.full_name,
    phone_number: data.phone_number,
    email: data.email,
    message: data.message,
    created_at: new Date().toISOString()
  };

  // Only include listing_id for price requests
  if (data.lead_type === 'price_request' && data.listing_id) {
    Object.assign(leadData, { listing_id: data.listing_id });
  }

  const { error } = await supabase
    .from('leads')
    .insert([leadData]);

  if (error) throw error;
}