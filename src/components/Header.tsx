import React, { useState } from 'react';
import { UtensilsCrossed, Menu, X } from 'lucide-react';
import { PhoneNumber } from './ui/PhoneNumber';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ['Inventory', 'Features', 'Process'];

  return (
    <div className="bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
              VesselsOps
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
              >
                {item}
              </a>
            ))}
            <PhoneNumber />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <PhoneNumber />
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}