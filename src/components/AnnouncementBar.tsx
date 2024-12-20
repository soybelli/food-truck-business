import React from 'react';
import { ArrowRight } from 'lucide-react';
import { trackClick } from '../utils/analytics';
import { useAnnouncement } from '../contexts/AnnouncementContext';

export function AnnouncementBar() {
  const { isAnnouncementVisible } = useAnnouncement();

  const handleClick = () => {
    trackClick(
      'Learn How',
      'announcement_bar_link',
      'https://ulysses.reeftech.app/?utm_source=vesselsops&utm_medium=announcement'
    );
  };

  if (!isAnnouncementVisible) return null;

  return (
    <div className="bg-gradient-to-r from-pink-500 via-pink-600 to-fuchsia-600 text-white">
      <div className="container mx-auto px-4">
        <a
          href="https://ulysses.reeftech.app/?utm_source=vesselsops&utm_medium=announcement"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="flex items-center justify-center gap-2 py-2 text-sm md:text-base font-medium hover:text-white/90 transition-colors group"
        >
          <span className="text-center">
            🚀 Want to start a food truck business? Launch with just $10,000!
          </span>
          <span className="inline-flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform whitespace-nowrap">
            Learn How
            <ArrowRight className="w-4 h-4" />
          </span>
        </a>
      </div>
    </div>
  );
}