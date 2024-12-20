import React from 'react';
import { PhoneCall } from 'lucide-react';
import { LeadForm } from './forms/LeadForm';

export function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let Us Call You
          </h2>
          <p className="text-lg text-blue-100">
            Have questions about our food trucks? Leave your details, and our experts will contact you shortly.
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <PhoneCall className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <LeadForm leadType="call_back" />
        </div>
      </div>
    </section>
  );
}