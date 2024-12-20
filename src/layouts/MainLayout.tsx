import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { BusinessOptions } from '../components/BusinessOptions';
import { BusinessOpportunity } from '../components/BusinessOpportunity';
import { Inventory } from '../components/Inventory';
import { Process } from '../components/Process';
import { CallToAction } from '../components/CallToAction';
import { AnnouncementBar } from '../components/AnnouncementBar';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 inset-x-0 z-50">
        <AnnouncementBar />
        <Header />
      </div>
      <div className="pt-[104px]">
        <Hero />
        <BusinessOptions />
        <Features />
        <Inventory />
        <Process />
        <BusinessOpportunity />
        <CallToAction />
      </div>
    </div>
  );
}