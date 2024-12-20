import { supabase } from '../lib/supabase';

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(emailData: EmailData) {
  const { data, error } = await supabase.functions.invoke('send-lead-email', {
    body: JSON.stringify(emailData),
  });

  if (error) throw error;
  return data;
}

export function generateLeadEmailContent(leadData: any) {
  const subject = `New Lead: ${leadData.lead_type === 'price_request' ? 'Price Request' : 'Call Back Request'}`;
  
  const html = `
    <h2>New Lead Submission</h2>
    <p><strong>Type:</strong> ${leadData.lead_type}</p>
    <p><strong>Name:</strong> ${leadData.full_name}</p>
    <p><strong>Phone:</strong> ${leadData.phone_number}</p>
    ${leadData.email ? `<p><strong>Email:</strong> ${leadData.email}</p>` : ''}
    ${leadData.message ? `<p><strong>Message:</strong> ${leadData.message}</p>` : ''}
    ${leadData.listing_id ? `<p><strong>Listing ID:</strong> ${leadData.listing_id}</p>` : ''}
    <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
  `;

  return {
    to: 'your-email@example.com', // Replace with your email
    subject,
    html
  };
}