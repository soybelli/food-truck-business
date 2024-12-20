import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';
import { FormField } from '../ui/FormField';
import { trackFormSubmission } from '../../utils/analytics';

interface FormData {
  full_name: string;
  phone_number: string;
  email: string;
  message: string;
}

export function CallForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    phone_number: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('leads')
        .insert([{
          ...formData,
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      // Track form submission
      trackFormSubmission(
        'call_form',
        'lead_capture',
        'call_back'
      );

      toast.success('Thank you! We will contact you shortly.');
      setFormData({
        full_name: '',
        phone_number: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        {loading ? 'Submitting...' : 'Request a Call Back'}
      </button>

      <p className="text-sm text-gray-500 text-center">
        We respect your privacy and will never share your information.
      </p>
    </form>
  );
}