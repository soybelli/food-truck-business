import React, { useState } from 'react';
import { ChevronRight, Truck, Shield, ClipboardCheck, Box } from 'lucide-react';
import { CallbackModal } from './CallbackModal';
import { FeatureBadge } from './ui/FeatureBadge';

const features = [
  { icon: Box, text: 'Fully equipped, ready to go' },
  { icon: Truck, text: 'Nationwide service' },
  { icon: Shield, text: 'Quality Assured' },
  { icon: ClipboardCheck, text: 'Certified Inspection' },
];

export function Hero() {
  const [showCallbackModal, setShowCallbackModal] = useState(false);

  return (
    <div className="relative py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-left space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
              <span className="text-blue-600 font-medium">Start Your Food Business Today</span>
              <ChevronRight className="w-4 h-4 text-blue-600" />
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              Your Food Truck <br />
              <span className="text-blue-600">Business Dreams</span><br />
              Start Here
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl">
              Get everything you need to launch your food business: premium trucks & trailers, 
              flexible financing, and expert guidance to turn your culinary dreams into reality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => setShowCallbackModal(true)}
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Your Journey
              </button>
              <a
                href="#inventory"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-200 text-gray-700 rounded-full text-lg font-medium hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
              >
                View Inventory
              </a>
            </div>

            {/* Feature Badges for Mobile */}
            <div className="grid grid-cols-2 gap-3 lg:hidden pt-4">
              {features.map((feature, index) => (
                <FeatureBadge key={index} {...feature} />
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-[4/3]">
              <img
                src="https://nhcvbybrekeljwjewkxo.supabase.co/storage/v1/object/public/listings/vessel-1.jpg"
                alt="Modern Food Truck"
                className="rounded-2xl shadow-2xl object-cover w-full h-full"
              />
              
              {/* Feature Badges for Desktop */}
              <div className="absolute -bottom-8 left-0 right-0 flex flex-wrap justify-center gap-3">
                {features.map((feature, index) => (
                  <FeatureBadge key={index} {...feature} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CallbackModal 
        isOpen={showCallbackModal} 
        onClose={() => setShowCallbackModal(false)} 
      />
    </div>
  );
}