export type LeadType = 'price_request' | 'call_back';

export interface LeadFormData {
  full_name: string;
  phone_number: string;
  email: string;
  message: string;
  lead_type: LeadType;
  listing_id?: string; // Optional - only for price requests
}

export interface LeadFormProps {
  onClose?: () => void;
  listingId?: string;
  leadType: LeadType;
  submitText?: string;
}