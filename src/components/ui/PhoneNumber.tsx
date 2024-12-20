import React from 'react';
import { Phone } from 'lucide-react';

export function PhoneNumber() {
  return (
    <a 
      href="tel:+13054821057"
      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
    >
      <Phone className="w-4 h-4" />
      <span className="font-medium">(305) 482-1057</span>
    </a>
  );
}