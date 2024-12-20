import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ProcessStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ProcessStep({ icon: Icon, title, description }: ProcessStepProps) {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-10 h-10 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed max-w-sm">{description}</p>
    </div>
  );
}