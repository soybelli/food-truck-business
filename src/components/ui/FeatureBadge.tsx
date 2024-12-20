import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureBadgeProps {
  icon: LucideIcon;
  text: string;
}

export function FeatureBadge({ icon: Icon, text }: FeatureBadgeProps) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 bg-white px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg shadow-md border border-gray-100">
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
      <span className="text-xs sm:text-sm font-medium text-gray-800 whitespace-normal sm:whitespace-nowrap">
        {text}
      </span>
    </div>
  );
}