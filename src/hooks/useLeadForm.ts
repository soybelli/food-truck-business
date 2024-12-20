import { useState } from 'react';
import toast from 'react-hot-toast';
import type { LeadFormData, LeadType } from '../types/lead';
import { createLead } from '../services/leadService';
import { trackFormSubmission } from '../utils/analytics';

const initialFormData = {
  full_name: '',
  phone_number: '',
  email: '',
  message: ''
};

export function useLeadForm(leadType: LeadType, onClose?: () => void) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (listingId?: string) => {
    setLoading(true);

    try {
      await createLead({
        ...formData,
        lead_type: leadType,
        listing_id: listingId,
        message: `[${leadType}] ${formData.message || ''}`.trim()
      });

      // Track form submission
      trackFormSubmission(
        'lead_form',
        'lead_capture',
        leadType,
        listingId
      );

      toast.success('Thank you! We will contact you shortly.');
      setFormData(initialFormData);
      onClose?.();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    handleSubmit
  };
}