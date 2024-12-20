import { useState, useEffect } from 'react';
import { useScrollPosition } from './useScrollPosition';

export function useAnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const scrollPosition = useScrollPosition();
  const isMobile = window.innerWidth < 768; // md breakpoint

  useEffect(() => {
    if (isMobile) {
      setIsVisible(true); // Always visible on mobile
    } else {
      setIsVisible(scrollPosition <= 100);
    }
  }, [scrollPosition, isMobile]);

  return { isVisible };
}