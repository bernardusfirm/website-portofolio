import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ClientsTicker from '@/components/home/ClientsTicker';
import FeaturedWorks from '@/components/home/FeaturedWorks';
import Disciplines from '@/components/home/Disciplines';
import CareerJourneyTeaser from '@/components/home/CareerJourneyTeaser';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ClientsTicker />
      <FeaturedWorks />
      <Disciplines />
      <CareerJourneyTeaser />
    </div>
  );
}
