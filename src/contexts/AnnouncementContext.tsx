import React, { createContext, useContext, useState } from 'react';

interface AnnouncementContextType {
  isAnnouncementVisible: boolean;
  toggleAnnouncement: () => void;
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

export function AnnouncementProvider({ children }: { children: React.ReactNode }) {
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(false);

  const toggleAnnouncement = () => {
    setIsAnnouncementVisible(prev => !prev);
  };

  return (
    <AnnouncementContext.Provider value={{ isAnnouncementVisible, toggleAnnouncement }}>
      {children}
    </AnnouncementContext.Provider>
  );
}

export function useAnnouncement() {
  const context = useContext(AnnouncementContext);
  if (context === undefined) {
    throw new Error('useAnnouncement must be used within an AnnouncementProvider');
  }
  return context;
}