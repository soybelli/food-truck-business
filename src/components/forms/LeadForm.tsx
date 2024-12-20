import React from 'react';
import { FormField } from '../ui/FormField';
import { useLeadForm } from '../../hooks/useLeadForm';
import type { LeadFormProps } from '../../types/lead';

export function LeadForm({ onClose, listingId, leadType, submitText }: LeadFormProps) {
  const { formData, setFormData, loading, handleSubmit } = useLeadForm(leadType, onClose);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(listingId);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField
        label="Full Name"
        required
        value={formData.full_name}
        onChange={(value) => setFormData(prev => ({ ...prev, full_name: value }))}
      />
      
      <FormField
        label="Phone Number"
        type="tel"
        required
        value={formData.phone_number}
        onChange={(value) => setFormData(prev => ({ ...prev, phone_number: value }))}
      />
      
      <FormField
        label="Email"
        type="email"
        value={formData.email}
        onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
      />
      
      <FormField
        label="Message (Optional)"
        type="textarea"
        value={formData.message}
        onChange={(value) => setFormData(prev => ({ ...prev, message: value }))}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : submitText || 'Request Information'}
      </button>

      <p className="text-sm text-gray-500 text-center">
        We respect your privacy and will never share your information.
      </p>
    </form>
  );
}