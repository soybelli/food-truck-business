import React from 'react';
import { Search, PhoneCall, ClipboardCheck, Truck } from 'lucide-react';
import { ProcessStep } from './ui/ProcessStep';
import { processSteps } from '../constants/process';

export function Process() {
  return (
    <section id="process" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Is The Buying Process?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <ProcessStep key={index} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}