import React from 'react';
import { ArrowRight } from 'lucide-react';
import { trackClick } from '../../utils/analytics';

interface AnnouncementButtonProps {
  visible: boolean;
}

export function AnnouncementButton({ visible }: AnnouncementButtonProps) {
  const handleClick = () => {
    trackClick(
      'ulysses-click',
      'announcement_nav_button',
      'https://ulysses.reeftech.app/?utm_source=vesselsops&utm_medium=announcement'
    );
  };

  return (
    <a
      href="https://ulysses.reeftech.app/?utm_source=vesselsops&utm_medium=announcement"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`
        flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-fuchsia-600 
        text-white rounded-full text-sm font-medium hover:opacity-90 transition-all
        shadow-md hover:shadow-lg transform duration-300 
        ${visible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}
      `}
    >
      <span>Want to start a food truck business?</span>
      <ArrowRight className="w-4 h-4 flex-shrink-0" />
    </a>
  );
}