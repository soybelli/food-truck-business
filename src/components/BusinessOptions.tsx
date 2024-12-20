import React, { useState } from 'react';
import { Store, Truck, DollarSign, ChevronRight } from 'lucide-react';
import { LeadModal } from './LeadModal';

const options = [
  {
    icon: Store,
    title: 'Buy',
    description: 'Purchase your dream food truck outright with flexible payment options',
    bgColor: 'bg-green-50',
    hoverBg: 'hover:bg-green-50/50',
    iconColor: 'text-green-600',
    textColor: 'text-green-600',
    iconBg: 'bg-green-100'
  },
  {
    icon: Truck,
    title: 'Rent',
    description: 'Test the waters with our rental program - perfect for events or seasonal business',
    bgColor: 'bg-blue-50',
    hoverBg: 'hover:bg-blue-50/50',
    iconColor: 'text-blue-600',
    textColor: 'text-blue-600',
    iconBg: 'bg-blue-100'
  },
  {
    icon: DollarSign,
    title: 'Get Funded',
    description: 'Access financing options to start your food business with minimal upfront investment',
    bgColor: 'bg-purple-50',
    hoverBg: 'hover:bg-purple-50/50',
    iconColor: 'text-purple-600',
    textColor: 'text-purple-600',
    iconBg: 'bg-purple-100'
  }
];

export function BusinessOptions() {
  const [showLeadModal, setShowLeadModal] = useState(false);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Path to Success
          </h2>
          <p className="text-lg text-gray-600">
            Multiple ways to start your food business - pick the option that works best for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className={`group rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${option.hoverBg}`}
            >
              <div className="p-8">
                <div className={`w-16 h-16 ${option.iconBg} rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  <option.icon className={`w-8 h-8 ${option.iconColor}`} />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{option.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{option.description}</p>
                
                <button 
                  onClick={() => setShowLeadModal(true)}
                  className={`inline-flex items-center ${option.textColor} font-medium hover:underline`}
                >
                  Learn More
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <LeadModal 
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        leadType="call_back"
      />
    </section>
  );
}