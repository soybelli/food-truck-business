import React from 'react';
import { X, PhoneCall } from 'lucide-react';
import { LeadForm } from './forms/LeadForm';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-md p-6 mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <PhoneCall className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Request a Call</h3>
            <p className="text-gray-500">We'll get back to you shortly</p>
          </div>
        </div>

        <LeadForm 
          onClose={onClose}
          leadType="call_back"
        />
      </div>
    </div>
  );
}