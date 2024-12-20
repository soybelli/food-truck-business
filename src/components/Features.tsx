import React from 'react';
import { ChefHat, DollarSign, Truck, Shield, Wrench, PaintBucket } from 'lucide-react';

const features = [
  {
    icon: ChefHat,
    title: 'State-of-the-Art Kitchen',
    description: 'Commercial-grade equipment including grill, fryer, refrigerator, freezer, and AC'
  },
  {
    icon: Truck,
    title: 'Multiple Size Options',
    description: 'Food trailers from 8.5 x 24 to 8.5 x 28, and food trucks sized 8.5 x 24'
  },
  {
    icon: Wrench,
    title: 'Spacious Work Area',
    description: 'Optimized layout for maximum efficiency and workflow'
  },
  {
    icon: Shield,
    title: 'Fully Code Compliant',
    description: 'Ready for operation, just add permits and safety equipment'
  },
  {
    icon: PaintBucket,
    title: 'Branding Ready',
    description: 'Premium exterior perfect for your custom graphics and signage'
  },
  {
    icon: DollarSign,
    title: 'Flexible Options',
    description: 'Choose to buy, rent, or get funding assistance'
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-gray-600">
            Our premium food trucks and trailers come fully equipped and ready for your culinary adventure
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}