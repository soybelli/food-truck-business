import React from 'react';
import { FeatureImage } from './ui/FeatureImage';

const features = [
  {
    image: 'https://nhcvbybrekeljwjewkxo.supabase.co/storage/v1/object/public/listings/food-1.png?t=2024-12-17T19%3A44%3A17.181Z',
    title: 'Exterior Design',
    description: 'Professional-grade exterior finish with durable construction'
  },
  {
    image: 'https://nhcvbybrekeljwjewkxo.supabase.co/storage/v1/object/public/listings/food-2.png?t=2024-12-17T19%3A44%3A23.171Z',
    title: 'Interior Setup',
    description: 'Fully equipped kitchen with commercial-grade appliances'
  },
  {
    image: 'https://nhcvbybrekeljwjewkxo.supabase.co/storage/v1/object/public/listings/food-3.png?t=2024-12-17T19%3A44%3A27.805Z',
    title: 'Security Features',
    description: 'Enhanced safety measures and secure storage solutions'
  }
];

export function TrailerFeatures() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Premium Quality Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureImage key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}