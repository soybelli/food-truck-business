import React from 'react';
import { X } from 'lucide-react';
import { LeadForm } from './forms/LeadForm';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  truckId?: string;
  leadType?: 'price_request' | 'call_back';
}

export function LeadModal({ isOpen, onClose, truckId, leadType = 'price_request' }: LeadModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg w-full max-w-md p-6 mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-bold mb-2">Request Information</h3>
        <p className="text-gray-600 mb-6">Our team will contact you shortly to discuss your requirements.</p>
        
        <LeadForm 
          onClose={onClose}
          listingId={truckId}
          leadType={leadType}
          submitText="Request Information"
        />
      </div>
    </div>
  );
}